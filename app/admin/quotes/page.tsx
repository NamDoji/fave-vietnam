'use client'

import { useState, useEffect } from 'react'
import { Download, Eye, Search, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface QuoteRequest {
  id: string
  name: string
  phone: string
  email: string | null
  company: string | null
  service: string | null
  message: string
  status: string
  note: string | null
  createdAt: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: 'Mới', color: 'bg-blue-50 text-blue-600' },
  CONTACTED: { label: 'Đã liên hệ', color: 'bg-yellow-50 text-yellow-600' },
  IN_PROGRESS: { label: 'Đang xử lý', color: 'bg-purple-50 text-purple-600' },
  DONE: { label: 'Hoàn thành', color: 'bg-green-50 text-green-600' },
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => { fetchQuotes() }, [filter])

  async function fetchQuotes() {
    setLoading(true)
    try {
      const url = `/api/admin/quotes${filter ? `?status=${filter}` : ''}`
      const res = await fetch(url)
      const data = await res.json()
      setQuotes(data.quotes || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id)
    try {
      await fetch('/api/admin/quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
      await fetchQuotes()
    } finally {
      setUpdatingId(null)
    }
  }

  function exportCsv() {
    const headers = ['Tên', 'Điện thoại', 'Email', 'Công ty', 'Dịch vụ', 'Nội dung', 'Trạng thái', 'Ngày tạo']
    const rows = quotes.map((q) => [q.name, q.phone, q.email || '', q.company || '', q.service || '', q.message, q.status, new Date(q.createdAt).toLocaleDateString('vi-VN')])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `bao-gia-${Date.now()}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = quotes.filter(q => !search || q.name.toLowerCase().includes(search.toLowerCase()) || q.phone.includes(search) || (q.company || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Báo Giá</h1>
          <p className="text-sm text-gray-500 mt-1">{quotes.length} yêu cầu</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
          <Download size={15} /> Xuất CSV
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, SĐT, công ty..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{ value: '', label: 'Tất cả' }, ...Object.entries(STATUS_LABELS).map(([v, l]) => ({ value: v, label: l.label }))].map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all border', filter === f.value ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="space-y-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-32" /><div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-6 bg-gray-100 rounded w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="admin-table-wrapper">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Tên / Điện thoại', 'Dịch vụ', 'Nội dung', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-700">{quote.name}</div>
                        <div className="text-xs text-gray-400">{quote.phone}</div>
                        {quote.company && <div className="text-xs text-gray-400">{quote.company}</div>}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs max-w-[120px] truncate">{quote.service || '—'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{quote.message}</td>
                      <td className="px-4 py-3">
                        <select
                          value={quote.status}
                          onChange={(e) => updateStatus(quote.id, e.target.value)}
                          disabled={updatingId === quote.id}
                          className={cn(
                            'text-xs px-2 py-1 rounded-full appearance-none cursor-pointer border-0 focus:outline-none focus:ring-1 focus:ring-[#00a0e9]',
                            STATUS_LABELS[quote.status]?.color || 'bg-gray-50 text-gray-600'
                          )}
                        >
                          {Object.entries(STATUS_LABELS).map(([v, l]) => (
                            <option key={v} value={v}>{l.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(new Date(quote.createdAt))}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedQuote(quote)} className="p-1.5 text-gray-400 hover:text-[#1a3a5c] hover:bg-gray-100 rounded-lg transition-colors" title="Xem chi tiết">
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6}>
                      <div className="text-center py-16 text-gray-400">
                        <FileText size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Không có báo giá nào'}</p>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedQuote(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-lg text-[#1a3a5c] mb-4">Chi tiết báo giá</h2>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Họ tên', value: selectedQuote.name },
                { label: 'Điện thoại', value: selectedQuote.phone },
                { label: 'Email', value: selectedQuote.email || '—' },
                { label: 'Công ty', value: selectedQuote.company || '—' },
                { label: 'Dịch vụ', value: selectedQuote.service || '—' },
                { label: 'Nội dung', value: selectedQuote.message },
                { label: 'Ngày gửi', value: formatDate(new Date(selectedQuote.createdAt)) },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <dt className="font-medium text-gray-500 w-24 shrink-0">{item.label}:</dt>
                  <dd className="text-gray-700">{item.value}</dd>
                </div>
              ))}
            </dl>
            <button onClick={() => setSelectedQuote(null)} className="mt-5 w-full py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#2a5a8c] transition-colors">Đóng</button>
          </div>
        </div>
      )}
    </div>
  )
}
