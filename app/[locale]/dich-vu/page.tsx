import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Thermometer, Wind, Snowflake, Zap, Shield, Wrench, Sun, Droplets, Settings } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Dịch Vụ HVAC | ${t('siteName')}`,
    description: 'Cung cấp đầy đủ các dịch vụ HVAC: điều hòa trung tâm, thông gió công nghiệp, hệ thống lạnh, VRV/VRF, xử lý không khí sạch và bảo trì.',
  }
}

const SERVICES = [
  { icon: Thermometer, slug: 'dieu-hoa-trung-tam', color: 'from-blue-500 to-blue-600',
    titleVi: 'Điều Hòa Trung Tâm', titleEn: 'Central Air Conditioning',
    descVi: 'Thiết kế, cung cấp và lắp đặt hệ thống điều hòa trung tâm (Chiller, AHU, FCU) cho tòa nhà văn phòng, trung tâm thương mại, khách sạn và bệnh viện với công suất từ 50TR đến hàng ngàn TR.',
  },
  { icon: Wind, slug: 'thong-gio-cong-nghiep', color: 'from-cyan-500 to-cyan-600',
    titleVi: 'Thông Gió Công Nghiệp', titleEn: 'Industrial Ventilation',
    descVi: 'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất, dệt may đảm bảo tiêu chuẩn môi trường làm việc an toàn và hiệu quả.',
  },
  { icon: Snowflake, slug: 'he-thong-lanh', color: 'from-indigo-500 to-indigo-600',
    titleVi: 'Hệ Thống Lạnh Công Nghiệp', titleEn: 'Industrial Refrigeration',
    descVi: 'Thiết kế và lắp đặt kho lạnh, buồng đông lạnh, hệ thống làm lạnh nhanh cho ngành thực phẩm, dược phẩm và hóa chất theo tiêu chuẩn quốc tế.',
  },
  { icon: Zap, slug: 'vrv-vrf', color: 'from-violet-500 to-violet-600',
    titleVi: 'Hệ Thống VRV/VRF', titleEn: 'VRV/VRF Systems',
    descVi: 'Giải pháp VRV/VRF tiết kiệm năng lượng vượt trội, kiểm soát nhiệt độ chính xác từng khu vực, phù hợp cho văn phòng, chung cư, chuỗi siêu thị.',
  },
  { icon: Shield, slug: 'xu-ly-khong-khi-sach', color: 'from-green-500 to-green-600',
    titleVi: 'Xử Lý Không Khí Sạch', titleEn: 'Clean Air Treatment',
    descVi: 'Hệ thống lọc và xử lý không khí sạch theo tiêu chuẩn GMP-WHO cho nhà máy dược phẩm, phòng sạch cấp ISO, bệnh viện và phòng phẫu thuật.',
  },
  { icon: Wrench, slug: 'bao-tri-bao-duong', color: 'from-orange-500 to-orange-600',
    titleVi: 'Bảo Trì Bảo Dưỡng', titleEn: 'Maintenance Services',
    descVi: 'Dịch vụ bảo trì, bảo dưỡng định kỳ và sửa chữa khẩn cấp 24/7 cho tất cả loại thiết bị HVAC. Đội ngũ kỹ thuật viên có mặt nhanh chóng trong 2-4 giờ.',
  },
  { icon: Sun, slug: 'tu-van-thiet-ke', color: 'from-yellow-500 to-yellow-600',
    titleVi: 'Tư Vấn & Thiết Kế', titleEn: 'Consulting & Design',
    descVi: 'Tư vấn giải pháp kỹ thuật và thiết kế hệ thống HVAC tối ưu bằng phần mềm chuyên nghiệp, phân tích tải nhiệt, lập dự toán chi tiết.',
  },
  { icon: Droplets, slug: 'xu-ly-nuoc-lam-mat', color: 'from-teal-500 to-teal-600',
    titleVi: 'Xử Lý Nước Làm Mát', titleEn: 'Cooling Water Treatment',
    descVi: 'Hệ thống xử lý nước làm mát tháp giải nhiệt, chống đóng cáu, ăn mòn và vi sinh vật, đảm bảo hiệu suất tối ưu và tuổi thọ thiết bị.',
  },
  { icon: Settings, slug: 'he-thong-bms', color: 'from-slate-500 to-slate-600',
    titleVi: 'Hệ Thống BMS/IBMS', titleEn: 'BMS/IBMS Systems',
    descVi: 'Hệ thống quản lý tòa nhà thông minh (BMS/IBMS) tích hợp điều khiển HVAC, giám sát năng lượng và tự động hóa, giúp tiết kiệm 20-30% chi phí năng lượng.',
  },
]

export default async function ServicesPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Dịch vụ
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Giải Pháp HVAC Toàn Diện</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Từ thiết kế, cung cấp thiết bị đến lắp đặt và bảo trì - chúng tôi là đối tác tin cậy cho mọi nhu cầu HVAC của bạn
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/dich-vu/${service.slug}`}
                  className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-[#1a3a5c] mb-3 group-hover:text-[#00a0e9] transition-colors">
                    {service.titleVi}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.descVi}</p>
                  <span className="flex items-center gap-1.5 text-[#00a0e9] text-sm font-medium">
                    Xem chi tiết <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f7f9fc]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-4">Cần tư vấn giải pháp HVAC?</h2>
          <p className="text-gray-500 mb-6">Đội ngũ kỹ sư FAVE sẵn sàng tư vấn miễn phí và báo giá nhanh trong 24 giờ làm việc</p>
          <Link href="/lien-he" className="inline-flex items-center gap-2 px-8 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-lg">
            Liên hệ báo giá ngay <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
