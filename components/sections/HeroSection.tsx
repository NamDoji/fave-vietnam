'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ChevronRight, ChevronDown, Phone, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const SLIDES = [
  {
    bg: 'from-[#0f2540] to-[#1a3a5c]',
    label: 'Điều hòa trung tâm',
    image: '/images/hero-1.jpg',
  },
  {
    bg: 'from-[#1a3a5c] to-[#0a4080]',
    label: 'Thông gió công nghiệp',
    image: '/images/hero-2.jpg',
  },
  {
    bg: 'from-[#0a3050] to-[#1a3a5c]',
    label: 'Hệ thống làm lạnh',
    image: '/images/hero-3.jpg',
  },
]

const STATS = [
  { value: '15+', label: 'Năm kinh nghiệm' },
  { value: '500+', label: 'Dự án hoàn thành' },
  { value: '50+', label: 'Khách hàng tin tưởng' },
  { value: '100+', label: 'Kỹ sư chuyên nghiệp' },
]

export default function HeroSection() {
  const t = useTranslations()
  const locale = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  function getHref(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            `bg-gradient-to-br ${slide.bg}`,
            currentSlide === i ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#00a0e9]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00a0e9]/20 border border-[#00a0e9]/30 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#00a0e9] rounded-full animate-pulse" />
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <h2 className="text-2xl sm:text-3xl text-[#00a0e9] font-semibold mb-6">
            {t('hero.subtitle')}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href={getHref('/lien-he')}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone size={18} />
              {t('hero.cta1')}
              <ChevronRight size={16} />
            </Link>
            <Link
              href={getHref('/du-an')}
              className="flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              <PlayCircle size={18} />
              {t('hero.cta2')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.value} className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={cn(
              'rounded-full transition-all',
              currentSlide === i
                ? 'w-8 h-2 bg-[#00a0e9]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>

      {/* Current slide label */}
      <div className="absolute bottom-10 right-8 text-white/50 text-xs">
        {SLIDES[currentSlide].label}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-16 left-8 hidden lg:flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs rotate-90 tracking-widest">{t('hero.scrollDown')}</span>
        <div className="w-px h-12 bg-white/20" />
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}
