import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Calendar,
  Building2,
  ChevronRight,
  User,
  ArrowRight,
  Tag,
  Layers,
} from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const project = await prisma.project.findUnique({ where: { slug } }).catch(() => null)
  if (!project) return { title: `Dự án | ${t('siteName')}` }
  return {
    title: `${project.titleVi} | ${t('siteName')}`,
    description: project.descriptionVi.slice(0, 160),
  }
}

function parseGallery(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter((u) => typeof u === 'string') as string[]
  return []
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const project = await prisma.project
    .findUnique({ where: { slug }, include: { category: true } })
    .catch(() => null)

  if (!project || !project.isActive) notFound()

  const title = locale === 'en' ? project.titleEn : project.titleVi
  const description = locale === 'en' ? project.descriptionEn : project.descriptionVi
  const content = locale === 'en' ? project.contentEn : project.contentVi
  const sector = locale === 'en' ? project.sectorEn : project.sectorVi
  const categoryName =
    project.category
      ? locale === 'en'
        ? project.category.nameEn
        : project.category.nameVi
      : null
  const gallery = parseGallery(project.gallery)
  const completedYear = project.completedDate
    ? new Date(project.completedDate).getFullYear()
    : null

  // Related projects from same category or sector
  const related = await prisma.project
    .findMany({
      where: {
        isActive: true,
        NOT: { slug },
        ...(project.categoryId ? { categoryId: project.categoryId } : {}),
      },
      take: 3,
      orderBy: [{ isFeatured: 'desc' }, { completedDate: 'desc' }],
    })
    .catch(() => [])

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/du-an" className="hover:text-blue-600 transition-colors">
            Dự án
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-medium truncate max-w-xs">{title}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-end overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628, #0d2040)' }}
      >
        {project.imageUrl ? (
          <>
            <Image
              src={project.imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 60%, transparent 100%)' }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0 tech-grid opacity-30" />
            <Building2
              size={200}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-white/[0.04]"
            />
          </>
        )}

        <div className="relative w-full max-w-7xl mx-auto px-4 pb-12 pt-20">
          {sector && (
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {sector}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight max-w-3xl">
            {title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {project.clientName && (
              <div className="flex items-center gap-2">
                <User size={14} className="text-blue-400" />
                {project.clientName}
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                {project.location}
              </div>
            )}
            {project.scale && (
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-blue-400" />
                Quy mô: {project.scale}
              </div>
            )}
            {completedYear && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-400" />
                Hoàn thành: {completedYear}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            {description && (
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Tổng quan dự án</h2>
                <p className="text-slate-600 leading-relaxed text-base">{description}</p>
              </section>
            )}

            {/* Full content */}
            {content && (
              <section>
                <div
                  className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </section>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Hình ảnh dự án</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((url, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 sm:col-span-1 aspect-[4/3] sm:row-span-2 sm:aspect-auto' : 'aspect-[4/3]'}`}
                      style={i === 0 ? { gridRow: '1 / span 2' } : {}}
                    >
                      <Image
                        src={url}
                        alt={`${title} ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Placeholder gallery if no images */}
            {gallery.length === 0 && !project.imageUrl && (
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`${i === 1 ? 'col-span-2 h-56' : 'h-56'} rounded-xl flex items-center justify-center`}
                    style={{ background: 'linear-gradient(135deg, #0d2137, #1a3a60)' }}
                  >
                    <Building2 size={i === 1 ? 56 : 36} className="text-white/10" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-5">
            {/* Project info card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.08)' }}
            >
              <h3 className="font-black text-slate-900 mb-5">Thông tin dự án</h3>
              <dl className="space-y-4">
                {[
                  { label: 'Khách hàng', value: project.clientName, icon: <User size={14} className="text-blue-500" /> },
                  { label: 'Địa điểm', value: project.location, icon: <MapPin size={14} className="text-blue-500" /> },
                  { label: 'Quy mô', value: project.scale, icon: <Layers size={14} className="text-blue-500" /> },
                  { label: 'Lĩnh vực', value: sector, icon: <Tag size={14} className="text-blue-500" /> },
                  {
                    label: 'Hoàn thành',
                    value: completedYear ? String(completedYear) : null,
                    icon: <Calendar size={14} className="text-blue-500" />,
                  },
                  { label: 'Danh mục', value: categoryName, icon: <Building2 size={14} className="text-blue-500" /> },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                      <div>
                        <dt className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</dt>
                        <dd className="text-sm text-slate-800 font-semibold">{item.value}</dd>
                      </div>
                    </div>
                  ))}
              </dl>
            </div>

            {/* CTA card */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0a1628, #0d2040)' }}
            >
              <h3 className="font-black mb-2">Dự án tương tự?</h3>
              <p className="text-white/55 text-sm mb-5 leading-relaxed">
                Liên hệ để được tư vấn giải pháp HVAC phù hợp và báo giá miễn phí
              </p>
              <div className="space-y-3">
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#0066ff] text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors"
                >
                  Liên hệ ngay <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:0981907109"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  0981 907 109
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900">Dự án liên quan</h2>
              <Link
                href="/du-an"
                className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all"
              >
                Xem tất cả <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rp) => {
                const rTitle = locale === 'en' ? rp.titleEn : rp.titleVi
                return (
                  <Link
                    key={rp.slug}
                    href={`/du-an/${rp.slug}`}
                    className="group rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ border: '1px solid rgba(0,102,255,0.08)' }}
                  >
                    <div
                      className="relative h-40 overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #0d2137, #1a3a60)' }}
                    >
                      {rp.imageUrl ? (
                        <Image
                          src={rp.imageUrl}
                          alt={rTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="33vw"
                        />
                      ) : (
                        <Building2 size={56} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10" />
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rTitle}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        {rp.location && (
                          <>
                            <MapPin size={10} className="text-blue-500" />
                            {rp.location}
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
