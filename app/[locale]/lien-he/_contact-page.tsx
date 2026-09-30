'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lòng nhập nội dung'),
})

type FormData = z.infer<typeof schema>

const CONTACT_INFO = [
  { icon: MapPin, label: 'Địa chỉ', value: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội', href: 'https://maps.google.com/?q=348+Đường+Bưởi,+Nghĩa+Đô,+Ba+Đình,+Hà+Nội' },
  { icon: Phone, label: 'Hotline 24/7', value: '0981 907 109', href: 'tel:0981907109', highlight: true },
  { icon: Mail, label: 'Email', value: 'Favevietnam@gmail.com', href: 'mailto:Favevietnam@gmail.com' },
  { icon: Clock, label: 'Giờ làm việc', value: 'T2-T7: 7:30 - 17:30 | CN: 8:00 - 12:00', href: null },
]

const SERVICES = [
  'Điều hòa trung tâm (Chiller)',
  'Thông gió công nghiệp',
  'Hệ thống lạnh công nghiệp',
  'Hệ thống VRV/VRF',
  'Xử lý không khí sạch',
  'Bảo trì bảo dưỡng',
  'Tư vấn thiết kế HVAC',
  'Khác',
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">💬 Liên hệ</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Liên Hệ
            <br />
            <span className="gradient-text">Nhận Tư Vấn Miễn Phí Trong 2 Giờ</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
            Đội ngũ kỹ sư FAVE sẵn sàng tư vấn và hỗ trợ bạn 24/7
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left — Form */}
            <div className="rounded-2xl p-8" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.08)' }}>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Gửi Yêu Cầu Tư Vấn</h2>
              <p className="text-slate-500 text-sm mb-6">Điền thông tin — chúng tôi phản hồi trong vòng 2 giờ làm việc</p>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gửi thành công!</h3>
                  <p className="text-slate-500 text-sm mb-4">Chúng tôi sẽ liên hệ lại trong vòng 2 giờ làm việc.</p>
                  <button onClick={() => setStatus('idle')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                      <input {...register('name')} placeholder="Nguyễn Văn A" className={cn('form-input', errors.name ? 'border-red-400' : '')} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Công ty</label>
                      <input {...register('company')} placeholder="Tên công ty" className="form-input" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Điện thoại *</label>
                      <input {...register('phone')} placeholder="0981 907 109" className={cn('form-input', errors.phone ? 'border-red-400' : '')} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input {...register('email')} type="email" placeholder="email@company.com" className={cn('form-input', errors.email ? 'border-red-400' : '')} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dịch vụ quan tâm</label>
                    <select {...register('service')} className="form-input">
                      <option value="">-- Chọn dịch vụ --</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung *</label>
                    <textarea {...register('message')} rows={4} placeholder="Mô tả yêu cầu, quy mô công trình, thời gian thực hiện..." className={cn('form-input resize-none', errors.message ? 'border-red-400' : '')} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                      <AlertCircle size={16} /> Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline.
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                    <Send size={16} />
                    {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                  </button>
                </form>
              )}
            </div>

            {/* Right — Info + Map */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-5 mb-8">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', item.highlight ? 'bg-orange-500' : 'bg-blue-600')}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cn('font-medium hover:text-blue-600 transition-colors', item.highlight ? 'text-orange-500 text-lg font-black' : 'text-slate-900')}>
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-slate-900 font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden h-64 border border-gray-100 shadow-sm mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.860595862!2d105.81760491493374!3d21.049614992980255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abaf7fb3bb65%3A0x22d58f82a54f5de4!2s348%20%C4%90%C6%B0%E1%BB%9Dng%20B%C6%B0%E1%BB%9Fi%2C%20Ngh%C4%A9a%20%C4%90%C3%B4%2C%20Ba%20%C4%90%C3%ACnh%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1svi!2svn!4v1701234567890!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FAVE Vietnam Location"
                />
              </div>

              {/* Quick contact */}
              <div className="grid grid-cols-3 gap-3">
                <a href="tel:0981907109" className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center hover:shadow-md transition-all" style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.1)' }}>
                  <Phone size={20} className="text-blue-600" />
                  <span className="text-xs font-medium text-slate-700">Gọi ngay</span>
                </a>
                <a href="https://zalo.me/0981907109" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center hover:shadow-md transition-all" style={{ background: 'rgba(0,153,255,0.05)', border: '1px solid rgba(0,153,255,0.1)' }}>
                  <span className="text-xl">💬</span>
                  <span className="text-xs font-medium text-slate-700">Zalo</span>
                </a>
                <a href="mailto:Favevietnam@gmail.com" className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center hover:shadow-md transition-all" style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.1)' }}>
                  <Mail size={20} className="text-blue-600" />
                  <span className="text-xs font-medium text-slate-700">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
