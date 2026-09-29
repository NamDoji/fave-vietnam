import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Phone, ArrowRight, ChevronRight, Package } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const product = await prisma.product.findUnique({ where: { slug } }).catch(() => null)
  if (!product) return { title: `Sản phẩm | ${t('siteName')}` }
  return {
    title: `${product.nameVi} | ${t('siteName')}`,
    description: product.descriptionVi.slice(0, 160),
  }
}

function parseSpecs(raw: unknown): { label: string; value: string }[] {
  if (!raw) return []
  if (Array.isArray(raw)) {
    return (raw as Array<{ label?: string; value?: string }>)
      .filter((s) => s.label && s.value)
      .map((s) => ({ label: String(s.label), value: String(s.value) }))
  }
  if (typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>).map(([k, v]) => ({
      label: k,
      value: String(v),
    }))
  }
  return []
}

function parseGallery(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter((u) => typeof u === 'string') as string[]
  return []
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const product = await prisma.product
    .findUnique({ where: { slug }, include: { category: true } })
    .catch(() => null)

  if (!product || !product.isActive) notFound()

  const name = locale === 'en' ? product.nameEn : product.nameVi
  const desc = locale === 'en' ? product.descriptionEn : product.descriptionVi
  const content = locale === 'en' ? product.contentEn : product.contentVi
  const categoryName =
    product.category
      ? locale === 'en'
        ? product.category.nameEn
        : product.category.nameVi
      : null

  const specs = parseSpecs(product.specs)
  const gallery = parseGallery(product.gallery)

  // Related products from same category
  const related = product.categoryId
    ? await prisma.product
        .findMany({
          where: {
            categoryId: product.categoryId,
            isActive: true,
            NOT: { slug },
          },
          take: 4,
          orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
        })
        .catch(() => [])
    : []

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/san-pham" className="hover:text-blue-600 transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-medium truncate max-w-xs">{name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-50">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: 'rgba(0,102,255,0.08)' }}
                >
                  <Package size={56} className="text-blue-600/25" />
                </div>
                {categoryName && (
                  <span className="text-sm text-slate-400 font-medium">{categoryName}</span>
                )}
              </div>
            )}
            {product.isFeatured && (
              <div className="absolute top-4 right-4 bg-[#0066ff] text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                Nổi bật
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {categoryName && (
              <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">
                {categoryName}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {name}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-6">{desc}</p>

            {/* Key specs preview */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {specs.slice(0, 4).map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(0,102,255,0.08)' }}
                  >
                    <div className="text-xs text-slate-500 mb-0.5">{spec.label}</div>
                    <div className="font-bold text-slate-900 text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/lien-he"
                className="btn-primary text-sm"
              >
                <Phone size={15} />
                Yêu cầu báo giá
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:0981907109"
                className="btn-outline text-sm"
              >
                0981 907 109
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Hình ảnh sản phẩm</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={url}
                    alt={`${name} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Content + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            {content && (
              <section className="mb-10">
                <h2 className="text-2xl font-black text-slate-900 mb-5">Mô tả chi tiết</h2>
                <div
                  className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </section>
            )}
          </div>

          {/* Specs sidebar */}
          {specs.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-5">Thông số kỹ thuật</h2>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,102,255,0.1)' }}>
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{ borderBottom: i < specs.length - 1 ? '1px solid rgba(0,102,255,0.06)' : 'none' }}
                  >
                    <div
                      className="px-4 py-3 text-sm font-medium text-slate-600 w-2/5 flex-shrink-0"
                      style={{ background: i % 2 === 0 ? 'rgba(0,102,255,0.03)' : 'white' }}
                    >
                      {spec.label}
                    </div>
                    <div
                      className="px-4 py-3 text-sm text-slate-800 font-semibold"
                      style={{ background: i % 2 === 0 ? 'rgba(0,102,255,0.01)' : 'white' }}
                    >
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900">Sản phẩm liên quan</h2>
              <Link
                href="/san-pham"
                className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all"
              >
                Xem tất cả <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rp) => {
                const rName = locale === 'en' ? rp.nameEn : rp.nameVi
                const rDesc = locale === 'en' ? rp.descriptionEn : rp.descriptionVi
                return (
                  <Link
                    key={rp.slug}
                    href={`/san-pham/${rp.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ border: '1px solid rgba(0,102,255,0.08)' }}
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
                      {rp.imageUrl ? (
                        <Image
                          src={rp.imageUrl}
                          alt={rName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package size={36} className="text-blue-600/15" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-slate-900 text-xs mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rName}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-1">{rDesc}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section
          className="mt-16 rounded-2xl p-8 sm:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #0a1628, #0d2040)' }}
        >
          <h3 className="text-2xl font-black text-white mb-2">Cần báo giá hoặc tư vấn?</h3>
          <p className="text-white/55 mb-6">
            Đội ngũ kỹ sư FAVE sẵn sàng hỗ trợ trong vòng 24 giờ làm việc
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066ff] text-white font-semibold rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 text-sm"
            >
              Liên hệ ngay <ArrowRight size={14} />
            </Link>
            <a
              href="tel:0981907109"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
            >
              0981 907 109
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
