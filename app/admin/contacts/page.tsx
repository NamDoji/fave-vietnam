'use client'
import { useState, useEffect } from 'react'
import { Phone, Building2, Mail, Search, MessageSquare, AlertTriangle, X, CheckCircle, Circle, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactRequest {
  id: string
  name: string
  phone: string
  email: string | null
  company: string | null
  message: string
  isRead: boolean
  note: string | null
  createdAt: string
}

function StatusBadge({ isRead }: { isRead: boolean }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
      isRead ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
    )}>
      {isRead ? <CheckCircle size={10} /> : <Circle size={10} className="fill-blue-500" />}
      {isRead ? 'Đã đọc' : 'Mới'}
    </span>
  )
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ContactRequest | null>(null)
  const [filter, setFilter] = useState<'' | 'unread' | 'read'>('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [filter])

  async function fetchItems() {
    setLoading(true)
    const params = filter === 'unread' ? '?isRead=false' : filter === 'read' ? '?isRead=true' : ''
    const res = await fetch(`/api/admin/contacts${params}`)
    const d = await res.json()
    setItems(d.contacts || [])
    setLoading(false)
  }

  async function toggleRead(id: string, isRead: boolean) {
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, isRead }) })
    fetchItems()
    if (modal?.id === id) setModal(m => m ? { ...m, isRead } : null)
  }

  async function saveNote(id: string) {
    setSaving(true)
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, note }) })
    setSaving(false)
    fetchItems()
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/contacts?id=${deleteId}`, { method: 'DELETE' })
    if (modal?.id === deleteId) setModal(null)
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  function openModal(item: ContactRequest) {
    setModal(item)
    setNote(item.note || '')
    if (!item.isRead) toggleRead(item.id, true)
  }

  const unreadCount = items.filter(i => !i.isRead).length
  const filtered = items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.phone.includes(search) || (i.company || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Liên hệ</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} yêu cầu{unreadCount > 0 && <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">{unreadCount} chưa đọc</span>}
          </p>
        </div>
        <a href="/api/admin/export?type=contacts" className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm transition-colors">Xuất CSV</a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, SĐT, công ty..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
        </div>
        <div className="flex gap-2">
          {([['', 'Tất cả'], ['unread', 'Chưa đọc'], ['read', 'Đã đọc']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={cn('px-3 py-1.5 text-xs rounded-lg border transition-colors', filter === val ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>{label}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
              <div className="flex-1 h-4 bg-gray-100 rounded" /><div className="h-4 bg-gray-100 rounded w-24" /><div className="h-5 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tên / Công ty</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Liên hệ</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Tin nhắn</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Trạng thái</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Ngày</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(item => (
                <tr key={item.id} onClick={() => openModal(item)} className={cn('hover:bg-gray-50 cursor-pointer transition-colors', !item.isRead && 'bg-blue-50/30')}>
                  <td className="px-4 py-3">
                    <div className={cn('font-medium text-gray-900', !item.isRead && 'font-semibold')}>{item.name}</div>
                    {item.company && <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Building2 size={10} />{item.company}</div>}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-gray-600 text-xs"><Phone size={11} />{item.phone}</div>
                    {item.email && <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><Mail size={10} />{item.email}</div>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-400 max-w-xs truncate">{item.message}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge isRead={item.isRead} /></td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Không có yêu cầu nào'}</p>
            </div>
          )}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-lg text-[#1a3a5c]">{modal.name}</h2>
                <div className="mt-1"><StatusBadge isRead={modal.isRead} /></div>
              </div>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2.5 text-sm">
                <dt className="text-gray-500 flex items-center gap-1.5 font-medium"><Phone size={13} />Điện thoại</dt>
                <dd className="font-medium text-gray-800">{modal.phone}</dd>
                {modal.email && <>
                  <dt className="text-gray-500 flex items-center gap-1.5 font-medium"><Mail size={13} />Email</dt>
                  <dd className="text-gray-700 break-all text-xs">{modal.email}</dd>
                </>}
                {modal.company && <>
                  <dt className="text-gray-500 flex items-center gap-1.5 font-medium"><Building2 size={13} />Công ty</dt>
                  <dd className="text-gray-700">{modal.company}</dd>
                </>}
                <dt className="text-gray-500 font-medium">Ngày gửi</dt>
                <dd className="text-gray-600 text-xs">{new Date(modal.createdAt).toLocaleString('vi-VN')}</dd>
              </dl>
              <div className="pt-3 border-t">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tin nhắn</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3">{modal.message}</p>
              </div>
              <div className="pt-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ghi chú nội bộ</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" placeholder="Ghi chú xử lý..." />
              </div>
            </div>
            <div className="p-5 border-t flex gap-2 flex-wrap">
              <button onClick={() => saveNote(modal.id)} disabled={saving}
                className="flex-1 py-2 bg-[#1a3a5c] text-white text-sm rounded-lg hover:bg-[#2a5a8c] disabled:opacity-50 transition-colors">
                {saving ? 'Đang lưu...' : 'Lưu ghi chú'}
              </button>
              <button onClick={() => toggleRead(modal.id, !modal.isRead)}
                className={cn('flex-1 py-2 text-sm rounded-lg border transition-colors',
                  modal.isRead ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100')}>
                {modal.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
              </button>
              <button onClick={() => { setDeleteId(modal.id); setModal(null) }}
                className="py-2 px-3 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá liên hệ</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50">{deleting ? 'Đang xoá...' : 'Xoá'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
