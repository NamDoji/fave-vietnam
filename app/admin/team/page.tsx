'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Users, Search, AlertTriangle, Upload, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string; nameVi: string; nameEn: string; positionVi: string; positionEn: string
  bioVi: string | null; bioEn: string | null; imageUrl: string | null
  email: string | null; linkedin: string | null; isActive: boolean; sortOrder: number
}

const EMPTY = { nameVi: '', nameEn: '', positionVi: '', positionEn: '', bioVi: '', bioEn: '', imageUrl: '', email: '', linkedin: '', isActive: true, sortOrder: 0 }

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const imgRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/team')
    const d = await res.json()
    setItems(d.members || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(item: TeamMember) {
    setEditing(item)
    setForm({
      nameVi: item.nameVi, nameEn: item.nameEn || '',
      positionVi: item.positionVi, positionEn: item.positionEn || '',
      bioVi: item.bioVi || '', bioEn: item.bioEn || '',
      imageUrl: item.imageUrl || '',
      email: item.email || '', linkedin: item.linkedin || '',
      isActive: item.isActive, sortOrder: item.sortOrder
    })
    setShowForm(true)
  }

  async function handleUpload(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const d = await res.json()
    setForm(prev => ({ ...prev, imageUrl: d.url }))
    setUploading(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/team?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  async function toggleActive(item: TeamMember) {
    await fetch('/api/admin/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || i.positionVi.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Đội ngũ</h1><p className="text-sm text-gray-500 mt-1">{items.length} thành viên</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] transition-colors text-sm font-medium"><Plus size={16} />Thêm thành viên</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm thành viên..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">{editing ? 'Sửa thành viên' : 'Thêm thành viên mới'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tên (VI) *</label><input value={form.nameVi} onChange={e => setForm(f => ({ ...f, nameVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Name (EN)</label><input value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Chức vụ (VI) *</label><input value={form.positionVi} onChange={e => setForm(f => ({ ...f, positionVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Position (EN)</label><input value={form.positionEn} onChange={e => setForm(f => ({ ...f, positionEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Giới thiệu (VI)</label><textarea value={form.bioVi} onChange={e => setForm(f => ({ ...f, bioVi: e.target.value }))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Bio (EN)</label><textarea value={form.bioEn} onChange={e => setForm(f => ({ ...f, bioEn: e.target.value }))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ảnh đại diện</label>
                <div className="flex gap-2 items-center">
                  {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />}
                  <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
                  <button type="button" onClick={() => imgRef.current?.click()} disabled={uploading} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 whitespace-nowrap">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}Chọn ảnh
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn URL</label><input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" /><span className="font-medium text-gray-700">Hiển thị</span></label></div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi || !form.positionVi} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#0066ff] disabled:opacity-50">
                {saving ? <><Loader2 size={14} className="inline animate-spin mr-1" />Đang lưu...</> : (editing ? 'Cập nhật' : 'Lưu')}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (<div key={i} className="bg-white rounded-xl border p-5 animate-pulse"><div className="flex gap-3"><div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0" /><div className="flex-1"><div className="h-4 bg-gray-100 rounded mb-2 w-24" /><div className="h-3 bg-gray-100 rounded w-32" /></div></div></div>))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div key={item.id} className={cn('bg-white rounded-xl border p-5 relative', !item.isActive && 'opacity-60')}>
              <div className="flex items-start gap-3">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.nameVi} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a3a5c] to-[#0066ff] flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">{item.nameVi}</div>
                  <div className="text-xs text-gray-400">{item.nameEn}</div>
                  <div className="text-sm text-[#0066ff] mt-0.5">{item.positionVi}</div>
                  {item.email && <div className="text-xs text-gray-400 mt-1 truncate">{item.email}</div>}
                </div>
              </div>
              {item.bioVi && <p className="text-xs text-gray-500 mt-3 line-clamp-2">{item.bioVi}</p>}
              <div className="flex items-center gap-1 mt-4 pt-3 border-t">
                <button onClick={() => toggleActive(item)} className={cn('p-1.5 rounded transition-colors', item.isActive ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-green-500')}>
                  {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có thành viên nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm thành viên đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá thành viên</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
