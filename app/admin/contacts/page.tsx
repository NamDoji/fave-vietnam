'use client'
import { useState, useEffect } from 'react'
import { Mail, Phone, Building2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactRequest { id: string; name: string; phone: string; email: string | null; company: string | null; message: string; status: string; createdAt: string }

const STATUS = { NEW: { label: 'Mới', color: 'bg-blue-50 text-blue-600' }, CONTACTED: { label: 'Đã liên hệ', color: 'bg-yellow-50 text-yellow-600' }, IN_PROGRESS: { label: 'Đang xử lý', color: 'bg-purple-50 text-purple-600' }, DONE: { label: 'Hoàn thành', color: 'bg-green-50 text-green-600' } }

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactRequest | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => { fetchItems() }, [filter])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch(`/api/admin/contacts${filter ? `?status=${filter}` : ''}`)
    const d = await res.json()
    setItems(d.contacts || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetchItems()
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Liên hệ & Báo giá</h1><p className="text-sm text-gray-500 mt-1">{items.length} yêu cầu</p></div>
      </div>

      <div className="flex gap-2 mb-4">
        {['', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'DONE'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={cn('px-3 py-1.5 text-xs rounded-lg border transition-colors', filter === s ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>
            {s === '' ? 'Tất cả' : STATUS[s as keyof typeof STATUS]?.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.id} onClick={() => setSelected(item)} className={cn('p-4 cursor-pointer hover:bg-gray-50 transition-colors', selected?.id === item.id ? 'bg-blue-50' : '')}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{item.name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          {item.phone && <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={11} />{item.phone}</span>}
                          {item.company && <span className="flex items-center gap-1 text-xs text-gray-500"><Building2 size={11} />{item.company}</span>}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <span className={cn('flex-shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium', STATUS[item.status as keyof typeof STATUS]?.color)}>
                        {STATUS[item.status as keyof typeof STATUS]?.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.message}</p>
                  </div>
                ))}
                {items.length === 0 && <div className="text-center py-12 text-gray-400">Không có yêu cầu nào</div>}
              </div>
            </div>
          )}
        </div>

        {selected && (
          <div className="w-80 bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">{selected.name}</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0">SĐT:</dt><dd className="font-medium">{selected.phone}</dd></div>
              {selected.email && <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0">Email:</dt><dd className="break-all">{selected.email}</dd></div>}
              {selected.company && <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0">Công ty:</dt><dd>{selected.company}</dd></div>}
              <div className="flex gap-2"><dt className="text-gray-500 w-20 flex-shrink-0">Ngày:</dt><dd>{new Date(selected.createdAt).toLocaleDateString('vi-VN')}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 leading-relaxed">{selected.message}</p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <label className="block text-xs font-medium text-gray-600 mb-2">Cập nhật trạng thái</label>
              <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
                {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
