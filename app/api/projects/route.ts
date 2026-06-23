import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    const featured = searchParams.get('featured') === 'true'
    const categoryId = searchParams.get('categoryId')

    const where = {
      isActive: true,
      ...(featured && { isFeatured: true }),
      ...(categoryId && { categoryId }),
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { completedDate: 'desc' }],
        take,
        skip,
        include: { category: true },
      }),
      prisma.project.count({ where }),
    ])

    return NextResponse.json({ projects, total })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
