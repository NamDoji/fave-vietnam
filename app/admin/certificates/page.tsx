'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Download, Award } from 'lucide-react'

interface Certificate { id: string; nameVi: string; nameEn: string | null; issuer: string | null; issueDate: string | null; fileUrl: string | null; imageUrl: string | null }

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [form, setForm] = useState({ nameVi: '', nameEn: '', issuer: '', issueDate: '', fileUrl: '', imageUrl: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/certificates')
    const d = await res.json()
    setItems(d.certificates || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ nameVi: '', nameEn: '', issuer: '', issueDate: '', fileUrl: '', imageUrl: '' }); setShowForm(true) }
  function openEdit(c: Certificate) { setEditing(c); setForm({ nameVi: c.nameVi, nameEn: c.nameEn || '', issuer: c.issuer || '', issueDate: c.issueDate ? c.issueDate.slice(0, 10) : '', fileUrl: c.fileUrl || '', imageUrl: c.imageUrl || '' }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, issueDate: form.issueDate ? new Date(form.issueDate).toISOString() : null }
      if (editing) { await fetch('/api/admin/certificates', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) }) }
      else { await fetch('/api/admin/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá chứng chỉ này?')) return
    await fetch(`/api/admin/certificates?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Chứng chỉ & Giấy phép</h1><p className="text-sm text-gray-500 mt-1">{items.length} chứng chỉ</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium"><Plus size={16} />Thêm chứng chỉ</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa chứng chỉ' : 'Thêm chứng chỉ mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên chứng chỉ (VI) *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Certificate name (EN)</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị cấp</label><input value={form.issuer} onChange={e => setForm(f => ({...f, issuer: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Ngày cấp</label><input type="date" value={form.issueDate} onChange={e => setForm(f => ({...f, issueDate: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh chứng chỉ</label><input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL File PDF (cho phép tải)</label><input value={form.fileUrl} onChange={e => setForm(f => ({...f, fileUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border p-4 group relative">
              {item.imageUrl ? <img src={item.imageUrl} alt={item.nameVi} className="w-full aspect-[3/4] object-cover rounded-lg mb-3" /> : <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center"><Award size={32} className="text-gray-300" /></div>}
              <p className="font-medium text-sm text-gray-900 line-clamp-2">{item.nameVi}</p>
              {item.issuer && <p className="text-xs text-gray-500 mt-1">{item.issuer}</p>}
              {item.issueDate && <p className="text-xs text-gray-400 mt-0.5">{new Date(item.issueDate).toLocaleDateString('vi-VN')}</p>}
              {item.fileUrl && <a href={item.fileUrl} download className="mt-2 flex items-center gap-1 text-xs text-[#00a0e9] hover:underline"><Download size={12} />Tải xuống</a>}
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                <button onClick={() => openEdit(item)} className="p-1 bg-white rounded shadow text-gray-400 hover:text-blue-600"><Pencil size={12} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1 bg-white rounded shadow text-gray-400 hover:text-red-600"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">Chưa có chứng chỉ nào</div>}
        </div>
      )}
    </div>
  )
}
