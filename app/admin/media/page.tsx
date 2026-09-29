'use client'
import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, Copy, Image as ImageIcon, FileText, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaItem { id: string; filename: string; url: string; mimeType: string; size: number; altText: string | null; createdAt: string }

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/upload?list=1')
      const d = await res.json()
      setItems(d.media || [])
    } catch { setItems([]) }
    setLoading(false)
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        await fetch('/api/admin/upload', { method: 'POST', body: fd })
      }
      fetchItems()
    } finally { setUploading(false) }
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Thư viện Media</h1><p className="text-sm text-gray-500 mt-1">{items.length} files</p></div>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] disabled:opacity-50 text-sm font-medium">
          <Upload size={16} />{uploading ? 'Đang tải...' : 'Upload file'}
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e => handleUpload(e.target.files)} />
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 text-center hover:border-[#00a0e9] transition-colors cursor-pointer" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files) }}>
        <Upload size={24} className="mx-auto text-gray-300 mb-2" />
        <p className="text-sm text-gray-500">Kéo thả hoặc click để upload ảnh, PDF</p>
        <p className="text-xs text-gray-400 mt-1">Hỗ trợ JPG, PNG, WebP, PDF</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-xl border overflow-hidden animate-pulse"><div className="w-full aspect-square bg-gray-100" /><div className="p-2"><div className="h-3 bg-gray-100 rounded mb-1" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border overflow-hidden group relative">
              {isImage(item.mimeType) ? (
                <img src={item.url} alt={item.altText || item.filename} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center"><FileText size={32} className="text-gray-400" /></div>
              )}
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate font-medium">{item.filename}</p>
                <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(item.url)} className={cn('p-2 rounded-lg text-white transition-colors', copied === item.url ? 'bg-green-500' : 'bg-white/20 hover:bg-white/30')} title="Copy URL">
                  <Copy size={14} />
                </button>
                <button onClick={() => setDeleteId(item.id)} className="p-2 rounded-lg bg-white/20 hover:bg-red-500 text-white" title="Xoá">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-center py-16 text-gray-400"><ImageIcon size={40} className="mx-auto mb-3 opacity-20" /><p className="font-medium">Chưa có file nào</p></div>}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá file</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
