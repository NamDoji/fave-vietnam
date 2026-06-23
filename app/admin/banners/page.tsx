'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Banner {
  id: string
  titleVi: string
  titleEn: string
  subtitleVi: string | null
  imageUrl: string
  ctaLabelVi: string | null
  ctaUrl: string | null
  isActive: boolean
  sortOrder: number
}

export default function AdminBannersPage() {
  const [items, setItems] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    titleVi: '', titleEn: '',
    subtitleVi: '', subtitleEn: '',
    imageUrl: '',
    ctaLabelVi: '', ctaLabelEn: '',
    ctaUrl: '',
    isActive: true,
    sortOrder: 0,
  })

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/banners')
    const d = await res.json()
    setItems(d.banners || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ titleVi: '', titleEn: '', subtitleVi: '', subtitleEn: '', imageUrl: '', ctaLabelVi: 'Xem dịch vụ', ctaLabelEn: 'Our Services', ctaUrl: '/dich-vu', isActive: true, sortOrder: items.length })
    setShowForm(true)
  }

  function openEdit(b: Banner) {
    setEditing(b)
    setForm({
      titleVi: b.titleVi, titleEn: b.titleEn,
      subtitleVi: b.subtitleVi || '', subtitleEn: '',
      imageUrl: b.imageUrl,
      ctaLabelVi: b.ctaLabelVi || '', ctaLabelEn: '',
      ctaUrl: b.ctaUrl || '',
      isActive: b.isActive, sortOrder: b.sortOrder,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false)
      fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá banner này?')) return
    await fetch(`/api/admin/banners?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  async function toggleActive(b: Banner) {
    await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: b.id, isActive: !b.isActive }) })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner</h1>
          <p className="text-sm text-gray-500 mt-1">Slide ảnh trang chủ · {items.length} banner</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium">
          <Plus size={16} />Thêm banner
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-blue-700">
        💡 <strong>Gợi ý:</strong> Ảnh banner nên dùng kích thước 1920×1080px (16:9), định dạng JPG hoặc WebP. Có thể upload lên <a href="/admin/media" className="underline font-medium">thư viện Media</a> rồi copy URL về đây.
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? 'Sửa banner' : 'Thêm banner mới'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              {/* Preview */}
              {form.imageUrl && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    {form.titleVi && <h3 className="text-white font-bold text-xl">{form.titleVi}</h3>}
                    {form.subtitleVi && <p className="text-white/80 text-sm mt-1">{form.subtitleVi}</p>}
                    {form.ctaLabelVi && <div className="mt-3 inline-flex"><span className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium">{form.ctaLabelVi}</span></div>}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (VI) *</label>
                  <input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} placeholder="VD: Giải pháp HVAC chuyên nghiệp" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
                  <input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} placeholder="Professional HVAC Solutions" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phụ đề (VI)</label>
                  <input value={form.subtitleVi} onChange={e => setForm(f => ({...f, subtitleVi: e.target.value}))} placeholder="Bảo trì · Sửa chữa · Lắp đặt" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (EN)</label>
                  <input value={form.subtitleEn} onChange={e => setForm(f => ({...f, subtitleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">URL Ảnh *</label>
                <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://... (upload ảnh ở Media rồi copy URL)" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nhãn nút (VI)</label>
                  <input value={form.ctaLabelVi} onChange={e => setForm(f => ({...f, ctaLabelVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Button label (EN)</label>
                  <input value={form.ctaLabelEn} onChange={e => setForm(f => ({...f, ctaLabelEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">URL nút</label>
                  <input value={form.ctaUrl} onChange={e => setForm(f => ({...f, ctaUrl: e.target.value}))} placeholder="/dich-vu" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Hiển thị banner</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.titleVi || !form.imageUrl} className="px-5 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors font-medium">
                {saving ? 'Đang lưu...' : (editing ? 'Cập nhật' : 'Tạo banner')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner list */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="aspect-video bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <ImageIcon size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">Chưa có banner nào</p>
          <p className="text-gray-400 text-sm mt-1">Tạo banner đầu tiên để hiển thị trên trang chủ</p>
          <button onClick={openCreate} className="mt-4 px-5 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">+ Thêm banner</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-video shadow-sm hover:shadow-lg transition-shadow">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.titleVi} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={32} className="text-gray-400" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{item.titleVi}</p>
                      {item.subtitleVi && <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{item.subtitleVi}</p>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', item.isActive ? 'bg-green-500/90 text-white' : 'bg-gray-500/90 text-white')}>
                        {item.isActive ? 'Hiện' : 'Ẩn'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sortorder badge */}
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                #{item.sortOrder + 1}
              </div>

              {/* Actions - show on hover */}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleActive(item)} className={cn('p-2 rounded-lg text-white shadow backdrop-blur-sm', item.isActive ? 'bg-yellow-500/80 hover:bg-yellow-500' : 'bg-green-500/80 hover:bg-green-500')} title={item.isActive ? 'Ẩn banner' : 'Hiện banner'}>
                  {item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-blue-500/80 hover:bg-blue-500 text-white shadow backdrop-blur-sm">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white shadow backdrop-blur-sm">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Add new card */}
          <button onClick={openCreate} className="aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
            <Plus size={24} />
            <span className="text-sm font-medium">Thêm banner</span>
          </button>
        </div>
      )}
    </div>
  )
}
