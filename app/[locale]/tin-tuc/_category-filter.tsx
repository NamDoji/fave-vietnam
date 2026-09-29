'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

type Post = {
  id: string
  slug: string
  titleVi: string
  titleEn: string
  descriptionVi: string
  descriptionEn: string
  imageUrl: string | null
  publishedAt: string | null
  category: { nameVi: string; nameEn: string; slug: string } | null
}

type Props = {
  posts: Post[]
  categories: string[]
  locale: string
}

export default function CategoryFilter({ posts, categories, locale }: Props) {
  const [active, setActive] = useState('Tất cả')

  const filtered = active === 'Tất cả'
    ? posts
    : posts.filter((p) => (locale === 'en' ? p.category?.nameEn : p.category?.nameVi) === active)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">Không có bài viết nào.</div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link
              href={`/tin-tuc/${featured.slug}`}
              className="group mb-10 flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: 'rgba(0,102,255,0.08)' }}
            >
              <div className="md:w-1/2 h-56 md:h-auto relative bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                {featured.imageUrl && (
                  <Image src={featured.imageUrl} alt={locale === 'en' ? featured.titleEn : featured.titleVi} fill className="object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342]/60 to-transparent" />
                <span className="absolute top-4 left-4 text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">Nổi bật</span>
              </div>
              <div className="md:w-1/2 p-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  {featured.category && (
                    <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">
                      <Tag size={10} /> {locale === 'en' ? featured.category.nameEn : featured.category.nameVi}
                    </span>
                  )}
                  {featured.publishedAt && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={11} />
                      {new Date(featured.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {locale === 'en' ? featured.titleEn : featured.titleVi}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {locale === 'en' ? featured.descriptionEn : featured.descriptionVi}
                </p>
                <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Đọc tiếp <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((post, i) => {
                const title = locale === 'en' ? post.titleEn : post.titleVi
                const desc = locale === 'en' ? post.descriptionEn : post.descriptionVi
                const catName = locale === 'en' ? post.category?.nameEn : post.category?.nameVi
                return (
                  <Link
                    key={post.slug}
                    href={`/tin-tuc/${post.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    style={{ borderColor: 'rgba(0,102,255,0.08)' }}
                  >
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#0a2342] to-[#1565C0]">
                      {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-7xl font-black select-none">
                          {(catName || 'TT').slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        {catName && (
                          <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">
                            <Tag size={10} /> {catName}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={11} />
                            {new Date(post.publishedAt).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{title}</h2>
                      <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-1 mb-3">{desc}</p>
                      <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        Đọc tiếp <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}
