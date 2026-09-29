'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Users, Briefcase, Search, AlertTriangle, Loader2, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Recruitment {
  id: string; titleVi: string; titleEn: string; location: string | null; salary: string | null
  experience: string | null; isActive: boolean; deadline: string | null; createdAt: string
  _count?: { applicants: number }
}

const EMPTY = {
  titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '',
  contentVi: '', contentEn: '',
  location: 'Hà Nội', salary: '', experience: '', deadline: '', isActive: true
}

export default function AdminRecruitmentPage() {
  const [items, setItems] = useState<Recruitment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Recruitment | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'jobs' | 'applicants'>('jobs')
  const [applicants, setApplicants] = useState<{ id: string; name: string; email: string; phone: string; status: string; createdAt: string; recruitment?: { titleVi: string } }[]>([])
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchItems() }, [])
  useEffect(() => { if (tab === 'applicants') fetchApplicants() }, [tab])

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/admin/recruitment')
    const d = await res.json()
    setItems(d.jobs || [])
    setLoading(false)
  }

  async function fetchApplicants() {
    const res = await fetch('/api/admin/applicants')
    const d = await res.json()
    setApplicants(d.applicants || [])
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY })
    setShowForm(true)
  }

  function openEdit(r: Recruitment & { descriptionVi?: string; contentVi?: string }) {
    setEditing(r)
    setForm({
      titleVi: r.titleVi, titleEn: r.titleEn || '',
      descriptionVi: (r as any).descriptionVi || '', descriptionEn: (r as any).descriptionEn || '',
      contentVi: (r as any).contentVi || '', contentEn: (r as any).contentEn || '',
      location: r.location || 'Hà Nội',
      salary: r.salary || '',
      experience: r.experience || '',
      deadline: r.deadline ? r.deadline.slice(0, 10) : '',
      isActive: r.isActive
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : null }
      if (editing) {
        await fetch('/api/admin/recruitment', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
      } else {
        await fetch('/api/admin/recruitment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function toggleActive(item: Recruitment) {
    await fetch('/api/admin/recruitment', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) })
    fetchItems()
  }

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/recruitment?id=${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); setDeleting(false); fetchItems()
  }

  const filteredJobs = items.filter(i => !search || i.titleVi.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tuyển dụng</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} vị trí · {applicants.length} hồ sơ</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] transition-colors text-sm font-medium"><Plus size={16} />Thêm vị trí</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('jobs')} className={cn('flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border transition-colors', tab === 'jobs' ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}><Briefcase size={14} />Vị trí ({items.length})</button>
        <button onClick={() => setTab('applicants')} className={cn('flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border transition-colors', tab === 'applicants' ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}><Users size={14} />Ứng viên ({applicants.length})</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo vị trí..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? 'Sửa vị trí' : 'Thêm vị trí mới'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Vị trí (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Position (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Địa điểm</label><input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Mức lương</label><input value={form.salary} onChange={e => setForm(f => ({...f, salary: e.target.value}))} placeholder="VD: 15-20 triệu" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Hạn nộp</label><input type="date" value={form.deadline} onChange={e => setForm(f => ({...f, deadline: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Kinh nghiệm yêu cầu</label><input value={form.experience} onChange={e => setForm(f => ({...f, experience: e.target.value}))} placeholder="VD: 2-3 năm, Không yêu cầu" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Mô tả công việc (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Job description (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm(f => ({...f, descriptionEn: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" /></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nội dung chi tiết (VI) — yêu cầu, quyền lợi</label>
                <textarea value={form.contentVi} onChange={e => setForm(f => ({...f, contentVi: e.target.value}))} rows={8} placeholder="Nhập yêu cầu ứng viên, quyền lợi, mô tả chi tiết..." className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y" style={{minHeight: 150}} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Detailed content (EN)</label>
                <textarea value={form.contentEn} onChange={e => setForm(f => ({...f, contentEn: e.target.value}))} rows={6} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-y" style={{minHeight: 120}} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><span className="text-sm font-medium text-gray-700">Đang tuyển dụng</span></label>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving || !form.titleVi} className="px-5 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#0066ff] disabled:opacity-50 font-medium">
                {saving ? <><Loader2 size={14} className="inline animate-spin mr-1" />Đang lưu...</> : (editing ? 'Cập nhật' : 'Lưu')}
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'jobs' ? (
        <>
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border">
              {[...Array(3)].map((_, i) => (<div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0 animate-pulse"><div className="h-4 bg-gray-100 rounded flex-1" /><div className="h-6 bg-gray-100 rounded w-20" /></div>))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Vị trí</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Địa điểm</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Hạn nộp</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-20">Hồ sơ</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24">Trạng thái</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredJobs.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.titleVi}</div><div className="text-gray-400 text-xs">{item.titleEn}</div></td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{item.location}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{item.deadline ? new Date(item.deadline).toLocaleDateString('vi-VN') : '—'}</td>
                      <td className="px-4 py-3 text-center text-gray-600 font-medium">{item._count?.applicants ?? 0}</td>
                      <td className="px-4 py-3 text-center"><span className={cn('inline-flex px-2.5 py-1 rounded-full text-xs font-medium', item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500')}>{item.isActive ? 'Đang tuyển' : 'Đóng'}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => toggleActive(item)} className="p-1.5 text-gray-400 hover:text-yellow-500 rounded transition-colors">{item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                          <button onClick={() => openEdit(item as any)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Pencil size={14} /></button>
                          <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredJobs.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Briefcase size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="font-medium">{search ? 'Không tìm thấy kết quả' : 'Chưa có vị trí nào'}</p>
                  {!search && <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-sm text-[#1a3a5c] hover:underline"><Plus size={14} />Thêm vị trí đầu tiên</button>}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Ứng viên</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Vị trí ứng tuyển</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Ngày nộp</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applicants.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{a.name}</div><div className="text-gray-400 text-xs">{a.email} · {a.phone}</div></td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{a.recruitment?.titleVi || '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{new Date(a.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-center"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {applicants.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">Chưa có hồ sơ ứng tuyển</p>
            </div>
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận xoá vị trí</h3><p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p></div>
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
