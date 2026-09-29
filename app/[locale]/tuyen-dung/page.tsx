import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, DollarSign, Briefcase, Calendar, ArrowRight, Mail } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Tuyển Dụng | ${t('siteName')}`,
    description: 'FAVE Việt Nam tuyển dụng kỹ sư HVAC, kỹ thuật viên lắp đặt, nhân viên kinh doanh. Môi trường chuyên nghiệp, thu nhập cạnh tranh.',
  }
}

const BENEFITS = [
  { icon: '💰', title: 'Lương cạnh tranh', desc: 'Mức lương hấp dẫn + thưởng dự án + thưởng tháng 13, xem xét tăng 2 lần/năm' },
  { icon: '📚', title: 'Đào tạo phát triển', desc: 'Cử đi học chứng chỉ quốc tế, training nội bộ chuyên sâu định kỳ' },
  { icon: '💻', title: 'Trang bị đầy đủ', desc: 'Laptop, phần mềm thiết kế chuyên nghiệp và thiết bị đo lường hiện đại' },
  { icon: '🏥', title: 'Bảo hiểm toàn diện', desc: 'BHXH, BHYT đầy đủ + bảo hiểm sức khỏe cao cấp, nghỉ phép 12+ ngày' },
  { icon: '🎉', title: 'Team Building', desc: 'Du lịch hằng năm, các hoạt động ngoại khoá và gắn kết đội nhóm' },
  { icon: '🚀', title: 'Cơ hội thăng tiến', desc: 'Lộ trình thăng tiến rõ ràng, môi trường trẻ trung, dự án quy mô lớn' },
]

export default async function RecruitmentPage({ params }: Props) {
  const { locale } = await params

  const jobs = await prisma.recruitment.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, slug: true,
      titleVi: true, titleEn: true,
      descriptionVi: true, descriptionEn: true,
      location: true, salary: true, experience: true, deadline: true,
    },
  }).catch(() => [])

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">💼 Tuyển dụng</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Cơ Hội Nghề Nghiệp
            <br />
            <span className="gradient-text">Phát Triển Cùng Đội Ngũ Kỹ Sư Hàng Đầu</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
            Nơi tài năng được phát triển, công sức được ghi nhận và cơ hội không có giới hạn
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">Tại Sao Làm Việc Tại <span className="text-blue-600">FAVE?</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BENEFITS.map((item) => (
              <div key={item.title} className="text-center p-5 rounded-xl hover:shadow-md transition-all duration-300" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-slate-900 text-xs mb-1">{item.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed hidden sm:block">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 mb-8">
            Vị Trí Đang Tuyển
            {jobs.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm rounded-full">{jobs.length}</span>
            )}
          </h2>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => {
                const title = locale === 'en' ? job.titleEn : job.titleVi
                const desc = locale === 'en' ? job.descriptionEn : job.descriptionVi
                return (
                  <div key={job.slug} className="bg-white rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">Toàn thời gian</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">Kỹ thuật</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{desc}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          {job.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-600" />{job.location}</span>}
                          {job.salary && <span className="flex items-center gap-1"><DollarSign size={12} className="text-blue-600" />{job.salary}</span>}
                          {job.experience && <span className="flex items-center gap-1"><Briefcase size={12} className="text-blue-600" />{job.experience}</span>}
                          {job.deadline && <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-600" />Hạn: {new Date(job.deadline).toLocaleDateString('vi-VN')}</span>}
                        </div>
                      </div>
                      <Link href={`/tuyen-dung/${job.slug}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all whitespace-nowrap">
                        Xem chi tiết & Ứng tuyển <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}>
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hiện chưa có vị trí tuyển dụng</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                Gửi CV để chúng tôi liên hệ khi có vị trí phù hợp với bạn
              </p>
              <a href="mailto:Favevietnam@gmail.com?subject=Gửi CV ứng tuyển FAVE Vietnam" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all">
                <Mail size={16} />
                Gửi CV qua email
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
