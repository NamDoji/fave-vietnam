'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, Package, Star } from 'lucide-react'

const ACCENT_COLORS = ['#0066ff', '#0099cc', '#3366cc', '#6633cc', '#009966', '#cc6600']

const FALLBACK_PRODUCTS = [
  { slug: 'may-nen-truc-vit-carrier', nameVi: 'Máy Nén Trục Vít Carrier', category: 'Máy Nén Lạnh', descVi: 'Máy nén trục vít 100-400TR, COP vượt trội, phù hợp hệ thống làm lạnh công nghiệp lớn.', imageUrl: null, emoji: '⚙️' },
  { slug: 'bo-xu-ly-khong-khi-ahu', nameVi: 'Dàn Xử Lý Không Khí AHU', category: 'Xử Lý Không Khí', descVi: 'AHU 5.000-100.000 m³/h, lọc HEPA, làm ẩm/hút ẩm, tối ưu cho nhà máy dược và phòng sạch.', imageUrl: null, emoji: '💨' },
  { slug: 'thap-giai-nhiet-cooling-tower', nameVi: 'Tháp Giải Nhiệt', category: 'Thiết Bị Phụ Trợ', descVi: 'Tháp giải nhiệt ngược chiều/chéo dòng 50-3000TR, điện năng thấp, tuổi thọ cao.', imageUrl: null, emoji: '🏗️' },
  { slug: 'he-thong-vrv-daikin', nameVi: 'Hệ Thống VRV Daikin', category: 'VRV/VRF', descVi: 'VRV IV thế hệ mới, inverter tiết kiệm 40% điện, điều khiển thông minh từng vùng.', imageUrl: null, emoji: '⚡' },
]

interface ProductItem {
  slug: string
  nameVi: string
  category: string
  descVi: string
  imageUrl: string | null
  emoji: string
  accent: string
}

export default function ProductsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<ProductItem[]>([])

  useEffect(() => {
    fetch('/api/products?featured=true&take=4')
      .then(r => r.json())
      .then(d => {
        const list = d.products || []
        if (list.length > 0) {
          setProducts(list.map((p: { slug: string; nameVi: string; category?: { nameVi?: string }; descriptionVi: string; imageUrl?: string }, i: number) => ({
            slug: p.slug,
            nameVi: p.nameVi,
            category: p.category?.nameVi || '',
            descVi: p.descriptionVi,
            imageUrl: p.imageUrl || null,
            emoji: '📦',
            accent: ACCENT_COLORS[i % ACCENT_COLORS.length],
          })))
        } else {
          // Try all products if no featured
          fetch('/api/products?take=4')
            .then(r => r.json())
            .then(d2 => {
              if (d2.products && d2.products.length > 0) {
                setProducts(d2.products.map((p: { slug: string; nameVi: string; category?: { nameVi?: string }; descriptionVi: string; imageUrl?: string }, i: number) => ({
                  slug: p.slug, nameVi: p.nameVi, category: p.category?.nameVi || '', descVi: p.descriptionVi, imageUrl: p.imageUrl || null, emoji: '📦', accent: ACCENT_COLORS[i % ACCENT_COLORS.length],
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
              setTimeout(() => el.classList.add('visible'), i * 80)
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

  const displayProducts = products.length > 0
    ? products
    : FALLBACK_PRODUCTS.map((p, i) => ({ ...p, accent: ACCENT_COLORS[i % ACCENT_COLORS.length] }))

  return (
    <section ref={sectionRef} className="py-24" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">📦 Sản phẩm</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Thiết Bị & <span className="text-blue-600">Sản Phẩm</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link href={href('/san-pham')} className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all">
            Xem tất cả sản phẩm <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProducts.map((product, i) => (
            <Link key={product.slug} href={href(`/san-pham/${product.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 fade-in"
              style={{ transitionDelay: `${i * 60}ms`, border: '1px solid rgba(0, 102, 255, 0.06)' } as React.CSSProperties}>
              <div className="h-44 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.accent}10, ${product.accent}05)` }}>
                {product.imageUrl
                  ? <img src={product.imageUrl} alt={product.nameVi} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">{product.emoji}</div>
                }
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${product.accent}12, transparent)` }} />
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${product.accent}15`, color: product.accent }}>
                  <Star size={10} />Nổi bật
                </div>
              </div>
              <div className="p-4">
                {product.category && <div className="text-xs font-semibold mb-1.5" style={{ color: product.accent }}>{product.category}</div>}
                <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug group-hover:text-blue-600 transition-colors">{product.nameVi}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{product.descVi}</p>
                <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all">
                  Xem chi tiết <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center fade-in">
          <Link href={href('/san-pham')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300 border border-blue-200 hover:border-blue-600">
            <Package size={15} />Xem toàn bộ sản phẩm <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
