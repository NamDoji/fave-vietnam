'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'

const SECTOR_COLORS: Record<string, string> = {
  'Công nghiệp': '#0066ff',
  'Y tế': '#06b6d4',
  'Năng lượng': '#f59e0b',
  'Hành chính': '#8b5cf6',
  'Khách sạn': '#ec4899',
}

const BG_GRADIENTS = [
  'linear-gradient(135deg, #0d2137 0%, #1a3a60 100%)',
  'linear-gradient(135deg, #0d1f35 0%, #163050 100%)',
  'linear-gradient(135deg, #0d1a2b 0%, #0f2540 100%)',
  'linear-gradient(135deg, #08162b 0%, #0d2040 100%)',
  'linear-gradient(135deg, #0f1f35 0%, #1a3050 100%)',
  'linear-gradient(135deg, #0b1e35 0%, #162d4a 100%)',
  'linear-gradient(135deg, #0a1c32 0%, #142840 100%)',
  'linear-gradient(135deg, #0d1f38 0%, #163352 100%)',
]

const FALLBACK_PROJECTS = [
  { slug: 'unilever-bac-ninh', titleVi: 'Nhà Máy Unilever Bắc Ninh', clientName: 'Unilever Vietnam', sectorVi: 'Công nghiệp', location: 'Bắc Ninh', scale: '500TR' },
  { slug: 'vien-huyet-hoc', titleVi: 'Viện Huyết Học TW', clientName: 'Bộ Y tế', sectorVi: 'Y tế', location: 'Hà Nội', scale: '200TR' },
  { slug: 'nhiet-dien-mong-duong', titleVi: 'Nhiệt Điện Mông Dương', clientName: 'EVN', sectorVi: 'Năng lượng', location: 'Quảng Ninh', scale: '1000TR' },
  { slug: 'samsung-thai-nguyen', titleVi: 'Samsung Electronics', clientName: 'Samsung', sectorVi: 'Công nghiệp', location: 'Thái Nguyên', scale: '2000TR' },
  { slug: 'jw-marriott-hanoi', titleVi: 'JW Marriott Hà Nội', clientName: 'JW Marriott', sectorVi: 'Khách sạn', location: 'Hà Nội', scale: '800TR' },
  { slug: 'vinmec-times-city', titleVi: 'Bệnh Viện Vinmec', clientName: 'Vinmec', sectorVi: 'Y tế', location: 'Hà Nội', scale: '400TR' },
  { slug: 'bo-cong-an', titleVi: 'Trụ Sở Bộ Công An', clientName: 'Bộ Công An', sectorVi: 'Hành chính', location: 'Hà Nội', scale: '300TR' },
  { slug: 'khu-cong-nghiep-vsip', titleVi: 'KCN VSIP Bắc Ninh', clientName: 'VSIP Group', sectorVi: 'Công nghiệp', location: 'Bắc Ninh', scale: '800TR' },
]

interface ProjectItem {
  slug: string
  titleVi: string
  clientName: string
  sectorVi: string
  location: string
  scale: string
}

export default function ProjectsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<ProjectItem[]>([])

  useEffect(() => {
    fetch('/api/projects?featured=true&take=8')
      .then(r => r.json())
      .then(d => {
        const list = d.projects || []
        if (list.length > 0) {
          setProjects(list.map((p: { slug: string; titleVi: string; clientName?: string; sectorVi?: string; location?: string; scale?: string }) => ({
            slug: p.slug,
            titleVi: p.titleVi,
            clientName: p.clientName || '',
            sectorVi: p.sectorVi || '',
            location: p.location || '',
            scale: p.scale || '',
          })))
        } else {
          fetch('/api/projects?take=8')
            .then(r => r.json())
            .then(d2 => {
              if (d2.projects && d2.projects.length > 0) {
                setProjects(d2.projects.map((p: { slug: string; titleVi: string; clientName?: string; sectorVi?: string; location?: string; scale?: string }) => ({
                  slug: p.slug, titleVi: p.titleVi, clientName: p.clientName || '', sectorVi: p.sectorVi || '', location: p.location || '', scale: p.scale || '',
                })))
              }
            })
            .catch(() => {})
        }
      })
      .catch(() => {})
  }, [])

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

  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS

  return (
    <section ref={sectionRef} className="py-24" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">🏗️ Dự án</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Dự Án <span className="text-blue-600">Tiêu Biểu</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link href={href('/du-an')} className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all">
            Xem tất cả dự án <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 fade-in">
          {[
            { num: '500+', label: 'Dự án hoàn thành' },
            { num: '25+', label: 'Tỉnh thành' },
            { num: '1000TR+', label: 'Dự án lớn nhất' },
            { num: '98%', label: 'Khách hàng hài lòng' },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 rounded-xl"
              style={{ background: 'rgba(0, 102, 255, 0.04)', border: '1px solid rgba(0, 102, 255, 0.08)' }}>
              <div className="text-2xl font-black text-blue-600">{s.num}</div>
              <div className="text-slate-500 text-xs mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayProjects.map((project, i) => {
            const accent = SECTOR_COLORS[project.sectorVi] || '#0066ff'
            return (
              <Link key={project.slug} href={href(`/du-an/${project.slug}`)}
                className="project-card group fade-in"
                style={{ transitionDelay: `${i * 50}ms` } as React.CSSProperties}>
                <div className="relative h-44 flex items-end p-4 overflow-hidden"
                  style={{ background: BG_GRADIENTS[i % BG_GRADIENTS.length] }}>
                  <Building2 size={80} className="absolute top-4 right-4 opacity-[0.06] text-white" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${accent}22, transparent)` }} />
                  {project.scale && (
                    <div className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}30` }}>
                      {project.scale}
                    </div>
                  )}
                  <div className="relative z-10 w-full">
                    {project.sectorVi && (
                      <div className="inline-flex text-xs font-bold px-2 py-0.5 rounded mb-2"
                        style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}30` }}>
                        {project.sectorVi}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-white border border-slate-100 border-t-0 rounded-b-2xl">
                  <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{project.titleVi}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {project.location && <><MapPin size={11} className="text-blue-500 flex-shrink-0" /><span>{project.location}</span></>}
                    {project.location && project.clientName && <span className="text-slate-200">·</span>}
                    {project.clientName && <span className="font-medium text-slate-500">{project.clientName}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center fade-in">
          <Link href={href('/du-an')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#0a1628', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0066ff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0a1628' }}>
            Khám phá tất cả dự án <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
