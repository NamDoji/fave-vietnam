import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Download, Shield, CheckCircle2, ArrowRight, Phone } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Năng Lực Công Ty | ${t('siteName')}`,
    description:
      'Hồ sơ năng lực FAVE Vietnam: ISO 9001:2015, 100+ kỹ sư HVAC, đại lý Daikin & Carrier, 500+ dự án hoàn thành, 10 năm kinh nghiệm.',
  }
}

const TIMELINE = [
  { year: '2016', event: 'Thành lập Công ty FAVE Vietnam, chuyên bảo trì & sửa chữa hệ thống điều hòa công nghiệp' },
  { year: '2017', event: 'Hoàn thành 50 dự án đầu tiên, mở rộng sang lĩnh vực VRV/VRF và Chiller' },
  { year: '2018', event: 'Ký kết hợp tác đại lý ủy quyền Carrier & Daikin Vietnam' },
  { year: '2020', event: 'Đạt chứng chỉ ISO 9001:2015, đội ngũ lên 50+ kỹ sư chuyên nghiệp' },
  { year: '2022', event: 'Hoàn thành dự án nghìn TR: Nhà Máy Nhiệt Điện Hải Phòng; đội ngũ vượt 100 kỹ sư' },
  { year: '2026', event: 'Vượt mốc 500 dự án, khẳng định vị thế đơn vị HVAC uy tín hàng đầu miền Bắc' },
]

const CERTIFICATES = [
  { icon: '🏆', name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng', issuedBy: 'Bureau Veritas', year: '2021', color: '#0066ff' },
  { icon: '🔥', name: 'Chứng chỉ PCCC', desc: 'Phòng cháy chữa cháy số 247/CN-PCCC', issuedBy: 'Cảnh sát PCCC TP.HN', year: '2023', color: '#dc2626' },
  { icon: '🏗️', name: 'Giấy phép Xây dựng', desc: 'Giấy phép thi công cơ điện M&E', issuedBy: 'Bộ Xây Dựng', year: '2020', color: '#ea580c' },
  { icon: '❄️', name: 'Đại lý Daikin', desc: 'Đại lý ủy quyền chính thức Daikin VN', issuedBy: 'Daikin Vietnam', year: '2018', color: '#0099cc' },
  { icon: '🌡️', name: 'Đại lý Carrier', desc: 'Đối tác phân phối Carrier SE Asia', issuedBy: 'Carrier Corporation', year: '2015', color: '#0066cc' },
  { icon: '📋', name: 'Chứng chỉ EPC', desc: 'Năng lực thiết kế, mua sắm, thi công', issuedBy: 'Hiệp hội Nhà thầu VN', year: '2022', color: '#7c3aed' },
]

const TEAM = [
  { role: 'Kỹ sư thiết kế HVAC', count: 15, cert: 'Bằng kỹ sư + ASHRAE cert', color: '#0066ff' },
  { role: 'Kỹ sư giám sát thi công', count: 20, cert: 'Bằng kỹ sư + Chứng chỉ PCCC', color: '#0099cc' },
  { role: 'Kỹ thuật viên lắp đặt', count: 40, cert: 'Trung cấp/CĐ chuyên ngành', color: '#3366cc' },
  { role: 'Kỹ thuật viên bảo trì', count: 25, cert: 'Chứng chỉ vận hành thiết bị lạnh', color: '#6633cc' },
  { role: 'Kỹ sư điện - tự động hóa', count: 10, cert: 'Bằng kỹ sư điện', color: '#009966' },
  { role: 'Quản lý dự án', count: 8, cert: 'PMP / PMI certified', color: '#cc6600' },
]

const EQUIPMENT = [
  { emoji: '📊', item: 'Phần mềm HAP 5.0, Trace 700 tính tải nhiệt' },
  { emoji: '✏️', item: 'AutoCAD MEP, Revit MEP thiết kế kỹ thuật' },
  { emoji: '🔬', item: 'Máy đo lưu lượng gió, nhiệt độ/độ ẩm chuyên dụng' },
  { emoji: '🔩', item: 'Thiết bị hàn đồng, thép không gỉ đường ống lạnh' },
  { emoji: '⚗️', item: 'Bộ nạp ga lạnh chuyên nghiệp R22, R32, R410A' },
  { emoji: '🔧', item: 'Máy khoan, cắt, uốn ống tự động CNC' },
  { emoji: '🏗️', item: 'Cần trục và xe nâng hàng phục vụ thiết bị nặng' },
  { emoji: '🧪', item: 'Thiết bị pressure testing: khí N2, thử bằng nước' },
]

const BIG_STATS = [
  { value: '10+', label: 'Năm kinh nghiệm', color: '#0066ff' },
  { value: '500+', label: 'Dự án hoàn thành', color: '#3385ff' },
  { value: '100+', label: 'Kỹ sư & KTV', color: '#60a5fa' },
  { value: '6', label: 'Chứng chỉ & giấy phép', color: '#93c5fd' },
]

export default async function CapabilityPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1), transparent)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="section-badge-dark mb-5 inline-flex">🏆 Năng lực</span>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Năng Lực
                <br />
                <span className="gradient-text">FAVE Vietnam</span>
              </h1>
              <p className="text-white/55 max-w-2xl text-base leading-relaxed">
                Đội ngũ kỹ sư chuyên sâu, trang thiết bị hiện đại, chứng chỉ quốc tế —
                FAVE sẵn sàng đáp ứng mọi yêu cầu kỹ thuật HVAC phức tạp nhất
              </p>
            </div>
            <a
              href="/files/ho-so-nang-luc-fave.pdf"
              download
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
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
                <div
                  className="text-5xl font-black mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">📅 Lịch sử</span>
            <h2 className="text-3xl font-black text-slate-900">Hành Trình <span className="text-blue-600">15 Năm</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-12 sm:left-1/2 top-0 bottom-0 w-px bg-blue-100 -translate-x-1/2 hidden sm:block" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Year badge */}
                  <div
                    className="w-24 flex-shrink-0 text-right"
                    style={i % 2 !== 0 ? { textAlign: 'left' } : {}}
                  >
                    <span
                      className="inline-flex items-center justify-center w-16 h-8 rounded-full text-sm font-black text-white"
                      style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg shadow-blue-500/30" style={{ top: '8px' }} />

                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className="p-4 rounded-xl text-sm text-slate-600 leading-relaxed"
                      style={{ background: 'white', border: '1px solid rgba(0,102,255,0.08)' }}
                    >
                      {item.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🏅 Chứng chỉ</span>
            <h2 className="text-3xl font-black text-slate-900">Chứng Chỉ & <span className="text-blue-600">Giấy Phép</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'white', border: '1px solid rgba(0,102,255,0.06)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${cert.color}10` }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{cert.desc}</div>
                    <div className="text-xs mt-1.5 font-medium" style={{ color: cert.color }}>
                      {cert.issuedBy} · {cert.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">👥 Đội ngũ</span>
            <h2 className="text-3xl font-black text-slate-900">Đội Ngũ <span className="text-blue-600">Kỹ Thuật</span></h2>
            <div className="section-divider mx-auto mt-4" />
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
              118 kỹ sư và kỹ thuật viên được đào tạo chuyên nghiệp, có kinh nghiệm thực chiến tại các dự án lớn
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl hover:shadow-md transition-all duration-300"
                style={{ background: 'white', border: '1px solid rgba(0,102,255,0.06)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)` }}
                >
                  {member.count}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{member.role}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{member.cert}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🔧 Thiết bị</span>
            <h2 className="text-3xl font-black text-slate-900">Trang Thiết Bị <span className="text-blue-600">Thi Công</span></h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EQUIPMENT.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl hover:shadow-md transition-all"
                style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}
              >
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-500 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item.item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">📄 Hồ sơ năng lực</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Tải Hồ Sơ Năng Lực FAVE
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Hồ sơ năng lực chi tiết với đầy đủ thông tin về dự án tiêu biểu,
            chứng chỉ, đội ngũ kỹ thuật và trang thiết bị thi công
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/files/ho-so-nang-luc-fave.pdf"
              download
              className="btn-primary"
            >
              <Download size={18} />
              Tải hồ sơ năng lực (PDF)
            </a>
            <Link
              href="/lien-he"
              className="btn-outline"
            >
              <Phone size={16} />
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
