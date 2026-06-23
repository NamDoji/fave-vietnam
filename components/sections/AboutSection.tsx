'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Download, ArrowRight } from 'lucide-react'

const STATS = [
  { value: '15+', label: 'Năm kinh nghiệm', desc: 'Hoạt động từ 2009' },
  { value: '500+', label: 'Dự án hoàn thành', desc: 'Trên toàn quốc' },
  { value: '100+', label: 'Kỹ sư & kỹ thuật viên', desc: 'Được đào tạo chuyên sâu' },
  { value: '50+', label: 'Khách hàng trung thành', desc: 'Doanh nghiệp lớn' },
]

const STRENGTHS = [
  'Đại lý ủy quyền chính thức Daikin & Carrier Vietnam',
  'Chứng chỉ ISO 9001:2015 và các tiêu chuẩn ASHRAE',
  'Đội kỹ sư thiết kế HVAC kinh nghiệm 10+ năm',
  'Dịch vụ bảo trì 24/7, phản hồi trong 2–4 giờ',
  'Phần mềm tính toán chuyên nghiệp: HAP, Trace 700',
  'Bảo hành công trình 12 tháng sau bàn giao',
]

export default function AboutSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 90)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Decorative editorial lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.04)' }} />
        <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.04)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '40%', width: '1px', background: 'rgba(255,255,255,0.02)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left: Content */}
          <div className="lg:col-span-5 slide-left">
            {/* Section label */}
            <div className="section-label mb-4" style={{ color: '#C8A96E' }}>
              Năng lực
            </div>
            {/* Thin gold line */}
            <div style={{ width: '40px', height: '1px', background: 'rgba(200,169,110,0.5)', marginBottom: '1.25rem' }} />

            <h2
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Tại Sao Chọn
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>FAVE Vietnam?</span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', lineHeight: 1.85, marginBottom: '2rem' }}>
              Với 15 năm kinh nghiệm trong lĩnh vực HVAC, FAVE Vietnam đã trở thành đối tác
              tin cậy của hàng trăm doanh nghiệp, bệnh viện và nhà máy hàng đầu Việt Nam.
              Chúng tôi không chỉ cung cấp thiết bị — chúng tôi mang lại giải pháp toàn diện.
            </p>

            {/* Strengths */}
            <ul className="space-y-3 mb-10">
              {STRENGTHS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ width: '1px', height: '16px', background: 'rgba(200,169,110,0.5)', flexShrink: 0, marginTop: '3px', display: 'inline-block' }} />
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={href('/nang-luc')}
                className="btn-luxury"
                style={{ background: '#1A3C6E', borderColor: '#1A3C6E' }}
              >
                Xem năng lực <ArrowRight size={13} />
              </Link>
              <a
                href="/files/ho-so-nang-luc-fave.pdf"
                download
                className="btn-ghost"
              >
                <Download size={13} />
                Tải hồ sơ năng lực
              </a>
            </div>
          </div>

          {/* Right: Stats — asymmetric editorial layout */}
          <div className="lg:col-span-7 slide-right">
            {/* Stats grid — 2x2 with offset */}
            <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="group p-8 lg:p-10 relative overflow-hidden transition-all duration-400"
                  style={{ background: '#0D0D0D' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#141414' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#0D0D0D' }}
                >
                  {/* Big number */}
                  <div
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      lineHeight: 1,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.06em',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {stat.label}
                  </div>

                  {/* Desc */}
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: 'rgba(255,255,255,0.25)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat.desc}
                  </div>

                  {/* Gold accent line — bottom left */}
                  <div
                    className="absolute bottom-0 left-0 transition-all duration-400 opacity-0 group-hover:opacity-100"
                    style={{ width: '32px', height: '1px', background: 'rgba(200,169,110,0.6)' }}
                  />
                </div>
              ))}
            </div>

            {/* ISO certification card */}
            <div
              className="mt-px p-6 flex items-center gap-5"
              style={{
                background: '#111111',
                borderTop: '1px solid rgba(200,169,110,0.15)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(200,169,110,0.3)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'rgba(200,169,110,0.7)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.04em' }}>ISO</span>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  ISO 9001:2015 Certified
                </div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                  Hệ thống quản lý chất lượng quốc tế · Bureau Veritas cấp 2021
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
