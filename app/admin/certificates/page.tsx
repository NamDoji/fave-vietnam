'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Download, Award, AlertTriangle, Search, Eye, EyeOff, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Certificate {
  id: string
  nameVi: string
  nameEn: string
  descriptionVi: string | null
  descriptionEn: string | null
  imageUrl: string | null
  fileUrl: string | null
  issuedBy: string | null
  issuedAt: string | null
  expiresAt: string | null
  isActive: boolean
  sortOrder: number
}

const EMPTY = { nameVi: '', nameEn: '', descriptionVi: '', descriptionEn: '', imageUrl: '', fileUrl: '', issuedBy: '', issuedAt: '', expiresAt: '', isActive: true, sortOrder: 0 }

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/certificates')
    const d = await res.json()
    // API returns raw array
    setItems(Array.isArray(d) ? d : (d.certificates || []))
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(c: Certificate) {
    setEditing(c)
    setForm({
      nameVi: c.nameVi, nameEn: c.nameEn || '',
      descriptionVi: c.descriptionVi || '', descriptionEn: c.descriptionEn || '',
      imageUrl: c.imageUrl || '', fileUrl: c.fileUrl || '',
      issuedBy: c.issuedBy || '',
      issuedAt: c.issuedAt ? c.issuedAt.slice(0, 10) : '',
      expiresAt: c.expiresAt ? c.expiresAt.slice(0, 10) : '',
      isActive: c.isActive, sortOrder: c.sortOrder,
    })
    setShowForm(true)
  }

  async function handleUpload(file: File, field: 'imageUrl' | 'fileUrl') {
    setUploading(field)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (d.url) setForm(prev => ({ ...prev, [field]: d.url }))
    } finally { setUploading(null) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = {
        ...form,
        issuedAt: form.issuedAt ? new Date(form.issuedAt).toISOString() : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      }
      if (editing) {
        await fetch('/api/admin/certificates', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
      } else {
        await fetch('/api/admin/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/certificates?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  async function toggleActive(item: Certificate) {
    await fetch('/api/admin/certificates', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || (i.issuedBy || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Chứng chỉ & Giấy phép</h1><p className="text-sm text-gray-500 mt-1">{items.length} chứng chỉ</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] text-sm font-medium"><Plus size={16} />Thêm chứng chỉ</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm chứng chỉ..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">{editing ? 'Sửa chứng chỉ' : 'Thêm chứng chỉ mới'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên chứng chỉ (VI) *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Certificate name (EN)</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị cấp</label><input value={form.issuedBy} onChange={e => setForm(f => ({...f, issuedBy: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Ngày cấp</label><input type="date" value={form.issuedAt} onChange={e => setForm(f => ({...f, issuedAt: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label><input type="date" value={form.expiresAt} onChange={e => setForm(f => ({...f, expiresAt: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              {/* Ảnh chứng chỉ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh chứng chỉ</label>
                <div className="flex gap-2">
                  <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] min-w-0" />
                  <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'imageUrl')} />
                  <button onClick={() => imageRef.current?.click()} disabled={uploading === 'imageUrl'} className="flex items-center gap-1 px-3 py-2 border rounded-lg text-xs text-gray-600 hover:bg-gray-50 flex-shrink-0 disabled:opacity-50">
                    {uploading === 'imageUrl' ? <span className="animate-spin text-sm">⟳</span> : <Upload size={13} />}Chọn ảnh
                  </button>
                </div>
                {form.imageUrl && <img src={form.imageUrl} alt="" className="mt-2 h-20 rounded object-cover border" />}
              </div>
              {/* File PDF */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File PDF (cho phép tải)</label>
                <div className="flex gap-2">
                  <input value={form.fileUrl} onChange={e => setForm(f => ({...f, fileUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] min-w-0" />
                  <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'fileUrl')} />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading === 'fileUrl'} className="flex items-center gap-1 px-3 py-2 border rounded-lg text-xs text-gray-600 hover:bg-gray-50 flex-shrink-0 disabled:opacity-50">
                    {uploading === 'fileUrl' ? <span className="animate-spin text-sm">⟳</span> : <Upload size={13} />}Chọn PDF
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2"><input type="checkbox" id="certActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="certActive" className="text-sm font-medium text-gray-700">Hiển thị</label></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#0066ff] disabled:opacity-50 font-medium">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border p-4 animate-pulse"><div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-3" /><div className="h-4 bg-gray-100 rounded mb-2" /><div className="h-3 bg-gray-100 rounded w-2/3" /></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border">
          <Award size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có chứng chỉ nào'}</p>
          {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm mới</button>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className={cn('bg-white rounded-xl border p-4 group relative hover:shadow-md transition-shadow', !item.isActive && 'opacity-60')}>
              {item.imageUrl
                ? <img src={item.imageUrl} alt={item.nameVi} className="w-full aspect-[3/4] object-cover rounded-lg mb-3" />
                : <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center"><Award size={32} className="text-gray-300" /></div>
              }
              <p className="font-medium text-sm text-gray-900 line-clamp-2">{item.nameVi}</p>
              {item.issuedBy && <p className="text-xs text-gray-500 mt-1">{item.issuedBy}</p>}
              {item.issuedAt && <p className="text-xs text-gray-400 mt-0.5">{new Date(item.issuedAt).toLocaleDateString('vi-VN')}</p>}
              {item.expiresAt && <p className="text-xs text-orange-400 mt-0.5">HH: {new Date(item.expiresAt).toLocaleDateString('vi-VN')}</p>}
              {item.fileUrl && <a href={item.fileUrl} download className="mt-2 flex items-center gap-1 text-xs text-[#0066ff] hover:underline"><Download size={12} />Tải xuống</a>}
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-1 bg-white/90 rounded-lg p-0.5 shadow">
                <button onClick={() => toggleActive(item)} className="p-1 rounded text-gray-400 hover:text-yellow-500" title={item.isActive ? 'Ẩn' : 'Hiện'}>{item.isActive ? <EyeOff size={12} /> : <Eye size={12} />}</button>
                <button onClick={() => openEdit(item)} className="p-1 rounded text-gray-400 hover:text-blue-600"><Pencil size={12} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1 rounded text-gray-400 hover:text-red-600"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá chứng chỉ</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
