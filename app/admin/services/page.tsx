'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Wrench, Search, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service { id: string; titleVi: string; titleEn: string; slug: string; icon: string | null; isActive: boolean; sortOrder: number; descriptionVi: string }

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', contentVi: '', contentEn: '', icon: '', imageUrl: '', bannerUrl: '', isActive: true, sortOrder: 0 })
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    const d = await res.json()
    setItems(d.services || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', contentVi: '', contentEn: '', icon: '', imageUrl: '', bannerUrl: '', isActive: true, sortOrder: items.length }); setShowForm(true) }
  function openEdit(s: Service) { setEditing(s); setForm({ titleVi: s.titleVi, titleEn: s.titleEn, descriptionVi: s.descriptionVi, descriptionEn: '', contentVi: '', contentEn: '', icon: s.icon || '', imageUrl: '', bannerUrl: '', isActive: s.isActive, sortOrder: s.sortOrder }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/services', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/services?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    setDeleting(false)
    fetchItems()
  }

  async function toggleActive(item: Service) {
    await fetch('/api/admin/services', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.titleVi.toLowerCase().includes(search.toLowerCase()) || i.titleEn.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Dịch vụ</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} dịch vụ</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium"><Plus size={16} />Thêm dịch vụ</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm dịch vụ..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên (Tiếng Việt) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên (English) *</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none resize-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Short desc (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none resize-none" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji/text)</label><input value={form.icon} onChange={e => setForm(f => ({...f, icon: e.target.value}))} placeholder="🔧" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh</label><input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00a0e9] outline-none" /></div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="isActive" className="text-sm font-medium text-gray-700">Hiển thị</label></div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
              <div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-6 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="admin-table-wrapper">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-8"></th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tên dịch vụ</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Slug</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Thứ tự</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Trạng thái</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-300"><GripVertical size={14} /></td>
                    <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.icon && <span className="mr-2">{item.icon}</span>}{item.titleVi}</div><div className="text-gray-400 text-xs">{item.titleEn}</div></td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell font-mono text-xs">{item.slug}</td>
                    <td className="px-4 py-3 text-gray-500 text-center">{item.sortOrder}</td>
                    <td className="px-4 py-3 text-center"><span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500')}>{item.isActive ? 'Hiện' : 'Ẩn'}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => toggleActive(item)} className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded transition-colors" title="Toggle hiển thị">{item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                        <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Chỉnh sửa"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xoá"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Wrench size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có dịch vụ nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm dịch vụ đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Xác nhận xoá dịch vụ</h3>
                <p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p>
              </div>
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
