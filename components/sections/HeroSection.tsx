'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ChevronRight, Phone, ArrowRight, Shield, Award, Clock, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '500+', label: 'Dự án', sub: 'Hoàn thành' },
  { value: '10+', label: 'Năm', sub: 'Kinh nghiệm' },
  { value: '100+', label: 'Kỹ sư', sub: 'Chuyên nghiệp' },
  { value: '24/7', label: 'Hỗ trợ', sub: 'Phản hồi 2h' },
]

const TRUST_STRIP = [
  { icon: Users, text: '100+ kỹ sư' },
  { icon: Award, text: '500+ dự án' },
  { icon: Clock, text: '24/7 hỗ trợ' },
  { icon: Shield, text: 'ISO 9001:2015' },
]

const CERT_ITEMS = [
  { icon: Shield, text: 'ISO 9001:2015', sub: 'Chứng nhận quốc tế' },
  { icon: Award, text: 'Daikin & Carrier', sub: 'Đại lý ủy quyền' },
  { icon: Zap, text: 'Hỗ trợ 24/7', sub: 'Phản hồi trong 2 giờ' },
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
      style={{ background: 'linear-gradient(135deg, #040b18 0%, #0a1628 40%, #0c1c38 70%, #060e20 100%)' }}
    >
      {/* Tech grid */}
      <div className="absolute inset-0 tech-grid" style={{ opacity: 0.5 }} />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 65%)', filter: 'blur(80px)', animationDuration: '8s' }}
      />
      <div
        className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      {/* Accent lines */}
      <div className="absolute top-0 right-0 w-px h-96 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,102,255,0.3), transparent)' }} />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Main content (7/12) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Trust badge */}
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
              <span className="text-green-400 font-bold">✓</span>
              ISO 9001:2015 &nbsp;·&nbsp; Đại lý Daikin &amp; Carrier
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
                Giải Pháp HVAC
                <br />
                <span className="gradient-text">Toàn Diện</span>
                {' '}—
                <br />
                Đúng Hẹn,{' '}
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Đúng Chất Lượng</span>
              </h1>
            </div>

            {/* Description */}
            <div
              className={cn(
                'transition-all duration-700 delay-200',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <p className="text-white/70 text-base leading-relaxed max-w-xl">
                Hơn 10 năm kinh nghiệm, 500+ dự án hoàn thành trên toàn quốc. Đội ngũ 100+ kỹ sư chuyên nghiệp,
                phản hồi trong 2 giờ — đối tác HVAC tin cậy cho tòa nhà, nhà máy và bệnh viện.
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className={cn(
                'flex flex-wrap gap-3 transition-all duration-700 delay-300',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <Link
                href={getHref('/lien-he')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
                }}
              >
                <Phone size={16} />
                Nhận Báo Giá Miễn Phí
                <ChevronRight size={15} />
              </Link>
              <Link href={getHref('/nang-luc')} className="btn-outline">
                Xem Năng Lực
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Trust strip: 4 items */}
            <div
              className={cn(
                'flex flex-wrap gap-5 transition-all duration-700 delay-400 pt-2',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              )}
            >
              {TRUST_STRIP.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,102,255,0.15)' }}
                  >
                    <item.icon size={13} className="text-blue-400" />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Specialty badges — mobile only */}
            <div
              className={cn(
                'flex flex-wrap gap-2 lg:hidden transition-all duration-700 delay-500',
                mounted ? 'opacity-100' : 'opacity-0',
              )}
            >
              {BADGES.map((badge, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-500',
                    activeBadge === i ? 'bg-blue-600 text-white' : 'text-white/40',
                  )}
                  style={activeBadge !== i ? { border: '1px solid rgba(255,255,255,0.07)' } : {}}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats panel (5/12) */}
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
              {/* Panel header */}
              <div
                className="flex items-center gap-2 px-5 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-white/25 text-xs font-mono ml-2">FAVE_HVAC_PROFILE.json</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="p-5">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
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

                {/* Service chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-white/20 text-xs font-medium w-full mb-1">Chuyên về:</span>
                  {BADGES.map((badge, i) => (
                    <span
                      key={i}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-500',
                        activeBadge === i
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'text-white/35',
                      )}
                      style={activeBadge !== i ? { border: '1px solid rgba(255,255,255,0.06)' } : {}}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Cert badges */}
                <div className="space-y-2 mb-4">
                  {CERT_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,102,255,0.15)' }}
                      >
                        <item.icon size={13} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white/75 text-xs font-semibold">{item.text}</div>
                        <div className="text-white/30 text-[10px]">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={getHref('/lien-he')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.35)',
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

        {/* Bottom stats bar */}
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
