import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { Download, Shield, CheckCircle2, Phone, ArrowRight } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Năng lực & Chứng chỉ | ISO 9001:2015, Đại lý Daikin — ${t('siteName')}`,
    description: 'Hồ sơ năng lực FAVE Vietnam: ISO 9001:2015, chứng chỉ PCCC, đại lý ủy quyền Daikin & Carrier, 100+ kỹ sư HVAC, 500+ dự án. Tải hồ sơ năng lực PDF miễn phí.',
    keywords: 'năng lực HVAC, chứng chỉ ISO 9001 HVAC, đại lý Daikin Việt Nam, đại lý Carrier Việt Nam, hồ sơ năng lực FAVE, kỹ sư HVAC chuyên nghiệp, chứng chỉ PCCC',
  }
}

const WORKFLOW = [
  { step: '01', title: 'Tiếp nhận', desc: 'Tiếp nhận yêu cầu qua hotline hoặc email, phân công kỹ sư tư vấn trong 2 giờ' },
  { step: '02', title: 'Khảo sát', desc: 'Kỹ sư đến hiện trường khảo sát, đo đạc và đánh giá yêu cầu kỹ thuật' },
  { step: '03', title: 'Báo giá', desc: 'Lập phương án thiết kế và báo giá chi tiết trong vòng 24-48 giờ làm việc' },
  { step: '04', title: 'Thi công', desc: 'Triển khai thi công theo đúng thiết kế, giám sát chất lượng từng giai đoạn' },
  { step: '05', title: 'Nghiệm thu', desc: 'Kiểm tra, vận hành thử và bàn giao hệ thống đạt tiêu chuẩn kỹ thuật' },
  { step: '06', title: 'Bảo trì', desc: 'Bảo trì định kỳ theo hợp đồng, hỗ trợ kỹ thuật 24/7 suốt vòng đời dự án' },
]

const FALLBACK_CERTS = [
  { icon: '🏆', name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng', issuedBy: 'Bureau Veritas', color: '#0066ff' },
  { icon: '🔥', name: 'Chứng chỉ PCCC', desc: 'Phòng cháy chữa cháy số 247/CN-PCCC', issuedBy: 'Cảnh sát PCCC TP.HN', color: '#dc2626' },
  { icon: '🏗️', name: 'Giấy phép Xây dựng', desc: 'Giấy phép thi công cơ điện M&E', issuedBy: 'Bộ Xây Dựng', color: '#ea580c' },
  { icon: '❄️', name: 'Đại lý Daikin', desc: 'Đại lý ủy quyền chính thức Daikin VN', issuedBy: 'Daikin Vietnam', color: '#0099cc' },
  { icon: '🌡️', name: 'Đại lý Carrier', desc: 'Đối tác phân phối Carrier SE Asia', issuedBy: 'Carrier Corporation', color: '#0066cc' },
  { icon: '📋', name: 'Chứng chỉ EPC', desc: 'Năng lực thiết kế, mua sắm, thi công', issuedBy: 'Hiệp hội Nhà thầu VN', color: '#7c3aed' },
]

const FALLBACK_CAPS = [
  { icon: '🏗️', title: 'Thiết kế & Thi công HVAC', desc: 'Thiết kế hệ thống điều hòa không khí, thông gió và làm lạnh cho mọi quy mô công trình' },
  { icon: '❄️', title: 'Chiller & Cooling Tower', desc: 'Lắp đặt và vận hành máy làm lạnh nước công suất từ 50TR đến 2,000TR' },
  { icon: '🌬️', title: 'VRV/VRF Systems', desc: 'Tư vấn và triển khai hệ thống VRV/VRF Daikin, Mitsubishi cho tòa nhà văn phòng và khách sạn' },
  { icon: '🔧', title: 'Bảo trì & Sửa chữa', desc: 'Dịch vụ bảo trì định kỳ, kiểm tra toàn diện và sửa chữa khẩn cấp 24/7' },
  { icon: '🏭', title: 'Phòng sạch & Clean Room', desc: 'Thiết kế hệ thống HVAC đáp ứng tiêu chuẩn GMP-WHO cho nhà máy dược phẩm' },
  { icon: '⚡', title: 'Tiết kiệm năng lượng', desc: 'Kiểm toán năng lượng và tối ưu hóa hệ thống HVAC hiện hữu giảm chi phí điện' },
]

const BIG_STATS = [
  { value: '10+', label: 'Năm kinh nghiệm', color: '#0066ff' },
  { value: '500+', label: 'Dự án hoàn thành', color: '#3385ff' },
  { value: '100+', label: 'Kỹ sư & KTV', color: '#60a5fa' },
  { value: '6', label: 'Chứng chỉ & giấy phép', color: '#93c5fd' },
]

export default async function CapabilityPage({ params }: Props) {
  const { locale } = await params

  const [capabilities, certificates, partners] = await Promise.all([
    prisma.capabilityProfile.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.certificate.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.partner.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ])

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="section-badge-dark mb-5 inline-flex">🏆 Năng lực</span>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Năng Lực & Chứng Chỉ
                <br />
                <span className="gradient-text">Chuẩn Quốc Tế, Chuyên Nghiệp Việt Nam</span>
              </h1>
              <p className="text-white/55 max-w-2xl text-base leading-relaxed">
                Đội ngũ kỹ sư chuyên sâu, trang thiết bị hiện đại, chứng chỉ quốc tế — FAVE sẵn sàng đáp ứng mọi yêu cầu kỹ thuật HVAC phức tạp nhất
              </p>
            </div>
            <a href="/files/ho-so-nang-luc-fave.pdf" download className="btn-primary whitespace-nowrap flex-shrink-0">
              <Download size={16} />
              Tải hồ sơ năng lực
            </a>
          </div>
        </div>
      </section>

      {/* Big Stats */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {BIG_STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">💪 Năng lực cốt lõi</span>
            <h2 className="text-3xl font-black text-slate-900">Lĩnh Vực <span className="text-blue-600">Chuyên Môn</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.length > 0 ? capabilities.map((cap) => {
              const title = locale === 'en' ? cap.titleEn : cap.titleVi
              const content = locale === 'en' ? cap.contentEn : cap.contentVi
              return (
                <div key={cap.id} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                    <Shield size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{content}</p>
                </div>
              )
            }) : FALLBACK_CAPS.map((cap) => (
              <div key={cap.title} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                <div className="text-3xl mb-4">{cap.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Certificates */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🏅 Chứng chỉ</span>
            <h2 className="text-3xl font-black text-slate-900">Chứng Chỉ & <span className="text-blue-600">Giấy Phép</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.length > 0 ? certificates.map((cert) => {
              const name = locale === 'en' ? cert.nameEn : cert.nameVi
              const desc = locale === 'en' ? cert.descriptionEn : cert.descriptionVi
              return (
                <div key={cert.id} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white" style={{ border: '1px solid rgba(0,102,255,0.06)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                      {cert.imageUrl ? (
                        <Image src={cert.imageUrl} alt={name} width={48} height={48} className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <Shield size={22} className="text-white" />
                      )}
                    </div>
                    <div>
                      <span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold mb-1">Đã được cấp</span>
                      <div className="font-bold text-slate-900">{name}</div>
                      {desc && <div className="text-sm text-slate-500 mt-0.5">{desc}</div>}
                      {cert.issuedBy && <div className="text-xs mt-1.5 font-medium text-blue-600">{cert.issuedBy}</div>}
                    </div>
                  </div>
                </div>
              )
            }) : FALLBACK_CERTS.map((cert, i) => (
              <div key={i} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white" style={{ border: '1px solid rgba(0,102,255,0.06)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${cert.color}10` }}>
                    {cert.icon}
                  </div>
                  <div>
                    <span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold mb-1">Đã được cấp</span>
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{cert.desc}</div>
                    <div className="text-xs mt-1.5 font-medium" style={{ color: cert.color }}>{cert.issuedBy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Partners */}
      {(partners.length > 0) && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="section-badge mb-4 inline-flex">🤝 Đối tác</span>
              <h2 className="text-3xl font-black text-slate-900">Đối Tác <span className="text-blue-600">Thương Hiệu</span></h2>
              <div className="section-divider mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {partners.map((partner) => {
                const name = locale === 'en' ? partner.nameEn : partner.nameVi
                return (
                  <div key={partner.id} className="flex flex-col items-center gap-3 p-5 rounded-xl hover:shadow-md transition-all duration-300 bg-white" style={{ border: '1px solid rgba(0,102,255,0.06)' }}>
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#0a2342] to-[#1565C0] flex items-center justify-center">
                      {partner.logoUrl ? (
                        <Image src={partner.logoUrl} alt={name} width={64} height={64} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-white font-black text-xl">{name.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-900 text-sm">{name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 4 — Workflow */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">⚙️ Quy trình</span>
            <h2 className="text-3xl font-black text-slate-900">Quy Trình <span className="text-blue-600">Làm Việc</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKFLOW.map((item, i) => (
              <div key={item.step} className="relative p-5 rounded-2xl bg-white hover:shadow-md transition-all duration-300" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <ArrowRight size={14} className="absolute -right-2 top-1/2 -translate-y-1/2 text-blue-300 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">📄 Hồ sơ năng lực</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Tải Hồ Sơ Năng Lực FAVE</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Hồ sơ năng lực chi tiết với đầy đủ thông tin về dự án tiêu biểu, chứng chỉ, đội ngũ kỹ thuật và trang thiết bị thi công
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/files/ho-so-nang-luc-fave.pdf" download className="btn-primary">
              <Download size={18} />
              Tải hồ sơ năng lực (PDF)
            </a>
            <Link href="/lien-he" className="btn-outline">
              <Phone size={16} />
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
