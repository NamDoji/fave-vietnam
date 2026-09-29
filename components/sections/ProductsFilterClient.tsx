'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ArrowRight } from 'lucide-react'

type Category = { id: string; nameVi: string; nameEn: string; slug: string }

type Product = {
  id: string
  slug: string
  nameVi: string
  nameEn: string
  descriptionVi: string
  descriptionEn: string
  imageUrl: string | null
  isFeatured: boolean
  category: Category | null
}

interface Props {
  products: Product[]
  categories: Category[]
  locale: string
}

export default function ProductsFilterClient({ products, categories, locale }: Props) {
  const [activeCatId, setActiveCatId] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeCatId ? products.filter((p) => p.category?.id === activeCatId) : products),
    [activeCatId, products],
  )

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCatId(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCatId === null
                ? 'bg-[#0066ff] text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            Tất cả ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category?.id === cat.id).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCatId === cat.id
                    ? 'bg-[#0066ff] text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {locale === 'en' ? cat.nameEn : cat.nameVi} ({count})
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Package size={36} className="text-slate-300" />
            </div>
            <p className="text-slate-400 text-lg font-medium">Không có sản phẩm trong danh mục này</p>
            <button
              onClick={() => setActiveCatId(null)}
              className="mt-4 text-blue-600 text-sm font-semibold hover:underline"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const name = locale === 'en' ? product.nameEn : product.nameVi
  const desc = locale === 'en' ? product.descriptionEn : product.descriptionVi

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ border: '1px solid rgba(0,102,255,0.08)' }}
    >
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.05), rgba(0,212,255,0.03))' }}
          >
            <Package
              size={52}
              className="text-blue-600/15 group-hover:text-blue-600/25 transition-colors duration-300"
            />
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-[#0066ff] text-white text-xs px-2.5 py-0.5 rounded-full font-semibold z-10">
            Nổi bật
          </div>
        )}
      </div>
      <div className="p-4">
        {product.category && (
          <div className="text-xs text-blue-600 font-semibold mb-1.5 uppercase tracking-wide">
            {locale === 'en' ? product.category.nameEn : product.category.nameVi}
          </div>
        )}
        <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
          {name}
        </h3>
        <p className="text-slate-500 text-xs mb-3 leading-relaxed line-clamp-2">{desc}</p>
        <span className="flex items-center gap-1 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
          Xem chi tiết <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}
