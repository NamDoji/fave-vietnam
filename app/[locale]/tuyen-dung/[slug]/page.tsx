'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, DollarSign, Briefcase, Calendar, ChevronRight, CheckCircle, Send, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  coverLetter: z.string().optional(),
})

type FormData = z.infer<typeof schema>

// In a real app this would be fetched from DB
const JOB_DATA = {
  title: 'Kỹ Sư Thiết Kế HVAC',
  location: 'Hà Nội',
  salary: '15-25 triệu/tháng',
  experience: '2-5 năm',
  deadline: '2025-01-31',
  type: 'Toàn thời gian',
  department: 'Kỹ thuật',
  desc: 'Chúng tôi đang tìm kiếm Kỹ Sư Thiết Kế HVAC có kinh nghiệm để tham gia đội ngũ kỹ thuật tại FAVE Việt Nam.',
  responsibilities: [
    'Tính toán tải nhiệt và thiết kế hệ thống HVAC cho các dự án dân dụng và công nghiệp',
    'Sử dụng phần mềm HAP, Trace 700, AutoCAD MEP để thiết kế và vẽ bản vẽ kỹ thuật',
    'Lập dự toán chi phí và spec kỹ thuật cho thiết bị',
    'Phối hợp với đội thi công để đảm bảo thi công đúng thiết kế',
    'Tham gia nghiệm thu, commissioning và training cho khách hàng',
  ],
  requirements: [
    'Tốt nghiệp Đại học chuyên ngành Kỹ thuật Nhiệt, Điện lạnh, Cơ Điện Lạnh',
    'Kinh nghiệm 2-5 năm trong thiết kế hệ thống HVAC',
    'Thành thạo AutoCAD 2D/3D, phần mềm HAP hoặc Carrier HAP',
    'Hiểu biết về tiêu chuẩn ASHRAE, TCVN về HVAC',
    'Tiếng Anh đọc tài liệu kỹ thuật tốt',
    'Có khả năng làm việc nhóm và giao tiếp hiệu quả',
  ],
  benefits: [
    'Lương thỏa thuận theo năng lực, xem xét tăng lương 2 lần/năm',
    'Thưởng dự án, thưởng tháng 13 và các dịp lễ Tết',
    'BHXH, BHYT đầy đủ theo quy định + bảo hiểm sức khỏe cao cấp',
    'Đào tạo nội bộ và hỗ trợ học chứng chỉ chuyên môn quốc tế',
    'Nghỉ phép 12 ngày/năm + các ngày phép đặc biệt',
    'Môi trường làm việc chuyên nghiệp, trẻ trung, năng động',
  ],
}

export default function RecruitmentDetailPage() {
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
      formData.append('jobTitle', JOB_DATA.title)

      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      setCvFile(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-[88px]">
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/tuyen-dung" className="hover:text-[#00a0e9]">Tuyển dụng</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3a5c]">{JOB_DATA.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1a3a5c] mb-3">{JOB_DATA.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={14} className="text-[#00a0e9]" />{JOB_DATA.location}</span>
                <span className="flex items-center gap-1"><DollarSign size={14} className="text-[#00a0e9]" />{JOB_DATA.salary}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} className="text-[#00a0e9]" />{JOB_DATA.experience}</span>
                <span className="flex items-center gap-1"><Calendar size={14} className="text-[#00a0e9]" />Hạn: {JOB_DATA.deadline}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a3a5c] mb-3">Mô tả công việc</h2>
              <p className="text-gray-600 mb-4">{JOB_DATA.desc}</p>
              <ul className="space-y-2">
                {JOB_DATA.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[#00a0e9] shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a3a5c] mb-3">Yêu cầu</h2>
              <ul className="space-y-2">
                {JOB_DATA.requirements.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a0e9] mt-1.5 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a3a5c] mb-3">Quyền lợi</h2>
              <ul className="space-y-2">
                {JOB_DATA.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apply form */}
          <div>
            <div className="bg-[#f7f9fc] rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#1a3a5c] mb-5">Form Ứng Tuyển</h3>

              {status === 'success' ? (
                <div className="text-center py-6">
                  <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-[#1a3a5c] mb-1">Nộp hồ sơ thành công!</p>
                  <p className="text-gray-500 text-sm">Chúng tôi sẽ liên hệ trong 3-5 ngày làm việc.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <input {...register('name')} className={cn('w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]', errors.name ? 'border-red-400' : 'border-gray-200')} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại *</label>
                    <input {...register('phone')} className={cn('w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]', errors.phone ? 'border-red-400' : 'border-gray-200')} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input {...register('email')} type="email" className={cn('w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9]', errors.email ? 'border-red-400' : 'border-gray-200')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV *</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00a0e9] file:text-white hover:file:bg-[#0080c0] cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thư xin việc</label>
                    <textarea {...register('coverLetter')} rows={3} placeholder="Giới thiệu bản thân và lý do ứng tuyển..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e9] resize-none" />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 rounded-lg px-3 py-2">
                      <AlertCircle size={14} /> Có lỗi xảy ra. Vui lòng thử lại.
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all disabled:opacity-60 text-sm">
                    <Send size={15} />
                    {status === 'loading' ? 'Đang gửi...' : 'Nộp hồ sơ'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
