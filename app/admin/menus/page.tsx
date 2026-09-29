'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronRight, Menu, AlertTriangle } from 'lucide-react'
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
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/menus')
    const d = await res.json()
    setItems(d.menus || [])
    setLoading(false)
  }

  function openCreate(parentId = '') {
    setEditing(null)
    setForm({ ...EMPTY, parentId, sortOrder: items.length })
    setShowForm(true)
  }

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
        ? { id: editing.id, labelVi: form.labelVi, labelEn: form.labelEn, href: form.href, parentId: form.parentId || null, sortOrder: form.sortOrder, isActive: form.isActive }
        : { ...form, parentId: form.parentId || null }
      await fetch('/api/admin/menus', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/menus?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  async function toggleActive(item: MenuItem) {
    await fetch('/api/admin/menus', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  const topLevelItems = items.filter(i => !i.parentId)

  const MenuRow = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: depth * 20 }}>
            {depth > 0 && <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />}
            <div>
              <span className={cn('font-medium text-gray-900', !item.isActive && 'text-gray-400 line-through')}>{item.labelVi}</span>
              {item.labelEn && <span className="ml-2 text-xs text-gray-400">{item.labelEn}</span>}
            </div>
            {item.children && item.children.length > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{item.children.length}</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{item.href}</code>
        </td>
        <td className="px-4 py-3 text-center text-gray-500 text-sm">{item.sortOrder}</td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            {depth === 0 && (
              <button onClick={() => openCreate(item.id)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Thêm sub-menu">
                <Plus size={14} />
              </button>
            )}
            <button onClick={() => toggleActive(item)} className={cn('p-1.5 rounded transition-colors', item.isActive ? 'text-green-500 hover:text-gray-400 hover:bg-gray-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50')} title={item.isActive ? 'Ẩn' : 'Hiện'}>
              {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Pencil size={14} /></button>
            <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
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
          <p className="text-sm text-gray-500 mt-1">{topLevelItems.length} mục cấp 1</p>
        </div>
        <button onClick={() => openCreate()} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium transition-colors">
          <Plus size={16} />Thêm mục
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {[...Array(4)].map((_, i) => <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse"><div className="flex-1 h-4 bg-gray-100 rounded" /><div className="h-4 bg-gray-100 rounded w-24 hidden sm:block" /><div className="h-6 bg-gray-100 rounded w-20" /></div>)}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Nhãn</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Đường dẫn</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Thứ tự</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-40">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => <MenuRow key={item.id} item={item} />)}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Menu size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">Chưa có mục menu nào</p>
              <button onClick={() => openCreate()} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm mục đầu tiên</button>
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá menu</h3><p className="text-sm text-gray-500">Sub-menu bên trong cũng sẽ bị ảnh hưởng.</p></div>
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
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="font-bold text-lg">{editing ? 'Sửa mục menu' : form.parentId ? 'Thêm sub-menu' : 'Thêm mục menu'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nhãn (VI) <span className="text-red-500">*</span></label>
                  <input value={form.labelVi} onChange={e => setForm(f => ({ ...f, labelVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="Dịch vụ" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nhãn (EN)</label>
                  <input value={form.labelEn} onChange={e => setForm(f => ({ ...f, labelEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="Services" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Đường dẫn <span className="text-red-500">*</span></label>
                <input value={form.href} onChange={e => setForm(f => ({ ...f, href: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] font-mono" placeholder="/dich-vu" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Menu cha (để trống = cấp 1)</label>
                <select value={form.parentId} onChange={e => setForm(f => ({ ...f, parentId: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
                  <option value="">— Không có (cấp 1) —</option>
                  {topLevelItems.filter(i => i.id !== editing?.id).map(i => (
                    <option key={i.id} value={i.id}>{i.labelVi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Thứ tự sắp xếp</label>
                <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" />
                <span>Hiển thị trên website</span>
              </label>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.labelVi || !form.href} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50 transition-colors">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
