'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product { id: string; nameVi: string; nameEn: string; slug: string; imageUrl: string | null; isActive: boolean; isFeatured: boolean; sortOrder: number; descriptionVi: string }

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ nameVi: '', nameEn: '', descriptionVi: '', descriptionEn: '', contentVi: '', contentEn: '', imageUrl: '', isActive: true, isFeatured: false, sortOrder: 0 })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    const d = await res.json()
    setItems(d.products || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ nameVi: '', nameEn: '', descriptionVi: '', descriptionEn: '', contentVi: '', contentEn: '', imageUrl: '', isActive: true, isFeatured: false, sortOrder: items.length }); setShowForm(true) }
  function openEdit(p: Product) { setEditing(p); setForm({ nameVi: p.nameVi, nameEn: p.nameEn, descriptionVi: p.descriptionVi, descriptionEn: '', contentVi: '', contentEn: '', imageUrl: p.imageUrl || '', isActive: p.isActive, isFeatured: p.isFeatured, sortOrder: p.sortOrder }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/products', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá sản phẩm này?')) return
    await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1><p className="text-sm text-gray-500 mt-1">{items.length} sản phẩm</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium"><Plus size={16} />Thêm sản phẩm</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm (VI) *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Product name (EN) *</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Short desc (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh đại diện</label><input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><input type="checkbox" id="pActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="pActive" className="text-sm font-medium text-gray-700">Hiển thị</label></div>
                <div className="flex items-center gap-2"><input type="checkbox" id="pFeatured" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} className="rounded" /><label htmlFor="pFeatured" className="text-sm font-medium text-gray-700">Nổi bật (hiện trang chủ)</label></div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="admin-table-wrapper"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-12">Ảnh</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tên sản phẩm</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-16">Nổi bật</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Trạng thái</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-20">Thao tác</th>
            </tr></thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.imageUrl ? <img src={item.imageUrl} alt={item.nameVi} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">N/A</div>}</td>
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.nameVi}</div><div className="text-gray-400 text-xs">{item.nameEn}</div></td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell font-mono text-xs">{item.slug}</td>
                  <td className="px-4 py-3 text-center"><Star size={14} className={cn(item.isFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300')} /></td>
                  <td className="px-4 py-3 text-center"><span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500')}>{item.isActive ? 'Hiện' : 'Ẩn'}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table></div>
          {items.length === 0 && <div className="text-center py-12 text-gray-400">Chưa có sản phẩm nào</div>}
        </div>
      )}
    </div>
  )
}
