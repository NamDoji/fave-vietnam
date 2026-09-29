'use client'
import { useState, useEffect, useRef } from 'react'
import { Save, RefreshCw, AlertTriangle, Upload } from 'lucide-react'

interface SettingField { key: string; label: string; type: string; placeholder?: string; upload?: boolean }
interface SettingGroup { key: string; label: string; fields: SettingField[] }

const SETTING_GROUPS: SettingGroup[] = [
  { key: 'company', label: 'Thông tin công ty', fields: [
    { key: 'company_name', label: 'Tên công ty', type: 'text', placeholder: 'FAVE Việt Nam' },
    { key: 'company_name_en', label: 'Company name (EN)', type: 'text', placeholder: 'FAVE Vietnam' },
    { key: 'tagline_vi', label: 'Slogan (VI)', type: 'text', placeholder: 'Chuyên Nghiệp - Tin Cậy - Đúng Hạn' },
    { key: 'tagline_en', label: 'Tagline (EN)', type: 'text', placeholder: 'Professional - Reliable - On Time' },
    { key: 'hotline', label: 'Hotline', type: 'text', placeholder: '0981907109' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Favevietnam@gmail.com' },
    { key: 'address_vi', label: 'Địa chỉ (VI)', type: 'text', placeholder: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội' },
    { key: 'address_en', label: 'Address (EN)', type: 'text', placeholder: '348 Buoi Street, Nghia Do, Ba Dinh, Hanoi' },
  ]},
  { key: 'social', label: 'Mạng xã hội & liên kết', fields: [
    { key: 'facebook_url', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/favevietnam' },
    { key: 'zalo_url', label: 'Zalo URL', type: 'url', placeholder: 'https://zalo.me/0981907109' },
    { key: 'youtube_url', label: 'YouTube URL', type: 'url' },
    { key: 'maps_embed', label: 'Google Maps Embed URL', type: 'url', placeholder: 'https://maps.google.com/maps?...' },
  ]},
  { key: 'seo', label: 'SEO mặc định', fields: [
    { key: 'meta_title', label: 'Meta Title mặc định', type: 'text', placeholder: 'FAVE Việt Nam - Dịch vụ HVAC chuyên nghiệp' },
    { key: 'meta_description', label: 'Meta Description mặc định', type: 'textarea', placeholder: 'FAVE Việt Nam cung cấp dịch vụ bảo trì, sửa chữa, lắp đặt hệ thống HVAC...' },
    { key: 'ga_id', label: 'Google Analytics ID', type: 'text', placeholder: 'G-XXXXXXXXXX' },
    { key: 'gsc_verification', label: 'Google Search Console verification', type: 'text' },
  ]},
  { key: 'media', label: 'Logo & Media', fields: [
    { key: 'logo_url', label: 'URL Logo', type: 'url', upload: true },
    { key: 'favicon_url', label: 'URL Favicon', type: 'url', upload: true },
    { key: 'og_image_url', label: 'OG Image URL (Social Share)', type: 'url', upload: true },
  ]},
  { key: 'stats', label: 'Số liệu thống kê (hiển thị trên website)', fields: [
    { key: 'stat_years', label: 'Số năm kinh nghiệm', type: 'text', placeholder: '10+' },
    { key: 'stat_projects', label: 'Số dự án hoàn thành', type: 'text', placeholder: '500+' },
    { key: 'stat_engineers', label: 'Số kỹ sư / kỹ thuật viên', type: 'text', placeholder: '100+' },
    { key: 'stat_clients', label: 'Số khách hàng trung thành', type: 'text', placeholder: '50+' },
  ]},
  { key: 'about', label: 'Trang Giới thiệu', fields: [
    { key: 'about_intro_vi', label: 'Đoạn giới thiệu (VI)', type: 'textarea', placeholder: 'Với hơn 10 năm kinh nghiệm (từ 2016)...' },
    { key: 'about_strengths', label: 'Điểm mạnh (mỗi dòng một điểm)', type: 'textarea', placeholder: 'Đại lý ủy quyền chính thức Daikin & Carrier\nChứng chỉ ISO 9001:2015...' },
  ]},
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<string[]>([])
  const [showSeedConfirm, setShowSeedConfirm] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const uploadRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => { fetchSettings() }, [])

  async function fetchSettings() {
    setLoading(true)
    const res = await fetch('/api/admin/settings')
    const d = await res.json()
    const map: Record<string, string> = {}
    if (d.settings) d.settings.forEach((s: { key: string; value: unknown }) => { map[s.key] = typeof s.value === 'string' ? s.value : JSON.stringify(s.value) })
    setSettings(map)
    setLoading(false)
  }

  async function handleUploadMedia(file: File, fieldKey: string) {
    setUploading(fieldKey)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (d.url) setSettings(s => ({ ...s, [fieldKey]: d.url }))
    } finally { setUploading(null) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  async function handleSeed() {
    setShowSeedConfirm(false)
    setSeeding(true)
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const d = await res.json()
      setSeedResult(d.results || [d.error || 'Done'])
    } finally { setSeeding(false) }
  }

  if (loading) return <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-xl border overflow-hidden animate-pulse"><div className="px-6 py-4 border-b bg-gray-50 h-14" /><div className="p-6 grid grid-cols-2 gap-4">{[...Array(4)].map((_, j) => <div key={j} className="h-16"><div className="h-3 bg-gray-100 rounded mb-2 w-24" /><div className="h-9 bg-gray-100 rounded" /></div>)}</div></div>)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Cài đặt website</h1><p className="text-sm text-gray-500 mt-1">Quản lý thông tin chung, SEO và cấu hình</p></div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#0066ff] disabled:opacity-50 text-sm font-medium">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Đã lưu!' : saving ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>

      {/* Seed Data */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
          <div><h2 className="font-semibold text-gray-800">Dữ liệu mẫu</h2><p className="text-xs text-gray-500 mt-0.5">Tạo sử data ban đầu nếu DB chưa có nội dung</p></div>
          <button onClick={() => setShowSeedConfirm(true)} disabled={seeding} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
            {seeding ? 'Đang seed...' : '🌱 Seed dữ liệu'}
          </button>
        </div>
        {seedResult.length > 0 && <div className="p-4 space-y-1">{seedResult.map((r, i) => <div key={i} className="text-sm text-gray-700">{r}</div>)}</div>}
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map(group => (
          <div key={group.key} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold text-gray-800">{group.label}</h2></div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(field => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea value={settings[field.key] || ''} onChange={e => setSettings(s => ({...s, [field.key]: e.target.value}))} rows={3} placeholder={field.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] resize-none" />
                  ) : field.upload ? (
                    <div>
                      <div className="flex gap-2">
                        <input type={field.type} value={settings[field.key] || ''} onChange={e => setSettings(s => ({...s, [field.key]: e.target.value}))} placeholder={field.placeholder} className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff] min-w-0" />
                        <input
                          ref={el => { uploadRefs.current[field.key] = el }}
                          type="file" accept="image/*" className="hidden"
                          onChange={e => e.target.files?.[0] && handleUploadMedia(e.target.files[0], field.key)}
                        />
                        <button
                          onClick={() => uploadRefs.current[field.key]?.click()}
                          disabled={uploading === field.key}
                          className="flex items-center gap-1 px-3 py-2 border rounded-lg text-xs text-gray-600 hover:bg-gray-50 flex-shrink-0 disabled:opacity-50"
                        >
                          {uploading === field.key ? <span className="animate-spin text-sm">⟳</span> : <Upload size={13} />}Chọn
                        </button>
                      </div>
                      {settings[field.key] && (
                        <div className="mt-2 inline-flex border rounded-lg p-1.5 bg-gray-50">
                          <img src={settings[field.key]} alt="" className="h-8 object-contain" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <input type={field.type} value={settings[field.key] || ''} onChange={e => setSettings(s => ({...s, [field.key]: e.target.value}))} placeholder={field.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0066ff]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSeedConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-yellow-500" /></div>
              <div><h3 className="font-semibold text-gray-900">Xác nhận Seed dữ liệu</h3><p className="text-sm text-gray-500">Sẽ tạo thêm dữ liệu mẫu nếu chưa có trong DB.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowSeedConfirm(false)} className="flex-1 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSeed} className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Tiếp tục Seed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
