'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Package, Search, AlertTriangle } from 'lucide-react'

interface ProductCategory {
  id: string
  nameVi: string
  nameEn: string
  slug: string
  imageUrl: string | null
  sortOrder: number
  _count?: { products: number }
}

const EMPTY = { nameVi: '', nameEn: '', slug: '', imageUrl: '', sortOrder: 0 }

export default function ProductCategoriesPage() {
  const [items, setItems] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ProductCategory | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/product-categories')
    const d = await res.json()
    setItems(d.categories || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ ...EMPTY }); setError(''); setShowForm(true) }
  function openEdit(item: ProductCategory) {
    setEditing(item)
    setForm({ nameVi: item.nameVi, nameEn: item.nameEn, slug: item.slug, imageUrl: item.imageUrl || '', sortOrder: item.sortOrder })
    setError('')
    setShowForm(true)
  }

  function autoSlug(vi: string) {
    return vi.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }

  async function handleSave() {
    setSaving(true); setError('')
    try {
      const method = editing ? 'PATCH' : 'POST'
      const payload = editing ? { id: editing.id, ...form } : form
      const res = await fetch('/api/admin/product-categories', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Lỗi'); return }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/product-categories?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    setDeleting(false)
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || i.nameEn.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh mục Sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} danh mục</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium">
          <Plus size={16} />Thêm danh mục
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm danh mục..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
              <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0" /><div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-4 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tên danh mục</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Slug</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Sản phẩm</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Thứ tự</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.nameVi} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                        : <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center flex-shrink-0"><Package size={14} className="text-[#00a0e9]" /></div>
                      }
                      <div>
                        <div className="font-medium text-gray-900">{item.nameVi}</div>
                        <div className="text-xs text-gray-400">{item.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden sm:table-cell">{item.slug}</td>
                  <td className="px-4 py-3 text-center text-gray-600 font-medium">{item._count?.products ?? 0}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Chỉnh sửa"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xoá"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có danh mục nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm danh mục đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="p-6 border-b"><h2 className="font-bold text-lg">{editing ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tên (VI) *</label>
                <input value={form.nameVi} onChange={e => setForm(f => ({ ...f, nameVi: e.target.value, slug: autoSlug(e.target.value) }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tên (EN)</label>
                <input value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-[#00a0e9]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ảnh URL</label>
                <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự</label>
                <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
              </div>
              {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Xác nhận xoá</h3>
                <p className="text-sm text-gray-500">Các sản phẩm trong danh mục sẽ không bị xoá.</p>
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
