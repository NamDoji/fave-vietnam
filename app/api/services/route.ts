import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        take,
        skip,
        include: { category: true },
      }),
      prisma.service.count({ where: { isActive: true } }),
    ])

    return NextResponse.json({ services, total })
  } catch (error) {
    console.error('Services API error:', error)
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
