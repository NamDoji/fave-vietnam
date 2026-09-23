'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string
  nameVi: string
  nameEn: string
  positionVi: string
  positionEn: string
  bioVi: string | null
  imageUrl: string | null
  email: string | null
  linkedin: string | null
  isActive: boolean
  sortOrder: number
}

const EMPTY: Partial<TeamMember> = { nameVi: '', nameEn: '', positionVi: '', positionEn: '', bioVi: '', imageUrl: '', email: '', linkedin: '', isActive: true, sortOrder: 0 }

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [form, setForm] = useState<Partial<TeamMember>>(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/team')
    const d = await res.json()
    setItems(d.members || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm(EMPTY); setShowForm(true) }
  function openEdit(item: TeamMember) { setEditing(item); setForm({ ...item }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/admin/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
      } else {
        await fetch('/api/admin/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      setShowForm(false)
      fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá thành viên này?')) return
    await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  async function toggleActive(item: TeamMember) {
    await fetch('/api/admin/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Đội ngũ</h1><p className="text-sm text-gray-500 mt-1">{items.length} thành viên</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium"><Plus size={16} />Thêm thành viên</button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className={cn('bg-white rounded-xl border p-5 relative', !item.isActive && 'opacity-60')}>
              <div className="flex items-start gap-3">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.nameVi} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">{item.nameVi}</div>
                  <div className="text-sm text-[#00a0e9]">{item.positionVi}</div>
                  {item.email && <div className="text-xs text-gray-400 mt-1 truncate">{item.email}</div>}
                </div>
              </div>
              {item.bioVi && <p className="text-xs text-gray-500 mt-3 line-clamp-2">{item.bioVi}</p>}
              <div className="flex items-center gap-1 mt-4 pt-3 border-t">
                <button onClick={() => toggleActive(item)} className={cn('p-1.5 rounded', item.isActive ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-green-500')} title={item.isActive ? 'Ẩn' : 'Hiện'}>
                  {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-3 text-center py-12 text-gray-400"><Users size={32} className="mx-auto mb-2 opacity-30" /><p>Chưa có thành viên nào</p></div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="font-bold text-lg">{editing ? 'Sửa thành viên' : 'Thêm thành viên mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tên (VI) *</label><input value={form.nameVi || ''} onChange={e => setForm(f => ({ ...f, nameVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tên (EN)</label><input value={form.nameEn || ''} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Chức vụ (VI) *</label><input value={form.positionVi || ''} onChange={e => setForm(f => ({ ...f, positionVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Chức vụ (EN)</label><input value={form.positionEn || ''} onChange={e => setForm(f => ({ ...f, positionEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Giới thiệu</label><textarea value={form.bioVi || ''} onChange={e => setForm(f => ({ ...f, bioVi: e.target.value }))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Ảnh URL</label><input value={form.imageUrl || ''} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="https://..." /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><input value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn URL</label><input value={form.linkedin || ''} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự</label><input type="number" value={form.sortOrder ?? 0} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div className="flex items-end"><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive ?? true} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" /><span>Hiển thị</span></label></div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.nameVi || !form.positionVi} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
