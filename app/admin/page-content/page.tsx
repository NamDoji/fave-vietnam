'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, LayoutTemplate } from 'lucide-react'

interface PageContent {
  id: string
  pageKey: string
  titleVi: string | null
  titleEn: string | null
  contentVi: string | null
  contentEn: string | null
  metaData: unknown
  updatedAt: string
}

const EMPTY = { pageKey: '', titleVi: '', titleEn: '', contentVi: '', contentEn: '' }

export default function PageContentPage() {
  const [items, setItems] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<PageContent | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/page-content')
    const d = await res.json()
    setItems(d.contents || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ ...EMPTY }); setShowForm(true) }
  function openEdit(item: PageContent) {
    setEditing(item)
    setForm({ pageKey: item.pageKey, titleVi: item.titleVi || '', titleEn: item.titleEn || '', contentVi: item.contentVi || '', contentEn: item.contentEn || '' })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const method = editing ? 'PATCH' : 'POST'
      const payload = editing ? { id: editing.id, ...form } : form
      await fetch('/api/admin/page-content', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nội dung Trang</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} trang • Dùng pageKey để map nội dung trang tĩnh</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium">
          <Plus size={16} />Thêm trang
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Page Key</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Tiêu đề (VI)</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Cập nhật</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <LayoutTemplate size={14} className="text-[#00a0e9] flex-shrink-0" />
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-700">{item.pageKey}</code>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{item.titleVi || <span className="text-gray-300 italic">—</span>}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{new Date(item.updatedAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <LayoutTemplate size={32} className="mx-auto mb-2 opacity-30" />
              <p>Chưa có nội dung trang nào</p>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="font-bold text-lg">{editing ? `Sửa: ${editing.pageKey}` : 'Thêm nội dung trang'}</h2></div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Page Key * <span className="font-normal text-gray-400">(vd: home, about, contact)</span></label>
                <input value={form.pageKey} onChange={e => setForm(f => ({ ...f, pageKey: e.target.value }))} disabled={!!editing}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-[#00a0e9] disabled:bg-gray-50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (VI)</label><input value={form.titleVi} onChange={e => setForm(f => ({ ...f, titleVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Nội dung (VI)</label><textarea value={form.contentVi} onChange={e => setForm(f => ({ ...f, contentVi: e.target.value }))} rows={5} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Nội dung (EN)</label><textarea value={form.contentEn} onChange={e => setForm(f => ({ ...f, contentEn: e.target.value }))} rows={5} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.pageKey} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
