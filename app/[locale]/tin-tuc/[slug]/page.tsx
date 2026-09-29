import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ChevronRight, ArrowLeft, Share2 } from 'lucide-react'
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
    openGraph: post.imageUrl ? { images: [post.imageUrl] } : undefined,
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const [post, relatedPosts] = await Promise.all([
    prisma.newsPost.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: { category: true },
    }).catch(() => null),
    prisma.newsPost.findMany({
      where: { status: 'PUBLISHED', slug: { not: slug } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { slug: true, titleVi: true, titleEn: true, imageUrl: true, publishedAt: true, category: { select: { nameVi: true, nameEn: true } } },
    }).catch(() => []),
  ])

  if (!post) notFound()

  // Increment view count asynchronously
  prisma.newsPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})

  const title = locale === 'vi' ? post.titleVi : post.titleEn
  const content = locale === 'vi' ? post.contentVi : post.contentEn
  const description = locale === 'vi' ? post.descriptionVi : post.descriptionEn
  const categoryName = locale === 'vi' ? post.category?.nameVi : post.category?.nameEn
  const date = post.publishedAt || post.createdAt

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors">Tin tức</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 truncate max-w-xs">{title}</span>
        </div>
      </div>

      {/* Hero image */}
      {post.imageUrl && (
        <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
          <Image src={post.imageUrl} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342]/70 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Article */}
          <article className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              {categoryName && (
                <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-medium">
                  <Tag size={10} /> {categoryName}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={11} />
                {new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {post.viewCount > 0 && (
                <span className="text-xs text-slate-400">{post.viewCount} lượt xem</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">{title}</h1>

            {description && (
              <p className="text-slate-500 text-base leading-relaxed mb-8 border-l-4 border-blue-600 pl-4">{description}</p>
            )}

            {content && (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {/* Share + Navigation */}
            <div className="flex flex-wrap items-center justify-between mt-10 pt-6 border-t border-slate-100 gap-4">
              <Link href="/tin-tuc" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Quay lại danh sách
              </Link>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Share2 size={15} /> Chia sẻ bài viết
              </button>
            </div>

            {/* Related posts — mobile */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 lg:hidden">
                <h3 className="font-bold text-slate-900 mb-4">Bài viết liên quan</h3>
                <div className="space-y-3">
                  {relatedPosts.map((p) => (
                    <Link key={p.slug} href={`/tin-tuc/${p.slug}`} className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-lg shrink-0 overflow-hidden bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                        {p.imageUrl && <Image src={p.imageUrl} alt={locale === 'vi' ? p.titleVi : p.titleEn} width={64} height={64} className="w-full h-full object-cover" />}
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {locale === 'vi' ? p.titleVi : p.titleEn}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 hidden lg:block">
            <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #0a1628, #0d2040)', border: '1px solid rgba(0,102,255,0.15)' }}>
              <h3 className="font-bold mb-2">Cần tư vấn HVAC?</h3>
              <p className="text-white/60 text-sm mb-4">Liên hệ chuyên gia FAVE để được hỗ trợ ngay</p>
              <a href="tel:0981907109" className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors">
                0981 907 109
              </a>
              <Link href="/lien-he" className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 text-white/70 rounded-xl text-sm hover:text-white transition-colors border border-white/10 hover:border-white/20">
                Gửi yêu cầu tư vấn →
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-xl p-5" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}>
                <h3 className="font-bold text-slate-900 mb-4">Bài viết liên quan</h3>
                <ul className="space-y-4">
                  {relatedPosts.map((p) => {
                    const pTitle = locale === 'vi' ? p.titleVi : p.titleEn
                    return (
                      <li key={p.slug}>
                        <Link href={`/tin-tuc/${p.slug}`} className="flex gap-3 group">
                          <div className="w-14 h-14 rounded-lg shrink-0 overflow-hidden bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                            {p.imageUrl && <Image src={p.imageUrl} alt={pTitle} width={56} height={56} className="w-full h-full object-cover" />}
                          </div>
                          <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug">{pTitle}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <Link href="/tin-tuc" className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4 hover:gap-2 transition-all">
                  Xem tất cả bài viết →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
