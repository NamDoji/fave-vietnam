import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

const RECENT_NEWS = [
  {
    slug: 'cong-nghe-vrv-iv-danh-gia-2024',
    titleVi: 'Đánh Giá Công Nghệ VRV IV Daikin 2024: Tiết Kiệm Năng Lượng Vượt Trội',
    descVi: 'Tìm hiểu chi tiết về thế hệ VRV IV mới nhất của Daikin với hiệu suất năng lượng tăng 40% so với thế hệ cũ, tính năng kết nối IoT và điều khiển thông minh.',
    category: 'Kỹ thuật',
    publishedAt: '2024-11-15',
    imageUrl: '/images/news-1.jpg',
  },
  {
    slug: 'tieu-chuan-phong-sach-gmp-who',
    titleVi: 'Tiêu Chuẩn Phòng Sạch GMP-WHO: Yêu Cầu HVAC Trong Sản Xuất Dược Phẩm',
    descVi: 'Hướng dẫn chi tiết về các yêu cầu hệ thống HVAC theo tiêu chuẩn GMP-WHO trong nhà máy sản xuất dược phẩm tại Việt Nam.',
    category: 'Tiêu chuẩn',
    publishedAt: '2024-10-28',
    imageUrl: '/images/news-2.jpg',
  },
  {
    slug: 'bao-tri-dinh-ky-dieu-hoa-trung-tam',
    titleVi: 'Hướng Dẫn Bảo Trì Định Kỳ Hệ Thống Điều Hòa Trung Tâm Chiller',
    descVi: 'Quy trình bảo trì định kỳ máy làm lạnh nước (chiller) đúng kỹ thuật giúp tăng tuổi thọ thiết bị, tiết kiệm chi phí vận hành và tránh sự cố bất ngờ.',
    category: 'Bảo trì',
    publishedAt: '2024-10-10',
    imageUrl: '/images/news-3.jpg',
  },
]

export default function NewsSection() {
  const t = useTranslations('news')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-3">
              {t('badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c]">{t('title')}</h2>
          </div>
          <Link
            href={href('/tin-tuc')}
            className="flex items-center gap-1.5 text-[#00a0e9] font-medium hover:gap-3 transition-all text-sm whitespace-nowrap"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_NEWS.map((post) => (
            <Link
              key={post.slug}
              href={href(`/tin-tuc/${post.slug}`)}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-44 bg-gradient-to-br from-[#1a3a5c]/80 to-[#00a0e9]/60 relative">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a3a5c] text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <Tag size={10} />
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="font-bold text-[#1a3a5c] mb-2 line-clamp-2 group-hover:text-[#00a0e9] transition-colors text-sm leading-snug">
                  {post.titleVi}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-3">
                  {post.descVi}
                </p>
                <span className="flex items-center gap-1 text-[#00a0e9] text-xs font-medium">
                  {t('readMore')} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
