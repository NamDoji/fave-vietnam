'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CapabilityProfile {
  id: string
  titleVi: string
  titleEn: string
  contentVi: string
  contentEn: string
  fileUrl: string | null
  version: string | null
  isActive: boolean
}

const EMPTY = { titleVi: '', titleEn: '', contentVi: '', contentEn: '', fileUrl: '', version: '', isActive: true }

export default function CapabilitiesPage() {
  const [items, setItems] = useState<CapabilityProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<CapabilityProfile | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/capabilities')
    const d = await res.json()
    setItems(d.profiles || [])
    setLoading(false)
  }

  function openCreate() { setEditing(null); setForm({ ...EMPTY }); setShowForm(true) }
  function openEdit(item: CapabilityProfile) {
    setEditing(item)
    setForm({ titleVi: item.titleVi, titleEn: item.titleEn, contentVi: item.contentVi, contentEn: item.contentEn, fileUrl: item.fileUrl || '', version: item.version || '', isActive: item.isActive })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const method = editing ? 'PATCH' : 'POST'
      const payload = editing ? { id: editing.id, ...form } : form
      await fetch('/api/admin/capabilities', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá hồ sơ năng lực này?')) return
    await fetch(`/api/admin/capabilities?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  async function toggleActive(item: CapabilityProfile) {
    await fetch('/api/admin/capabilities', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ Năng lực</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} hồ sơ</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] text-sm font-medium">
          <Plus size={16} />Thêm hồ sơ
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={cn('bg-white rounded-xl border p-5', !item.isActive && 'opacity-60')}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#00a0e9]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900">{item.titleVi}</div>
                    <div className="text-sm text-gray-400">{item.titleEn}</div>
                    {item.version && <span className="inline-flex mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">v{item.version}</span>}
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.contentVi}</p>
                    {item.fileUrl && (
                      <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#00a0e9] hover:underline mt-1">
                        <FileText size={12} />Tải hồ sơ
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggleActive(item)} className={cn('p-1.5 rounded', item.isActive ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-green-500')} title={item.isActive ? 'Ẩn' : 'Hiện'}>
                    {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText size={32} className="mx-auto mb-2 opacity-30" />
              <p>Chưa có hồ sơ năng lực nào</p>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="font-bold text-lg">{editing ? 'Sửa hồ sơ năng lực' : 'Thêm hồ sơ năng lực'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({ ...f, titleVi: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tiêu đề (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Nội dung (VI)</label><textarea value={form.contentVi} onChange={e => setForm(f => ({ ...f, contentVi: e.target.value }))} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Nội dung (EN)</label><textarea value={form.contentEn} onChange={e => setForm(f => ({ ...f, contentEn: e.target.value }))} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">URL File PDF</label><input value={form.fileUrl} onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="https://..." /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Phiên bản</label><input value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" placeholder="2024" /></div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" /><span>Hiển thị</span></label>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.titleVi} className="px-4 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-medium hover:bg-[#00a0e9] disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
