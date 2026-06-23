import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, Phone, ArrowRight, ChevronRight } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
  if (!service) return { title: `Dịch vụ | ${t('siteName')}` }

  return {
    title: `${locale === 'vi' ? service.titleVi : service.titleEn} | ${t('siteName')}`,
    description: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
  }
}

const SERVICE_CONTENT: Record<string, {
  titleVi: string
  descVi: string
  problems: string[]
  solutions: string[]
  process: { step: number; title: string; desc: string }[]
  benefits: string[]
  faqs: { q: string; a: string }[]
}> = {
  'dieu-hoa-trung-tam': {
    titleVi: 'Điều Hòa Trung Tâm (Chiller System)',
    descVi: 'Chúng tôi cung cấp giải pháp toàn diện về hệ thống điều hòa không khí trung tâm sử dụng Chiller water-cooled hoặc air-cooled, AHU, FCU cho các công trình quy mô lớn.',
    problems: [
      'Môi trường làm việc quá nóng, ảnh hưởng năng suất nhân viên',
      'Chi phí điện năng cao do hệ thống lỗi thời, không hiệu quả',
      'Tiếng ồn lớn gây khó chịu trong không gian văn phòng',
      'Phân bổ nhiệt độ không đồng đều giữa các tầng, khu vực',
      'Hệ thống hiện tại thường xuyên hỏng hóc, bảo trì tốn kém',
    ],
    solutions: [
      'Chiller trục vít / ly tâm tiết kiệm năng lượng COP > 6.0',
      'Biến tần VFD cho bơm và quạt AHU/FCU, tiết kiệm 30-40% điện năng',
      'Hệ thống điều khiển tự động BACnet/Modbus tích hợp BMS',
      'Thiết kế phân vùng nhiệt độ linh hoạt, đáp ứng mọi yêu cầu',
      'Tháp giải nhiệt hiệu suất cao, tiêu thụ nước tối ưu',
    ],
    process: [
      { step: 1, title: 'Khảo sát & phân tích', desc: 'Khảo sát hiện trường, đo đạc không gian, phân tích tải nhiệt và yêu cầu kỹ thuật' },
      { step: 2, title: 'Thiết kế giải pháp', desc: 'Tính toán tải nhiệt bằng phần mềm, lựa chọn thiết bị phù hợp và thiết kế bản vẽ kỹ thuật' },
      { step: 3, title: 'Báo giá & ký hợp đồng', desc: 'Lập dự toán chi tiết, minh bạch và ký kết hợp đồng với cam kết tiến độ, chất lượng' },
      { step: 4, title: 'Cung cấp thiết bị', desc: 'Nhập khẩu và kiểm tra thiết bị chính hãng tại kho trước khi lắp đặt' },
      { step: 5, title: 'Lắp đặt & vận hành', desc: 'Thi công theo đúng thiết kế, vận hành thử nghiệm và hiệu chỉnh hệ thống' },
      { step: 6, title: 'Bàn giao & bảo trì', desc: 'Bàn giao hồ sơ hoàn công, hướng dẫn vận hành và ký hợp đồng bảo trì định kỳ' },
    ],
    benefits: [
      'Tiết kiệm 30-50% chi phí điện năng so với hệ thống cũ',
      'Tuổi thọ thiết bị 15-20 năm với bảo trì đúng cách',
      'Môi trường làm việc tiện nghi, tăng năng suất 15-20%',
      'Hệ thống điều khiển thông minh, quản lý từ xa',
      'Bảo hành thiết bị 1-2 năm, bảo hành công trình 12 tháng',
      'Đáp ứng tiêu chuẩn ASHRAE 90.1 về tiết kiệm năng lượng',
    ],
    faqs: [
      { q: 'Thời gian hoàn thiện một dự án điều hòa trung tâm?', a: 'Tùy quy mô dự án, thông thường từ 2-6 tháng kể từ khi ký hợp đồng.' },
      { q: 'FAVE có cam kết tiến độ không?', a: 'Có. Chúng tôi ký cam kết tiến độ trong hợp đồng và có chế tài phạt nếu trễ tiến độ.' },
      { q: 'Thiết bị có bảo hành không?', a: 'Thiết bị được bảo hành từ 12-24 tháng tùy hãng, công trình bảo hành 12 tháng sau bàn giao.' },
      { q: 'Có hỗ trợ bảo trì sau lắp đặt không?', a: 'Có dịch vụ bảo trì định kỳ 24/7 với đội ngũ kỹ thuật viên chuyên nghiệp.' },
    ],
  },
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return []
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const content = SERVICE_CONTENT[slug]
  if (!content) {
    // Try database
    const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
    if (!service) notFound()
  }

  const data = content || {
    titleVi: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    descVi: 'Dịch vụ HVAC chuyên nghiệp từ FAVE Việt Nam.',
    problems: [],
    solutions: [],
    process: [],
    benefits: [],
    faqs: [],
  }

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/dich-vu" className="hover:text-[#00a0e9]">Dịch vụ</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3a5c] font-medium">{data.titleVi}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{data.titleVi}</h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">{data.descVi}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/lien-he" className="flex items-center gap-2 px-6 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all">
              <Phone size={16} /> Liên hệ báo giá
            </Link>
            <a href="tel:0981907109" className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
              0981 907 109
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problems */}
            {data.problems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a3a5c] mb-5">Vấn đề khách hàng thường gặp</h2>
                <ul className="space-y-2">
                  {data.problems.map((p) => (
                    <li key={p} className="flex gap-3 text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Solutions */}
            {data.solutions.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a3a5c] mb-5">Giải pháp từ FAVE</h2>
                <ul className="space-y-2">
                  {data.solutions.map((s) => (
                    <li key={s} className="flex gap-3 text-gray-600">
                      <CheckCircle size={16} className="text-[#00a0e9] mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process */}
            {data.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6">Quy trình thực hiện</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.process.map((step) => (
                    <div key={step.step} className="flex gap-4 p-4 bg-[#f7f9fc] rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1a3a5c] text-sm mb-1">{step.title}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {data.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a3a5c] mb-5">Lợi ích khi chọn FAVE</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.benefits.map((b) => (
                    <div key={b} className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a3a5c] mb-5">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                  {data.faqs.map((faq) => (
                    <div key={faq.q} className="border border-gray-100 rounded-xl p-5">
                      <h3 className="font-semibold text-[#1a3a5c] mb-2">{faq.q}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Liên hệ tư vấn miễn phí</h3>
              <p className="text-gray-300 text-sm mb-5">Chuyên gia FAVE sẵn sàng tư vấn và báo giá trong 24h làm việc</p>
              <div className="space-y-2">
                <a href="tel:0981907109" className="flex items-center gap-2 w-full py-2.5 bg-[#00a0e9] text-white rounded-lg text-sm font-semibold justify-center hover:bg-[#0080c0] transition-colors">
                  <Phone size={15} /> 0981 907 109
                </a>
                <Link href="/lien-he" className="flex items-center gap-2 w-full py-2.5 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-semibold justify-center hover:bg-white/20 transition-colors">
                  Gửi yêu cầu <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bg-[#f7f9fc] rounded-xl p-6">
              <h3 className="font-bold text-[#1a3a5c] mb-4">Dịch vụ liên quan</h3>
              <ul className="space-y-2">
                {[
                  { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng' },
                  { slug: 'tu-van-thiet-ke', label: 'Tư vấn thiết kế' },
                  { slug: 'he-thong-bms', label: 'Hệ thống BMS' },
                ].map((item) => (
                  <li key={item.slug}>
                    <Link href={`/dich-vu/${item.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00a0e9] transition-colors">
                      <ChevronRight size={14} className="text-[#00a0e9]" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
