import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

const schema = z.object({
  nameVi: z.string().min(2),
  nameEn: z.string().min(2),
  descriptionVi: z.string(),
  descriptionEn: z.string(),
  contentVi: z.string().optional().default(''),
  contentEn: z.string().optional().default(''),
  slug: z.string().optional(),
  imageUrl: z.string().optional(),
  gallery: z.unknown().optional(),
  specs: z.unknown().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().default(0),
})

export async function GET() {
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({ orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }], include: { category: true } }),
      prisma.product.count(),
    ])
    return NextResponse.json({ products, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const slug = data.slug || slugify(data.nameVi)
    const product = await prisma.product.create({ data: { ...data, slug } })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const product = await prisma.product.update({ where: { id }, data })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
