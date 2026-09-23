import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const [
      services, products, projects, news,
      partners, certificates,
      newContacts, newQuotes, newApplicants,
      totalContacts, totalQuotes, totalApplicants,
      recentContacts, recentQuotes, recentApplicants,
    ] = await Promise.all([
      prisma.service.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
      prisma.newsPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.partner.count({ where: { isActive: true } }),
      prisma.certificate.count({ where: { isActive: true } }),
      prisma.contactRequest.count({ where: { isRead: false } }),
      prisma.quoteRequest.count({ where: { status: 'NEW' } }),
      prisma.applicant.count({ where: { status: 'NEW' } }),
      prisma.contactRequest.count(),
      prisma.quoteRequest.count(),
      prisma.applicant.count(),
      prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.applicant.findMany({
        orderBy: { createdAt: 'desc' }, take: 5,
        include: { job: { select: { titleVi: true } } },
      }),
    ])

    return NextResponse.json({
      counts: {
        services, products, projects, news, partners, certificates,
        contacts: { total: totalContacts, new: newContacts },
        quotes: { total: totalQuotes, new: newQuotes },
        applicants: { total: totalApplicants, new: newApplicants },
      },
      recent: { contacts: recentContacts, quotes: recentQuotes, applicants: recentApplicants },
    })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
