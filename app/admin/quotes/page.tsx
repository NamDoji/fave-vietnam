'use client'

import { useState, useEffect } from 'react'
import { Download, Eye, Search, FileText, X, AlertTriangle } from 'lucide-react'
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
  attachmentUrl: string | null
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
  const [modalStatus, setModalStatus] = useState('')
  const [modalNote, setModalNote] = useState('')
  const [savingModal, setSavingModal] = useState(false)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

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

  async function saveModal() {
    if (!selectedQuote) return
    setSavingModal(true)
    try {
      await fetch('/api/admin/quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: selectedQuote.id, status: modalStatus, note: modalNote }) })
      setSelectedQuote(q => q ? { ...q, status: modalStatus, note: modalNote } : null)
      await fetchQuotes()
    } finally {
      setSavingModal(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/quotes?id=${deleteId}`, { method: 'DELETE' })
    if (selectedQuote?.id === deleteId) setSelectedQuote(null)
    setDeleteId(null); setDeleting(false); fetchQuotes()
  }

  function openModal(quote: QuoteRequest) {
    setSelectedQuote(quote)
    setModalStatus(quote.status)
    setModalNote(quote.note || '')
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Báo Giá</h1>
          <p className="text-sm text-gray-500 mt-1">{quotes.length} yêu cầu</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
          <Download size={15} /> Xuất CSV
        </button>
      </div>

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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-32" /><div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-6 bg-gray-100 rounded w-20" />
              </div>
            ))}
          </div>
        ) : (
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
                      <button onClick={() => openModal(quote)} className="p-1.5 text-gray-400 hover:text-[#1a3a5c] hover:bg-gray-100 rounded-lg transition-colors" title="Xem chi tiết">
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
        )}
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedQuote(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-lg text-[#1a3a5c]">Chi tiết báo giá</h2>
                <span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium mt-1', STATUS_LABELS[selectedQuote.status]?.color)}>
                  {STATUS_LABELS[selectedQuote.status]?.label}
                </span>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2.5 text-sm">
                {[
                  { label: 'Họ tên', value: selectedQuote.name },
                  { label: 'Điện thoại', value: selectedQuote.phone },
                  { label: 'Email', value: selectedQuote.email || '—' },
                  { label: 'Công ty', value: selectedQuote.company || '—' },
                  { label: 'Dịch vụ', value: selectedQuote.service || '—' },
                  { label: 'Ngày gửi', value: formatDate(new Date(selectedQuote.createdAt)) },
                ].map(({ label, value }) => (
                  <><dt key={`dt-${label}`} className="text-gray-500 font-medium">{label}</dt><dd key={`dd-${label}`} className="text-gray-700">{value}</dd></>
                ))}
              </dl>
              <div className="pt-3 border-t">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nội dung yêu cầu</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3">{selectedQuote.message}</p>
              </div>
              {selectedQuote.attachmentUrl && (
                <div className="pt-1">
                  <a href={selectedQuote.attachmentUrl} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#0066ff] hover:underline flex items-center gap-1">
                    <FileText size={14} />Xem file đính kèm
                  </a>
                </div>
              )}
              <div className="pt-3 border-t space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cập nhật trạng thái</label>
                  <select value={modalStatus} onChange={e => setModalStatus(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
                    {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ghi chú nội bộ</label>
                  <textarea value={modalNote} onChange={e => setModalNote(e.target.value)} rows={3}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" placeholder="Ghi chú xử lý báo giá..." />
                </div>
              </div>
            </div>
            <div className="p-5 border-t flex gap-2">
              <button onClick={saveModal} disabled={savingModal}
                className="flex-1 py-2 bg-[#1a3a5c] text-white text-sm rounded-lg hover:bg-[#2a5a8c] disabled:opacity-50 transition-colors font-medium">
                {savingModal ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button onClick={() => { setDeleteId(selectedQuote.id); setSelectedQuote(null) }}
                className="py-2 px-3 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                <AlertTriangle size={14} />
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
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá báo giá</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
