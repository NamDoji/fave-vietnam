import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Target, Eye, Heart, Clock, Shield, Star, Headphones } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Về Chúng Tôi | 10+ năm HVAC chuyên nghiệp — ${t('siteName')}`,
    description: 'FAVE Việt Nam — đơn vị HVAC uy tín thành lập 2016 tại Hà Nội. 10+ năm kinh nghiệm, 500+ dự án, 100+ kỹ sư chuyên nghiệp. Đại lý ủy quyền Daikin & Carrier, chứng chỉ ISO 9001:2015.',
    keywords: 'FAVE Vietnam, về chúng tôi, công ty HVAC Hà Nội, đại lý Daikin, đại lý Carrier, ISO 9001 HVAC, nhà thầu HVAC uy tín, kỹ sư HVAC',
  }
}

const WHY_US = [
  { icon: Shield, title: 'Đội kỹ thuật certified', desc: '100+ kỹ sư và kỹ thuật viên được đào tạo bài bản với chứng chỉ chuyên môn quốc tế' },
  { icon: Clock, title: 'Phản hồi trong 2 giờ', desc: 'Cam kết phản hồi yêu cầu trong vòng 2 giờ làm việc, hỗ trợ khẩn cấp 24/7' },
  { icon: CheckCircle, title: 'Phụ tùng chính hãng', desc: 'Sử dụng 100% linh kiện và phụ tùng chính hãng từ Daikin, Carrier và các thương hiệu uy tín' },
  { icon: Star, title: 'Bảo hành dài hạn', desc: 'Chính sách bảo hành minh bạch, rõ ràng và dịch vụ bảo trì định kỳ chuyên nghiệp' },
  { icon: Target, title: 'Tư vấn miễn phí', desc: 'Khảo sát và tư vấn giải pháp HVAC hoàn toàn miễn phí, không ràng buộc' },
  { icon: Headphones, title: 'Hỗ trợ 24/7', desc: 'Đường dây nóng hỗ trợ kỹ thuật 24/7, đội ngũ ứng cứu luôn sẵn sàng trong vòng 4 giờ' },
]

const STATS = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '500+', label: 'Dự án hoàn thành' },
  { value: '100+', label: 'Kỹ sư & kỹ thuật viên' },
  { value: '50+', label: 'Khách hàng doanh nghiệp' },
]

const FALLBACK_TEAM = [
  { name: 'Nguyễn Văn Hùng', position: 'Giám đốc điều hành' },
  { name: 'Trần Thị Mai', position: 'Giám đốc kỹ thuật' },
  { name: 'Lê Minh Đức', position: 'Trưởng phòng thiết kế' },
  { name: 'Phạm Quốc Bình', position: 'Trưởng phòng thi công' },
]

const FALLBACK_CERTS = [
  { name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng', by: 'Bureau Veritas' },
  { name: 'Chứng chỉ PCCC', desc: 'Phòng cháy chữa cháy số 247/CN-PCCC', by: 'Cảnh sát PCCC TP.HN' },
  { name: 'Đại lý Daikin', desc: 'Đại lý ủy quyền chính thức Daikin VN', by: 'Daikin Vietnam' },
  { name: 'Đối tác Carrier', desc: 'Đối tác phân phối Carrier SE Asia', by: 'Carrier Corporation' },
]

export default async function AboutPage({ params }: Props) {
  const { locale } = await params

  const [teamMembers, certificates] = await Promise.all([
    prisma.teamMember.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.certificate.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ])

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-white/60">Về chúng tôi</span>
          </div>
          <span className="section-badge-dark mb-5 inline-flex">🏢 Về chúng tôi</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Về Chúng Tôi
            <br />
            <span className="gradient-text">Hơn 10 Năm Đồng Hành Cùng Doanh Nghiệp</span>
          </h1>
          <p className="text-white/55 max-w-2xl text-base leading-relaxed">
            FAVE Việt Nam — đơn vị HVAC uy tín hàng đầu miền Bắc với đội ngũ kỹ sư chuyên nghiệp và hàng trăm dự án thành công
          </p>
        </div>
      </section>

      {/* Section 1 — Story + Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge mb-4 inline-flex">📖 Câu chuyện của chúng tôi</span>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Đơn Vị HVAC Hàng Đầu Miền Bắc</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                FAVE Việt Nam được thành lập năm 2016 tại Hà Nội, chuyên cung cấp giải pháp toàn diện về hệ thống HVAC cho các công trình dân dụng và công nghiệp. Từ những dự án bảo trì đầu tiên, chúng tôi đã không ngừng mở rộng năng lực để trở thành nhà thầu HVAC tổng hợp.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Hơn 10 năm kinh nghiệm với 500+ dự án lớn nhỏ trên toàn quốc — từ nhà máy sản xuất, bệnh viện, khách sạn cao cấp đến tòa nhà văn phòng và trung tâm thương mại.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Là đại lý ủy quyền của Daikin và Carrier, chúng tôi cam kết mang đến giải pháp HVAC tiết kiệm năng lượng, thân thiện môi trường và đạt chuẩn ISO 9001:2015.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.1)' }}>
                    <div className="text-2xl font-black text-blue-600">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-10 text-white" style={{ background: 'linear-gradient(135deg, #0a1628, #0d2040)', border: '1px solid rgba(0,102,255,0.15)' }}>
              <div className="text-center mb-6">
                <div className="text-6xl font-black mb-2 gradient-text">FAVE</div>
                <div className="text-blue-400 text-xl font-light tracking-widest">VIETNAM</div>
              </div>
              <div className="border-t pt-6 space-y-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {['ISO 9001:2015', 'Chứng chỉ thi công PCCC', 'Đại lý ủy quyền Daikin', 'Đối tác chính thức Carrier'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-blue-400 shrink-0" />
                    <span className="text-white/75">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Mission, Vision, Values */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🎯 Định hướng</span>
            <h2 className="text-3xl font-black text-slate-900">Sứ Mệnh & <span className="text-blue-600">Tầm Nhìn</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                label: 'Sứ mệnh',
                text: locale === 'en'
                  ? 'Delivering comprehensive HVAC solutions that enhance comfort and productivity for Vietnamese businesses'
                  : 'Cung cấp giải pháp HVAC toàn diện, nâng cao chất lượng sống và sản xuất cho doanh nghiệp Việt Nam',
              },
              {
                icon: Eye,
                label: 'Tầm nhìn',
                text: locale === 'en'
                  ? "Becoming Vietnam's #1 HVAC partner, trusted by 1,000+ businesses by 2030"
                  : 'Trở thành đối tác HVAC số 1 tại Việt Nam, được tin tưởng bởi 1,000+ doanh nghiệp vào năm 2030',
              },
              {
                icon: Heart,
                label: 'Giá trị cốt lõi',
                text: 'Chính trực · Chất lượng · Đổi mới · Hợp tác — cam kết thực hiện đúng những gì đã hứa với khách hàng',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="service-card text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{item.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">⭐ Lý do lựa chọn</span>
            <h2 className="text-3xl font-black text-slate-900">Tại Sao Chọn <span className="text-blue-600">FAVE?</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.08)' }}>
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — Team */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">👥 Đội ngũ</span>
            <h2 className="text-3xl font-black text-slate-900">Đội Ngũ <span className="text-blue-600">Lãnh Đạo</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.length > 0 ? teamMembers.map((member) => {
              const name = locale === 'en' ? member.nameEn : member.nameVi
              const position = locale === 'en' ? member.positionEn : member.positionVi
              return (
                <div key={member.id} className="text-center p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                    {member.imageUrl ? (
                      <Image src={member.imageUrl} alt={name} width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-xl">
                        {name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{name}</div>
                  <div className="text-xs text-blue-600 mt-0.5">{position}</div>
                </div>
              )
            }) : FALLBACK_TEAM.map((m) => (
              <div key={m.name} className="text-center p-5 rounded-2xl bg-white shadow-sm" style={{ border: '1px solid rgba(0,102,255,0.08)' }}>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#0a2342] to-[#1565C0] flex items-center justify-center text-white font-black text-xl">
                  {m.name.slice(0, 1)}
                </div>
                <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                <div className="text-xs text-blue-600 mt-0.5">{m.position}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Certificates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🏅 Chứng nhận</span>
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
                      <div className="font-bold text-slate-900">{name}</div>
                      {desc && <div className="text-sm text-slate-500 mt-0.5">{desc}</div>}
                      {cert.issuedBy && <div className="text-xs mt-1.5 font-medium text-blue-600">{cert.issuedBy}</div>}
                    </div>
                  </div>
                </div>
              )
            }) : FALLBACK_CERTS.map((cert) => (
              <div key={cert.name} className="p-6 rounded-2xl bg-white" style={{ border: '1px solid rgba(0,102,255,0.06)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                    <Shield size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{cert.desc}</div>
                    <div className="text-xs mt-1.5 font-medium text-blue-600">{cert.by}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Sẵn Sàng Hợp Tác?</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">Liên hệ ngay để được tư vấn giải pháp HVAC miễn phí và nhận báo giá trong vòng 24 giờ</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/lien-he" className="btn-primary">Liên hệ ngay →</Link>
            <Link href="/du-an" className="btn-outline">Xem dự án tiêu biểu</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
