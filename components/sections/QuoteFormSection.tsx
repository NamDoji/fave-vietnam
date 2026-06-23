'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lòng mô tả nhu cầu của bạn'),
})

type FormData = z.infer<typeof schema>

const SERVICES = [
  'Điều hòa trung tâm (Chiller)',
  'Thông gió công nghiệp',
  'Hệ thống lạnh công nghiệp',
  'Hệ thống VRV/VRF',
  'Xử lý không khí sạch / Phòng sạch',
  'Bảo trì bảo dưỡng',
  'Tư vấn thiết kế HVAC',
  'Khác',
]

export default function QuoteFormSection() {
  const t = useTranslations('quote')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

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
    <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0a2840]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Info */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              {t('badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{t('description')}</p>

            <div className="space-y-4">
              {[
                { icon: '📞', text: 'Tư vấn kỹ thuật miễn phí' },
                { icon: '⚡', text: 'Phản hồi trong 24 giờ làm việc' },
                { icon: '📋', text: 'Báo giá chi tiết, minh bạch' },
                { icon: '🔧', text: 'Hỗ trợ kỹ thuật tận tâm' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-200">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="tel:0981907109"
                className="flex items-center gap-2 px-5 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-lg"
              >
                <Phone size={16} />
                Gọi ngay: 0981 907 109
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1a3a5c] mb-2">Gửi thành công!</h3>
                <p className="text-gray-500 text-sm">{t('success')}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 bg-[#00a0e9] text-white rounded-lg text-sm font-medium"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-lg font-bold text-[#1a3a5c] mb-5">Thông tin liên hệ</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                    <input
                      {...register('name')}
                      placeholder="Nguyễn Văn A"
                      className={cn(
                        'w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]',
                        errors.name ? 'border-red-400' : 'border-gray-200'
                      )}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                    <input
                      {...register('phone')}
                      placeholder="0981 907 109"
                      className={cn(
                        'w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]',
                        errors.phone ? 'border-red-400' : 'border-gray-200'
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="email@company.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('company')}</label>
                    <input
                      {...register('company')}
                      placeholder="Tên công ty"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('service')}</label>
                  <select
                    {...register('service')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9] bg-white"
                  >
                    <option value="">{t('selectService')}</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('message')}</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Mô tả nhu cầu, công suất yêu cầu, quy mô công trình..."
                    className={cn(
                      'w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none',
                      errors.message ? 'border-red-400' : 'border-gray-200'
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                    <AlertCircle size={16} />
                    {t('error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {status === 'loading' ? t('submitting') : t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
