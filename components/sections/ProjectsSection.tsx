'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, MapPin, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PROJECTS = [
  {
    slug: 'unilever-bac-ninh',
    titleVi: 'Nhà Máy Unilever Bắc Ninh',
    sector: 'Công nghiệp',
    location: 'Bắc Ninh',
    scale: '500TR',
    client: 'Unilever Vietnam',
    imageUrl: '/images/project-1.jpg',
  },
  {
    slug: 'vien-huyet-hoc-truyen-mau',
    titleVi: 'Viện Huyết Học - Truyền Máu TW',
    sector: 'Y tế',
    location: 'Hà Nội',
    scale: '200TR',
    client: 'Bộ Y tế',
    imageUrl: '/images/project-2.jpg',
  },
  {
    slug: 'nha-may-nhiet-dien-mong-duong',
    titleVi: 'Nhà Máy Nhiệt Điện Mông Dương',
    sector: 'Năng lượng',
    location: 'Quảng Ninh',
    scale: '1000TR',
    client: 'EVN',
    imageUrl: '/images/project-3.jpg',
  },
  {
    slug: 'bo-cong-an-cuc-quoc-phong',
    titleVi: 'Trụ Sở Bộ Công An',
    sector: 'Hành chính',
    location: 'Hà Nội',
    scale: '300TR',
    client: 'Bộ Công An',
    imageUrl: '/images/project-4.jpg',
  },
  {
    slug: 'khach-san-jw-marriott',
    titleVi: 'Khách Sạn JW Marriott Hà Nội',
    sector: 'Khách sạn',
    location: 'Hà Nội',
    scale: '800TR',
    client: 'JW Marriott',
    imageUrl: '/images/project-5.jpg',
  },
  {
    slug: 'samsung-thai-nguyen',
    titleVi: 'Samsung Electronics Thái Nguyên',
    sector: 'Công nghiệp',
    location: 'Thái Nguyên',
    scale: '2000TR',
    client: 'Samsung Electronics',
    imageUrl: '/images/project-6.jpg',
  },
]

const SECTORS = ['Tất cả', 'Công nghiệp', 'Y tế', 'Năng lượng', 'Hành chính', 'Khách sạn']

export default function ProjectsSection() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const [activeSector, setActiveSector] = useState('Tất cả')

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const filtered =
    activeSector === 'Tất cả'
      ? PROJECTS
      : PROJECTS.filter((p) => p.sector === activeSector)

  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mb-4">{t('title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('description')}</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeSector === sector
                  ? 'bg-[#1a3a5c] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={href(`/du-an/${project.slug}`)}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-[#1a3a5c] to-[#2a5a8c] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 size={56} className="text-white/20" />
                </div>
                <div className="absolute bottom-3 left-3 bg-[#00a0e9] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {project.sector}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1a3a5c] mb-2 group-hover:text-[#00a0e9] transition-colors">
                  {project.titleVi}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#00a0e9]" />
                    {project.location}
                  </span>
                  <span className="font-medium text-[#1a3a5c]">{project.scale}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {t('client')}: <span className="text-gray-600 font-medium">{project.client}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={href('/du-an')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a3a5c] text-[#1a3a5c] font-semibold rounded-lg hover:bg-[#1a3a5c] hover:text-white transition-all"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
