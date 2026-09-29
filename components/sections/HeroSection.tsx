'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ChevronRight, Phone, Download, ArrowRight, Shield, Award, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '500+', label: 'Dự án', sub: 'Hoàn thành' },
  { value: '10+', label: 'Năm', sub: 'Kinh nghiệm' },
  { value: '50+', label: 'Khách hàng', sub: 'Tin tưởng' },
  { value: '100+', label: 'Kỹ sư', sub: 'Chuyên nghiệp' },
]

const BADGES = ['Điều hòa trung tâm', 'VRV/VRF', 'Hệ thống lạnh', 'Thông gió', 'Phòng sạch']

const TRUST_ITEMS = [
  { icon: Shield, text: 'ISO 9001:2015', sub: 'Chứng nhận quốc tế' },
  { icon: Award, text: 'Daikin & Carrier', sub: 'Đại lý ủy quyền' },
  { icon: Clock, text: 'Hỗ trợ 24/7', sub: 'Phản hồi trong 2–4h' },
]

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
      style={{ background: 'linear-gradient(135deg, #040b18 0%, #0a1628 40%, #0c1c38 70%, #060e20 100%)' }}
    >
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid" style={{ opacity: 0.6 }} />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 65%)', filter: 'blur(80px)', animationDuration: '8s' }}
      />
      <div
        className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />

      {/* Corner accent lines */}
      <div className="absolute top-0 right-0 w-px h-96 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.25), transparent)' }} />
      <div className="absolute top-0 left-0 w-px h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,102,255,0.15), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,102,255,0.3), transparent)' }} />

      {/* Diagonal scan line decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[1px] h-80 rotate-[15deg]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.15), transparent)', transformOrigin: 'top' }} />
        <div className="absolute bottom-1/4 left-0 w-[1px] h-60 rotate-[-15deg]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.1), transparent)', transformOrigin: 'top' }} />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Main content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Live badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-700',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              )}
              style={{
                background: 'rgba(0,102,255,0.1)',
                border: '1px solid rgba(0,102,255,0.3)',
                color: '#93c5fd',
              }}
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
              </span>
              Giải pháp HVAC B2B hàng đầu Việt Nam
            </div>

            {/* Headline */}
            <div
              className={cn(
                'transition-all duration-700 delay-100',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <h1 className="font-black text-white leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                Giải pháp HVAC
                <br />
                <span className="gradient-text">Toàn diện</span>
                <br />
                cho Tòa nhà &amp;{' '}
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>Nhà máy</span>
              </h1>
            </div>

            {/* Service tags */}
            <div
              className={cn(
                'transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {['Bảo trì', 'Sửa chữa', 'Lắp đặt', 'Cung cấp thiết bị', 'Thiết kế HVAC'].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/55"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-white/50 text-base leading-relaxed max-w-xl">
                Đội ngũ 100+ kỹ sư chuyên nghiệp, 10 năm kinh nghiệm thi công và bảo trì
                hệ thống HVAC cho các dự án công nghiệp, thương mại và y tế trên toàn quốc.
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className={cn(
                'flex flex-wrap gap-3 transition-all duration-700 delay-300',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <Link href={getHref('/lien-he')} className="btn-luxury">
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
                className="inline-flex items-center gap-2 px-5 py-3 text-white/40 hover:text-white/70 text-sm font-medium transition-colors"
              >
                <Download size={15} />
                Hồ sơ năng lực
              </a>
            </div>

            {/* Rotating specialty badges */}
            <div
              className={cn(
                'flex items-center gap-3 transition-all duration-700 delay-400',
                mounted ? 'opacity-100' : 'opacity-0',
              )}
            >
              <span className="text-white/25 text-xs font-medium flex-shrink-0">Chuyên về:</span>
              <div className="flex gap-2 flex-wrap">
                {BADGES.map((badge, i) => (
                  <span
                    key={i}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-500',
                      activeBadge === i
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-white/30',
                    )}
                    style={activeBadge !== i ? { border: '1px solid rgba(255,255,255,0.06)' } : {}}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust indicators — mobile only show here */}
            <div
              className={cn(
                'flex flex-wrap gap-4 lg:hidden transition-all duration-700 delay-500',
                mounted ? 'opacity-100' : 'opacity-0',
              )}
            >
              {TRUST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon size={14} className="text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-white text-xs font-semibold">{item.text}</div>
                    <div className="text-white/35 text-[10px]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats panel */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                'rounded-2xl overflow-hidden transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              )}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-5 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-white/25 text-xs font-mono ml-2">FAVE_HVAC_STATS.json</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="p-5">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl text-center group hover:scale-[1.02] transition-transform duration-200 cursor-default"
                      style={{ background: 'rgba(0,102,255,0.07)', border: '1px solid rgba(0,102,255,0.12)' }}
                    >
                      <div
                        className="text-3xl font-black mb-0.5"
                        style={{ background: 'linear-gradient(135deg, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-blue-400/80 text-sm font-semibold">{stat.label}</div>
                      <div className="text-white/25 text-xs">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Trust items — desktop */}
                <div className="space-y-2">
                  {TRUST_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,102,255,0.15)' }}
                      >
                        <item.icon size={15} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white/75 text-sm font-semibold">{item.text}</div>
                        <div className="text-white/30 text-xs">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick CTA */}
                <Link
                  href={getHref('/lien-he')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #0066ff, #3385ff)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(0,102,255,0.3)',
                  }}
                >
                  <Phone size={14} />
                  Liên hệ tư vấn miễn phí
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar — bottom */}
        <div
          className={cn(
            'mt-16 pt-8 transition-all duration-700 delay-500',
            mounted ? 'opacity-100' : 'opacity-0',
          )}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div
                  className="text-2xl sm:text-3xl font-black"
                  style={{ background: 'linear-gradient(135deg, #fff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/35 text-xs mt-1 uppercase tracking-wide font-medium">{stat.label} {stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5, 13, 26, 0.5))' }} />
    </section>
  )
}
