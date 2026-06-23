'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AdminNewsEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [form, setForm] = useState({ titleVi: '', titleEn: '', contentVi: '', contentEn: '', imageUrl: '', metaTitle: '', metaDescription: '', status: 'DRAFT' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id || id === 'new') { setLoading(false); return }
    fetch(`/api/admin/news?id=${id}`).then(r => r.json()).then(d => {
      if (d.post) setForm({ titleVi: d.post.titleVi || '', titleEn: d.post.titleEn || '', contentVi: d.post.contentVi || '', contentEn: d.post.contentEn || '', imageUrl: d.post.imageUrl || '', metaTitle: d.post.metaTitle || '', metaDescription: d.post.metaDescription || '', status: d.post.status || 'DRAFT' })
      setLoading(false)
    })
  }, [id])

  async function handleSave(publish = false) {
    setSaving(true)
    try {
      const payload = { id, ...form, status: publish ? 'PUBLISHED' : form.status, publishedAt: publish ? new Date().toISOString() : undefined }
      const res = await fetch('/api/admin/news', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) router.push('/admin/news')
    } finally { setSaving(false) }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Đang tải...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><Link href="/admin/news" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><ArrowLeft size={18} /></Link><h1 className="text-2xl font-bold text-gray-900">Sửa bài viết</h1></div>
        <div className="flex gap-2">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"><Save size={14} />Lưu nháp</button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50"><Globe size={14} />Xuất bản</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung (VI)</label>
            <textarea value={form.contentVi} onChange={e => setForm(f => ({...f, contentVi: e.target.value}))} rows={16} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none font-mono" />
          </div>
          <div className="bg-white rounded-xl border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content (EN)</label>
            <textarea value={form.contentEn} onChange={e => setForm(f => ({...f, contentEn: e.target.value}))} rows={8} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none font-mono" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">Ảnh đại diện</h3>
            <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="URL ảnh..." />
            {form.imageUrl && <img src={form.imageUrl} alt="" className="w-full aspect-video object-cover rounded-lg" />}
          </div>
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">SEO</h3>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Meta Title</label><input value={form.metaTitle} onChange={e => setForm(f => ({...f, metaTitle: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label><textarea value={form.metaDescription} onChange={e => setForm(f => ({...f, metaDescription: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Trạng thái</h3>
            <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]">
              <option value="DRAFT">Nháp</option>
              <option value="PUBLISHED">Đã đăng</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
