'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Building2, ArrowRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const PROJECTS = [
  { slug: 'unilever-bac-ninh', title: 'Nhà Máy Unilever Bắc Ninh', sector: 'Công nghiệp', location: 'Bắc Ninh', scale: '500TR', client: 'Unilever Vietnam', year: '2023', bg: 'linear-gradient(135deg, #0d2137, #1a3a60)', accent: '#0066ff' },
  { slug: 'vien-huyet-hoc', title: 'Viện Huyết Học - Truyền Máu TW', sector: 'Y tế', location: 'Hà Nội', scale: '200TR', client: 'Bộ Y tế', year: '2022', bg: 'linear-gradient(135deg, #0d1f35, #163050)', accent: '#3399ff' },
  { slug: 'nhiet-dien-mong-duong', title: 'Nhà Máy Nhiệt Điện Mông Dương', sector: 'Năng lượng', location: 'Quảng Ninh', scale: '1000TR', client: 'EVN', year: '2021', bg: 'linear-gradient(135deg, #0d1a2b, #0f2540)', accent: '#60a5fa' },
  { slug: 'bo-cong-an', title: 'Trụ Sở Bộ Công An', sector: 'Hành chính', location: 'Hà Nội', scale: '300TR', client: 'Bộ Công An', year: '2022', bg: 'linear-gradient(135deg, #0a1c32, #142840)', accent: '#93c5fd' },
  { slug: 'jw-marriott-hanoi', title: 'Khách Sạn JW Marriott Hà Nội', sector: 'Khách sạn', location: 'Hà Nội', scale: '800TR', client: 'JW Marriott', year: '2020', bg: 'linear-gradient(135deg, #0f1f35, #1a3050)', accent: '#7dd3fc' },
  { slug: 'samsung-thai-nguyen', title: 'Samsung Electronics Thái Nguyên', sector: 'Công nghiệp', location: 'Thái Nguyên', scale: '2000TR', client: 'Samsung', year: '2019', bg: 'linear-gradient(135deg, #08162b, #0d2040)', accent: '#0066ff' },
  { slug: 'vinmec-times-city', title: 'Bệnh Viện Vinmec Times City', sector: 'Y tế', location: 'Hà Nội', scale: '400TR', client: 'Vinmec', year: '2021', bg: 'linear-gradient(135deg, #0b1e35, #162d4a)', accent: '#38bdf8' },
  { slug: 'khu-cong-nghiep-vsip', title: 'Khu Công Nghiệp VSIP Bắc Ninh', sector: 'Công nghiệp', location: 'Bắc Ninh', scale: '800TR', client: 'VSIP Group', year: '2023', bg: 'linear-gradient(135deg, #0d1f38, #163352)', accent: '#0066ff' },
  { slug: 'fpt-complex', title: 'FPT Complex Hà Nội', sector: 'Công nghệ', location: 'Hà Nội', scale: '350TR', client: 'FPT Corporation', year: '2022', bg: 'linear-gradient(135deg, #0d1c30, #152840)', accent: '#818cf8' },
  { slug: 'vingroup-smart-city', title: 'Vinhomes Smart City', sector: 'Bất động sản', location: 'Hà Nội', scale: '600TR', client: 'Vingroup', year: '2023', bg: 'linear-gradient(135deg, #0c1b30, #14263c)', accent: '#34d399' },
  { slug: 'hanoi-metro', title: 'Ga Metro Nhổn - Ga Hà Nội', sector: 'Giao thông', location: 'Hà Nội', scale: '450TR', client: 'Ban QLDA Đường sắt HN', year: '2023', bg: 'linear-gradient(135deg, #0a1929, #12243a)', accent: '#f59e0b' },
  { slug: 'bv-bach-mai', title: 'Bệnh Viện Bạch Mai Cơ sở 2', sector: 'Y tế', location: 'Hà Nam', scale: '280TR', client: 'Bộ Y tế', year: '2021', bg: 'linear-gradient(135deg, #0d1f35, #163050)', accent: '#06b6d4' },
]

const SECTORS = ['Tất cả', 'Công nghiệp', 'Y tế', 'Năng lượng', 'Hành chính', 'Khách sạn', 'Công nghệ', 'Bất động sản', 'Giao thông']

const SECTOR_COLORS: Record<string, string> = {
  'Công nghiệp': '#0066ff',
  'Y tế': '#06b6d4',
  'Năng lượng': '#f59e0b',
  'Hành chính': '#8b5cf6',
  'Khách sạn': '#ec4899',
  'Công nghệ': '#6366f1',
  'Bất động sản': '#10b981',
  'Giao thông': '#f97316',
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả')

  const filtered = activeFilter === 'Tất cả'
    ? PROJECTS
    : PROJECTS.filter((p) => p.sector === activeFilter)

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-badge-dark mb-5 inline-flex">🏗️ Dự án tiêu biểu</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              500+ Dự Án
              <br />
              <span className="gradient-text">Đã Hoàn Thành</span>
            </h1>
            <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
              Từ nhà máy công nghiệp đến tòa nhà thương mại, bệnh viện và hạ tầng công cộng —
              FAVE Vietnam là đối tác HVAC tin cậy trên toàn quốc
            </p>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { num: '500+', label: 'Dự án' },
              { num: '25+', label: 'Tỉnh thành' },
              { num: '2000TR', label: 'Dự án lớn nhất' },
              { num: '10+', label: 'Năm kinh nghiệm' },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-xl font-black text-white">{s.num}</div>
                <div className="text-white/40 text-xs mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveFilter(s)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  activeFilter === s
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/du-an/${project.slug}`}
                className="project-card group"
              >
                {/* Image */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ background: project.bg, borderRadius: '16px 16px 0 0' }}
                >
                  <Building2 size={72} className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.07] text-white" />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at top left, ${project.accent}20, transparent)` }}
                  />

                  {/* Scale badge */}
                  <div
                    className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}30` }}
                  >
                    {project.scale}
                  </div>

                  {/* Year */}
                  <div className="absolute top-3 right-3 text-xs font-semibold text-white/35">{project.year}</div>

                  {/* Sector badge */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="inline-flex text-xs font-bold px-2 py-0.5 rounded"
                      style={{
                        background: `${SECTOR_COLORS[project.sector] || '#0066ff'}20`,
                        color: SECTOR_COLORS[project.sector] || '#60a5fa',
                        border: `1px solid ${SECTOR_COLORS[project.sector] || '#0066ff'}30`,
                      }}
                    >
                      {project.sector}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-4 bg-white"
                  style={{ border: '1px solid #f1f5f9', borderTop: 'none', borderRadius: '0 0 16px 16px' }}
                >
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={11} className="text-blue-500 flex-shrink-0" />
                    {project.location}
                    <span className="text-slate-200">·</span>
                    <span className="text-slate-500 font-medium truncate">{project.client}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              Không tìm thấy dự án trong lĩnh vực này
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Bạn có dự án cần triển khai?</h2>
          <p className="text-slate-500 mb-8">
            Liên hệ ngay để được tư vấn giải pháp HVAC phù hợp và nhận báo giá chi tiết trong 24h
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Liên hệ tư vấn <ArrowRight size={16} />
            </Link>
            <a
              href="tel:0981907109"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:-translate-y-0.5"
            >
              <Phone size={16} className="text-blue-600" />
              0981 907 109
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
