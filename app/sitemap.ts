import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://fave-hvac.vercel.app'

  const staticRoutes = ['', '/gioi-thieu', '/dich-vu', '/san-pham', '/du-an', '/nang-luc', '/tin-tuc', '/lien-he', '/tuyen-dung']
  const locales = ['vi', 'en']

  const staticPages = staticRoutes.flatMap(route =>
    locales.map(locale => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  )

  const [services, products, projects, news] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []),
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []),
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []),
    prisma.newsPost.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }).catch(() => []),
  ])

  const dynamicPages = [
    ...services.flatMap(s => locales.map(l => ({ url: `${base}/${l}/dich-vu/${s.slug}`, lastModified: s.updatedAt, priority: 0.7 }))),
    ...products.flatMap(p => locales.map(l => ({ url: `${base}/${l}/san-pham/${p.slug}`, lastModified: p.updatedAt, priority: 0.7 }))),
    ...projects.flatMap(p => locales.map(l => ({ url: `${base}/${l}/du-an/${p.slug}`, lastModified: p.updatedAt, priority: 0.7 }))),
    ...news.flatMap(n => locales.map(l => ({ url: `${base}/${l}/tin-tuc/${n.slug}`, lastModified: n.updatedAt, priority: 0.6 }))),
  ]

  return [...staticPages, ...dynamicPages]
}
