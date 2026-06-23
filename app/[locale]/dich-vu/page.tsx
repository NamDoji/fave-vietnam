import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Dịch Vụ HVAC Toàn Diện | ${t('siteName')}`,
    description:
      'Điều hòa trung tâm, thông gió công nghiệp, hệ thống lạnh, VRV/VRF, phòng sạch, bảo trì 24/7. FAVE Vietnam — đối tác HVAC B2B hàng đầu.',
  }
}

const SERVICES = [
  {
    emoji: '❄️',
    slug: 'dieu-hoa-trung-tam',
    titleVi: 'Điều Hòa Trung Tâm',
    tag: 'Chiller · AHU · FCU',
    descVi:
      'Thiết kế, cung cấp và lắp đặt hệ thống Chiller water-cooled/air-cooled, AHU, FCU cho tòa nhà văn phòng, TTTM, khách sạn và bệnh viện. Công suất từ 50TR đến hàng nghìn TR.',
    color: '#0066ff',
    features: ['Chiller trục vít / ly tâm COP > 6.0', 'VFD cho bơm và quạt AHU', 'Điều khiển BMS/BACnet'],
  },
  {
    emoji: '🌀',
    slug: 'thong-gio-cong-nghiep',
    titleVi: 'Thông Gió Công Nghiệp',
    tag: 'Nhà máy · Xưởng',
    descVi:
      'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất, dệt may đảm bảo môi trường làm việc an toàn, đạt tiêu chuẩn quốc gia.',
    color: '#0099cc',
    features: ['Thiết kế theo ACGIH', 'Hệ thống hút khói độc', 'Quạt công nghiệp cao áp'],
  },
  {
    emoji: '🏭',
    slug: 'he-thong-lanh',
    titleVi: 'Hệ Thống Lạnh CN',
    tag: 'Kho lạnh · Đông lạnh',
    descVi:
      'Kho lạnh bảo quản, buồng đông lạnh, hệ thống làm lạnh nhanh IQF cho ngành thực phẩm, dược phẩm và hóa chất theo tiêu chuẩn HACCP và GMP.',
    color: '#3366cc',
    features: ['Kho lạnh -40°C đến +15°C', 'Môi chất lạnh R404A, NH3', 'Hệ thống IQF tốc độ cao'],
  },
  {
    emoji: '⚡',
    slug: 'vrv-vrf',
    titleVi: 'Hệ Thống VRV/VRF',
    tag: 'Tiết kiệm · Thông minh',
    descVi:
      'Giải pháp VRV/VRF tiết kiệm năng lượng vượt trội, điều khiển nhiệt độ chính xác từng khu vực. Phù hợp văn phòng, chung cư, chuỗi cửa hàng và siêu thị.',
    color: '#6633cc',
    features: ['Inverter tiết kiệm 40% điện', 'Điều khiển 64 dàn lạnh/cụm', 'R32/R410A eco-friendly'],
  },
  {
    emoji: '🧪',
    slug: 'xu-ly-khong-khi-sach',
    titleVi: 'Xử Lý Không Khí Sạch',
    tag: 'GMP · ISO · Phòng sạch',
    descVi:
      'Phòng sạch cấp ISO 5-8, phòng phẫu thuật cấp độ A/B, nhà máy dược phẩm GMP-WHO. Kiểm soát vi sinh vật, hạt bụi và áp suất dương chính xác.',
    color: '#009966',
    features: ['Phòng sạch ISO Class 5-8', 'Bộ lọc HEPA H13/H14', 'Hệ thống giám sát online'],
  },
  {
    emoji: '🔧',
    slug: 'bao-tri-bao-duong',
    titleVi: 'Bảo Trì Bảo Dưỡng',
    tag: '24/7 · Nhanh 2-4h',
    descVi:
      'Bảo trì định kỳ và sửa chữa khẩn cấp 24/7 cho toàn bộ thiết bị HVAC. Đội ngũ kỹ thuật viên chuyên nghiệp có mặt trong 2-4 giờ tại Hà Nội và các tỉnh lân cận.',
    color: '#cc6600',
    features: ['Phản hồi < 4 giờ', 'Hợp đồng bảo trì năm', 'Báo cáo kỹ thuật đầy đủ'],
  },
  {
    emoji: '📐',
    slug: 'tu-van-thiet-ke',
    titleVi: 'Tư Vấn & Thiết Kế',
    tag: 'HAP · AutoCAD MEP',
    descVi:
      'Tư vấn giải pháp HVAC tối ưu bằng phần mềm chuyên nghiệp HAP 5.0, Trace 700. Phân tích tải nhiệt, thiết kế AutoCAD MEP, Revit MEP và lập dự toán chi tiết.',
    color: '#cc9900',
    features: ['Tính tải nhiệt HAP/Trace 700', 'Hồ sơ thiết kế MEP', 'Dự toán minh bạch'],
  },
  {
    emoji: '💧',
    slug: 'xu-ly-nuoc-lam-mat',
    titleVi: 'Xử Lý Nước Làm Mát',
    tag: 'Tháp giải nhiệt',
    descVi:
      'Xử lý nước làm mát tháp giải nhiệt, chống đóng cáu canxi, ăn mòn kim loại và vi sinh vật Legionella. Tối ưu hiệu suất trao đổi nhiệt và tuổi thọ thiết bị.',
    color: '#009999',
    features: ['Kiểm soát Legionella', 'Phân tích nước định kỳ', 'Hóa chất xử lý chuyên dụng'],
  },
  {
    emoji: '🖥️',
    slug: 'he-thong-bms',
    titleVi: 'Hệ Thống BMS/IBMS',
    tag: 'BACnet · Modbus · IoT',
    descVi:
      'Tòa nhà thông minh với BMS/IBMS tích hợp HVAC, chiếu sáng, PCCC và bảo mật. Giao thức BACnet/Modbus/MQTT. Tiết kiệm 20-30% chi phí vận hành.',
    color: '#336699',
    features: ['Dashboard giám sát real-time', 'Tích hợp IoT/AI', 'Báo cáo năng lượng tự động'],
  },
]

export default async function ServicesPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">⚙️ Dịch vụ HVAC</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Giải Pháp HVAC
            <br />
            <span className="gradient-text">Toàn Diện</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            Từ thiết kế, cung cấp thiết bị đến lắp đặt và bảo trì — FAVE là đối tác tin cậy
            cho mọi nhu cầu HVAC của doanh nghiệp bạn
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/lien-he" className="btn-primary text-sm">
              <Phone size={15} />
              Yêu cầu báo giá
              <ArrowRight size={14} />
            </Link>
            <a href="tel:0981907109" className="btn-outline text-sm">
              0981 907 109
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/dich-vu/${service.slug}`}
                className="service-card group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${service.color}10` }}
                  >
                    {service.emoji}
                  </div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `${service.color}12`, color: service.color }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Tag */}
                <div
                  className="text-xs font-semibold px-2.5 py-1 rounded-md inline-flex mb-3"
                  style={{ color: service.color, background: `${service.color}10` }}
                >
                  {service.tag}
                </div>

                {/* Title */}
                <h2
                  className="font-bold text-slate-900 text-base mb-2 leading-snug group-hover:text-blue-600 transition-colors"
                >
                  {service.titleVi}
                </h2>

                {/* Desc */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.descVi}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {service.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-500">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            Cần tư vấn giải pháp HVAC?
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Đội ngũ kỹ sư FAVE sẵn sàng tư vấn miễn phí và báo giá chi tiết trong 24 giờ làm việc
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Liên hệ báo giá ngay <ArrowRight size={16} />
            </Link>
            <a
              href="tel:0981907109"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:-translate-y-0.5"
            >
              <Phone size={16} className="text-blue-600" />
              0981 907 109
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
