'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Phone, ArrowRight, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '500+', label: 'Dự án hoàn thành' },
  { value: '15+', label: 'Năm kinh nghiệm' },
  { value: '100+', label: 'Kỹ sư chuyên nghiệp' },
  { value: '50+', label: 'Khách hàng tin tưởng' },
]

export default function HeroSection() {
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function getHref(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Thin editorial grid lines — decorative horizontal rules */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.05)' }} />
        <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.04)' }} />
        <div style={{ position: 'absolute', top: '60%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.03)' }} />
        <div style={{ position: 'absolute', top: '80%', left: 0, right: 0, height: '1px', background: 'rgba(200,169,110,0.04)' }} />
        {/* Vertical editorial lines */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33.333%', width: '1px', background: 'rgba(255,255,255,0.025)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '33.333%', width: '1px', background: 'rgba(255,255,255,0.025)' }} />
      </div>

      {/* Corner coordinate lines */}
      <div className="absolute top-24 right-10 hidden lg:block pointer-events-none">
        <div style={{ width: '60px', height: '1px', background: 'rgba(200,169,110,0.2)' }} />
        <div style={{ width: '1px', height: '60px', background: 'rgba(200,169,110,0.2)', marginLeft: '59px', marginTop: '-1px' }} />
      </div>
      <div className="absolute bottom-24 left-10 hidden lg:block pointer-events-none">
        <div style={{ width: '1px', height: '60px', background: 'rgba(200,169,110,0.2)' }} />
        <div style={{ width: '60px', height: '1px', background: 'rgba(200,169,110,0.2)', marginTop: '-1px' }} />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-36">

        {/* Sub-headline label */}
        <div
          className={cn(
            'mb-6 transition-all duration-700',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span
            className="section-label"
            style={{ color: '#C8A96E' }}
          >
            Giải pháp HVAC B2B hàng đầu Việt Nam
          </span>
        </div>

        {/* Main headline */}
        <div
          className={cn(
            'transition-all duration-700 delay-100 mb-4',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <h1
            className="text-white leading-[1.05]"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Giải pháp HVAC
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>Toàn diện</span>
            <br />
            <span>cho Tòa nhà &amp; Nhà máy</span>
          </h1>
        </div>

        {/* Thin gold divider */}
        <div
          className={cn(
            'transition-all duration-700 delay-150 mb-8',
            mounted ? 'opacity-100' : 'opacity-0'
          )}
          style={{ width: '80px', height: '1px', background: 'rgba(200,169,110,0.5)' }}
        />

        {/* Description */}
        <div
          className={cn(
            'transition-all duration-700 delay-200 mb-10',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: '560px',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Đội ngũ 100+ kỹ sư chuyên nghiệp, 15 năm kinh nghiệm thi công và bảo trì
            hệ thống HVAC cho các dự án công nghiệp, thương mại và y tế trên toàn quốc.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={cn(
            'flex flex-wrap gap-4 transition-all duration-700 delay-300 mb-20',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <Link href={getHref('/lien-he')} className="btn-luxury" style={{ background: '#1A3C6E', borderColor: '#1A3C6E' }}>
            <Phone size={13} />
            Yêu cầu báo giá
          </Link>
          <Link href={getHref('/dich-vu')} className="btn-ghost">
            Xem dịch vụ
            <ArrowRight size={13} />
          </Link>
          <a
            href="/files/ho-so-nang-luc-fave.pdf"
            download
            className="inline-flex items-center gap-2 transition-colors"
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.875rem 0',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.7)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)' }}
          >
            <Download size={13} />
            Hồ sơ năng lực
          </a>
        </div>

        {/* Stats bar — separated by thin horizontal rule */}
        <div
          className={cn(
            'transition-all duration-700 delay-400',
            mounted ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Thin gold top line */}
          <div style={{ height: '1px', background: 'rgba(200,169,110,0.2)', marginBottom: '2rem' }} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i}>
                {/* Number */}
                <div
                  className="text-white mb-1"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.value}
                </div>
                {/* Label */}
                <div
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications row */}
          <div className="mt-10 flex flex-wrap gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
            {[
              'ISO 9001:2015 Certified',
              'Đại lý ủy quyền Daikin & Carrier',
              'Hỗ trợ kỹ thuật 24/7',
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                }}
              >
                {i > 0 && <span style={{ marginRight: '1.5rem', color: 'rgba(200,169,110,0.3)' }}>·</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
