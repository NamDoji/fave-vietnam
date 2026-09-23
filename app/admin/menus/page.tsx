'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronRight, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  labelVi: string
  labelEn: string
  href: string
  parentId: string | null
  sortOrder: number
  isActive: boolean
  children?: MenuItem[]
}

const EMPTY = { labelVi: '', labelEn: '', href: '', parentId: '', sortOrder: 0, isActive: true }

export default function MenusPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/menus')
    const d = await res.json()
    setItems(d.menus || [])
    setLoading(false)
  }

  function openCreate(parentId = '') { setEditing(null); setForm({ ...EMPTY, parentId }); setShowForm(true) }
  function openEdit(item: MenuItem) {
    setEditing(item)
    setForm({ labelVi: item.labelVi, labelEn: item.labelEn, href: item.href, parentId: item.parentId || '', sortOrder: item.sortOrder, isActive: item.isActive })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const method = editing ? 'PATCH' : 'POST'
      const payload = editing
        ? { id: editing.id, labelVi: form.labelVi, labelEn: form.labelEn, href: form.href, sortOrder: form.sortOrder, isActive: form.isActive }
        : { ...form, parentId: form.parentId || null }
      await fetch('/api/admin/menus', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá mục menu này?')) return
    await fetch(`/api/admin/menus?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  async function toggleActive(item: MenuItem) {
    await fetch('/api/admin/menus', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const MenuRow = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: depth * 20 }}>
            {depth > 0 && <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />}
            <span className={cn('font-medium text-gray-900', !item.isActive && 'text-gray-400 line-through')}>{item.labelVi}</span>
            {item.children && item.children.length > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{item.children.length}</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
          <code className="text-xs">{item.href}</code>
        </td>
        <td className="px-4 py-3 text-center text-gray-500">{item.sortOrder}</td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            {depth === 0 && (
              <button onClick={() => openCreate(item.id)} className="p-1.5 text-gray-400 hover:text-green-600 rounded" title="Thêm sub-menu">
                <Plus size={14} />
              </button>
            )}
            <button onClick={() => toggleActive(item)} className={cn('p-1.5 rounded', item.isActive ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-green-500')} title={item.isActive ? 'Ẩn' : 'Hiện'}>
              {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
            <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
      {item.children?.map(child => <MenuRow key={child.id} item={child} depth={depth + 1} />)}
    </>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu điều hướng</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} mục cấp 1</p>
        </div>
        <button onClick={() => openCreate()} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium">
          <Plus size={16} />Thêm mục
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nhãn</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Đường dẫn</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Thứ tự</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => <MenuRow key={item.id} item={item} />)}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Menu size={32} className="mx-auto mb-2 opacity-30" />
              <p>Chưa có mục menu nào</p>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="font-bold text-lg">{editing ? 'Sửa mục menu' : form.parentId ? 'Thêm sub-menu' : 'Thêm mục menu'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Nhãn (VI) *</label><input value={form.labelVi} onChange={e => setForm(f => ({ ...f, labelVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Nhãn (EN)</label><input value={form.labelEn} onChange={e => setForm(f => ({ ...f, labelEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Đường dẫn *</label><input value={form.href} onChange={e => setForm(f => ({ ...f, href: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="/dich-vu" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" /><span>Hiển thị</span></label>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.labelVi || !form.href} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
