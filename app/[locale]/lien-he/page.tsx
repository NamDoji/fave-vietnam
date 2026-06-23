'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lòng nhập nội dung'),
})

type FormData = z.infer<typeof schema>

const CONTACT_INFO = [
  { icon: MapPin, label: 'Địa chỉ', value: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội', href: 'https://maps.google.com/?q=348+Đường+Bưởi,+Nghĩa+Đô,+Ba+Đình,+Hà+Nội' },
  { icon: Phone, label: 'Hotline', value: '0981 907 109', href: 'tel:0981907109' },
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
      const res = await fetch('/api/quote', {
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
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Liên hệ
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Đội ngũ kỹ sư FAVE sẵn sàng tư vấn và hỗ trợ bạn 24/7
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-5 mb-8">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[#1a3a5c] font-medium hover:text-[#00a0e9] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[#1a3a5c] font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden h-72 border border-gray-100 shadow-sm">
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
            </div>

            {/* Form */}
            <div className="bg-[#f7f9fc] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6">Gửi Yêu Cầu Báo Giá</h2>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-2">Gửi thành công!</h3>
                  <p className="text-gray-500 text-sm mb-4">Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.</p>
                  <button onClick={() => setStatus('idle')} className="px-4 py-2 bg-[#00a0e9] text-white rounded-lg text-sm font-medium">
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                      <input {...register('name')} placeholder="Nguyễn Văn A" className={cn('w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]', errors.name ? 'border-red-400' : 'border-gray-200')} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại *</label>
                      <input {...register('phone')} placeholder="0981 907 109" className={cn('w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]', errors.phone ? 'border-red-400' : 'border-gray-200')} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input {...register('email')} type="email" placeholder="email@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                      <input {...register('company')} placeholder="Tên công ty" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ quan tâm</label>
                    <select {...register('service')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]">
                      <option value="">-- Chọn dịch vụ --</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung *</label>
                    <textarea {...register('message')} rows={4} placeholder="Mô tả yêu cầu, quy mô công trình, thời gian thực hiện..." className={cn('w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none', errors.message ? 'border-red-400' : 'border-gray-200')} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                      <AlertCircle size={16} /> Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline.
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all disabled:opacity-60">
                    <Send size={16} />
                    {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
