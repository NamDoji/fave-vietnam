'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Building2, Search, AlertTriangle, Eye, EyeOff, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Client {
  id: string
  nameVi: string
  nameEn: string
  logoUrl: string | null
  industry: string | null
  projectDesc: string | null
  website: string | null
  isActive: boolean
  sortOrder: number
}

const INDUSTRIES = ['TTTM / Bất động sản', 'Nhà máy sản xuất', 'Y tế / Bệnh viện', 'Cơ quan nhà nước', 'Năng lượng / Nhà máy điện', 'Tòa nhà văn phòng', 'Khách sạn / Resort', 'Khu công nghiệp']
const EMPTY = { nameVi: '', nameEn: '', logoUrl: '', industry: '', projectDesc: '', website: '', isActive: true, sortOrder: 0 }

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/clients')
    const d = await res.json()
    setItems(d.clients || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(c: Client) {
    setEditing(c)
    setForm({ nameVi: c.nameVi, nameEn: c.nameEn, logoUrl: c.logoUrl || '', industry: c.industry || '', projectDesc: c.projectDesc || '', website: c.website || '', isActive: c.isActive, sortOrder: c.sortOrder })
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
        await fetch('/api/admin/clients', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/clients?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  async function toggleActive(item: Client) {
    await fetch('/api/admin/clients', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || (i.nameEn || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Khách hàng tiêu biểu</h1><p className="text-sm text-gray-500 mt-0.5">{items.length} khách hàng · hiển thị trang chủ</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] text-sm font-medium shadow-sm"><Plus size={16} />Thêm</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-6">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{editing ? 'Sửa khách hàng' : 'Thêm khách hàng'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tên khách hàng *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" placeholder="VD: Tập đoàn Vingroup" /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name (English)</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Lĩnh vực</label>
                <select value={form.industry} onChange={e => setForm(f => ({...f, industry: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] bg-white">
                  <option value="">-- Chọn lĩnh vực --</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mô tả dự án</label><textarea value={form.projectDesc} onChange={e => setForm(f => ({...f, projectDesc: e.target.value}))} rows={3} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" placeholder="Mô tả ngắn về dự án FAVE đã thực hiện" /></div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Logo</label>
                <div className="flex gap-2">
                  <input value={form.logoUrl} onChange={e => setForm(f => ({...f, logoUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] min-w-0" />
                  <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  <button onClick={() => logoRef.current?.click()} disabled={uploading} className="flex items-center gap-1 px-3 py-2 border rounded-xl text-xs text-gray-600 hover:bg-gray-50 flex-shrink-0 disabled:opacity-50">
                    {uploading ? <span className="animate-spin text-sm">⟳</span> : <Upload size={13} />}Chọn
                  </button>
                </div>
                {form.logoUrl && (
                  <div className="mt-2 inline-flex border rounded-lg p-2 bg-gray-50">
                    <img src={form.logoUrl} alt="" className="h-10 object-contain" />
                  </div>
                )}
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website</label><input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} placeholder="https://..." className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" id="cActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded w-4 h-4" /><label htmlFor="cActive" className="text-sm font-medium text-gray-700">Hiển thị trang chủ</label></div>
              </div>
            </div>
            <div className="p-5 border-t flex gap-2.5 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-xl hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi} className="px-5 py-2 text-sm bg-[#1a3a5c] text-white rounded-xl hover:bg-[#0066ff] disabled:opacity-50 font-medium">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm khách hàng..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
        </div>
      </div>

      {loading ? <div className="text-center py-12 text-gray-400">Đang tải...</div> : (
        <div className="space-y-2">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4 shadow-sm">
              {item.logoUrl
                ? <img src={item.logoUrl} alt={item.nameVi} className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 flex-shrink-0" />
                : <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0"><Building2 size={20} className="text-[#1a3a5c]" /></div>
              }
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.nameVi}</div>
                    {item.nameEn && <div className="text-xs text-gray-400">{item.nameEn}</div>}
                    {item.industry && <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full mt-1 inline-block">{item.industry}</span>}
                    {item.projectDesc && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.projectDesc}</p>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400')}>{item.isActive ? 'Hiện' : 'Ẩn'}</span>
                    <button onClick={() => toggleActive(item)} className="p-1.5 text-gray-400 hover:text-yellow-500 rounded-lg hover:bg-yellow-50" title={item.isActive ? 'Ẩn' : 'Hiện'}>{item.isActive ? <EyeOff size={13} /> : <Eye size={13} />}</button>
                    <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"><Pencil size={13} /></button>
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border">
              <Building2 size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có khách hàng nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm mới</button>}
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá khách hàng</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
