'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, FileText, Search, AlertTriangle, Upload, Loader2, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category { id: string; nameVi: string }
interface NewsPost {
  id: string; titleVi: string; slug: string; status: string
  publishedAt: string | null; createdAt: string; viewCount: number
  category?: { nameVi: string } | null
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  DRAFT: { label: 'Nháp', cls: 'bg-yellow-50 text-yellow-700' },
  PUBLISHED: { label: 'Đã đăng', cls: 'bg-green-50 text-green-700' },
}

const EMPTY = {
  titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '',
  contentVi: '', contentEn: '', imageUrl: '', categoryId: '',
  status: 'DRAFT', publishedAt: '',
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<NewsPost | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const imgRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [filter])
  useEffect(() => { fetchCategories() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch(`/api/admin/news${filter ? `?status=${filter}` : ''}`)
    const d = await res.json()
    setItems(d.posts || [])
    setLoading(false)
  }

  async function fetchCategories() {
    const res = await fetch('/api/admin/news-categories')
    const d = await res.json()
    setCategories(d.categories || [])
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY })
    setShowForm(true)
  }

  function openEdit(p: NewsPost & { titleEn?: string; descriptionVi?: string; descriptionEn?: string; contentVi?: string; contentEn?: string; imageUrl?: string; categoryId?: string }) {
    setEditing(p)
    setForm({
      titleVi: p.titleVi, titleEn: (p as any).titleEn || '',
      descriptionVi: (p as any).descriptionVi || '', descriptionEn: (p as any).descriptionEn || '',
      contentVi: (p as any).contentVi || '', contentEn: (p as any).contentEn || '',
      imageUrl: (p as any).imageUrl || '',
      categoryId: (p as any).categoryId || '',
      status: p.status,
      publishedAt: p.publishedAt ? p.publishedAt.slice(0, 16) : '',
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
      const payload = { ...form, categoryId: form.categoryId || undefined, publishedAt: form.publishedAt || undefined }
      if (editing) {
        await fetch('/api/admin/news', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
      } else {
        await fetch('/api/admin/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function togglePublish(item: NewsPost) {
    const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await fetch('/api/admin/news', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, status: newStatus, publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : null }) })
    fetchItems()
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/news?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  const filtered = items.filter(i => !search || i.titleVi.toLowerCase().includes(search.toLowerCase()) || i.slug.includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tin tức</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} bài viết</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] transition-colors text-sm font-medium"><Plus size={16} />Thêm bài viết</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['', 'DRAFT', 'PUBLISHED'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={cn('px-3 py-1.5 rounded-lg text-sm border transition-colors', filter === s ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>
            {s === '' ? 'Tất cả' : STATUS_MAP[s]?.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm bài viết..." className="pl-9 pr-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff] w-52" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Title (EN) *</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Danh mục</label>
                  <select value={form.categoryId} onChange={e => setForm(f => ({...f, categoryId: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] bg-white">
                    <option value="">-- Không có --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nameVi}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Trạng thái</label>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] bg-white">
                    <option value="DRAFT">Nháp</option>
                    <option value="PUBLISHED">Đăng ngay</option>
                  </select>
                </div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Ngày đăng</label><input type="datetime-local" value={form.publishedAt} onChange={e => setForm(f => ({...f, publishedAt: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tóm tắt (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Summary (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nội dung (VI)</label>
                <textarea value={form.contentVi} onChange={e => setForm(f => ({...f, contentVi: e.target.value}))} rows={8} placeholder="Nhập nội dung HTML hoặc văn bản..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y font-mono" style={{minHeight: 160}} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Content (EN)</label>
                <textarea value={form.contentEn} onChange={e => setForm(f => ({...f, contentEn: e.target.value}))} rows={8} placeholder="Enter HTML or plain text..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y font-mono" style={{minHeight: 160}} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ảnh bìa</label>
                <div className="flex gap-2">
                  <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
                  <button type="button" onClick={() => imgRef.current?.click()} disabled={uploading} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 whitespace-nowrap">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}Chọn ảnh
                  </button>
                </div>
                {form.imageUrl && <img src={form.imageUrl} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />}
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
          {[...Array(4)].map((_, i) => (<div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse"><div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-6 bg-gray-100 rounded w-20" /></div>))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="admin-table-wrapper">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tiêu đề</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Danh mục</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Ngày đăng</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Trạng thái</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{item.titleVi}</div>
                      <div className="text-gray-400 text-xs font-mono">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{item.category?.nameVi || '—'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('vi-VN') : new Date(item.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex px-2.5 py-1 rounded-full text-xs font-medium', STATUS_MAP[item.status]?.cls || 'bg-gray-100 text-gray-500')}>
                        {STATUS_MAP[item.status]?.label || item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => togglePublish(item)} className={cn('p-1.5 rounded transition-colors text-xs font-medium', item.status === 'PUBLISHED' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50')} title={item.status === 'PUBLISHED' ? 'Chuyển về nháp' : 'Đăng bài'}>
                          <Globe size={14} />
                        </button>
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
              <FileText size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có bài viết nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm bài viết đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá bài viết</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
