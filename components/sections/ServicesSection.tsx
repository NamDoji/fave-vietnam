'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    slug: 'bao-tri-dieu-hoa',
    titleVi: 'Bảo Trì Điều Hòa',
    tag: 'Định kỳ · 24/7',
    descVi: 'Bảo trì định kỳ toàn bộ hệ thống điều hòa dân dụng và trung tâm. Kỹ thuật viên có mặt trong 2–4 giờ.',
    num: '01',
  },
  {
    slug: 'bao-duong-chiller',
    titleVi: 'Bảo Dưỡng Chiller',
    tag: 'Chiller · AHU · FCU',
    descVi: 'Bảo dưỡng toàn diện Chiller water-cooled/air-cooled, vệ sinh bình bay hơi, ngưng tụ, kiểm tra máy nén và gas.',
    num: '02',
  },
  {
    slug: 'sua-chua-hvac',
    titleVi: 'Sửa Chữa HVAC',
    tag: 'Khẩn cấp · Mọi hãng',
    descVi: 'Sửa chữa nhanh mọi hãng HVAC (Daikin, Mitsubishi, Carrier, York, Trane). Đội ngũ trực 24/7 xử lý sự cố khẩn cấp.',
    num: '03',
  },
  {
    slug: 'cai-tao-nang-cap',
    titleVi: 'Cải Tạo Nâng Cấp',
    tag: 'Tiết kiệm điện · COP cao',
    descVi: 'Cải tạo hệ thống HVAC cũ sang công nghệ inverter mới, tiết kiệm 20–35% điện năng, tăng COP và độ bền thiết bị.',
    num: '04',
  },
  {
    slug: 've-sinh-cong-nghiep',
    titleVi: 'Vệ Sinh Công Nghiệp',
    tag: 'AHU · FCU · Ống gió',
    descVi: 'Vệ sinh chuyên nghiệp toàn bộ hệ thống: AHU, FCU, ống gió, dàn lạnh, dàn nóng bằng hóa chất chuyên dụng an toàn.',
    num: '05',
  },
  {
    slug: 'thiet-ke-hvac',
    titleVi: 'Thiết Kế HVAC',
    tag: 'HAP · AutoCAD MEP',
    descVi: 'Tư vấn và thiết kế HVAC tối ưu bằng HAP, Trace 700, AutoCAD MEP. Phân tích tải lạnh, chọn thiết bị, lập dự toán.',
    num: '06',
  },
  {
    slug: 'lap-dat-hvac',
    titleVi: 'Lắp Đặt HVAC',
    tag: 'Thi công · Nghiệm thu',
    descVi: 'Thi công lắp đặt đúng thiết kế và tiêu chuẩn kỹ thuật ASHRAE. Đảm bảo tiến độ, chất lượng và an toàn công trình.',
    num: '07',
  },
  {
    slug: 'cung-cap-thiet-bi',
    titleVi: 'Cung Cấp Thiết Bị',
    tag: 'Daikin · Carrier · Trane',
    descVi: 'Cung cấp thiết bị HVAC chính hãng: Daikin, Mitsubishi, Carrier, York, Trane. Chiller, VRV, AHU, FCU, máy nén, linh kiện.',
    num: '08',
  },
  {
    slug: 'dich-vu-ky-thuat-khac',
    titleVi: 'Dịch Vụ Kỹ Thuật Khác',
    tag: 'Đào tạo · Audit năng lượng',
    descVi: 'Đào tạo vận hành, kiểm toán năng lượng, tư vấn tiết kiệm điện, cho thuê thiết bị HVAC tạm thời và các dịch vụ bổ sung.',
    num: '09',
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
              setTimeout(() => el.classList.add('visible'), i * 70)
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

  return (
    <section ref={sectionRef} className="py-24 lg:py-32" style={{ background: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 fade-in">
          <div>
            {/* Section label */}
            <div className="section-label mb-4" style={{ color: '#C8A96E' }}>
              Dịch Vụ
            </div>
            {/* Thin line */}
            <div style={{ width: '40px', height: '1px', background: 'rgba(200,169,110,0.5)', marginBottom: '1.25rem' }} />
            <h2
              style={{
                fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                color: '#0D0D0D',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Giải Pháp HVAC
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Toàn Diện</span>
            </h2>
          </div>
          <div style={{ maxWidth: '320px' }}>
            <p style={{ color: '#6B6B6B', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              Từ thiết kế đến lắp đặt và bảo trì — đối tác kỹ thuật tin cậy cho mọi nhu cầu HVAC.
            </p>
            <Link
              href={href('/dich-vu')}
              className="inline-flex items-center gap-2 transition-all group"
              style={{ color: '#1A3C6E', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Xem tất cả dịch vụ
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(26,60,110,0.08)' }}>
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={href(`/dich-vu/${service.slug}`)}
              className="group fade-in block"
              style={{ transitionDelay: `${i * 50}ms`, background: '#F5F3EF' } as React.CSSProperties}
            >
              <div
                className="p-8 h-full transition-all duration-300"
                style={{ background: '#F5F3EF' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#F5F3EF' }}
              >
                {/* Number */}
                <div
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'rgba(200,169,110,0.6)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {service.num}
                </div>

                {/* Tag */}
                <div
                  className="mb-3"
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,60,110,0.5)',
                  }}
                >
                  {service.tag}
                </div>

                {/* Title */}
                <h3
                  className="mb-3 transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    color: '#0D0D0D',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.titleVi}
                </h3>

                {/* Thin divider */}
                <div style={{ width: '24px', height: '1px', background: 'rgba(200,169,110,0.4)', marginBottom: '0.875rem' }} />

                {/* Desc */}
                <p
                  className="line-clamp-3"
                  style={{ color: '#6B6B6B', fontSize: '0.8125rem', lineHeight: 1.75 }}
                >
                  {service.descVi}
                </p>

                {/* Arrow — on hover */}
                <div
                  className="mt-4 flex items-center gap-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ color: '#1A3C6E', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  Xem thêm <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center fade-in">
          <Link
            href={href('/lien-he')}
            className="btn-luxury"
            style={{ background: '#0D0D0D', borderColor: '#0D0D0D' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1A3C6E'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3C6E' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0D0D0D'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0D0D0D' }}
          >
            Yêu cầu tư vấn miễn phí
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
