'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  coverLetter: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cvFile, setCvFile] = useState<File | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })
      if (cvFile) formData.append('cv', cvFile)
      formData.append('jobTitle', jobTitle)

      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      setCvFile(null)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
        <p className="font-bold text-slate-900 mb-1">Nộp hồ sơ thành công!</p>
        <p className="text-slate-500 text-sm">Chúng tôi sẽ liên hệ trong 3-5 ngày làm việc.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
        <input {...register('name')} className={cn('form-input', errors.name ? 'border-red-400' : '')} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Điện thoại *</label>
        <input {...register('phone')} className={cn('form-input', errors.phone ? 'border-red-400' : '')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
        <input {...register('email')} type="email" className={cn('form-input', errors.email ? 'border-red-400' : '')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Upload CV (PDF/Word)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Thư xin việc</label>
        <textarea {...register('coverLetter')} rows={3} placeholder="Giới thiệu bản thân và lý do ứng tuyển..." className="form-input resize-none" />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> Có lỗi xảy ra. Vui lòng thử lại.
        </div>
      )}

      <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all disabled:opacity-60 text-sm">
        <Send size={15} />
        {status === 'loading' ? 'Đang gửi...' : 'Nộp hồ sơ ứng tuyển'}
      </button>
    </form>
  )
}
