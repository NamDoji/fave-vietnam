'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Users, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Recruitment { id: string; titleVi: string; department: string | null; location: string | null; isActive: boolean; deadline: string | null; createdAt: string }

export default function AdminRecruitmentPage() {
  const [items, setItems] = useState<Recruitment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Recruitment | null>(null)
  const [form, setForm] = useState({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', requirementsVi: '', requirementsEn: '', benefitsVi: '', benefitsEn: '', department: '', location: 'Hà Nội', salary: '', deadline: '', isActive: true })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'jobs' | 'applicants'>('jobs')
  const [applicants, setApplicants] = useState<{ id: string; name: string; email: string; phone: string; status: string; createdAt: string; recruitment: { titleVi: string } }[]>([])

  useEffect(() => { fetchItems(); if (tab === 'applicants') fetchApplicants() }, [tab])

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

  function openCreate() { setEditing(null); setForm({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', requirementsVi: '', requirementsEn: '', benefitsVi: '', benefitsEn: '', department: '', location: 'Hà Nội', salary: '', deadline: '', isActive: true }); setShowForm(true) }
  function openEdit(r: Recruitment) { setEditing(r); setForm({ titleVi: r.titleVi, titleEn: '', descriptionVi: '', descriptionEn: '', requirementsVi: '', requirementsEn: '', benefitsVi: '', benefitsEn: '', department: r.department || '', location: r.location || 'Hà Nội', salary: '', deadline: r.deadline ? r.deadline.slice(0, 10) : '', isActive: r.isActive }); setShowForm(true) }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : null }
      if (editing) { await fetch('/api/admin/recruitment', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) }) }
      else { await fetch('/api/admin/recruitment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) }
      setShowForm(false); fetchItems()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá vị trí này?')) return
    await fetch(`/api/admin/recruitment?id=${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Quản lý Tuyển dụng</h1></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] transition-colors text-sm font-medium"><Plus size={16} />Thêm vị trí</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('jobs')} className={cn('px-4 py-2 text-sm rounded-lg border', tab === 'jobs' ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}>Vị trí tuyển dụng ({items.length})</button>
        <button onClick={() => setTab('applicants')} className={cn('flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border', tab === 'applicants' ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-gray-600 hover:bg-gray-50')}><Users size={14} />Hồ sơ ứng viên ({applicants.length})</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b"><h2 className="text-lg font-semibold">{editing ? 'Sửa vị trí' : 'Thêm vị trí mới'}</h2></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Vị trí (VI) *</label><input value={form.titleVi} onChange={e => setForm(f => ({...f, titleVi: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Position (EN)</label><input value={form.titleEn} onChange={e => setForm(f => ({...f, titleEn: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label><input value={form.department} onChange={e => setForm(f => ({...f, department: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label><input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Hạn nộp</label><input type="date" value={form.deadline} onChange={e => setForm(f => ({...f, deadline: e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả công việc (VI)</label><textarea value={form.descriptionVi} onChange={e => setForm(f => ({...f, descriptionVi: e.target.value}))} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu ứng viên (VI)</label><textarea value={form.requirementsVi} onChange={e => setForm(f => ({...f, requirementsVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Quyền lợi (VI)</label><textarea value={form.benefitsVi} onChange={e => setForm(f => ({...f, benefitsVi: e.target.value}))} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="jobActive" checked={form.isActive} onChange={e => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded" /><label htmlFor="jobActive" className="text-sm font-medium text-gray-700">Đang tuyển dụng</label></div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded-lg hover:bg-[#00a0e9] disabled:opacity-50">{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'jobs' ? (
        loading ? <div className="text-center py-12 text-gray-500">Đang tải...</div> : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Vị trí</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Phòng ban</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Hạn nộp</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">Trạng thái</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-20">Thao tác</th>
              </tr></thead>
              <tbody className="divide-y">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><div className="font-medium text-gray-900">{item.titleVi}</div><div className="text-gray-400 text-xs">{item.location}</div></td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{item.department}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{item.deadline ? new Date(item.deadline).toLocaleDateString('vi-VN') : '—'}</td>
                    <td className="px-4 py-3 text-center"><span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500')}>{item.isActive ? 'Đang tuyển' : 'Đã đóng'}</span></td>
                    <td className="px-4 py-3"><div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <div className="text-center py-12 text-gray-400">Chưa có vị trí nào</div>}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Ứng viên</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Vị trí</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Ngày nộp</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">Trạng thái</th>
            </tr></thead>
            <tbody className="divide-y">
              {applicants.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{a.name}</div><div className="text-gray-400 text-xs">{a.email} · {a.phone}</div></td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{a.recruitment?.titleVi}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{new Date(a.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-center"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {applicants.length === 0 && <div className="text-center py-12 text-gray-400">Chưa có hồ sơ nào</div>}
        </div>
      )}
    </div>
  )
}
