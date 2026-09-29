'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Star, MapPin, FolderOpen, Search, AlertTriangle, Upload, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category { id: string; nameVi: string }
interface Project {
  id: string; titleVi: string; titleEn: string; slug: string; imageUrl: string | null
  location: string | null; clientName: string | null; isActive: boolean; isFeatured: boolean
  sectorVi: string | null; completedDate: string | null; category?: { nameVi: string } | null
}

const SECTORS = ['Tòa nhà văn phòng', 'Trung tâm thương mại', 'Nhà máy', 'Khách sạn', 'Bệnh viện', 'Khu dân cư', 'Cơ quan nhà nước']

const EMPTY = {
  titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', contentVi: '', contentEn: '',
  imageUrl: '', categoryId: '', location: '', clientName: '', sectorVi: '', sectorEn: '',
  scale: '', completedDate: '', isActive: true, isFeatured: false, sortOrder: 0
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const imgRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems(); fetchCategories() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    const d = await res.json()
    setItems(d.projects || [])
    setLoading(false)
  }

  async function fetchCategories() {
    const res = await fetch('/api/admin/project-categories')
    const d = await res.json()
    setCategories(d.categories || [])
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(p: Project & { categoryId?: string; descriptionVi?: string; contentVi?: string; scale?: string; sectorEn?: string }) {
    setEditing(p)
    setForm({
      titleVi: p.titleVi, titleEn: p.titleEn,
      descriptionVi: p.descriptionVi || '', descriptionEn: '',
      contentVi: p.contentVi || '', contentEn: '',
      imageUrl: p.imageUrl || '',
      categoryId: (p as any).categoryId || '',
      location: p.location || '', clientName: p.clientName || '',
      sectorVi: p.sectorVi || '', sectorEn: '',
      scale: (p as any).scale || '',
      completedDate: p.completedDate ? p.completedDate.slice(0, 10) : '',
      isActive: p.isActive, isFeatured: p.isFeatured,
      sortOrder: (p as any).sortOrder ?? 0
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
      const payload = {
        ...form,
        categoryId: form.categoryId || undefined,
        completedDate: form.completedDate ? new Date(form.completedDate).toISOString() : undefined,
      }
      if (editing) {
        await fetch('/api/admin/projects', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
      } else {
        await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/projects?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  const filtered = items.filter(i => !search || i.titleVi.toLowerCase().includes(search.toLowerCase()) || (i.clientName || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Dự án</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} dự án</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] transition-colors text-sm font-medium"><Plus size={16} />Thêm dự án</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, khách hàng..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? 'Sửa dự án' : 'Thêm dự án mới'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tên dự án (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Project name (EN) *</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Danh mục dự án</label>
                  <select value={form.categoryId} onChange={e => setForm(f => ({...f, categoryId: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] bg-white">
                    <option value="">-- Không có --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nameVi}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Lĩnh vực</label>
                  <select value={form.sectorVi} onChange={e => setForm(f => ({...f, sectorVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] bg-white">
                    <option value="">-- Chọn lĩnh vực --</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Khách hàng/Chủ đầu tư</label><input value={form.clientName} onChange={e => setForm(f => ({...f, clientName: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Địa điểm</label><input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Ngày hoàn thành</label><input type="date" value={form.completedDate} onChange={e => setForm(f => ({...f, completedDate: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Quy mô</label><input value={form.scale} onChange={e => setForm(f => ({...f, scale: e.target.value}))} placeholder="VD: 50.000 m², 500 tấn lạnh" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Mô tả ngắn (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Short description (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nội dung chi tiết (VI)</label>
                <textarea value={form.contentVi} onChange={e => setForm(f => ({...f, contentVi: e.target.value}))} rows={6} placeholder="Nhập nội dung HTML hoặc văn bản..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y font-mono" style={{minHeight: 120}} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Detailed content (EN)</label>
                <textarea value={form.contentEn} onChange={e => setForm(f => ({...f, contentEn: e.target.value}))} rows={6} placeholder="Enter HTML or plain text..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y font-mono" style={{minHeight: 120}} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ảnh đại diện</label>
                <div className="flex gap-2">
                  <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
                  <button type="button" onClick={() => imgRef.current?.click()} disabled={uploading} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 whitespace-nowrap">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}Chọn ảnh
                  </button>
                </div>
                {form.imageUrl && <img src={form.imageUrl} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />}
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><span className="text-sm font-medium text-gray-700">Hiển thị</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} className="rounded" /><span className="text-sm font-medium text-gray-700">Dự án tiêu biểu</span></label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.titleVi || !form.titleEn} className="px-5 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#0066ff] disabled:opacity-50 font-medium">
                {saving ? <><Loader2 size={14} className="inline animate-spin mr-1" />Đang lưu...</> : (editing ? 'Cập nhật' : 'Lưu')}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {[...Array(4)].map((_, i) => (<div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse"><div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" /><div className="h-4 bg-gray-100 rounded flex-1" /></div>))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="admin-table-wrapper">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-12">Ảnh</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tên dự án</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Danh mục</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Địa điểm</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Tiêu biểu</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">{item.imageUrl ? <img src={item.imageUrl} alt={item.titleVi} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><FolderOpen size={14} className="text-gray-400" /></div>}</td>
                    <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.titleVi}</div><div className="text-gray-400 text-xs">{item.clientName}</div></td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{item.category?.nameVi || item.sectorVi || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><span className="flex items-center gap-1 text-gray-400 text-xs"><MapPin size={11} />{item.location}</span></td>
                    <td className="px-4 py-3 text-center"><Star size={14} className={cn(item.isFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200')} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item as any)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FolderOpen size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có dự án nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm dự án đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá dự án</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
