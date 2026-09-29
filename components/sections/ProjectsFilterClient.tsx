'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

type Category = { id: string; nameVi: string; nameEn: string; slug: string }

type Project = {
  id: string
  slug: string
  titleVi: string
  titleEn: string
  descriptionVi: string
  imageUrl: string | null
  location: string | null
  scale: string | null
  sectorVi: string | null
  sectorEn: string | null
  clientName: string | null
  completedDate: string | null
  category: Category | null
}

interface Props {
  projects: Project[]
  categories: Category[]
  locale: string
}

const SECTOR_COLORS: Record<string, string> = {
  'Công nghiệp': '#0066ff',
  'Y tế': '#06b6d4',
  'Năng lượng': '#f59e0b',
  'Hành chính': '#8b5cf6',
  'Khách sạn': '#ec4899',
  'Công nghệ': '#6366f1',
  'Bất động sản': '#10b981',
  'Giao thông': '#f97316',
  Industrial: '#0066ff',
  Healthcare: '#06b6d4',
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

export default function ProjectsFilterClient({ projects, categories, locale }: Props) {
  const [activeSector, setActiveSector] = useState<string | null>(null)

  const uniqueSectors = useMemo(() => {
    const seen = new Set<string>()
    projects.forEach((p) => {
      const sector = locale === 'en' ? p.sectorEn : p.sectorVi
      if (sector) seen.add(sector)
    })
    return Array.from(seen)
  }, [projects, locale])

  const filtered = useMemo(() => {
    if (!activeSector) return projects
    return projects.filter((p) => {
      const sector = locale === 'en' ? p.sectorEn : p.sectorVi
      return sector === activeSector
    })
  }, [activeSector, projects, locale])

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveSector(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeSector === null
                ? 'bg-[#0a1628] text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({projects.length})
          </button>
          {uniqueSectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeSector === sector
                  ? 'text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              style={
                activeSector === sector
                  ? { background: SECTOR_COLORS[sector] || '#0066ff' }
                  : undefined
              }
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Building2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>Không tìm thấy dự án trong lĩnh vực này</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project
  index: number
  locale: string
}) {
  const title = locale === 'en' ? project.titleEn : project.titleVi
  const sector = locale === 'en' ? project.sectorEn : project.sectorVi
  const accent = (sector && SECTOR_COLORS[sector]) || '#0066ff'

  return (
    <Link
      href={`/du-an/${project.slug}`}
      className="group rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ border: '1px solid rgba(0,102,255,0.06)' }}
    >
      {/* Image / Gradient */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: BG_GRADIENTS[index % BG_GRADIENTS.length] }}
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Building2
            size={72}
            className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.07] text-white"
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at top left, ${accent}20, transparent)` }}
        />

        {/* Scale badge */}
        {project.scale && (
          <div
            className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-md"
            style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}30` }}
          >
            {project.scale}
          </div>
        )}

        {/* Year */}
        {project.completedDate && (
          <div className="absolute top-3 right-3 text-xs font-semibold text-white/40">
            {new Date(project.completedDate).getFullYear()}
          </div>
        )}

        {/* Sector badge */}
        {sector && (
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}30` }}
            >
              {sector}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-white" style={{ borderTop: 'none' }}>
        <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {project.location && (
            <>
              <MapPin size={11} className="text-blue-500 flex-shrink-0" />
              <span>{project.location}</span>
            </>
          )}
          {project.location && project.clientName && (
            <span className="text-slate-200">·</span>
          )}
          {project.clientName && (
            <span className="text-slate-500 font-medium truncate">{project.clientName}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
