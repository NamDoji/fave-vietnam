'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, Package, Star } from 'lucide-react'

const FEATURED_PRODUCTS = [
  {
    slug: 'may-nen-truc-vit-carrier',
    name: 'Máy Nén Trục Vít Carrier',
    category: 'Máy Nén Lạnh',
    description: 'Máy nén trục vít 100-400TR, COP vượt trội, phù hợp hệ thống làm lạnh công nghiệp lớn.',
    accent: '#0066ff',
    emoji: '⚙️',
  },
  {
    slug: 'bo-xu-ly-khong-khi-ahu',
    name: 'Dàn Xử Lý Không Khí AHU',
    category: 'Xử Lý Không Khí',
    description: 'AHU 5.000-100.000 m³/h, lọc HEPA, làm ẩm/hút ẩm, tối ưu cho nhà máy dược và phòng sạch.',
    accent: '#0099cc',
    emoji: '💨',
  },
  {
    slug: 'thap-giai-nhiet-cooling-tower',
    name: 'Tháp Giải Nhiệt',
    category: 'Thiết Bị Phụ Trợ',
    description: 'Tháp giải nhiệt ngược chiều/chéo dòng 50-3000TR, điện năng thấp, tuổi thọ cao.',
    accent: '#3366cc',
    emoji: '🏗️',
  },
  {
    slug: 'he-thong-vrv-daikin',
    name: 'Hệ Thống VRV Daikin',
    category: 'VRV/VRF',
    description: 'VRV IV thế hệ mới, inverter tiết kiệm 40% điện, điều khiển thông minh từng vùng.',
    accent: '#6633cc',
    emoji: '⚡',
  },
]

export default function ProductsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} className="py-24" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">📦 Sản phẩm</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Thiết Bị & <span className="text-blue-600">Sản Phẩm</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link
            href={href('/san-pham')}
            className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả sản phẩm <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_PRODUCTS.map((product, i) => (
            <Link
              key={product.slug}
              href={href(`/san-pham/${product.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 fade-in"
              style={{
                transitionDelay: `${i * 60}ms`,
                border: '1px solid rgba(0, 102, 255, 0.06)',
              } as React.CSSProperties}
            >
              {/* Image area */}
              <div
                className="h-44 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.accent}10, ${product.accent}05)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                  {product.emoji}
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${product.accent}12, transparent)` }}
                />
                {/* Featured badge */}
                <div
                  className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${product.accent}15`, color: product.accent }}
                >
                  <Star size={10} />
                  Nổi bật
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div
                  className="text-xs font-semibold mb-1.5"
                  style={{ color: product.accent }}
                >
                  {product.category}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all">
                  Xem chi tiết <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center fade-in">
          <Link
            href={href('/san-pham')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300 border border-blue-200 hover:border-blue-600"
          >
            <Package size={15} />
            Xem toàn bộ sản phẩm <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
