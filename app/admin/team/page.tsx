'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Users, Search, AlertTriangle } from 'lucide-react'
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
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

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

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/team?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
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

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm thành viên..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (<div key={i} className="bg-white rounded-xl border p-5 animate-pulse"><div className="flex gap-3"><div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0" /><div className="flex-1"><div className="h-4 bg-gray-100 rounded mb-2 w-24" /><div className="h-3 bg-gray-100 rounded w-32" /></div></div></div>))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || i.positionVi.toLowerCase().includes(search.toLowerCase())).map(item => (
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
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xoá"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {items.filter(i => !search || i.nameVi.toLowerCase().includes(search.toLowerCase()) || i.positionVi.toLowerCase().includes(search.toLowerCase())).length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có thành viên nào'}</p>
              {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm thành viên đầu tiên</button>}
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá thành viên</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50">{deleting ? 'Đang xoá...' : 'Xoá'}</button>
            </div>
          </div>
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
