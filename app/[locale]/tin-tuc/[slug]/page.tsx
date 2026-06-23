import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const post = await prisma.newsPost.findUnique({ where: { slug } }).catch(() => null)
  if (!post) return { title: `Tin tức | ${t('siteName')}` }

  return {
    title: `${locale === 'vi' ? post.titleVi : post.titleEn} | ${t('siteName')}`,
    description: locale === 'vi' ? post.descriptionVi : post.descriptionEn,
  }
}

const STATIC_POSTS: Record<string, {
  title: string
  category: string
  date: string
  content: string
}> = {
  'cong-nghe-vrv-iv-danh-gia-2024': {
    title: 'Đánh Giá Công Nghệ VRV IV Daikin 2024: Tiết Kiệm Năng Lượng Vượt Trội',
    category: 'Kỹ thuật',
    date: '2024-11-15',
    content: `
      <h2>VRV IV là gì?</h2>
      <p>VRV (Variable Refrigerant Volume) là hệ thống điều hòa nhiều cụm trong nhà kết nối với một cụm ngoài trời, sử dụng công nghệ biến tần inverter để điều chỉnh lưu lượng môi chất lạnh theo nhu cầu thực tế của từng không gian.</p>
      
      <h2>Điểm mới của VRV IV</h2>
      <p>Thế hệ VRV IV 2024 của Daikin mang đến nhiều cải tiến đáng kể:</p>
      <ul>
        <li><strong>Hiệu suất năng lượng tăng 40%</strong> so với thế hệ VRV III nhờ máy nén biến tần 2 giai đoạn mới</li>
        <li><strong>IPLV đạt 8.0</strong> - vượt tiêu chuẩn ASHRAE 90.1-2022</li>
        <li><strong>Kết nối IoT</strong> qua Daikin Residential Controller app, giám sát và điều khiển từ xa</li>
        <li><strong>Môi chất R-32</strong> thân thiện môi trường, GWP thấp hơn 68% so với R-410A</li>
        <li><strong>Chiều dài đường ống tối đa 1.000m</strong>, độ chênh lệch độ cao ±50m</li>
      </ul>
      
      <h2>So sánh hiệu suất</h2>
      <p>Qua quá trình kiểm nghiệm thực tế tại các dự án FAVE đã triển khai, hệ thống VRV IV cho thấy:</p>
      <ul>
        <li>Mức tiêu thụ điện giảm trung bình 35-42% trong điều kiện tải một phần (PLR 25-75%)</li>
        <li>Thời gian khởi động nhanh hơn 30%, đạt nhiệt độ đặt trong 5-7 phút</li>
        <li>Mức độ ồn ngoài trời giảm 3dB(A) so với thế hệ cũ</li>
      </ul>
      
      <h2>Ứng dụng phù hợp</h2>
      <p>VRV IV đặc biệt phù hợp cho:</p>
      <ul>
        <li>Tòa nhà văn phòng 5-30 tầng</li>
        <li>Khách sạn boutique đến 4 sao</li>
        <li>Chuỗi bán lẻ, siêu thị, showroom</li>
        <li>Chung cư cao cấp, biệt thự</li>
        <li>Bệnh viện, phòng khám</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>VRV IV 2024 của Daikin là lựa chọn hàng đầu cho các dự án HVAC yêu cầu hiệu suất cao và tiết kiệm năng lượng. Liên hệ FAVE để được tư vấn giải pháp VRV phù hợp cho công trình của bạn.</p>
    `,
  },
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params

  // Try static content first, then DB
  const staticPost = STATIC_POSTS[slug]

  const dbPost = await prisma.newsPost.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { category: true },
  }).catch(() => null)

  if (!staticPost && !dbPost) notFound()

  const title = dbPost ? (locale === 'vi' ? dbPost.titleVi : dbPost.titleEn) : staticPost?.title
  const category = dbPost?.category?.nameVi || staticPost?.category || 'Kỹ thuật'
  const date = dbPost?.publishedAt || (staticPost ? new Date(staticPost.date) : new Date())
  const content = dbPost ? (locale === 'vi' ? dbPost.contentVi : dbPost.contentEn) : staticPost?.content

  return (
    <div className="pt-[88px]">
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/tin-tuc" className="hover:text-[#00a0e9]">Tin tức</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3a5c] truncate max-w-xs">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Article */}
          <article className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1 text-xs bg-blue-50 text-[#00a0e9] px-2.5 py-0.5 rounded-full font-medium">
                <Tag size={10} /> {category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={11} />
                {new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mb-6 leading-tight">{title}</h1>

            {content && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <Link href="/tin-tuc" className="flex items-center gap-2 text-[#1a3a5c] hover:text-[#00a0e9] transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Quay lại danh sách
              </Link>
              <Link href="/lien-he" className="flex items-center gap-2 text-[#00a0e9] hover:text-[#0080c0] transition-colors text-sm font-medium">
                Liên hệ tư vấn <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white rounded-xl p-5">
              <h3 className="font-bold mb-3">Cần tư vấn HVAC?</h3>
              <p className="text-gray-300 text-sm mb-4">Liên hệ chuyên gia FAVE để được hỗ trợ ngay</p>
              <a href="tel:0981907109" className="flex items-center gap-2 w-full py-2.5 bg-[#00a0e9] text-white rounded-lg text-sm font-semibold justify-center">
                0981 907 109
              </a>
            </div>

            <div className="bg-[#f7f9fc] rounded-xl p-5">
              <h3 className="font-bold text-[#1a3a5c] mb-4">Bài viết liên quan</h3>
              <ul className="space-y-3">
                {Object.entries(STATIC_POSTS).filter(([s]) => s !== slug).slice(0, 3).map(([s, p]) => (
                  <li key={s}>
                    <Link href={`/tin-tuc/${s}`} className="text-sm text-gray-600 hover:text-[#00a0e9] transition-colors line-clamp-2">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
