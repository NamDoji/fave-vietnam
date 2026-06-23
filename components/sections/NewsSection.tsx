'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'

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

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day} · ${month} · ${year}`
}

export default function NewsSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [news, setNews] = useState<NewsPost[]>(FALLBACK_NEWS as NewsPost[])

  useEffect(() => {
    fetch('/api/news?limit=3&published=true')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.items?.length > 0) setNews(data.items)
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
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32" style={{ background: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14 fade-in">
          <div>
            <div className="section-label mb-4" style={{ color: '#C8A96E' }}>
              Tin Tức
            </div>
            <div style={{ width: '40px', height: '1px', background: 'rgba(200,169,110,0.5)', marginBottom: '1.25rem' }} />
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Kiến Thức &{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Tin Tức</span>
            </h2>
          </div>
          <Link
            href={href('/tin-tuc')}
            className="inline-flex items-center gap-2 group transition-all"
            style={{ color: 'rgba(200,169,110,0.7)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.7)' }}
          >
            Xem tất cả bài viết
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Thin line separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2.5rem' }} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {news.map((post, i) => {
            const title = locale === 'en' ? post.titleEn : post.titleVi
            const summary = locale === 'en' ? post.summaryEn : post.summaryVi
            const catName = locale === 'en' ? post.category?.nameEn : post.category?.nameVi

            return (
              <Link
                key={post.id}
                href={href(`/tin-tuc/${post.slug}`)}
                className="group fade-in block"
                style={{ transitionDelay: `${i * 80}ms`, background: '#0D0D0D' } as React.CSSProperties}
              >
                <article
                  className="p-8 h-full transition-all duration-300"
                  style={{ background: '#0D0D0D' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141414' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0D0D0D' }}
                >
                  {/* Thumbnail */}
                  <div
                    className="mb-6 overflow-hidden"
                    style={{
                      height: '180px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {post.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.thumbnail}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-600"
                        style={{ filter: 'grayscale(20%)' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          style={{
                            fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                            fontWeight: 700,
                            fontSize: '3rem',
                            color: 'rgba(255,255,255,0.05)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {title.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Category + Date row */}
                  <div className="flex items-center justify-between mb-3">
                    {catName && (
                      <span
                        style={{
                          fontSize: '0.6125rem',
                          fontWeight: 600,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(200,169,110,0.7)',
                        }}
                      >
                        {catName}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '0.6125rem',
                        color: 'rgba(255,255,255,0.2)',
                        letterSpacing: '0.06em',
                        fontWeight: 400,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  {/* Thin separator */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }} />

                  {/* Title */}
                  <h3
                    className="mb-3 line-clamp-2 transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      fontWeight: 600,
                      fontSize: '1.0625rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.4,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {title}
                  </h3>

                  {/* Summary */}
                  {summary && (
                    <p
                      className="line-clamp-2 mb-5"
                      style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', lineHeight: 1.75 }}
                    >
                      {summary}
                    </p>
                  )}

                  {/* Read more */}
                  <span
                    className="inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    style={{
                      color: 'rgba(200,169,110,0.6)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Đọc tiếp <ArrowRight size={11} />
                  </span>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
