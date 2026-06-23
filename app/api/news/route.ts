import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '10')
    const skip = parseInt(searchParams.get('skip') || '0')
    const categoryId = searchParams.get('categoryId')

    const where = {
      status: 'PUBLISHED' as const,
      ...(categoryId && { categoryId }),
    }

    const [posts, total] = await Promise.all([
      prisma.newsPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take,
        skip,
        include: { category: true },
        select: {
          id: true,
          slug: true,
          titleVi: true,
          titleEn: true,
          descriptionVi: true,
          descriptionEn: true,
          imageUrl: true,
          publishedAt: true,
          viewCount: true,
          category: { select: { nameVi: true, nameEn: true, slug: true } },
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.newsPost.count({ where }),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
