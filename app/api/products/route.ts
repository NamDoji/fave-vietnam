import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    const categoryId = searchParams.get('categoryId')
    const featured = searchParams.get('featured') === 'true'

    const where = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(featured && { isFeatured: true }),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
        take,
        skip,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({ products, total })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
