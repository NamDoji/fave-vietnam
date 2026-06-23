'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'

const PROJECTS = [
  {
    slug: 'unilever-bac-ninh',
    title: 'Nhà Máy Unilever Bắc Ninh',
    client: 'Unilever Vietnam',
    sector: 'Công nghiệp',
    location: 'Bắc Ninh',
    scale: '500TR',
    year: '2023',
    bg: 'linear-gradient(135deg, #0d2137 0%, #1a3a60 100%)',
    accent: '#0066ff',
  },
  {
    slug: 'vien-huyet-hoc',
    title: 'Viện Huyết Học TW',
    client: 'Bộ Y tế',
    sector: 'Y tế',
    location: 'Hà Nội',
    scale: '200TR',
    year: '2022',
    bg: 'linear-gradient(135deg, #0d1f35 0%, #163050 100%)',
    accent: '#3399ff',
  },
  {
    slug: 'nhiet-dien-mong-duong',
    title: 'Nhiệt Điện Mông Dương',
    client: 'EVN',
    sector: 'Năng lượng',
    location: 'Quảng Ninh',
    scale: '1000TR',
    year: '2021',
    bg: 'linear-gradient(135deg, #0d1a2b 0%, #0f2540 100%)',
    accent: '#60a5fa',
  },
  {
    slug: 'samsung-thai-nguyen',
    title: 'Samsung Electronics',
    client: 'Samsung',
    sector: 'Công nghiệp',
    location: 'Thái Nguyên',
    scale: '2000TR',
    year: '2019',
    bg: 'linear-gradient(135deg, #08162b 0%, #0d2040 100%)',
    accent: '#0066ff',
  },
  {
    slug: 'jw-marriott-hanoi',
    title: 'JW Marriott Hà Nội',
    client: 'JW Marriott',
    sector: 'Khách sạn',
    location: 'Hà Nội',
    scale: '800TR',
    year: '2020',
    bg: 'linear-gradient(135deg, #0f1f35 0%, #1a3050 100%)',
    accent: '#7dd3fc',
  },
  {
    slug: 'vinmec-times-city',
    title: 'Bệnh Viện Vinmec',
    client: 'Vinmec',
    sector: 'Y tế',
    location: 'Hà Nội',
    scale: '400TR',
    year: '2021',
    bg: 'linear-gradient(135deg, #0b1e35 0%, #162d4a 100%)',
    accent: '#38bdf8',
  },
  {
    slug: 'bo-cong-an',
    title: 'Trụ Sở Bộ Công An',
    client: 'Bộ Công An',
    sector: 'Hành chính',
    location: 'Hà Nội',
    scale: '300TR',
    year: '2022',
    bg: 'linear-gradient(135deg, #0a1c32 0%, #142840 100%)',
    accent: '#93c5fd',
  },
  {
    slug: 'khu-cong-nghiep-vsip',
    title: 'KCN VSIP Bắc Ninh',
    client: 'VSIP Group',
    sector: 'Công nghiệp',
    location: 'Bắc Ninh',
    scale: '800TR',
    year: '2023',
    bg: 'linear-gradient(135deg, #0d1f38 0%, #163352 100%)',
    accent: '#0066ff',
  },
]

const SECTOR_COLORS: Record<string, string> = {
  'Công nghiệp': '#0066ff',
  'Y tế': '#06b6d4',
  'Năng lượng': '#f59e0b',
  'Hành chính': '#8b5cf6',
  'Khách sạn': '#ec4899',
}

export default function ProjectsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60)
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
    <section
      ref={sectionRef}
      className="py-24"
      style={{ background: '#f8faff' }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">🏗️ Dự án</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Dự Án <span className="text-blue-600">Tiêu Biểu</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link
            href={href('/du-an')}
            className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả dự án <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 fade-in">
          {[
            { num: '500+', label: 'Dự án hoàn thành' },
            { num: '25+', label: 'Tỉnh thành' },
            { num: '1000TR+', label: 'Dự án lớn nhất' },
            { num: '98%', label: 'Khách hàng hài lòng' },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl"
              style={{ background: 'rgba(0, 102, 255, 0.04)', border: '1px solid rgba(0, 102, 255, 0.08)' }}
            >
              <div className="text-2xl font-black text-blue-600">{s.num}</div>
              <div className="text-slate-500 text-xs mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              href={href(`/du-an/${project.slug}`)}
              className="project-card group fade-in"
              style={{ transitionDelay: `${i * 50}ms` } as React.CSSProperties}
            >
              {/* Card image area */}
              <div
                className="relative h-44 flex items-end p-4 overflow-hidden"
                style={{ background: project.bg }}
              >
                {/* Icon background */}
                <Building2
                  size={80}
                  className="absolute top-4 right-4 opacity-[0.06] text-white"
                />

                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${project.accent}22, transparent)` }}
                />

                {/* Scale decoration lines */}
                <div
                  className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{ background: `${project.accent}25`, color: project.accent, border: `1px solid ${project.accent}30` }}
                >
                  {project.scale}
                </div>

                {/* Year badge */}
                <div className="absolute top-3 right-3 text-xs font-semibold text-white/40">
                  {project.year}
                </div>

                {/* Bottom info */}
                <div className="relative z-10 w-full">
                  {/* Sector badge */}
                  <div
                    className="inline-flex text-xs font-bold px-2 py-0.5 rounded mb-2"
                    style={{
                      background: `${SECTOR_COLORS[project.sector] || '#0066ff'}22`,
                      color: SECTOR_COLORS[project.sector] || '#60a5fa',
                      border: `1px solid ${SECTOR_COLORS[project.sector] || '#0066ff'}30`,
                    }}
                  >
                    {project.sector}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 bg-white border border-slate-100 border-t-0 rounded-b-2xl">
                <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={11} className="text-blue-500 flex-shrink-0" />
                  <span>{project.location}</span>
                  <span className="text-slate-200">·</span>
                  <span className="font-medium text-slate-500">{project.client}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center fade-in">
          <Link
            href={href('/du-an')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#0a1628', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0066ff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0a1628' }}
          >
            Khám phá tất cả 500+ dự án <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
