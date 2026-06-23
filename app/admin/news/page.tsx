'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, FileText, Globe } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NewsPost { id: string; titleVi: string; slug: string; status: string; publishedAt: string | null; createdAt: string; viewCount: number }

const STATUS_MAP: Record<string, string> = { DRAFT: 'Nháp', PUBLISHED: 'Đã đăng' }

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => { fetchItems() }, [filter])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch(`/api/admin/news${filter ? `?status=${filter}` : ''}`)
    const d = await res.json()
    setItems(d.posts || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá bài viết này?')) return
    await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  async function togglePublish(item: NewsPost) {
    const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await fetch('/api/admin/news', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, status: newStatus, publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : null }) })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Quản lý Tin tức</h1><p className="text-sm text-gray-500 mt-1">{items.length} bài viết</p></div>
        <Link href="/admin/news/new" className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium"><Plus size={16} />Viết bài mới</Link>
      </div>

      <div className="flex gap-2 mb-4">
        {['', 'PUBLISHED', 'DRAFT'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={cn('px-3 py-1.5 text-sm rounded-lg border transition-colors', filter === s ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>
            {s === '' ? 'Tất cả' : STATUS_MAP[s]}
          </button>
        ))}
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tiêu đề</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-20">Lượt xem</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">Trạng thái</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-28">Thao tác</th>
            </tr></thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="font-medium text-gray-900 line-clamp-1">{item.titleVi}</div><div className="text-gray-400 text-xs">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('vi-VN') : new Date(item.createdAt).toLocaleDateString('vi-VN')}</div></td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell font-mono text-xs max-w-[160px] truncate">{item.slug}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.viewCount}</td>
                  <td className="px-4 py-3 text-center"><span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', item.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700')}>{STATUS_MAP[item.status]}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center justify-end gap-1">
                    <button onClick={() => togglePublish(item)} className={cn('p-1.5 rounded', item.status === 'PUBLISHED' ? 'text-green-500 hover:text-yellow-500' : 'text-gray-400 hover:text-green-500')} title={item.status === 'PUBLISHED' ? 'Chuyển về nháp' : 'Xuất bản'}><Globe size={14} /></button>
                    <Link href={`/admin/news/${item.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></Link>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-gray-400"><FileText size={32} className="mx-auto mb-2 opacity-30" /><p>Chưa có bài viết nào</p></div>}
        </div>
      )}
    </div>
  )
}
