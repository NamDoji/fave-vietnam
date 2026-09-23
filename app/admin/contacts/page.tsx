'use client'
import { useState, useEffect } from 'react'
import { Phone, Building2, CheckCircle, Circle, Trash2, Mail } from 'lucide-react'
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

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactRequest | null>(null)
  const [filter, setFilter] = useState<'' | 'unread' | 'read'>('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

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
    await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isRead }),
    })
    fetchItems()
    if (selected?.id === id) setSelected(s => s ? { ...s, isRead } : null)
  }

  async function saveNote(id: string) {
    setSaving(true)
    await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, note }),
    })
    setSaving(false)
    fetchItems()
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá liên hệ này?')) return
    await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    fetchItems()
  }

  function selectItem(item: ContactRequest) {
    setSelected(item)
    setNote(item.note || '')
    if (!item.isRead) toggleRead(item.id, true)
  }

  const unreadCount = items.filter(i => !i.isRead).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Liên hệ</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} yêu cầu{unreadCount > 0 && <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">{unreadCount} chưa đọc</span>}
          </p>
        </div>
        <a href="/api/admin/export?type=contacts" className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm">
          Xuất CSV
        </a>
      </div>

      <div className="flex gap-2 mb-4">
        {([['', 'Tất cả'], ['unread', 'Chưa đọc'], ['read', 'Đã đọc']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={cn('px-3 py-1.5 text-xs rounded-lg border transition-colors',
              filter === val ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.id} onClick={() => selectItem(item)}
                    className={cn('p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-start gap-3', selected?.id === item.id ? 'bg-blue-50' : '')}>
                    <div className="mt-0.5 flex-shrink-0">
                      {item.isRead
                        ? <CheckCircle size={16} className="text-green-400" />
                        : <Circle size={16} className="text-blue-500 fill-blue-500" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={cn('font-medium truncate', !item.isRead && 'text-gray-900 font-semibold')}>{item.name}</div>
                      <div className="flex items-center gap-3 mt-0.5">
                        {item.phone && <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={11} />{item.phone}</span>}
                        {item.company && <span className="flex items-center gap-1 text-xs text-gray-500"><Building2 size={11} />{item.company}</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.message}</p>
                    </div>
                    <div className="flex-shrink-0 text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
                  </div>
                ))}
                {items.length === 0 && <div className="text-center py-12 text-gray-400">Không có yêu cầu nào</div>}
              </div>
            </div>
          )}
        </div>

        {selected && (
          <div className="w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{selected.name}</h3>
              <button onClick={() => handleDelete(selected.id)} className="p-1 text-gray-400 hover:text-red-500 rounded"><Trash2 size={14} /></button>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0 flex items-center gap-1"><Phone size={12} />SĐT:</dt><dd className="font-medium">{selected.phone}</dd></div>
              {selected.email && <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0 flex items-center gap-1"><Mail size={12} />Email:</dt><dd className="break-all text-xs">{selected.email}</dd></div>}
              {selected.company && <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0 flex items-center gap-1"><Building2 size={12} />Công ty:</dt><dd>{selected.company}</dd></div>}
              <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0">Ngày:</dt><dd>{new Date(selected.createdAt).toLocaleDateString('vi-VN')}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 leading-relaxed">{selected.message}</p>
            </div>
            <div className="mt-4 pt-4 border-t space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ghi chú nội bộ</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" placeholder="Ghi chú..." />
                <button onClick={() => saveNote(selected.id)} disabled={saving}
                  className="w-full mt-2 py-2 bg-[#1a3a5c] text-white text-sm rounded-lg hover:bg-[#2a5a8c] disabled:opacity-50">
                  {saving ? 'Đang lưu...' : 'Lưu ghi chú'}
                </button>
              </div>
              <button onClick={() => toggleRead(selected.id, !selected.isRead)}
                className={cn('w-full py-2 text-sm rounded-lg border transition-colors',
                  selected.isRead ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100')}>
                {selected.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
