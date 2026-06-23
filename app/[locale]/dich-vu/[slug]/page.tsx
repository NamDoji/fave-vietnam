import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, Phone, ArrowRight, ChevronRight, Download } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const content = SERVICE_CONTENT[slug]
  if (!content) {
    const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
    if (!service) return { title: `Dịch vụ | ${t('siteName')}` }
    return {
      title: `${locale === 'vi' ? service.titleVi : service.titleEn} | ${t('siteName')}`,
      description: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
    }
  }
  return {
    title: `${content.titleVi} | ${t('siteName')}`,
    description: content.descVi.slice(0, 160),
  }
}

const SERVICE_CONTENT: Record<string, {
  titleVi: string
  emoji: string
  color: string
  descVi: string
  problems: string[]
  solutions: string[]
  process: { step: number; title: string; desc: string }[]
  benefits: string[]
  faqs: { q: string; a: string }[]
  relatedServices: { slug: string; label: string; emoji: string }[]
}> = {
  'dieu-hoa-trung-tam': {
    titleVi: 'Điều Hòa Trung Tâm (Chiller System)',
    emoji: '❄️',
    color: '#0066ff',
    descVi:
      'Giải pháp toàn diện về hệ thống điều hòa không khí trung tâm sử dụng Chiller water-cooled hoặc air-cooled, AHU, FCU cho các công trình quy mô lớn từ 50TR đến hàng nghìn TR.',
    problems: [
      'Môi trường làm việc quá nóng, ảnh hưởng năng suất nhân viên',
      'Chi phí điện năng cao do hệ thống lỗi thời, hiệu suất thấp',
      'Tiếng ồn lớn từ thiết bị cũ gây khó chịu',
      'Phân bổ nhiệt độ không đồng đều giữa các tầng',
      'Hệ thống thường xuyên hỏng hóc, chi phí bảo trì cao',
    ],
    solutions: [
      'Chiller trục vít / ly tâm tiết kiệm năng lượng COP > 6.0',
      'Biến tần VFD cho bơm và quạt AHU/FCU, tiết kiệm 30-40% điện',
      'Hệ thống điều khiển tự động BACnet/Modbus tích hợp BMS',
      'Thiết kế phân vùng nhiệt độ linh hoạt cho từng khu vực',
      'Tháp giải nhiệt hiệu suất cao, tiêu thụ nước tối ưu',
    ],
    process: [
      { step: 1, title: 'Khảo sát & phân tích', desc: 'Khảo sát hiện trường, đo đạc không gian, phân tích tải nhiệt và yêu cầu kỹ thuật chi tiết.' },
      { step: 2, title: 'Thiết kế giải pháp', desc: 'Tính toán tải nhiệt bằng HAP/Trace 700, lựa chọn thiết bị tối ưu, thiết kế bản vẽ AutoCAD MEP.' },
      { step: 3, title: 'Báo giá & ký hợp đồng', desc: 'Lập dự toán chi tiết, minh bạch và ký kết hợp đồng với cam kết tiến độ rõ ràng.' },
      { step: 4, title: 'Cung cấp thiết bị', desc: 'Nhập khẩu và kiểm tra thiết bị chính hãng tại kho trước khi lắp đặt.' },
      { step: 5, title: 'Lắp đặt & vận hành', desc: 'Thi công theo đúng thiết kế, vận hành thử nghiệm và hiệu chỉnh hệ thống.' },
      { step: 6, title: 'Bàn giao & bảo trì', desc: 'Bàn giao hồ sơ hoàn công, hướng dẫn vận hành và ký hợp đồng bảo trì định kỳ.' },
    ],
    benefits: [
      'Tiết kiệm 30-50% chi phí điện so với hệ thống cũ',
      'Tuổi thọ thiết bị 15-20 năm khi bảo trì đúng cách',
      'Môi trường tiện nghi, tăng năng suất 15-20%',
      'Điều khiển thông minh, giám sát từ xa 24/7',
      'Bảo hành thiết bị 1-2 năm, công trình 12 tháng',
      'Đáp ứng tiêu chuẩn ASHRAE 90.1 về tiết kiệm năng lượng',
    ],
    faqs: [
      { q: 'Thời gian hoàn thiện một dự án điều hòa trung tâm?', a: 'Tùy quy mô, thông thường từ 2-6 tháng kể từ ký hợp đồng.' },
      { q: 'FAVE có cam kết tiến độ không?', a: 'Có. Cam kết tiến độ trong hợp đồng với chế tài phạt nếu trễ.' },
      { q: 'Thiết bị có bảo hành không?', a: 'Bảo hành 12-24 tháng tùy hãng, công trình bảo hành 12 tháng sau bàn giao.' },
      { q: 'Có hỗ trợ bảo trì sau lắp đặt không?', a: 'Có dịch vụ bảo trì định kỳ và khẩn cấp 24/7 toàn quốc.' },
    ],
    relatedServices: [
      { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
      { slug: 'tu-van-thiet-ke', label: 'Tư vấn thiết kế', emoji: '📐' },
      { slug: 'he-thong-bms', label: 'Hệ thống BMS', emoji: '🖥️' },
    ],
  },
  'thong-gio-cong-nghiep': {
    titleVi: 'Thông Gió Công Nghiệp',
    emoji: '🌀',
    color: '#0099cc',
    descVi:
      'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất, dệt may. Đảm bảo môi trường làm việc an toàn và đạt tiêu chuẩn QCVN.',
    problems: [
      'Nhiệt độ xưởng sản xuất quá cao, công nhân làm việc kém hiệu quả',
      'Khói, bụi, hơi hóa chất gây nguy hiểm sức khỏe',
      'Hệ thống thông gió cũ không đáp ứng lưu lượng gió cần thiết',
      'Tiêu chuẩn môi trường làm việc không đạt QCVN',
      'Chi phí điện cao cho hệ thống thông gió hoạt động liên tục',
    ],
    solutions: [
      'Thiết kế hệ thống cấp/hút theo ACGIH và QCVN',
      'Quạt hướng trục, ly tâm áp suất cao hiệu suất vượt trội',
      'Hệ thống lọc bụi túi vải, lọc tĩnh điện cho môi trường độc hại',
      'Biến tần VFD điều tốc quạt theo nhu cầu thực tế',
      'Hệ thống đo kiểm chất lượng không khí online',
    ],
    process: [
      { step: 1, title: 'Khảo sát', desc: 'Đo đạc lưu lượng gió, nhiệt độ, bụi và chất gây ô nhiễm tại xưởng.' },
      { step: 2, title: 'Thiết kế', desc: 'Tính toán cân bằng áp suất, chọn thiết bị và thiết kế đường ống.' },
      { step: 3, title: 'Thi công', desc: 'Lắp đặt hệ thống theo đúng thiết kế kỹ thuật đã phê duyệt.' },
      { step: 4, title: 'Nghiệm thu', desc: 'Đo kiểm lưu lượng, áp suất và kiểm tra chất lượng không khí.' },
    ],
    benefits: [
      'Môi trường làm việc đạt tiêu chuẩn QCVN 24:2016',
      'Giảm nguy cơ tai nạn lao động và bệnh nghề nghiệp',
      'Tiết kiệm điện 25-35% với hệ thống biến tần',
      'Tuổi thọ thiết bị 10-15 năm',
    ],
    faqs: [
      { q: 'Tiêu chuẩn thông gió công nghiệp nào FAVE áp dụng?', a: 'ACGIH, QCVN 24:2016/BYT, ASHRAE 62.1 và các tiêu chuẩn quốc tế.' },
      { q: 'Thời gian thi công hệ thống thông gió nhà máy?', a: 'Từ 4-8 tuần tùy quy mô nhà máy.' },
    ],
    relatedServices: [
      { slug: 'xu-ly-khong-khi-sach', label: 'Xử lý không khí sạch', emoji: '🧪' },
      { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
    ],
  },
}

const DEFAULT_CONTENT = {
  problems: [] as string[],
  solutions: [] as string[],
  process: [] as { step: number; title: string; desc: string }[],
  benefits: [] as string[],
  faqs: [] as { q: string; a: string }[],
  relatedServices: [
    { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
    { slug: 'tu-van-thiet-ke', label: 'Tư vấn thiết kế', emoji: '📐' },
    { slug: 'he-thong-bms', label: 'Hệ thống BMS', emoji: '🖥️' },
  ],
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return []
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const content = SERVICE_CONTENT[slug]

  if (!content) {
    const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
    if (!service) notFound()
    const data = {
      titleVi: locale === 'vi' ? service.titleVi : service.titleEn,
      emoji: '⚙️',
      color: '#0066ff',
      descVi: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
      ...DEFAULT_CONTENT,
    }
    return <ServiceDetailContent data={data} />
  }

  return <ServiceDetailContent data={content} />
}

function ServiceDetailContent({ data }: {
  data: {
    titleVi: string
    emoji: string
    color: string
    descVi: string
    problems: string[]
    solutions: string[]
    process: { step: number; title: string; desc: string }[]
    benefits: string[]
    faqs: { q: string; a: string }[]
    relatedServices: { slug: string; label: string; emoji: string }[]
  }
}) {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f8faff', borderBottom: '1px solid #e8f0ff' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight size={14} className="opacity-40" />
          <Link href="/dich-vu" className="hover:text-blue-600 transition-colors">Dịch vụ</Link>
          <ChevronRight size={14} className="opacity-40" />
          <span className="text-slate-900 font-medium">{data.titleVi}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6"
              style={{ background: `${data.color}15` }}
            >
              {data.emoji}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {data.titleVi}
            </h1>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
              {data.descVi}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/lien-he" className="btn-primary text-sm">
                <Phone size={15} /> Liên hệ báo giá <ArrowRight size={14} />
              </Link>
              <a href="tel:0981907109" className="btn-outline text-sm">
                0981 907 109
              </a>
              <a
                href="/files/ho-so-nang-luc-fave.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-white/45 hover:text-white/70 text-sm font-medium transition-colors"
              >
                <Download size={14} />
                Hồ sơ năng lực
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Problems */}
            {data.problems.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  🎯 Vấn đề khách hàng thường gặp
                </h2>
                <ul className="space-y-3">
                  {data.problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.08)' }}>
                      <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                      <span className="text-slate-600 text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Solutions */}
            {data.solutions.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  ✅ Giải pháp từ FAVE
                </h2>
                <ul className="space-y-3">
                  {data.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.08)' }}>
                      <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process */}
            {data.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">
                  🔄 Quy trình thực hiện
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.process.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-5 rounded-xl"
                      style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}
                      >
                        {step.step}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                        <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {data.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  💡 Lợi ích khi chọn FAVE
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  ❓ Câu hỏi thường gặp
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{ border: '1px solid rgba(0,102,255,0.08)', background: 'rgba(0,102,255,0.02)' }}
                    >
                      <h3 className="font-bold text-slate-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'linear-gradient(160deg, #0a1628, #0d2040)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-bold text-white text-lg mb-2">Liên hệ tư vấn miễn phí</h3>
              <p className="text-white/50 text-sm mb-6">Kỹ sư FAVE tư vấn và báo giá trong 24h làm việc</p>
              <div className="space-y-2">
                <a
                  href="tel:0981907109"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors"
                >
                  <Phone size={15} /> 0981 907 109
                </a>
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Gửi yêu cầu <ArrowRight size={14} />
                </Link>
                <a
                  href="/files/ho-so-nang-luc-fave.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-white/50 text-sm transition-colors hover:text-white/80"
                >
                  <Download size={14} /> Tải hồ sơ năng lực
                </a>
              </div>
            </div>

            {/* Related services */}
            <div
              className="rounded-2xl p-5"
              style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}
            >
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Dịch vụ liên quan</h3>
              <ul className="space-y-2">
                {data.relatedServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/dich-vu/${item.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={14} className="ml-auto opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why FAVE */}
            <div className="rounded-2xl p-5" style={{ border: '1px solid rgba(0,102,255,0.1)', background: 'rgba(0,102,255,0.02)' }}>
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Tại sao chọn FAVE?</h3>
              {[
                '✅ 15+ năm kinh nghiệm HVAC',
                '✅ ISO 9001:2015',
                '✅ Đại lý Daikin & Carrier',
                '✅ Đội ngũ 100+ kỹ sư',
                '✅ Bảo hành 12 tháng',
              ].map((item, i) => (
                <div key={i} className="text-sm text-slate-600 py-1.5 border-b border-slate-100 last:border-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
