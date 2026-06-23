import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, Calendar, Building2, ChevronRight, User, ArrowRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return { title: `Dự án | ${t('siteName')}` }
}

const PROJECT_DATA: Record<string, {
  title: string
  client: string
  location: string
  scale: string
  sector: string
  year: string
  desc: string
  challenge: string
  solution: string
  result: string[]
}> = {
  'unilever-bac-ninh': {
    title: 'Nhà Máy Unilever Bắc Ninh',
    client: 'Unilever Vietnam Ltd.',
    location: 'Khu Công Nghiệp Khai Sơn, Thuận Thành, Bắc Ninh',
    scale: '500TR (1.758 kW)',
    sector: 'Công nghiệp thực phẩm & tiêu dùng',
    year: '2023',
    desc: 'Thiết kế và lắp đặt hệ thống điều hòa không khí toàn nhà máy sản xuất hàng tiêu dùng của Unilever tại Bắc Ninh, đảm bảo môi trường sản xuất đạt tiêu chuẩn GMP và tối ưu năng lượng.',
    challenge: 'Nhà máy hoạt động 24/7 với yêu cầu kiểm soát nhiệt độ và độ ẩm chính xác cho từng khu vực sản xuất khác nhau (kho nguyên liệu, xưởng sản xuất, khu đóng gói). Yêu cầu hệ thống phải liên tục không được gián đoạn và tiết kiệm năng lượng tối đa.',
    solution: 'Áp dụng hệ thống Chiller trục vít Carrier 30XA x4 (125TR/máy) kết hợp biến tần VFD cho bơm và quạt AHU. Hệ thống BMS tích hợp giám sát và điều khiển tự động, tối ưu tải lạnh theo thời gian thực.',
    result: [
      'Tiết kiệm 35% chi phí điện năng so với hệ thống cũ',
      'Duy trì nhiệt độ ±0.5°C, độ ẩm ±3% RH tại mọi khu vực',
      'Uptime hệ thống đạt 99.8% trong 12 tháng đầu vận hành',
      'ROI dự kiến hoàn vốn trong 4 năm',
      'Bàn giao đúng tiến độ, đảm bảo không gián đoạn sản xuất',
    ],
  },
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const data = PROJECT_DATA[slug] || PROJECT_DATA['unilever-bac-ninh']

  return (
    <div className="pt-[88px]">
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/du-an" className="hover:text-[#00a0e9]">Dự án</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3a5c]">{data.title}</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-[#00a0e9]/20 border border-[#00a0e9]/30 rounded-full px-3 py-1 text-sm font-medium mb-4">
            {data.sector}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">{data.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2"><User size={15} className="text-[#00a0e9]" />{data.client}</div>
            <div className="flex items-center gap-2"><MapPin size={15} className="text-[#00a0e9]" />{data.location}</div>
            <div className="flex items-center gap-2"><Building2 size={15} className="text-[#00a0e9]" />Quy mô: {data.scale}</div>
            <div className="flex items-center gap-2"><Calendar size={15} className="text-[#00a0e9]" />Hoàn thành: {data.year}</div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Image gallery placeholder */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${i === 1 ? 'col-span-2 h-56' : 'h-56'} bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center`}>
                  <Building2 size={i === 1 ? 56 : 36} className="text-white/20" />
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-3">Tổng quan dự án</h2>
              <p className="text-gray-600 leading-relaxed">{data.desc}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-3">Thách thức</h2>
              <p className="text-gray-600 leading-relaxed">{data.challenge}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-3">Giải pháp FAVE</h2>
              <p className="text-gray-600 leading-relaxed">{data.solution}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1a3a5c] mb-4">Kết quả đạt được</h2>
              <ul className="space-y-3">
                {data.result.map((r) => (
                  <li key={r} className="flex gap-3 text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-[#00a0e9] mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#f7f9fc] rounded-xl p-5">
              <h3 className="font-bold text-[#1a3a5c] mb-4">Thông tin dự án</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Khách hàng', value: data.client },
                  { label: 'Địa điểm', value: data.location },
                  { label: 'Quy mô', value: data.scale },
                  { label: 'Lĩnh vực', value: data.sector },
                  { label: 'Năm hoàn thành', value: data.year },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <dt className="font-medium text-gray-500">{item.label}</dt>
                    <dd className="text-gray-700">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white rounded-xl p-5">
              <h3 className="font-bold mb-3">Dự án tương tự?</h3>
              <p className="text-gray-300 text-sm mb-4">Liên hệ để được tư vấn giải pháp phù hợp</p>
              <Link href="/lien-he" className="flex items-center gap-2 w-full py-2.5 bg-[#00a0e9] text-white rounded-lg text-sm font-semibold justify-center hover:bg-[#0080c0] transition-colors">
                Liên hệ ngay <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
