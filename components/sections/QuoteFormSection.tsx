'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, Building2, MessageSquare, CheckCircle2, AlertCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  service: string
  message: string
}

const FALLBACK_SERVICES_OPTIONS = [
  'Điều hòa trung tâm (Chiller)',
  'Thông gió công nghiệp',
  'Hệ thống lạnh công nghiệp',
  'VRV/VRF',
  'Xử lý không khí sạch',
  'Bảo trì bảo dưỡng',
  'Tư vấn thiết kế',
  'Hệ thống BMS/IBMS',
  'Khác',
]

const GUARANTEES = [
  { icon: Clock, text: 'Báo giá trong 24h làm việc', color: '#0066ff' },
  { icon: Users, text: 'Tư vấn kỹ thuật miễn phí', color: '#0099cc' },
  { icon: Shield, text: 'Bảo mật thông tin tuyệt đối', color: '#009966' },
]

export default function QuoteFormSection() {
  const [serviceOptions, setServiceOptions] = useState<string[]>(FALLBACK_SERVICES_OPTIONS)

  useEffect(() => {
    fetch('/api/services?take=20')
      .then(r => r.json())
      .then(d => {
        if (d.services && d.services.length > 0) {
          const names = d.services.map((s: { titleVi: string }) => s.titleVi)
          setServiceOptions([...names, 'Khác'])
        }
      })
      .catch(() => {})
  }, [])

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050d1a 0%, #0a1628 60%, #0c1d38 100%)' }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 tech-grid" style={{ opacity: 0.2 }} />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-badge-dark mb-4 inline-flex">💬 Liên hệ</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Yêu Cầu Báo Giá
            <span className="gradient-text"> Miễn Phí</span>
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">
            Điền form bên dưới để nhận tư vấn kỹ thuật và báo giá chi tiết trong 24 giờ làm việc
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left panel */}
            <div
              className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between"
              style={{ background: 'linear-gradient(160deg, #0d2040, #0a1628)' }}
            >
              <div>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  Liên hệ trực tiếp
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-8">
                  Đội ngũ kỹ sư FAVE sẵn sàng tư vấn kỹ thuật chuyên sâu, không tính phí.
                </p>

                {/* Contact info */}
                <div className="space-y-4 mb-8">
                  <a
                    href="tel:0981907109"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)' }}
                    >
                      <Phone size={17} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white/35 text-xs font-medium uppercase tracking-wide">Hotline 24/7</div>
                      <div className="text-white font-bold text-lg tracking-wide">0981 907 109</div>
                    </div>
                  </a>

                  <a
                    href="mailto:Favevietnam@gmail.com"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)' }}
                    >
                      <Mail size={17} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white/35 text-xs font-medium uppercase tracking-wide">Email</div>
                      <div className="text-white/80 font-medium text-sm">Favevietnam@gmail.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)' }}
                    >
                      <Building2 size={17} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white/35 text-xs font-medium uppercase tracking-wide">Địa chỉ</div>
                      <div className="text-white/65 text-sm">348 Đường Bưởi, Nghĩa Đô<br />Ba Đình, Hà Nội</div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} className="mb-6" />

                {/* Guarantees */}
                <div className="space-y-3">
                  {GUARANTEES.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20` }}
                        >
                          <Icon size={13} style={{ color: item.color }} />
                        </div>
                        <span className="text-white/55 text-sm">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Live status */}
              <div
                className="mt-8 p-4 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(0,153,0,0.08)', border: '1px solid rgba(0,153,0,0.2)' }}
              >
                <div className="relative flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" />
                  <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-60" />
                </div>
                <div>
                  <div className="text-green-400 text-xs font-semibold">Đang nhận báo giá</div>
                  <div className="text-white/30 text-xs">Phản hồi trong vòng 24h làm việc</div>
                </div>
              </div>
            </div>

            {/* Right panel: Form */}
            <div className="lg:col-span-3 bg-white p-8 lg:p-10">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(0,153,0,0.08)' }}
                  >
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2" style={{ color: '#0a1628' }}>Đã nhận yêu cầu!</h3>
                  <p className="text-slate-500 max-w-xs leading-relaxed">
                    Đội ngũ FAVE sẽ liên hệ lại trong vòng 24 giờ làm việc. Cảm ơn bạn đã tin tưởng!
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-blue-600 font-semibold hover:text-blue-500 transition-colors"
                  >
                    Gửi yêu cầu khác →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-xl font-black mb-1" style={{ color: '#0a1628' }}>Thông tin liên hệ</h3>
                    <p className="text-slate-400 text-sm">Vui lòng điền đầy đủ để chúng tôi tư vấn chính xác nhất</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Họ và tên *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="0981 907 xxx"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="form-label">Tên công ty</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Tên doanh nghiệp"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Dịch vụ quan tâm *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">
                      <MessageSquare size={13} className="inline mr-1" />
                      Mô tả yêu cầu
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                      placeholder="Mô tả sơ bộ công trình, quy mô, diện tích, yêu cầu đặc biệt..."
                      rows={3}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      Gửi thất bại. Vui lòng thử lại hoặc gọi hotline 0981 907 109.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-4 font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 text-white"
                    style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)', boxShadow: '0 4px 20px rgba(0,102,255,0.3)' }}
                    onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,102,255,0.45)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,102,255,0.3)' }}
                  >
                    {status === 'loading' ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        Gửi yêu cầu báo giá
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    Bằng cách gửi, bạn đồng ý để FAVE Vietnam liên hệ tư vấn.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
