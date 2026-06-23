'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    emoji: '🔧',
    slug: 'bao-tri-dieu-hoa',
    titleVi: 'Bảo Trì Điều Hòa',
    tag: 'Định kỳ · 24/7',
    descVi: 'Bảo trì định kỳ toàn bộ hệ thống điều hòa dân dụng và trung tâm. Kỹ thuật viên có mặt trong 2–4 giờ.',
    color: '#0066ff',
  },
  {
    emoji: '❄️',
    slug: 'bao-duong-chiller',
    titleVi: 'Bảo Dưỡng Chiller',
    tag: 'Chiller · AHU · FCU',
    descVi: 'Bảo dưỡng toàn diện Chiller water-cooled/air-cooled, vệ sinh bình bay hơi, ngưng tụ, kiểm tra máy nén và gas.',
    color: '#0099cc',
  },
  {
    emoji: '⚙️',
    slug: 'sua-chua-hvac',
    titleVi: 'Sửa Chữa HVAC',
    tag: 'Khẩn cấp · Mọi hãng',
    descVi: 'Sửa chữa nhanh mọi hãng HVAC (Daikin, Mitsubishi, Carrier, York, Trane). Đội ngũ trực 24/7 xử lý sự cố khẩn cấp.',
    color: '#3366cc',
  },
  {
    emoji: '🔄',
    slug: 'cai-tao-nang-cap',
    titleVi: 'Cải Tạo Nâng Cấp',
    tag: 'Tiết kiệm điện · COP cao',
    descVi: 'Cải tạo hệ thống HVAC cũ sang công nghệ inverter mới, tiết kiệm 20–35% điện năng, tăng COP và độ bền thiết bị.',
    color: '#6633cc',
  },
  {
    emoji: '🧹',
    slug: 've-sinh-cong-nghiep',
    titleVi: 'Vệ Sinh Công Nghiệp',
    tag: 'AHU · FCU · Ống gió',
    descVi: 'Vệ sinh chuyên nghiệp toàn bộ hệ thống: AHU, FCU, ống gió, dàn lạnh, dàn nóng bằng hóa chất chuyên dụng an toàn.',
    color: '#009966',
  },
  {
    emoji: '📐',
    slug: 'thiet-ke-hvac',
    titleVi: 'Thiết Kế HVAC',
    tag: 'HAP · AutoCAD MEP',
    descVi: 'Tư vấn và thiết kế HVAC tối ưu bằng HAP, Trace 700, AutoCAD MEP. Phân tích tải lạnh, chọn thiết bị, lập dự toán.',
    color: '#cc9900',
  },
  {
    emoji: '🏗️',
    slug: 'lap-dat-hvac',
    titleVi: 'Lắp Đặt HVAC',
    tag: 'Thi công · Nghiệm thu',
    descVi: 'Thi công lắp đặt đúng thiết kế và tiêu chuẩn kỹ thuật ASHRAE. Đảm bảo tiến độ, chất lượng và an toàn công trình.',
    color: '#cc6600',
  },
  {
    emoji: '📦',
    slug: 'cung-cap-thiet-bi',
    titleVi: 'Cung Cấp Thiết Bị',
    tag: 'Daikin · Carrier · Trane',
    descVi: 'Cung cấp thiết bị HVAC chính hãng: Daikin, Mitsubishi, Carrier, York, Trane. Chiller, VRV, AHU, FCU, máy nén, linh kiện.',
    color: '#336699',
  },
  {
    emoji: '🛠️',
    slug: 'dich-vu-ky-thuat-khac',
    titleVi: 'Dịch Vụ Kỹ Thuật Khác',
    tag: 'Đào tạo · Audit năng lượng',
    descVi: 'Đào tạo vận hành, kiểm toán năng lượng, tư vấn tiết kiệm điện, cho thuê thiết bị HVAC tạm thời và các dịch vụ bổ sung.',
    color: '#009999',
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
