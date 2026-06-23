'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MapPin, ArrowRight } from 'lucide-react'

const PROJECTS = [
  {
    slug: 'unilever-bac-ninh',
    title: 'Nhà Máy Unilever Bắc Ninh',
    client: 'Unilever Vietnam',
    sector: 'Công nghiệp',
    location: 'Bắc Ninh',
    scale: '500TR',
    year: '2023',
  },
  {
    slug: 'vien-huyet-hoc',
    title: 'Viện Huyết Học TW',
    client: 'Bộ Y tế',
    sector: 'Y tế',
    location: 'Hà Nội',
    scale: '200TR',
    year: '2022',
  },
  {
    slug: 'nhiet-dien-mong-duong',
    title: 'Nhiệt Điện Mông Dương',
    client: 'EVN',
    sector: 'Năng lượng',
    location: 'Quảng Ninh',
    scale: '1000TR',
    year: '2021',
  },
  {
    slug: 'samsung-thai-nguyen',
    title: 'Samsung Electronics',
    client: 'Samsung',
    sector: 'Công nghiệp',
    location: 'Thái Nguyên',
    scale: '2000TR',
    year: '2019',
  },
  {
    slug: 'jw-marriott-hanoi',
    title: 'JW Marriott Hà Nội',
    client: 'JW Marriott',
    sector: 'Khách sạn',
    location: 'Hà Nội',
    scale: '800TR',
    year: '2020',
  },
  {
    slug: 'vinmec-times-city',
    title: 'Bệnh Viện Vinmec',
    client: 'Vinmec',
    sector: 'Y tế',
    location: 'Hà Nội',
    scale: '400TR',
    year: '2021',
  },
  {
    slug: 'bo-cong-an',
    title: 'Trụ Sở Bộ Công An',
    client: 'Bộ Công An',
    sector: 'Hành chính',
    location: 'Hà Nội',
    scale: '300TR',
    year: '2022',
  },
  {
    slug: 'khu-cong-nghiep-vsip',
    title: 'KCN VSIP Bắc Ninh',
    client: 'VSIP Group',
    sector: 'Công nghiệp',
    location: 'Bắc Ninh',
    scale: '800TR',
    year: '2023',
  },
]

export default function ProjectsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 55)
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
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14 fade-in">
          <div>
            <div className="section-label mb-4" style={{ color: '#C8A96E' }}>
              Dự Án
            </div>
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
              Dự Án{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Tiêu Biểu</span>
            </h2>
          </div>
          <Link
            href={href('/du-an')}
            className="inline-flex items-center gap-2 group transition-all"
            style={{ color: '#1A3C6E', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Xem tất cả dự án
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-14 fade-in" style={{ background: 'rgba(26,60,110,0.1)' }}>
          {[
            { num: '500+', label: 'Dự án hoàn thành' },
            { num: '25+', label: 'Tỉnh thành' },
            { num: '1000TR+', label: 'Dự án lớn nhất' },
            { num: '98%', label: 'Khách hàng hài lòng' },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center py-6 px-4"
              style={{ background: '#FFFFFF' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontWeight: 700,
                  fontSize: '1.75rem',
                  color: '#1A3C6E',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  marginBottom: '0.375rem',
                }}
              >
                {s.num}
              </div>
              <div style={{ color: '#8A8A8A', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Grid — thin border style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(26,60,110,0.08)' }}>
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              href={href(`/du-an/${project.slug}`)}
              className="group fade-in block"
              style={{ transitionDelay: `${i * 45}ms`, background: '#FFFFFF' } as React.CSSProperties}
            >
              {/* Image container — fixed height with dark bg */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: '160px',
                  background: '#0D0D0D',
                  border: '1px solid rgba(26,60,110,0.1)',
                  borderBottom: 'none',
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(26,60,110,0.85)' }}
                >
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {project.title}
                  </div>
                  <div style={{ color: 'rgba(200,169,110,0.8)', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
                    {project.location}
                  </div>
                </div>

                {/* Scale badge — always visible */}
                <div
                  className="absolute top-3 left-3"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgba(200,169,110,0.7)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {project.scale}
                </div>

                {/* Year */}
                <div
                  className="absolute top-3 right-3"
                  style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6875rem', letterSpacing: '0.08em' }}
                >
                  {project.year}
                </div>

                {/* Sector pill — bottom */}
                <div
                  className="absolute bottom-3 left-3"
                  style={{
                    fontSize: '0.6125rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,169,110,0.6)',
                  }}
                >
                  {project.sector}
                </div>
              </div>

              {/* Card body */}
              <div
                className="p-4 transition-all duration-300"
                style={{ border: '1px solid rgba(26,60,110,0.08)' }}
              >
                <h3
                  className="mb-2 line-clamp-2 transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: '#0D0D0D',
                    lineHeight: 1.35,
                    letterSpacing: '-0.005em',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = '#1A3C6E' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = '#0D0D0D' }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5" style={{ color: '#8A8A8A', fontSize: '0.75rem' }}>
                  <MapPin size={11} style={{ color: 'rgba(200,169,110,0.6)', flexShrink: 0 }} />
                  <span>{project.location}</span>
                  <span style={{ color: 'rgba(26,60,110,0.2)' }}>·</span>
                  <span style={{ color: '#6B6B6B', fontWeight: 500 }}>{project.client}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center fade-in">
          <Link
            href={href('/du-an')}
            className="btn-luxury"
            style={{ background: '#0D0D0D', borderColor: '#0D0D0D' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1A3C6E'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3C6E' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0D0D0D'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0D0D0D' }}
          >
            Khám phá tất cả 500+ dự án <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
