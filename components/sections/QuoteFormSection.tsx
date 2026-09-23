'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, Building2, MessageSquare, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

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
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">

          {/* Left panel - dark */}
          <div
            className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between"
            style={{ background: 'linear-gradient(160deg, #0a1628, #0d2040)' }}
          >
            <div>
              <span className="section-badge-dark mb-5 inline-flex">💬 Liên hệ</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Yêu Cầu
                <br />
                <span className="gradient-text">Báo Giá Ngay</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Điền form để nhận báo giá chi tiết trong vòng <strong className="text-white/80">24 giờ làm việc</strong>.
                Tư vấn kỹ thuật hoàn toàn miễn phí.
              </p>

              {/* Contact info */}
              <div className="space-y-4">
                <a
                  href="tel:0981907109"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Phone size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wide">Hotline 24/7</div>
                    <div className="text-white font-semibold">0981 907 109</div>
                  </div>
                </a>

                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Mail size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wide">Email</div>
                    <div className="text-white font-semibold text-sm">Favevietnam@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <Building2 size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wide">Địa chỉ</div>
                    <div className="text-white text-sm">348 Đường Bưởi, Nghĩa Đô,<br />Ba Đình, Hà Nội</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee badges */}
            <div className="mt-8 space-y-2">
              {[
                '✅ Báo giá trong 24h làm việc',
                '✅ Tư vấn kỹ thuật miễn phí',
                '✅ Bảo mật thông tin tuyệt đối',
              ].map((item, i) => (
                <div key={i} className="text-sm text-white/50">{item}</div>
              ))}
            </div>
          </div>

          {/* Right panel - form */}
          <div className="lg:col-span-3 bg-white p-8 lg:p-10">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Đã nhận yêu cầu!</h3>
                <p className="text-slate-500 max-w-xs">
                  Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc. Cảm ơn bạn đã tin tưởng FAVE!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 mb-1">Thông tin liên hệ</h3>
                <p className="text-slate-400 text-sm mb-6">Vui lòng điền đầy đủ để chúng tôi có thể tư vấn chính xác nhất</p>

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
                    placeholder="Mô tả sơ bộ công trình, quy mô, yêu cầu đặc biệt..."
                    rows={3}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <AlertCircle size={15} />
                    Gửi thất bại. Vui lòng thử lại hoặc gọi hotline.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
