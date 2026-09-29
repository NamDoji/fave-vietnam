'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, Trash2, Copy, Image as ImageIcon, FileText, AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaItem { id: string; filename: string; url: string; mimeType: string; size: number; alt: string | null; createdAt: string }
interface UploadProgress { name: string; status: 'uploading' | 'done' | 'error' }

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const PAGE_SIZE = 24

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<UploadProgress[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [page, setPage] = useState(1)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/upload?list=1')
      const d = await res.json()
      setItems(d.media || [])
    } catch { setItems([]) }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    const fileArr = Array.from(files)
    setProgress(fileArr.map(f => ({ name: f.name, status: 'uploading' })))
    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i]
      try {
        const fd = new FormData()
        fd.append('file', file)
        await fetch('/api/admin/upload', { method: 'POST', body: fd })
        setProgress(p => p.map((x, idx) => idx === i ? { ...x, status: 'done' } : x))
      } catch {
        setProgress(p => p.map((x, idx) => idx === i ? { ...x, status: 'error' } : x))
      }
    }
    await fetchItems()
    setTimeout(() => setProgress([]), 2000)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/upload?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 1500)
  }

  const isImage = (mime: string) => mime.startsWith('image/')
  const paged = items.slice(0, page * PAGE_SIZE)
  const hasMore = paged.length < items.length
  const uploading = progress.some(p => p.status === 'uploading')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thư viện Media</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} files</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchItems} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Làm mới">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] disabled:opacity-50 text-sm font-medium transition-colors">
            <Upload size={16} />{uploading ? 'Đang tải...' : 'Upload'}
          </button>
        </div>
        <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e => handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 text-center hover:border-[#00a0e9] hover:bg-blue-50/30 transition-colors cursor-pointer"
        onClick={() => fileRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files) }}
      >
        <Upload size={28} className="mx-auto text-gray-300 mb-2" />
        <p className="text-sm text-gray-500 font-medium">Kéo thả hoặc click để upload</p>
        <p className="text-xs text-gray-400 mt-1">Hỗ trợ JPG, PNG, WebP, SVG, PDF — nhiều file cùng lúc</p>
      </div>

      {/* Upload progress */}
      {progress.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Đang tải lên</p>
          {progress.map((p, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              {p.status === 'uploading' && <RefreshCw size={14} className="text-blue-500 animate-spin flex-shrink-0" />}
              {p.status === 'done' && <Check size={14} className="text-green-500 flex-shrink-0" />}
              {p.status === 'error' && <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />}
              <span className={cn('truncate', p.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-700')}>{p.name}</span>
              <span className={cn('ml-auto text-xs font-medium flex-shrink-0',
                p.status === 'uploading' ? 'text-blue-500' : p.status === 'done' ? 'text-green-500' : 'text-red-500')}>
                {p.status === 'uploading' ? 'Đang tải...' : p.status === 'done' ? 'Xong' : 'Lỗi'}
              </span>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border overflow-hidden animate-pulse">
              <div className="w-full aspect-square bg-gray-100" />
              <div className="p-2"><div className="h-3 bg-gray-100 rounded mb-1" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {paged.map(item => (
              <div key={item.id} className="bg-white rounded-xl border overflow-hidden group relative">
                {isImage(item.mimeType) ? (
                  <img src={item.url} alt={item.alt || item.filename} className="w-full aspect-square object-cover" loading="lazy" />
                ) : (
                  <div className="w-full aspect-square bg-gray-50 flex flex-col items-center justify-center gap-1">
                    <FileText size={32} className="text-gray-300" />
                    <span className="text-xs text-gray-400 uppercase">{item.mimeType.split('/')[1]}</span>
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs text-gray-700 truncate font-medium" title={item.filename}>{item.filename}</p>
                  <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(item.url)}
                    className={cn('p-2 rounded-lg text-white transition-colors', copied === item.url ? 'bg-green-500' : 'bg-white/20 hover:bg-white/40')}
                    title="Copy URL">
                    {copied === item.url ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-2 rounded-lg bg-white/20 hover:bg-red-500 text-white transition-colors" title="Xoá">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">Chưa có file nào</p>
              <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Upload size={14} />Upload file đầu tiên</button>
            </div>
          )}

          {hasMore && (
            <div className="mt-6 text-center">
              <button onClick={() => setPage(p => p + 1)}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
                Xem thêm ({items.length - paged.length} file còn lại)
              </button>
            </div>
          )}
        </>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá file</h3><p className="text-sm text-gray-500">File sẽ bị xoá khỏi storage.</p></div>
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
