import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, DollarSign, Briefcase, Calendar, ChevronRight, CheckCircle } from 'lucide-react'
import prisma from '@/lib/prisma'
import ApplyForm from './_apply-form'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const job = await prisma.recruitment.findUnique({ where: { slug } }).catch(() => null)
  if (!job) return { title: `Tuyển dụng | ${t('siteName')}` }
  const title = locale === 'en' ? job.titleEn : job.titleVi
  return { title: `${title} | ${t('siteName')}` }
}

export default async function RecruitmentDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const job = await prisma.recruitment.findUnique({
    where: { slug, isActive: true },
  }).catch(() => null)

  if (!job) notFound()

  const title = locale === 'en' ? job.titleEn : job.titleVi
  const description = locale === 'en' ? job.descriptionEn : job.descriptionVi
  const content = locale === 'en' ? job.contentEn : job.contentVi

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/tuyen-dung" className="hover:text-blue-600 transition-colors">Tuyển dụng</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 truncate max-w-xs">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">Toàn thời gian</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">Kỹ thuật</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-3">{title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                {job.location && <span className="flex items-center gap-1.5"><MapPin size={15} className="text-blue-600" />{job.location}</span>}
                {job.salary && <span className="flex items-center gap-1.5"><DollarSign size={15} className="text-blue-600" />{job.salary}</span>}
                {job.experience && <span className="flex items-center gap-1.5"><Briefcase size={15} className="text-blue-600" />{job.experience}</span>}
                {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={15} className="text-blue-600" />Hạn: {new Date(job.deadline).toLocaleDateString('vi-VN')}</span>}
              </div>
            </div>

            <div className="p-5 rounded-xl text-sm text-slate-600 leading-relaxed" style={{ background: 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.08)' }}>
              {description}
            </div>

            {content ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">Mô tả công việc</h2>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      'Tính toán tải nhiệt và thiết kế hệ thống HVAC cho các dự án dân dụng và công nghiệp',
                      'Sử dụng phần mềm HAP, Trace 700, AutoCAD MEP để thiết kế và vẽ bản vẽ kỹ thuật',
                      'Lập dự toán chi phí và spec kỹ thuật cho thiết bị',
                      'Phối hợp với đội thi công để đảm bảo thi công đúng thiết kế',
                    ].map((r) => (
                      <li key={r} className="flex gap-2">
                        <CheckCircle size={15} className="text-blue-600 shrink-0 mt-0.5" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">Yêu cầu</h2>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      `Tốt nghiệp Đại học chuyên ngành phù hợp với vị trí ${title}`,
                      'Có kinh nghiệm làm việc tương ứng với yêu cầu vị trí',
                      'Tinh thần trách nhiệm cao, có khả năng làm việc nhóm',
                      'Tiếng Anh đọc tài liệu kỹ thuật tốt là lợi thế',
                    ].map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">Quyền lợi</h2>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      'Lương thỏa thuận theo năng lực, xem xét tăng lương 2 lần/năm',
                      'Thưởng dự án, thưởng tháng 13 và các dịp lễ Tết',
                      'BHXH, BHYT đầy đủ + bảo hiểm sức khỏe cao cấp',
                      'Đào tạo nội bộ và hỗ trợ học chứng chỉ chuyên môn quốc tế',
                    ].map((b) => (
                      <li key={b} className="flex gap-2">
                        <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Apply form */}
          <div>
            <div className="rounded-2xl p-6 sticky top-24" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.08)' }}>
              <h3 className="text-lg font-black text-slate-900 mb-1">Ứng Tuyển Ngay</h3>
              <p className="text-slate-500 text-xs mb-5">Hồ sơ sẽ được xem xét trong 3-5 ngày làm việc</p>
              <ApplyForm jobTitle={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
