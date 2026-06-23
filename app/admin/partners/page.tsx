'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Partner { id: string; nameVi: string; logoUrl: string | null; website: string | null; sortOrder: number }

export default function AdminPartnersPage() {
  const [items, setItems] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [form, setForm] = useState({ nameVi: '', nameEn: '', logoUrl: '', website: '', sortOrder: 0 })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/partners')
    const d = await res.json()
    setItems(d.partners || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ nameVi: '', nameEn: '', logoUrl: '', website: '', sortOrder: items.length }); setShowForm(true) }
  function openEdit(p: Partner) { setEditing(p); setForm({ nameVi: p.nameVi, nameEn: '', logoUrl: p.logoUrl || '', website: p.website || '', sortOrder: p.sortOrder }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) { await fetch('/api/admin/partners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) }) }
      else { await fetch('/api/admin/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }) }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá đối tác này?')) return
    await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Đối tác & Khách hàng</h1><p className="text-sm text-gray-500 mt-1">{items.length} đối tác</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium"><Plus size={16} />Thêm đối tác</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa đối tác' : 'Thêm đối tác mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên đối tác *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Logo</label><input value={form.logoUrl} onChange={e => setForm(f => ({...f, logoUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              {form.logoUrl && <img src={form.logoUrl} alt="" className="h-16 object-contain" />}
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: +e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border p-4 flex flex-col items-center group relative">
              {item.logoUrl ? <img src={item.logoUrl} alt={item.nameVi} className="h-14 object-contain mb-3" /> : <div className="h-14 w-full bg-gray-100 rounded flex items-center justify-center mb-3 text-xs text-gray-400">No logo</div>}
              <p className="text-xs text-center text-gray-600 font-medium">{item.nameVi}</p>
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                <button onClick={() => openEdit(item)} className="p-1 bg-white rounded shadow text-gray-400 hover:text-blue-600"><Pencil size={12} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1 bg-white rounded shadow text-gray-400 hover:text-red-600"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">Chưa có đối tác nào</div>}
        </div>
      )}
    </div>
  )
}
