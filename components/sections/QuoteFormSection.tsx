'use client'

import { useState } from 'react'
import { Phone, Mail, Building2, MessageSquare, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  service: string
  message: string
}

const SERVICES_OPTIONS = [
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

export default function QuoteFormSection() {
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
    <section className="py-24 lg:py-32" style={{ background: '#F5F3EF' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Outer thin border wrapper */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden"
          style={{ border: '1px solid rgba(26,60,110,0.12)' }}
        >

          {/* Left panel — Blu Notte */}
          <div
            className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-between"
            style={{ background: '#1A3C6E' }}
          >
            <div>
              {/* Gold top accent */}
              <div style={{ width: '32px', height: '1px', background: 'rgba(200,169,110,0.7)', marginBottom: '2rem' }} />

              <div
                className="mb-2"
                style={{ color: 'rgba(200,169,110,0.8)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}
              >
                Liên hệ
              </div>

              <h2
                className="text-white mb-4"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                Yêu Cầu
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#C8A96E' }}>Báo Giá Ngay</span>
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Điền form để nhận báo giá chi tiết trong vòng{' '}
                <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>24 giờ làm việc</strong>.
                Tư vấn kỹ thuật hoàn toàn miễn phí.
              </p>

              {/* Contact info */}
              <div className="space-y-5">
                <a
                  href="tel:0981907109"
                  className="flex items-center gap-3.5 group"
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ width: '36px', height: '36px', border: '1px solid rgba(200,169,110,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.7)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.3)' }}
                  >
                    <Phone size={14} style={{ color: 'rgba(200,169,110,0.7)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6125rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Hotline 24/7
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9375rem' }}>
                      0981 907 109
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="flex items-center gap-3.5 group"
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ width: '36px', height: '36px', border: '1px solid rgba(200,169,110,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.7)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.3)' }}
                  >
                    <Mail size={14} style={{ color: 'rgba(200,169,110,0.7)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6125rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Email
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>
                      Favevietnam@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '36px', height: '36px', border: '1px solid rgba(200,169,110,0.3)' }}
                  >
                    <Building2 size={14} style={{ color: 'rgba(200,169,110,0.7)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6125rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Địa chỉ
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                      348 Đường Bưởi, Nghĩa Đô,<br />Ba Đình, Hà Nội
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee list */}
            <div className="mt-8 space-y-2.5">
              {[
                'Báo giá trong 24h làm việc',
                'Tư vấn kỹ thuật miễn phí',
                'Bảo mật thông tin tuyệt đối',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5"
                  style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem' }}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(200,169,110,0.5)', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — form on Crema */}
          <div className="lg:col-span-3 p-8 lg:p-12" style={{ background: '#FAFAF7' }}>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div
                  className="mb-5 flex items-center justify-center"
                  style={{ width: '56px', height: '56px', border: '1px solid rgba(26,60,110,0.2)' }}
                >
                  <CheckCircle2 size={24} style={{ color: '#1A3C6E' }} />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    color: '#0D0D0D',
                  }}
                >
                  Đã nhận yêu cầu!
                </h3>
                <p style={{ color: '#6B6B6B', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '280px' }}>
                  Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc. Cảm ơn bạn đã tin tưởng FAVE!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form title */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      fontWeight: 700,
                      fontSize: '1.375rem',
                      color: '#0D0D0D',
                      letterSpacing: '-0.01em',
                      marginBottom: '0.375rem',
                    }}
                  >
                    Thông tin liên hệ
                  </h3>
                  <p style={{ color: '#8A8A8A', fontSize: '0.8125rem' }}>
                    Vui lòng điền đầy đủ để chúng tôi tư vấn chính xác nhất
                  </p>
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                {/* Email + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                {/* Service */}
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
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">
                    <MessageSquare size={11} className="inline mr-1.5 mb-0.5" />
                    Mô tả yêu cầu
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                    placeholder="Mô tả sơ bộ công trình, quy mô, yêu cầu đặc biệt..."
                    rows={3}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626', fontSize: '0.8125rem' }}
                  >
                    <AlertCircle size={14} />
                    Gửi thất bại. Vui lòng thử lại hoặc gọi hotline.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-luxury w-full justify-center"
                  style={{
                    background: '#1A3C6E',
                    borderColor: '#1A3C6E',
                    width: '100%',
                    justifyContent: 'center',
                    opacity: status === 'loading' ? 0.65 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Gửi yêu cầu báo giá
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
