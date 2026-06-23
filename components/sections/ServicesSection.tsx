import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, Thermometer, Wind, Snowflake, Settings, Shield, Wrench, Sun, Droplets, Zap } from 'lucide-react'

const SERVICES = [
  {
    icon: Thermometer,
    slug: 'dieu-hoa-trung-tam',
    titleVi: 'Điều Hòa Trung Tâm',
    descVi: 'Thiết kế, cung cấp và lắp đặt hệ thống điều hòa trung tâm cho tòa nhà văn phòng, trung tâm thương mại.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Wind,
    slug: 'thong-gio-cong-nghiep',
    titleVi: 'Thông Gió Công Nghiệp',
    descVi: 'Hệ thống thông gió và xử lý không khí cho nhà máy, xưởng sản xuất đảm bảo môi trường làm việc an toàn.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Snowflake,
    slug: 'he-thong-lanh',
    titleVi: 'Hệ Thống Lạnh',
    descVi: 'Hệ thống làm lạnh công nghiệp, kho lạnh, buồng đông lạnh cho ngành thực phẩm và dược phẩm.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Zap,
    slug: 'vrv-vrf',
    titleVi: 'Hệ Thống VRV/VRF',
    descVi: 'Công nghệ VRV/VRF tiết kiệm năng lượng vượt trội, kiểm soát nhiệt độ chính xác từng khu vực.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Shield,
    slug: 'xu-ly-khong-khi-sach',
    titleVi: 'Xử Lý Không Khí Sạch',
    descVi: 'Hệ thống lọc và xử lý không khí sạch cho phòng sạch, bệnh viện, phòng thí nghiệm đạt chuẩn GMP.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Wrench,
    slug: 'bao-tri-bao-duong',
    titleVi: 'Bảo Trì Bảo Dưỡng',
    descVi: 'Dịch vụ bảo trì, bảo dưỡng định kỳ và sửa chữa khẩn cấp cho tất cả loại thiết bị HVAC.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Sun,
    slug: 'tu-van-thiet-ke',
    titleVi: 'Tư Vấn & Thiết Kế',
    descVi: 'Tư vấn giải pháp kỹ thuật và thiết kế hệ thống HVAC tối ưu cho từng loại công trình.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Droplets,
    slug: 'xu-ly-nuoc-lam-mat',
    titleVi: 'Xử Lý Nước Làm Mát',
    descVi: 'Hệ thống xử lý nước làm mát tháp giải nhiệt, đảm bảo hiệu suất và tuổi thọ thiết bị.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Settings,
    slug: 'he-thong-bms',
    titleVi: 'Hệ Thống BMS',
    descVi: 'Hệ thống quản lý tòa nhà (BMS) tích hợp điều khiển HVAC thông minh, tiết kiệm năng lượng.',
    color: 'from-slate-500 to-slate-600',
  },
]

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mb-4">{t('title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('description')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.slug}
                href={href(`/dich-vu/${service.slug}`)}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-[#1a3a5c] mb-2 group-hover:text-[#00a0e9] transition-colors">
                  {service.titleVi}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.descVi}
                </p>
                <span className="flex items-center gap-1 text-[#00a0e9] text-sm font-medium">
                  {t('viewDetail')} <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href={href('/dich-vu')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a3a5c] text-[#1a3a5c] font-semibold rounded-lg hover:bg-[#1a3a5c] hover:text-white transition-all"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
