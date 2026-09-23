'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const ACCENT_COLORS = [
  '#0066ff', '#0099cc', '#3366cc', '#6633cc',
  '#009966', '#cc6600', '#cc9900', '#009999', '#336699',
]

const FALLBACK_SERVICES = [
  { slug: 'bao-tri-dieu-hoa', titleVi: 'Bảo Trì Điều Hòa', tag: 'Chiller · AHU · FCU', descVi: 'Thiết kế, cung cấp và lắp đặt hệ thống Chiller water-cooled/air-cooled cho tòa nhà văn phòng, TTTM, khách sạn.', icon: '❄️' },
  { slug: 'bao-duong-chiller', titleVi: 'Bảo Dưỡng Chiller', tag: 'Nhà máy · Xưởng', descVi: 'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất.', icon: '🌀' },
  { slug: 'sua-chua-hvac', titleVi: 'Sửa Chữa HVAC', tag: 'Kho lạnh · Đông lạnh', descVi: 'Kho lạnh, buồng đông lạnh, hệ thống làm lạnh nhanh cho ngành thực phẩm, dược phẩm.', icon: '🏭' },
  { slug: 'cai-tao-nang-cap', titleVi: 'Cải Tạo Nâng Cấp', tag: 'Tiết kiệm · Thông minh', descVi: 'Giải pháp VRV/VRF tiết kiệm năng lượng vượt trội, kiểm soát nhiệt độ chính xác từng khu vực.', icon: '⚡' },
  { slug: 've-sinh-cong-nghiep', titleVi: 'Vệ Sinh Công Nghiệp', tag: 'GMP · ISO · Phòng sạch', descVi: 'Phòng sạch cấp ISO, phòng phẫu thuật, nhà máy dược phẩm theo tiêu chuẩn GMP-WHO.', icon: '🧪' },
  { slug: 'thiet-ke-hvac', titleVi: 'Thiết Kế HVAC', tag: 'HAP · AutoCAD MEP', descVi: 'Tư vấn kỹ thuật và thiết kế HVAC tối ưu bằng phần mềm HAP, Trace 700, AutoCAD MEP.', icon: '📐' },
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
      { threshold: 0.05 }
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">⚙️ Dịch vụ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Giải Pháp HVAC<br /><span className="text-blue-600">Toàn Diện</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <div className="max-w-xs">
            <p className="text-slate-500 text-sm leading-relaxed">
              Từ thiết kế đến lắp đặt và bảo trì — đối tác kỹ thuật tin cậy cho mọi nhu cầu HVAC.
            </p>
            <Link href={href('/dich-vu')} className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold mt-3 hover:gap-3 transition-all">
              Xem tất cả dịch vụ <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service, i) => (
            <Link
              key={service.slug}
              href={href(`/dich-vu/${service.slug}`)}
              className="service-card group fade-in"
              style={{ transitionDelay: `${i * 40}ms` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${service.color}15` }}>
                  {service.icon}
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                  style={{ background: `${service.color}15`, color: service.color }}>
                  <ArrowUpRight size={15} />
                </div>
              </div>
              {service.tag && (
                <div className="inline-flex text-xs font-semibold px-2 py-0.5 rounded mb-3"
                  style={{ color: service.color, background: `${service.color}10` }}>
                  {service.tag}
                </div>
              )}
              <h3 className="font-bold text-slate-900 mb-2 text-base leading-tight group-hover:text-blue-600 transition-colors duration-200">
                {service.titleVi}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{service.descVi}</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }} />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center fade-in">
          <Link href={href('/lien-he')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm">
            Yêu cầu tư vấn miễn phí <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
