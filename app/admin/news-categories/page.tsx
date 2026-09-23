'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react'

interface NewsCategory {
  id: string
  nameVi: string
  nameEn: string
  slug: string
  sortOrder: number
  _count?: { posts: number }
}

const EMPTY = { nameVi: '', nameEn: '', slug: '', sortOrder: 0 }

export default function NewsCategoriesPage() {
  const [items, setItems] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<NewsCategory | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/news-categories')
    const d = await res.json()
    setItems(d.categories || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ ...EMPTY }); setError(''); setShowForm(true) }
  function openEdit(item: NewsCategory) {
    setEditing(item)
    setForm({ nameVi: item.nameVi, nameEn: item.nameEn, slug: item.slug, sortOrder: item.sortOrder })
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
      const res = await fetch('/api/admin/news-categories', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Lỗi'); return }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá danh mục này? Các bài viết thuộc danh mục sẽ không bị xoá.')) return
    await fetch(`/api/admin/news-categories?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh mục Tin tức</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} danh mục</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium">
          <Plus size={16} />Thêm danh mục
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tên danh mục</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Slug</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">Bài viết</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Thứ tự</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Newspaper size={14} className="text-[#00a0e9] flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{item.nameVi}</div>
                        <div className="text-xs text-gray-400">{item.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden sm:table-cell">{item.slug}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{item._count?.posts ?? 0}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-gray-400">Chưa có danh mục nào</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
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
    </div>
  )
}
