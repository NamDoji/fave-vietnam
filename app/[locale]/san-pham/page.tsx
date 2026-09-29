import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import ProductsFilterClient from '@/components/sections/ProductsFilterClient'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Sản Phẩm HVAC | ${t('siteName')}`,
    description:
      'Phân phối thiết bị HVAC chính hãng: máy nén, AHU, tháp giải nhiệt, VRV, FCU từ Carrier, Daikin, Trane, York, Mitsubishi. Đầy đủ C/O, C/Q, bảo hành chính hãng.',
  }
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params

  const [productsRaw, categoriesRaw] = await Promise.all([
    prisma.product
      .findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
        take: 80,
        include: { category: true },
      })
      .catch(() => []),
    prisma.productCategory
      .findMany({ orderBy: { sortOrder: 'asc' } })
      .catch(() => []),
  ])

  const products = productsRaw.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameVi: p.nameVi,
    nameEn: p.nameEn,
    descriptionVi: p.descriptionVi,
    descriptionEn: p.descriptionEn,
    imageUrl: p.imageUrl ?? null,
    isFeatured: p.isFeatured,
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
    <div className="pt-[80px]">
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 60%, #0a1628 100%)',
        }}
      >
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-6">
            <a href="/" className="hover:text-white/70 transition-colors">
              Trang chủ
            </a>
            <span>/</span>
            <span className="text-white/70">Sản phẩm</span>
          </nav>

          <span className="section-badge-dark mb-5 inline-flex">📦 Sản phẩm HVAC</span>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Thiết Bị HVAC
            <br />
            <span className="gradient-text">Chất Lượng Cao</span>
          </h1>

          <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            Phân phối thiết bị HVAC chính hãng từ Carrier, Daikin, Trane, York, Mitsubishi —
            đầy đủ C/O, C/Q, bảo hành chính hãng
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { num: '500+', label: 'Sản phẩm' },
              { num: '20+', label: 'Thương hiệu' },
              { num: '100%', label: 'Chính hãng' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-white">{s.num}</div>
                <div className="text-white/40 text-xs font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products with filter */}
      <ProductsFilterClient products={products} categories={categories} locale={locale} />
    </div>
  )
}
