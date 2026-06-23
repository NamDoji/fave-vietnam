'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ChevronRight, Phone, Download, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '500+', label: 'Dự án', sub: 'Hoàn thành' },
  { value: '15+', label: 'Năm', sub: 'Kinh nghiệm' },
  { value: '50+', label: 'Khách hàng', sub: 'Tin tưởng' },
  { value: '100+', label: 'Kỹ sư', sub: 'Chuyên nghiệp' },
]

const BADGES = ['Điều hòa trung tâm', 'VRV/VRF', 'Hệ thống lạnh', 'Thông gió', 'Phòng sạch']

export default function HeroSection() {
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  const [activeBadge, setActiveBadge] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % BADGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  function getHref(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 40%, #0d1e38 70%, #071020 100%)' }}
    >
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid opacity-100" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)' }}
      />

      {/* Corner accent lines */}
      <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-0 right-64 h-px w-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pt-28 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Main content */}
          <div className="lg:col-span-7 space-y-7">

            {/* Badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-500',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                background: 'rgba(0, 102, 255, 0.1)',
                border: '1px solid rgba(0, 102, 255, 0.25)',
                color: '#60a5fa',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
              Giải pháp HVAC B2B hàng đầu Việt Nam
            </div>

            {/* Headline */}
            <div
              className={cn(
                'transition-all duration-700 delay-100',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Giải pháp HVAC
                <br />
                <span className="gradient-text">Toàn diện</span>
                <br />
                cho Tòa nhà &amp;{' '}
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Nhà máy</span>
              </h1>
            </div>

            {/* Sub headline */}
            <div
              className={cn(
                'transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
            >
              <div className="flex flex-wrap gap-2">
                {['Bảo trì', 'Sửa chữa', 'Lắp đặt', 'Cung cấp thiết bị'].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md text-sm font-medium text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-white/55 text-base leading-relaxed max-w-xl">
                Đội ngũ 100+ kỹ sư chuyên nghiệp, 15 năm kinh nghiệm thi công và bảo trì
                hệ thống HVAC cho các dự án công nghiệp, thương mại và y tế trên toàn quốc.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={cn(
                'flex flex-wrap gap-3 transition-all duration-700 delay-300',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
            >
              <Link href={getHref('/lien-he')} className="btn-primary">
                <Phone size={16} />
                Yêu cầu báo giá
                <ChevronRight size={15} />
              </Link>
              <Link href={getHref('/dich-vu')} className="btn-outline">
                Xem dịch vụ
                <ArrowRight size={15} />
              </Link>
              <a
                href="/files/ho-so-nang-luc-fave.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-white/50 hover:text-white/80 text-sm font-medium transition-colors"
              >
                <Download size={15} />
                Hồ sơ năng lực ↓
              </a>
            </div>

            {/* Rotating badges */}
            <div
              className={cn(
                'flex items-center gap-3 transition-all duration-700 delay-400',
                mounted ? 'opacity-100' : 'opacity-0'
              )}
            >
              <span className="text-white/25 text-xs font-medium">Chuyên về:</span>
              <div className="flex gap-2 flex-wrap">
                {BADGES.map((badge, i) => (
                  <span
                    key={i}
                    className={cn(
                      'px-2.5 py-1 rounded text-xs font-medium transition-all duration-500',
                      activeBadge === i
                        ? 'bg-blue-600 text-white'
                        : 'text-white/30 bg-transparent'
                    )}
                    style={activeBadge !== i ? { border: '1px solid rgba(255,255,255,0.06)' } : {}}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats panel */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                'rounded-2xl p-6 transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top decorative */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 h-px bg-white/05" />
                <span className="text-white/25 text-xs font-mono">FAVE_HVAC_STATS.json</span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl text-center"
                    style={{ background: 'rgba(0, 102, 255, 0.06)', border: '1px solid rgba(0, 102, 255, 0.1)' }}
                  >
                    <div className="text-3xl font-black text-white mb-0.5">{stat.value}</div>
                    <div className="text-blue-400 text-sm font-semibold">{stat.label}</div>
                    <div className="text-white/30 text-xs">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                {[
                  { icon: '🏆', text: 'ISO 9001:2015 Certified' },
                  { icon: '✅', text: 'Đại lý ủy quyền Daikin & Carrier' },
                  { icon: '⚡', text: 'Hỗ trợ kỹ thuật 24/7' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-white/55 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar - bottom */}
        <div
          className={cn(
            'mt-14 pt-8 transition-all duration-700 delay-500',
            mounted ? 'opacity-100' : 'opacity-0',
          )}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-wide font-medium">{stat.label} {stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10, 22, 40, 0.3))' }} />
    </section>
  )
}
