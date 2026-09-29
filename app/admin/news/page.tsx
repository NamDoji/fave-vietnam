'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, FileText, Globe, Search, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NewsPost { id: string; titleVi: string; slug: string; status: string; publishedAt: string | null; createdAt: string; viewCount: number }

const STATUS_MAP: Record<string, string> = { DRAFT: 'Nháp', PUBLISHED: 'Đã đăng' }

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [filter])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch(`/api/admin/news${filter ? `?status=${filter}` : ''}`)
    const d = await res.json()
    setItems(d.posts || [])
    setLoading(false)
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/news?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    setDeleting(false)
    fetchItems()
  }

  async function togglePublish(item: NewsPost) {
    const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await fetch('/api/admin/news', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, status: newStatus, publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : null }) })
    fetchItems()
  }

  const filtered = items.filter(i => !search || i.titleVi.toLowerCase().includes(search.toLowerCase()) || i.slug.includes(search.toLowerCase()))

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tin tức</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} bài viết</p>
        </div>
        <Link href="/admin/news/new" className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium">
          <Plus size={16} />Viết bài mới
        </Link>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề, slug..."
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['', 'PUBLISHED', 'DRAFT'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn('px-3 py-1.5 text-sm rounded-lg border transition-colors', filter === s ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>
              {s === '' ? 'Tất cả' : STATUS_MAP[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse">
              <div className="h-4 bg-gray-100 rounded flex-1" />
              <div className="h-4 bg-gray-100 rounded w-20" />
              <div className="h-6 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="admin-table-wrapper">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tiêu đề</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Slug</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Lượt xem</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Trạng thái</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 line-clamp-1">{item.titleVi}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('vi-VN') : new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell font-mono text-xs max-w-[160px] truncate">{item.slug}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{item.viewCount}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex px-2.5 py-1 rounded-full text-xs font-medium', item.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700')}>
                        {STATUS_MAP[item.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => togglePublish(item)} className={cn('p-1.5 rounded transition-colors', item.status === 'PUBLISHED' ? 'text-green-500 hover:text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50')} title={item.status === 'PUBLISHED' ? 'Chuyển về nháp' : 'Xuất bản'}><Globe size={14} /></button>
                        <Link href={`/admin/news/${item.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Chỉnh sửa"><Pencil size={14} /></Link>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xoá"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có bài viết nào'}</p>
              {!search && <Link href="/admin/news/new" className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Viết bài đầu tiên</Link>}
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Xác nhận xoá</h3>
                <p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50">
                {deleting ? 'Đang xoá...' : 'Xoá'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
