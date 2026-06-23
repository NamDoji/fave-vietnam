import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Package, Phone, ArrowRight, ChevronRight, CheckCircle } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return { title: `Sản phẩm ${slug} | ${t('siteName')}` }
}

const PRODUCT_DATA: Record<string, {
  name: string
  category: string
  desc: string
  specs: { label: string; value: string }[]
  applications: string[]
  features: string[]
}> = {
  'may-nen-truc-vit-carrier-30xa': {
    name: 'Máy Nén Trục Vít Carrier 30XA',
    category: 'Máy Nén',
    desc: 'Máy làm lạnh nước (water chiller) sử dụng máy nén trục vít công suất cao 100-400TR từ Carrier, hiệu suất COP vượt trội phù hợp cho hệ thống làm lạnh công nghiệp và thương mại quy mô lớn.',
    specs: [
      { label: 'Công suất lạnh', value: '100-400 TR (350-1400 kW)' },
      { label: 'COP danh nghĩa', value: '3.1-4.2 kW/kW' },
      { label: 'IPLV', value: '6.1 kW/kW' },
      { label: 'Môi chất lạnh', value: 'R-134a' },
      { label: 'Nguồn điện', value: '380V/3ph/50Hz' },
      { label: 'Dải nhiệt độ nước lạnh', value: '5-15°C' },
    ],
    applications: [
      'Tòa nhà văn phòng, trung tâm thương mại',
      'Khách sạn, resort cao cấp',
      'Bệnh viện, trung tâm y tế',
      'Nhà máy sản xuất công nghiệp',
      'Trung tâm dữ liệu (Data Center)',
    ],
    features: [
      'Máy nén trục vít hiệu suất cao',
      'Điều khiển tốc độ biến tần VFD',
      'Giao tiếp BACnet/Modbus cho BMS',
      'Màn hình HMI cảm ứng',
      'Hệ thống kiểm soát dầu tích hợp',
    ],
  },
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

  const data = PRODUCT_DATA[slug] || PRODUCT_DATA['may-nen-truc-vit-carrier-30xa']

  return (
    <div className="pt-[88px]">
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/san-pham" className="hover:text-[#00a0e9]">Sản phẩm</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3a5c]">{data.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          {/* Image */}
          <div className="h-96 bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f7] rounded-2xl flex items-center justify-center">
            <Package size={96} className="text-[#1a3a5c]/20" />
          </div>

          {/* Info */}
          <div>
            <div className="text-sm text-[#00a0e9] font-medium mb-2">{data.category}</div>
            <h1 className="text-3xl font-bold text-[#1a3a5c] mb-4">{data.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{data.desc}</p>

            <h3 className="font-bold text-[#1a3a5c] mb-3">Tính năng nổi bật</h3>
            <ul className="space-y-2 mb-6">
              {data.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-gray-600">
                  <CheckCircle size={15} className="text-[#00a0e9] shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/lien-he" className="flex items-center gap-2 px-5 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all">
                <Phone size={15} /> Liên hệ báo giá
              </Link>
              <a href="tel:0981907109" className="flex items-center gap-2 px-5 py-3 border-2 border-[#1a3a5c] text-[#1a3a5c] font-semibold rounded-lg hover:bg-[#1a3a5c] hover:text-white transition-all">
                0981 907 109
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Specs */}
          <div>
            <h2 className="text-xl font-bold text-[#1a3a5c] mb-5">Thông Số Kỹ Thuật</h2>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              {data.specs.map((spec, i) => (
                <div key={spec.label} className={`flex ${i % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                  <div className="px-4 py-3 font-medium text-gray-700 text-sm w-44 shrink-0 border-r border-gray-100">
                    {spec.label}
                  </div>
                  <div className="px-4 py-3 text-gray-600 text-sm">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h2 className="text-xl font-bold text-[#1a3a5c] mb-5">Ứng Dụng</h2>
            <ul className="space-y-3">
              {data.applications.map((app) => (
                <li key={app} className="flex gap-3 p-3 bg-[#f7f9fc] rounded-lg text-sm text-gray-600">
                  <ArrowRight size={15} className="text-[#00a0e9] shrink-0 mt-0.5" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
