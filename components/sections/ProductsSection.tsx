import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, Star, Package } from 'lucide-react'

const FEATURED_PRODUCTS = [
  {
    slug: 'may-nen-truc-vit-carrier',
    name: 'Máy Nén Trục Vít Carrier',
    category: 'Máy Nén',
    description: 'Máy nén trục vít công suất cao 100-400TR, hiệu suất COP vượt trội, phù hợp hệ thống làm lạnh công nghiệp.',
    imageUrl: '/images/product-1.jpg',
    isFeatured: true,
  },
  {
    slug: 'bo-xu-ly-khong-khi-ahu',
    name: 'Dàn Xử Lý Không Khí AHU',
    category: 'Xử Lý Không Khí',
    description: 'Air Handling Unit công suất 5.000 - 100.000 m³/h, tích hợp lọc bụi HEPA, làm ẩm và hút ẩm.',
    imageUrl: '/images/product-2.jpg',
    isFeatured: true,
  },
  {
    slug: 'thap-giai-nhiet-cooling-tower',
    name: 'Tháp Giải Nhiệt',
    category: 'Thiết Bị Phụ Trợ',
    description: 'Tháp giải nhiệt dạng ngược chiều và chéo dòng, công suất 50-3000TR, tiêu thụ điện thấp.',
    imageUrl: '/images/product-3.jpg',
    isFeatured: true,
  },
  {
    slug: 'he-thong-vrv-daikin',
    name: 'Hệ Thống VRV Daikin',
    category: 'VRV/VRF',
    description: 'Hệ thống VRV IV thế hệ mới nhất, công nghệ inverter tiết kiệm điện 40%, điều khiển thông minh.',
    imageUrl: '/images/product-4.jpg',
    isFeatured: true,
  },
]

export default function ProductsSection() {
  const t = useTranslations('products')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mb-4">{t('title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={href(`/san-pham/${product.slug}`)}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f7] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package size={56} className="text-[#1a3a5c]/20" />
                </div>
                <div className="absolute top-3 left-3 bg-[#00a0e9] text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} />
                  {t('featured')}
                </div>
              </div>

              <div className="p-4">
                <div className="text-xs text-[#00a0e9] font-medium mb-1">{product.category}</div>
                <h3 className="font-bold text-[#1a3a5c] text-sm mb-2 group-hover:text-[#00a0e9] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">
                  {product.description}
                </p>
                <span className="flex items-center gap-1 text-[#00a0e9] text-xs font-medium">
                  {t('viewDetail')} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={href('/san-pham')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a3a5c] text-[#1a3a5c] font-semibold rounded-lg hover:bg-[#1a3a5c] hover:text-white transition-all"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
