'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Handshake, AlertTriangle, Eye, EyeOff, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Partner {
  id: string
  nameVi: string
  nameEn: string
  logoUrl: string | null
  website: string | null
  isActive: boolean
  sortOrder: number
}

const EMPTY = { nameVi: '', nameEn: '', logoUrl: '', website: '', isActive: true, sortOrder: 0 }

export default function AdminPartnersPage() {
  const [items, setItems] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/partners')
    const d = await res.json()
    // API returns raw array
    setItems(Array.isArray(d) ? d : (d.partners || []))
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(p: Partner) {
    setEditing(p)
    setForm({ nameVi: p.nameVi, nameEn: p.nameEn || '', logoUrl: p.logoUrl || '', website: p.website || '', isActive: p.isActive, sortOrder: p.sortOrder })
    setShowForm(true)
  }

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (d.url) setForm(prev => ({ ...prev, logoUrl: d.url }))
    } finally { setUploading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/partners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/partners?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  async function toggleActive(item: Partner) {
    await fetch('/api/admin/partners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đối tác</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} đối tác</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] transition-colors text-sm font-medium"><Plus size={16} />Thêm đối tác</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa đối tác' : 'Thêm đối tác mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên đối tác (VI) *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Partner name (EN)</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex gap-2">
                  <input value={form.logoUrl} onChange={e => setForm(f => ({...f, logoUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] min-w-0" />
                  <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  <button onClick={() => logoRef.current?.click()} disabled={uploading} className="flex items-center gap-1 px-3 py-2 border rounded-lg text-xs text-gray-600 hover:bg-gray-50 flex-shrink-0 disabled:opacity-50">
                    {uploading ? <span className="animate-spin text-sm">⟳</span> : <Upload size={13} />}Chọn ảnh
                  </button>
                </div>
                {form.logoUrl && (
                  <div className="mt-2 inline-flex items-center justify-center border rounded-lg p-2 bg-gray-50">
                    <img src={form.logoUrl} alt="" className="h-12 object-contain" />
                  </div>
                )}
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} placeholder="https://..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" id="pActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="pActive" className="text-sm font-medium text-gray-700">Hiển thị</label></div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#0066ff] disabled:opacity-50 font-medium">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl border p-4 h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item.id} className={cn('bg-white rounded-xl border p-4 flex flex-col items-center group relative hover:shadow-md transition-shadow', !item.isActive && 'opacity-50')}>
              {item.logoUrl
                ? <img src={item.logoUrl} alt={item.nameVi} className="h-14 object-contain mb-3" />
                : <div className="h-14 w-full bg-gray-100 rounded flex items-center justify-center mb-3 text-xs text-gray-400">No logo</div>
              }
              <p className="text-xs text-center text-gray-600 font-medium line-clamp-2">{item.nameVi}</p>
              {!item.isActive && <span className="mt-1 text-xs text-gray-400">Ẩn</span>}
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-0.5 bg-white/90 rounded-lg p-0.5 shadow">
                <button onClick={() => toggleActive(item)} className="p-1 rounded text-gray-400 hover:text-yellow-500" title={item.isActive ? 'Ẩn' : 'Hiện'}>{item.isActive ? <EyeOff size={11} /> : <Eye size={11} />}</button>
                <button onClick={() => openEdit(item)} className="p-1 rounded text-gray-400 hover:text-blue-600"><Pencil size={11} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1 rounded text-gray-400 hover:text-red-600"><Trash2 size={11} /></button>
              </div>
            </div>
          ))}
          <button onClick={openCreate} className="rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all h-32">
            <Plus size={20} /><span className="text-xs font-medium">Thêm đối tác</span>
          </button>
          {items.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Handshake size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">Chưa có đối tác nào</p>
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá đối tác</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50">{deleting ? 'Đang xoá...' : 'Xoá'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
