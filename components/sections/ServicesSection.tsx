'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, ArrowUpRight, Wrench } from 'lucide-react'

const ACCENT_COLORS = [
  '#0066ff', '#0099cc', '#3366cc', '#6633cc',
  '#009966', '#cc6600',
]

const FALLBACK_SERVICES = [
  {
    slug: 'bao-tri-hvac-dinh-ky',
    titleVi: 'Bảo Trì HVAC Định Kỳ',
    tag: 'Chiller · AHU · FCU',
    descVi: 'Ngăn ngừa sự cố, tối ưu vận hành 24/7. Kế hoạch bảo trì định kỳ giúp kéo dài tuổi thọ thiết bị và tiết kiệm chi phí vận hành.',
    icon: '🔧',
  },
  {
    slug: 'sua-chua-khan-cap',
    titleVi: 'Sửa Chữa Khẩn Cấp',
    tag: 'Phản hồi 2h · Toàn quốc',
    descVi: 'Đội kỹ thuật phản hồi trong 2 giờ. Hotline 24/7, sẵn sàng xử lý sự cố HVAC cho tòa nhà và nhà máy trên toàn quốc.',
    icon: '⚡',
  },
  {
    slug: 'lap-dat-moi-hvac',
    titleVi: 'Lắp Đặt Mới',
    tag: 'Turnkey · Thiết kế – Thi công',
    descVi: 'Tư vấn, thiết kế, thi công turnkey. Từ khảo sát tải nhiệt đến bàn giao vận hành — một đối tác cho toàn bộ dự án.',
    icon: '🏗️',
  },
  {
    slug: 'bao-duong-chiller',
    titleVi: 'Bảo Dưỡng Chiller',
    tag: 'Water-cooled · Air-cooled · Mini',
    descVi: 'Chuyên sâu Chiller trung tâm và mini. Đội kỹ sư được đào tạo bởi nhà sản xuất, đảm bảo hiệu suất tối ưu quanh năm.',
    icon: '❄️',
  },
  {
    slug: 'he-thong-vrv-vrf',
    titleVi: 'Hệ Thống VRV/VRF',
    tag: 'Daikin · Carrier · Panasonic',
    descVi: 'Đại lý ủy quyền Daikin, Carrier, Panasonic. Lắp đặt và bảo trì VRV/VRF tiết kiệm năng lượng, kiểm soát nhiệt độ chính xác từng khu vực.',
    icon: '🌀',
  },
  {
    slug: 'thong-gio-phong-sach',
    titleVi: 'Thông Gió & Phòng Sạch',
    tag: 'ISO 14644 · GMP · Dược phẩm',
    descVi: 'Thiết kế theo tiêu chuẩn ISO 14644. Phòng sạch cấp ISO, phòng phẫu thuật, nhà máy dược phẩm theo tiêu chuẩn GMP-WHO.',
    icon: '🧪',
  },
]

interface ServiceItem {
  slug: string
  titleVi: string
  tag: string
  descVi: string
  icon: string
  color: string
}

export default function ServicesSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    fetch('/api/services?take=9')
      .then(r => r.json())
      .then(d => {
        if (d.services && d.services.length > 0) {
          setServices(d.services.map((s: { slug: string; titleVi: string; icon?: string; category?: { nameVi?: string }; descriptionVi: string }, i: number) => ({
            slug: s.slug,
            titleVi: s.titleVi,
            tag: s.category?.nameVi || '',
            descVi: s.descriptionVi,
            icon: s.icon || '⚙️',
            color: ACCENT_COLORS[i % ACCENT_COLORS.length],
          })))
        } else {
          setServices(FALLBACK_SERVICES.map((s, i) => ({ ...s, color: ACCENT_COLORS[i % ACCENT_COLORS.length] })))
        }
      })
      .catch(() => {
        setServices(FALLBACK_SERVICES.map((s, i) => ({ ...s, color: ACCENT_COLORS[i % ACCENT_COLORS.length] })))
      })
  }, [])

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
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const displayServices = services.length > 0
    ? services
    : FALLBACK_SERVICES.map((s, i) => ({ ...s, color: ACCENT_COLORS[i % ACCENT_COLORS.length] }))

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">
              <Wrench size={13} />
              Dịch vụ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: '#0a1628' }}>
              Dịch Vụ HVAC<br />
              <span className="text-blue-600">Toàn Diện</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <div className="max-w-sm">
            <p className="text-slate-500 text-sm leading-relaxed">
              Kỹ sư có chứng chỉ quốc tế, đại lý ủy quyền Daikin &amp; Carrier — bao phủ toàn bộ vòng đời hệ thống HVAC.
            </p>
            <Link
              href={href('/dich-vu')}
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold mt-3 hover:gap-3 transition-all duration-200"
            >
              Xem tất cả dịch vụ <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service, i) => (
            <Link
              key={service.slug}
              href={href(`/dich-vu/${service.slug}`)}
              className="service-card group fade-in block"
              style={{ transitionDelay: `${i * 50}ms` } as React.CSSProperties}
            >
              {/* Icon area with gradient bg */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
                    border: `1px solid ${service.color}20`,
                  }}
                >
                  {service.icon}
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ background: `${service.color}15`, color: service.color }}
                >
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {service.tag && (
                <div
                  className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-md mb-3"
                  style={{ color: service.color, background: `${service.color}10` }}
                >
                  {service.tag}
                </div>
              )}

              <h3 className="font-bold mb-2 text-base leading-tight group-hover:text-blue-600 transition-colors duration-200"
                style={{ color: '#0a1628' }}>
                {service.titleVi}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{service.descVi}</p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ color: service.color }}>
                Tìm hiểu thêm <ArrowRight size={12} />
              </div>

              {/* Bottom hover accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}00)` }}
              />
            </Link>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div
          className="mt-14 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 fade-in"
          style={{ background: '#0a1628' }}
        >
          <div>
            <p className="text-white font-bold text-lg mb-1">Cần tư vấn chuyên sâu?</p>
            <p className="text-white/50 text-sm">Kỹ sư FAVE sẵn sàng phân tích nhu cầu và đề xuất giải pháp tối ưu cho dự án của bạn.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href={href('/lien-he')}
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              Liên hệ ngay <ArrowRight size={15} />
            </Link>
            <Link
              href={href('/nang-luc')}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white/60 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
            >
              Xem năng lực
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
