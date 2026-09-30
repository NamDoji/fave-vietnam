import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import prisma from '@/lib/prisma'
import ProjectsFilterClient from '@/components/sections/ProjectsFilterClient'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Dự Án HVAC Tiêu Biểu | Tòa nhà, Nhà máy, Bệnh viện — ${t('siteName')}`,
    description:
      'FAVE Vietnam đã hoàn thành 500+ dự án HVAC trên toàn quốc: tòa nhà văn phòng, nhà máy công nghiệp, bệnh viện, trung tâm thương mại, khách sạn. Giá trị dự án lên đến 2.000 tỷ đồng.',
    keywords: 'dự án HVAC, dự án điều hòa trung tâm, HVAC tòa nhà, HVAC nhà máy, HVAC bệnh viện, dự án Chiller, dự án VRV VRF, FAVE Vietnam',
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params

  const [projectsRaw, categoriesRaw] = await Promise.all([
    prisma.project
      .findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { completedDate: 'desc' }],
        take: 60,
        include: { category: true },
      })
      .catch(() => []),
    prisma.projectCategory
      .findMany({ orderBy: { sortOrder: 'asc' } })
      .catch(() => []),
  ])

  const projects = projectsRaw.map((p) => ({
    id: p.id,
    slug: p.slug,
    titleVi: p.titleVi,
    titleEn: p.titleEn,
    descriptionVi: p.descriptionVi,
    imageUrl: p.imageUrl ?? null,
    location: p.location ?? null,
    scale: p.scale ?? null,
    sectorVi: p.sectorVi ?? null,
    sectorEn: p.sectorEn ?? null,
    clientName: p.clientName ?? null,
    completedDate: p.completedDate ? p.completedDate.toISOString() : null,
    category: p.category
      ? {
          id: p.category.id,
          nameVi: p.category.nameVi,
          nameEn: p.category.nameEn,
          slug: p.category.slug,
        }
      : null,
  }))

  const categories = categoriesRaw.map((c) => ({
    id: c.id,
    nameVi: c.nameVi,
    nameEn: c.nameEn,
    slug: c.slug,
  }))

  return (
    <div className="pt-[64px]">
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-6">
              <a href="/" className="hover:text-white/70 transition-colors">
                Trang chủ
              </a>
              <span>/</span>
              <span className="text-white/70">Dự án</span>
            </nav>

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

          {/* Stats */}
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

      {/* Projects with filter */}
      <ProjectsFilterClient projects={projects} categories={categories} locale={locale} />

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Bạn có dự án cần triển khai?
          </h2>
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
