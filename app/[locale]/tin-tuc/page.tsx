import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Tin Tức & Kỹ Thuật | ${t('siteName')}`,
    description: 'Cập nhật tin tức, kiến thức kỹ thuật và xu hướng mới nhất trong ngành HVAC tại Việt Nam.',
  }
}

const NEWS = [
  {
    slug: 'cong-nghe-vrv-iv-danh-gia-2024',
    title: 'Đánh Giá Công Nghệ VRV IV Daikin 2024: Tiết Kiệm Năng Lượng Vượt Trội',
    desc: 'Tìm hiểu chi tiết về thế hệ VRV IV mới nhất của Daikin với hiệu suất năng lượng tăng 40%, tính năng kết nối IoT và điều khiển thông minh qua ứng dụng mobile.',
    category: 'Kỹ thuật',
    date: '2024-11-15',
  },
  {
    slug: 'tieu-chuan-phong-sach-gmp-who',
    title: 'Tiêu Chuẩn Phòng Sạch GMP-WHO: Yêu Cầu HVAC Trong Sản Xuất Dược Phẩm',
    desc: 'Hướng dẫn chi tiết về các yêu cầu hệ thống HVAC theo tiêu chuẩn GMP-WHO trong nhà máy sản xuất dược phẩm tại Việt Nam, từ phân loại phòng sạch đến hệ thống lọc HEPA.',
    category: 'Tiêu chuẩn',
    date: '2024-10-28',
  },
  {
    slug: 'bao-tri-dinh-ky-dieu-hoa-trung-tam',
    title: 'Hướng Dẫn Bảo Trì Định Kỳ Hệ Thống Điều Hòa Trung Tâm Chiller',
    desc: 'Quy trình bảo trì định kỳ máy làm lạnh nước (chiller) đúng kỹ thuật giúp tăng tuổi thọ thiết bị 30%, tiết kiệm chi phí vận hành và tránh sự cố bất ngờ.',
    category: 'Bảo trì',
    date: '2024-10-10',
  },
  {
    slug: 'xu-huong-hvac-2025',
    title: 'Xu Hướng Công Nghệ HVAC 2025: Từ AI đến Năng Lượng Xanh',
    desc: 'Tổng hợp các xu hướng công nghệ HVAC nổi bật sẽ định hình thị trường 2025: AI tối ưu hóa năng lượng, hệ thống thu hồi nhiệt, môi chất lạnh thiên nhiên thế hệ mới.',
    category: 'Xu hướng',
    date: '2024-09-20',
  },
]

const CATEGORIES = ['Tất cả', 'Kỹ thuật', 'Tiêu chuẩn', 'Bảo trì', 'Xu hướng', 'Dự án', 'Kinh nghiệm']

export default async function NewsPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Tin tức
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tin Tức & Kỹ Thuật</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Cập nhật kiến thức và xu hướng mới nhất trong ngành HVAC
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c] transition-all">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {NEWS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/tin-tuc/${post.slug}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-52 ${i === 0 ? 'bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9]' : 'bg-gradient-to-br from-[#0a2840] to-[#1a3a5c]'} flex items-center justify-center`}>
                  <div className="text-white/20 text-6xl font-bold">
                    {post.category.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs bg-blue-50 text-[#00a0e9] px-2.5 py-0.5 rounded-full font-medium">
                      <Tag size={10} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-bold text-[#1a3a5c] mb-2 group-hover:text-[#00a0e9] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1 mb-3">{post.desc}</p>
                  <span className="flex items-center gap-1 text-[#00a0e9] text-sm font-medium">
                    Đọc tiếp <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
