import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const categories = await prisma.newsCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { posts: true } } },
    })
    return NextResponse.json({ categories, total: categories.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nameVi, nameEn, slug, sortOrder } = body
    if (!nameVi) return NextResponse.json({ error: 'Thiếu tên danh mục' }, { status: 400 })
    const category = await prisma.newsCategory.create({
      data: { nameVi, nameEn: nameEn || nameVi, slug: slug || slugify(nameVi), sortOrder: sortOrder ?? 0 },
    })
    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const category = await prisma.newsCategory.update({ where: { id }, data })
    return NextResponse.json(category)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.newsCategory.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
