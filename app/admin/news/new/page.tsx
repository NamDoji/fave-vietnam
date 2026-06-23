'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AdminNewsNewPage() {
  const router = useRouter()
  const [form, setForm] = useState({ titleVi: '', titleEn: '', contentVi: '', contentEn: '', imageUrl: '', metaTitle: '', metaDescription: '', status: 'DRAFT' })
  const [saving, setSaving] = useState(false)

  async function handleSave(publish = false) {
    setSaving(true)
    try {
      const payload = { ...form, status: publish ? 'PUBLISHED' : form.status, publishedAt: publish ? new Date().toISOString() : null }
      const res = await fetch('/api/admin/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) router.push('/admin/news')
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><Link href="/admin/news" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><ArrowLeft size={18} /></Link><h1 className="text-2xl font-bold text-gray-900">Bài viết mới</h1></div>
        <div className="flex gap-2">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"><Save size={14} />Lưu nháp</button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50"><Globe size={14} />Xuất bản</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề (Tiếng Việt) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="Nhập tiêu đề bài viết..." /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="Enter article title..." /></div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung (Tiếng Việt)</label>
            <textarea value={form.contentVi} onChange={e => setForm(f => ({...f, contentVi: e.target.value}))} rows={16} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none font-mono" placeholder="Nhập nội dung bài viết... (hỗ trợ HTML)" />
          </div>

          <div className="bg-white rounded-xl border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content (English)</label>
            <textarea value={form.contentEn} onChange={e => setForm(f => ({...f, contentEn: e.target.value}))} rows={8} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none font-mono" placeholder="Enter article content..." />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">Ảnh đại diện</h3>
            <div><input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="URL ảnh..." /></div>
            {form.imageUrl && <img src={form.imageUrl} alt="" className="w-full aspect-video object-cover rounded-lg" />}
          </div>

          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">SEO</h3>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Meta Title</label><input value={form.metaTitle} onChange={e => setForm(f => ({...f, metaTitle: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="Để trống = dùng tiêu đề bài" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label><textarea value={form.metaDescription} onChange={e => setForm(f => ({...f, metaDescription: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" placeholder="Mô tả ngắn cho Google (~150 ký tự)" /><p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160</p></div>
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
