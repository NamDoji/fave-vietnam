'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, ShieldCheck, UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  isActive: boolean
  createdAt: string
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  ADMIN: { label: 'Admin', color: 'bg-red-50 text-red-700' },
  EDITOR: { label: 'Editor', color: 'bg-blue-50 text-blue-700' },
  VIEWER: { label: 'Viewer', color: 'bg-gray-50 text-gray-700' },
}

const EMPTY = { name: '', email: '', password: '', role: 'EDITOR', isActive: true }

export default function AdminUsersPage() {
  const [items, setItems] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    const d = await res.json()
    setItems(d.users || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ ...EMPTY }); setError(''); setShowForm(true) }
  function openEdit(item: AdminUser) { setEditing(item); setForm({ name: item.name || '', email: item.email, password: '', role: item.role, isActive: item.isActive }); setError(''); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const payload = editing
        ? { id: editing.id, name: form.name, role: form.role, isActive: form.isActive, ...(form.password ? { password: form.password } : {}) }
        : { ...form }
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch('/api/admin/users', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Lỗi không xác định')
        return
      }
      setShowForm(false)
      fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá tài khoản này?')) return
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const d = await res.json()
      alert(d.error)
      return
    }
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Tài khoản Admin</h1><p className="text-sm text-gray-500 mt-1">{items.length} tài khoản</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium"><Plus size={16} />Tạo tài khoản</button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tài khoản</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Email</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">Vai trò</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Trạng thái</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] flex items-center justify-center flex-shrink-0">
                        {item.role === 'ADMIN' ? <ShieldCheck size={14} className="text-white" /> : <UserIcon size={14} className="text-white" />}
                      </div>
                      <div className="font-medium text-gray-900">{item.name || '—'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{item.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', ROLE_LABELS[item.role]?.color)}>
                      {ROLE_LABELS[item.role]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500')}>
                      {item.isActive ? 'Hoạt động' : 'Khoá'}
                    </span>
                  </td>
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
          {items.length === 0 && <div className="text-center py-12 text-gray-400">Không có tài khoản nào</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b"><h2 className="font-bold text-lg">{editing ? 'Sửa tài khoản' : 'Tạo tài khoản mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Họ tên</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Email {!editing && '*'}</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} disabled={!!editing} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] disabled:bg-gray-50" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">{editing ? 'Mật khẩu mới (để trống = giữ nguyên)' : 'Mật khẩu *'}</label><input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Vai trò</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
                  <option value="ADMIN">Admin</option>
                  <option value="EDITOR">Editor</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" /><span>Tài khoản hoạt động</span></label>
              {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || (!editing && (!form.email || !form.password))} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
