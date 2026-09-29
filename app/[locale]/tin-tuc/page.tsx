import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import CategoryFilter from './_category-filter'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Tin Tức & Kiến Thức HVAC | ${t('siteName')}`,
    description: 'Cập nhật tin tức, kiến thức kỹ thuật và xu hướng mới nhất trong ngành HVAC tại Việt Nam.',
  }
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params

  const [postsData, categoriesData] = await Promise.all([
    prisma.newsPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 30,
      select: {
        id: true, slug: true,
        titleVi: true, titleEn: true,
        descriptionVi: true, descriptionEn: true,
        imageUrl: true, publishedAt: true,
        category: { select: { nameVi: true, nameEn: true, slug: true } },
      },
    }).catch(() => []),
    prisma.newsCategory.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ])

  const categoryNames = ['Tất cả', ...categoriesData.map((c) => locale === 'en' ? c.nameEn : c.nameVi)]

  const posts = postsData.map((p) => ({
    ...p,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }))

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-badge-dark mb-5 inline-flex">📰 Tin tức & Kỹ thuật</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Tin Tức &
            <br />
            <span className="gradient-text">Kiến Thức HVAC</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
            Cập nhật tin tức, kiến thức kỹ thuật và xu hướng mới nhất trong ngành HVAC tại Việt Nam
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Chưa có bài viết nào</h2>
              <p className="text-slate-500 text-sm">Hãy quay lại sau để xem các bài viết mới nhất.</p>
            </div>
          ) : (
            <CategoryFilter posts={posts} categories={categoryNames} locale={locale} />
          )}
        </div>
      </section>
    </div>
  )
}
