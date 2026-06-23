'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Client { id: string; nameVi: string; nameEn: string; logoUrl: string | null; industry: string | null; projectDesc: string | null; isActive: boolean; sortOrder: number }

const INDUSTRIES = ['TTTM / Bất động sản', 'Nhà máy sản xuất', 'Y tế / Bệnh viện', 'Cơ quan nhà nước', 'Năng lượng / Nhà máy điện', 'Tòa nhà văn phòng', 'Khách sạn / Resort', 'Khu công nghiệp']

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [form, setForm] = useState({ nameVi: '', nameEn: '', logoUrl: '', industry: '', projectDesc: '', website: '', isActive: true, sortOrder: 0 })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/clients')
    const d = await res.json()
    setItems(d.clients || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ nameVi: '', nameEn: '', logoUrl: '', industry: '', projectDesc: '', website: '', isActive: true, sortOrder: items.length }); setShowForm(true) }
  function openEdit(c: Client) { setEditing(c); setForm({ nameVi: c.nameVi, nameEn: c.nameEn, logoUrl: c.logoUrl || '', industry: c.industry || '', projectDesc: c.projectDesc || '', website: '', isActive: c.isActive, sortOrder: c.sortOrder }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) await fetch('/api/admin/clients', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      else await fetch('/api/admin/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá khách hàng này?')) return
    await fetch(`/api/admin/clients?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Khách hàng tiêu biểu</h1><p className="text-sm text-gray-500 mt-0.5">{items.length} khách hàng · hiển thị trang chủ</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1B5BB8] text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm font-medium shadow-sm"><Plus size={16} />Thêm</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-6">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{editing ? 'Sửa khách hàng' : 'Thêm khách hàng'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tên khách hàng *</label><input value={form.nameVi} onChange={e => setForm(f => ({...f, nameVi: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5BB8]" placeholder="VD: Tập đoàn Vingroup" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name (English)</label><input value={form.nameEn} onChange={e => setForm(f => ({...f, nameEn: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5BB8]" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Lĩnh vực</label>
                <select value={form.industry} onChange={e => setForm(f => ({...f, industry: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5BB8]">
                  <option value="">-- Chọn lĩnh vực --</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mô tả dự án</label><textarea value={form.projectDesc} onChange={e => setForm(f => ({...f, projectDesc: e.target.value}))} rows={3} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5BB8] resize-none" placeholder="Mô tả ngắn về dự án FAVE đã thực hiện cho khách hàng này" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">URL Logo</label><input value={form.logoUrl} onChange={e => setForm(f => ({...f, logoUrl: e.target.value}))} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5BB8]" placeholder="https://..." />{form.logoUrl && <img src={form.logoUrl} alt="" className="h-10 mt-2 object-contain" />}</div>
              <div className="flex items-center gap-2 pt-1"><input type="checkbox" id="cActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded w-4 h-4" /><label htmlFor="cActive" className="text-sm font-medium text-gray-700">Hiển thị trên trang chủ</label></div>
            </div>
            <div className="p-5 border-t flex gap-2.5 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-xl hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi} className="px-5 py-2 text-sm bg-[#1B5BB8] text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-400">Đang tải...</div> : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4 shadow-sm">
              {item.logoUrl ? (
                <img src={item.logoUrl} alt={item.nameVi} className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0"><Building2 size={20} className="text-[#1B5BB8]" /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.nameVi}</div>
                    {item.industry && <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full mt-1 inline-block">{item.industry}</span>}
                    {item.projectDesc && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.projectDesc}</p>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400')}>{item.isActive ? 'Hiện' : 'Ẩn'}</span>
                    <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"><Pencil size={13} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-16 text-gray-400"><Building2 size={32} className="mx-auto mb-2 opacity-30" /><p>Chưa có khách hàng nào</p></div>}
        </div>
      )}
    </div>
  )
}
