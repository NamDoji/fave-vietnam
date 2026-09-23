import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const banners = await prisma.heroBanner.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json({ banners, total: banners.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { titleVi, titleEn, subtitleVi, subtitleEn, imageUrl, ctaLabelVi, ctaLabelEn, ctaUrl, isActive, sortOrder } = body
    if (!titleVi || !imageUrl) return NextResponse.json({ error: 'Thiếu tiêu đề hoặc hình ảnh' }, { status: 400 })
    const banner = await prisma.heroBanner.create({
      data: { titleVi, titleEn: titleEn || titleVi, subtitleVi, subtitleEn, imageUrl, ctaLabelVi, ctaLabelEn, ctaUrl, isActive: isActive ?? true, sortOrder: sortOrder ?? 0 },
    })
    return NextResponse.json(banner, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const banner = await prisma.heroBanner.update({ where: { id }, data })
    return NextResponse.json(banner)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.heroBanner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
