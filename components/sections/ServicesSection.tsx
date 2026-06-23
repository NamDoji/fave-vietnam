'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    emoji: '❄️',
    slug: 'dieu-hoa-trung-tam',
    titleVi: 'Điều Hòa Trung Tâm',
    tag: 'Chiller · AHU · FCU',
    descVi: 'Thiết kế, cung cấp và lắp đặt hệ thống Chiller water-cooled/air-cooled cho tòa nhà văn phòng, TTTM, khách sạn. Công suất từ 50TR đến hàng nghìn TR.',
    color: '#0066ff',
  },
  {
    emoji: '🌀',
    slug: 'thong-gio-cong-nghiep',
    titleVi: 'Thông Gió Công Nghiệp',
    tag: 'Nhà máy · Xưởng',
    descVi: 'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất đảm bảo tiêu chuẩn môi trường an toàn.',
    color: '#0099cc',
  },
  {
    emoji: '🏭',
    slug: 'he-thong-lanh',
    titleVi: 'Hệ Thống Lạnh CN',
    tag: 'Kho lạnh · Đông lạnh',
    descVi: 'Kho lạnh, buồng đông lạnh, hệ thống làm lạnh nhanh cho ngành thực phẩm, dược phẩm theo tiêu chuẩn quốc tế.',
    color: '#3366cc',
  },
  {
    emoji: '⚡',
    slug: 'vrv-vrf',
    titleVi: 'Hệ Thống VRV/VRF',
    tag: 'Tiết kiệm · Thông minh',
    descVi: 'Giải pháp VRV/VRF tiết kiệm năng lượng vượt trội, kiểm soát nhiệt độ chính xác từng khu vực, phù hợp văn phòng và chung cư.',
    color: '#6633cc',
  },
  {
    emoji: '🧪',
    slug: 'xu-ly-khong-khi-sach',
    titleVi: 'Xử Lý Không Khí Sạch',
    tag: 'GMP · ISO · Phòng sạch',
    descVi: 'Phòng sạch cấp ISO, phòng phẫu thuật, nhà máy dược phẩm theo tiêu chuẩn GMP-WHO. Kiểm soát vi sinh vật chính xác.',
    color: '#009966',
  },
  {
    emoji: '🔧',
    slug: 'bao-tri-bao-duong',
    titleVi: 'Bảo Trì Bảo Dưỡng',
    tag: '24/7 · Nhanh 2-4h',
    descVi: 'Bảo trì định kỳ và sửa chữa khẩn cấp 24/7 cho tất cả loại thiết bị HVAC. Kỹ thuật viên có mặt trong 2-4 giờ.',
    color: '#cc6600',
  },
  {
    emoji: '📐',
    slug: 'tu-van-thiet-ke',
    titleVi: 'Tư Vấn & Thiết Kế',
    tag: 'HAP · AutoCAD MEP',
    descVi: 'Tư vấn kỹ thuật và thiết kế HVAC tối ưu bằng phần mềm HAP, Trace 700, AutoCAD MEP. Phân tích tải nhiệt, lập dự toán.',
    color: '#cc9900',
  },
  {
    emoji: '💧',
    slug: 'xu-ly-nuoc-lam-mat',
    titleVi: 'Xử Lý Nước Làm Mát',
    tag: 'Tháp giải nhiệt',
    descVi: 'Xử lý nước làm mát tháp giải nhiệt, chống đóng cáu, ăn mòn và vi sinh vật, tối ưu hiệu suất và tuổi thọ thiết bị.',
    color: '#009999',
  },
  {
    emoji: '🖥️',
    slug: 'he-thong-bms',
    titleVi: 'Hệ Thống BMS/IBMS',
    tag: 'BACnet · Modbus · IoT',
    descVi: 'Tòa nhà thông minh tích hợp HVAC, giám sát năng lượng tự động hóa BACnet/Modbus. Tiết kiệm 20-30% chi phí điện.',
    color: '#336699',
  },
]

export default function ServicesSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">⚙️ Dịch vụ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Giải Pháp HVAC
              <br />
              <span className="text-blue-600">Toàn Diện</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <div className="max-w-xs">
            <p className="text-slate-500 text-sm leading-relaxed">
              Từ thiết kế đến lắp đặt và bảo trì — đối tác kỹ thuật tin cậy cho mọi nhu cầu HVAC.
            </p>
            <Link
              href={href('/dich-vu')}
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold mt-3 hover:gap-3 transition-all"
            >
              Xem tất cả dịch vụ <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={href(`/dich-vu/${service.slug}`)}
              className="service-card group fade-in"
              style={{ transitionDelay: `${i * 40}ms` } as React.CSSProperties}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${service.color}15` }}
                >
                  {service.emoji}
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                  style={{ background: `${service.color}15`, color: service.color }}
                >
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* Tag */}
              <div
                className="inline-flex text-xs font-semibold px-2 py-0.5 rounded mb-3"
                style={{ color: service.color, background: `${service.color}10` }}
              >
                {service.tag}
              </div>

              {/* Title */}
              <h3
                className="font-bold text-slate-900 mb-2 text-base leading-tight group-hover:text-blue-600 transition-colors duration-200"
              >
                {service.titleVi}
              </h3>

              {/* Desc */}
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                {service.descVi}
              </p>

              {/* Bottom border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
              />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center fade-in">
          <Link
            href={href('/lien-he')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm"
          >
            Yêu cầu tư vấn miễn phí
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
