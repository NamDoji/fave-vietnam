'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Star, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project { id: string; titleVi: string; titleEn: string; slug: string; imageUrl: string | null; location: string | null; clientName: string | null; isActive: boolean; isFeatured: boolean; sectorVi: string | null }

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', location: '', clientName: '', sectorVi: '', sectorEn: '', scale: '', imageUrl: '', isActive: true, isFeatured: false })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    const d = await res.json()
    setItems(d.projects || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', location: '', clientName: '', sectorVi: '', sectorEn: '', scale: '', imageUrl: '', isActive: true, isFeatured: false }); setShowForm(true) }
  function openEdit(p: Project) { setEditing(p); setForm({ titleVi: p.titleVi, titleEn: p.titleEn, descriptionVi: '', descriptionEn: '', location: p.location || '', clientName: p.clientName || '', sectorVi: p.sectorVi || '', sectorEn: '', scale: '', imageUrl: p.imageUrl || '', isActive: p.isActive, isFeatured: p.isFeatured }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/projects', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá dự án này?')) return
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const SECTORS = ['Tòa nhà văn phòng', 'Trung tâm thương mại', 'Nhà máy', 'Khách sạn', 'Bệnh viện', 'Khu dân cư', 'Cơ quan nhà nước']

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Quản lý Dự án</h1><p className="text-sm text-gray-500 mt-1">{items.length} dự án</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium"><Plus size={16} />Thêm dự án</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa dự án' : 'Thêm dự án mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project name (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Khách hàng/Chủ đầu tư</label><input value={form.clientName} onChange={e => setForm(f => ({...f, clientName: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label><input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực</label>
                  <select value={form.sectorVi} onChange={e => setForm(f => ({...f, sectorVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
                    <option value="">-- Chọn lĩnh vực --</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Quy mô</label><input value={form.scale} onChange={e => setForm(f => ({...f, scale: e.target.value}))} placeholder="VD: 50.000 m2, 500 tấn lạnh" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh đại diện</label><input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><input type="checkbox" id="prjActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="prjActive" className="text-sm font-medium text-gray-700">Hiển thị</label></div>
                <div className="flex items-center gap-2"><input type="checkbox" id="prjFeatured" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} className="rounded" /><label htmlFor="prjFeatured" className="text-sm font-medium text-gray-700">Dự án tiêu biểu</label></div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-12">Ảnh</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tên dự án</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Lĩnh vực</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Địa điểm</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Tiêu biểu</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-20">Thao tác</th>
            </tr></thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.imageUrl ? <img src={item.imageUrl} alt={item.titleVi} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-gray-100 rounded-lg" />}</td>
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.titleVi}</div><div className="text-gray-400 text-xs">{item.clientName}</div></td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{item.sectorVi}</td>
                  <td className="px-4 py-3 hidden lg:table-cell"><span className="flex items-center gap-1 text-gray-400 text-xs"><MapPin size={11} />{item.location}</span></td>
                  <td className="px-4 py-3 text-center"><Star size={14} className={cn(item.isFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300')} /></td>
                  <td className="px-4 py-3"><div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-gray-400">Chưa có dự án nào</div>}
        </div>
      )}
    </div>
  )
}
