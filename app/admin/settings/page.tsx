'use client'
import { useState, useEffect } from 'react'
import { Save, RefreshCw } from 'lucide-react'

interface SettingGroup { key: string; label: string; fields: { key: string; label: string; type: string; placeholder?: string }[] }

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
    { key: 'logo_url', label: 'URL Logo', type: 'url' },
    { key: 'favicon_url', label: 'URL Favicon', type: 'url' },
    { key: 'og_image_url', label: 'OG Image URL (Social Share)', type: 'url' },
  ]},
  { key: 'stats', label: 'Số liệu thống kê (hiển thị trên website)', fields: [
    { key: 'stat_years', label: 'Số năm kinh nghiệm', type: 'text', placeholder: '15+' },
    { key: 'stat_projects', label: 'Số dự án hoàn thành', type: 'text', placeholder: '500+' },
    { key: 'stat_engineers', label: 'Số kỹ sư / kỹ thuật viên', type: 'text', placeholder: '100+' },
    { key: 'stat_clients', label: 'Số khách hàng trung thành', type: 'text', placeholder: '50+' },
  ]},
  { key: 'about', label: 'Trang Giới thiệu', fields: [
    { key: 'about_intro_vi', label: 'Đoạn giới thiệu (VI)', type: 'textarea', placeholder: 'Với 15 năm kinh nghiệm...' },
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

  async function handleSeed() {
    if (!confirm('Seed dữ liệu mẫu vào database? Sẽ tạo thêm nếu chưa có.')) return
    setSeeding(true)
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const d = await res.json()
      setSeedResult(d.results || [d.error || 'Done'])
    } finally { setSeeding(false) }
  }

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

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Đang tải...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Cài đặt website</h1><p className="text-sm text-gray-500 mt-1">Quản lý thông tin chung, SEO và cấu hình</p></div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 rounded-lg hover:bg-[#00a0e9] disabled:opacity-50 text-sm font-medium">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Đã lưu!' : saving ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>

      {/* Seed Data */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
          <div><h2 className="font-semibold text-gray-800">Dữ liệu mẫu</h2><p className="text-xs text-gray-500 mt-0.5">Tạo sử data ban đầu nếu DB chưa có nội dung</p></div>
          <button onClick={handleSeed} disabled={seeding} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
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
                    <textarea value={settings[field.key] || ''} onChange={e => setSettings(s => ({...s, [field.key]: e.target.value}))} rows={3} placeholder={field.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" />
                  ) : (
                    <input type={field.type} value={settings[field.key] || ''} onChange={e => setSettings(s => ({...s, [field.key]: e.target.value}))} placeholder={field.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a0e9]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
