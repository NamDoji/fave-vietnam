'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

interface NewsPost {
  id: string
  slug: string
  titleVi: string
  titleEn: string
  summaryVi?: string | null
  summaryEn?: string | null
  thumbnail?: string | null
  publishedAt?: string | Date | null
  category?: { nameVi: string; nameEn: string } | null
}

const FALLBACK_NEWS = [
  {
    id: '1',
    slug: 'he-thong-hvac-toa-nha-xanh',
    titleVi: 'Xu hướng HVAC 2024: Hệ thống tiết kiệm năng lượng cho tòa nhà xanh',
    titleEn: 'HVAC Trends 2024: Energy-saving systems for green buildings',
    summaryVi: 'Các giải pháp HVAC hiện đại đang ngày càng hướng tới mục tiêu tiết kiệm năng lượng và giảm phát thải carbon, đáp ứng tiêu chuẩn LEED và EDGE.',
    summaryEn: 'Modern HVAC solutions are increasingly targeting energy efficiency and carbon reduction to meet LEED and EDGE standards.',
    thumbnail: null,
    publishedAt: new Date('2024-03-15'),
    category: { nameVi: 'Công nghệ', nameEn: 'Technology' },
  },
  {
    id: '2',
    slug: 'bao-tri-he-thong-lanh-truoc-he',
    titleVi: 'Bảo trì hệ thống lạnh trước mùa hè: Checklist đầy đủ cho nhà máy',
    titleEn: 'Pre-summer refrigeration maintenance: Complete checklist for factories',
    summaryVi: 'Danh sách kiểm tra toàn diện giúp đảm bảo hệ thống lạnh hoạt động ổn định trong mùa hè cao điểm, tránh gián đoạn sản xuất.',
    summaryEn: 'A comprehensive checklist to ensure refrigeration systems run smoothly during peak summer season.',
    thumbnail: null,
    publishedAt: new Date('2024-02-28'),
    category: { nameVi: 'Bảo trì', nameEn: 'Maintenance' },
  },
  {
    id: '3',
    slug: 'vrv-vrf-vs-chiller-so-sanh',
    titleVi: 'VRV/VRF vs Chiller: Lựa chọn nào phù hợp cho dự án của bạn?',
    titleEn: 'VRV/VRF vs Chiller: Which is right for your project?',
    summaryVi: 'Phân tích chi tiết ưu nhược điểm của hai hệ thống HVAC phổ biến nhất, giúp chủ đầu tư đưa ra quyết định đúng đắn.',
    summaryEn: 'Detailed analysis of the pros and cons of the two most popular HVAC systems.',
    thumbnail: null,
    publishedAt: new Date('2024-01-20'),
    category: { nameVi: 'Tư vấn', nameEn: 'Consulting' },
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Công nghệ': { bg: 'rgba(0, 102, 255, 0.08)', text: '#0066ff' },
  'Technology': { bg: 'rgba(0, 102, 255, 0.08)', text: '#0066ff' },
  'Bảo trì': { bg: 'rgba(249, 115, 22, 0.08)', text: '#ea580c' },
  'Maintenance': { bg: 'rgba(249, 115, 22, 0.08)', text: '#ea580c' },
  'Tư vấn': { bg: 'rgba(139, 92, 246, 0.08)', text: '#7c3aed' },
  'Consulting': { bg: 'rgba(139, 92, 246, 0.08)', text: '#7c3aed' },
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function NewsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [news, setNews] = useState<NewsPost[]>(FALLBACK_NEWS as NewsPost[])

  useEffect(() => {
    // Try to fetch from API
    fetch('/api/news?limit=3&published=true')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.items?.length > 0) setNews(data.items)
      })
      .catch(() => {}) // silently fall back
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 fade-in">
          <div>
            <span className="section-badge mb-4 inline-flex">📰 Tin tức</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Kiến Thức & <span className="text-blue-600">Tin Tức</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <Link
            href={href('/tin-tuc')}
            className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả bài viết <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((post, i) => {
            const title = locale === 'en' ? post.titleEn : post.titleVi
            const summary = locale === 'en' ? post.summaryEn : post.summaryVi
            const catName = locale === 'en' ? post.category?.nameEn : post.category?.nameVi
            const catStyle = catName ? CATEGORY_COLORS[catName] : { bg: 'rgba(0,102,255,0.08)', text: '#0066ff' }

            return (
              <Link
                key={post.id}
                href={href(`/tin-tuc/${post.slug}`)}
                className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 fade-in"
                style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                {/* Thumbnail */}
                <div
                  className="h-44 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0d1f3c, #0a1628)' }}
                >
                  {post.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.thumbnail}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl opacity-10 text-white font-black">
                        {title.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  {catName && (
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: catStyle.bg, color: catStyle.text, backdropFilter: 'blur(8px)' }}
                    >
                      <Tag size={10} />
                      {catName}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>

                  {/* Summary */}
                  {summary && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {summary}
                    </p>
                  )}

                  {/* Read more */}
                  <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Đọc tiếp <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
