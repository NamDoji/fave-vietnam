import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

const schema = z.object({
  titleVi: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionVi: z.string().min(5),
  descriptionEn: z.string().min(5),
  contentVi: z.string().optional().default(''),
  contentEn: z.string().optional().default(''),
  slug: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    const [services, total] = await Promise.all([
      prisma.service.findMany({ orderBy: { sortOrder: 'asc' }, take, skip, include: { category: true } }),
      prisma.service.count(),
    ])
    return NextResponse.json({ services, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const slug = data.slug || slugify(data.titleVi)

    const service = await prisma.service.create({
      data: { ...data, slug },
    })
    return NextResponse.json(service, { status: 201 })
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

    const service = await prisma.service.update({ where: { id }, data })
    return NextResponse.json(service)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })

    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
