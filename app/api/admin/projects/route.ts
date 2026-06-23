import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

const schema = z.object({
  titleVi: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionVi: z.string(),
  descriptionEn: z.string(),
  contentVi: z.string().optional().default(''),
  contentEn: z.string().optional().default(''),
  slug: z.string().optional(),
  imageUrl: z.string().optional(),
  gallery: z.unknown().optional(),
  location: z.string().optional(),
  scale: z.string().optional(),
  sectorVi: z.string().optional(),
  sectorEn: z.string().optional(),
  clientName: z.string().optional(),
  clientLogo: z.string().optional(),
  startDate: z.string().optional(),
  completedDate: z.string().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export async function GET() {
  try {
    const [projects, total] = await Promise.all([
      prisma.project.findMany({ orderBy: [{ isFeatured: 'desc' }, { completedDate: 'desc' }], include: { category: true } }),
      prisma.project.count(),
    ])
    return NextResponse.json({ projects, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const slug = data.slug || slugify(data.titleVi)
    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        startDate: data.startDate ? new Date(data.startDate) : null,
        completedDate: data.completedDate ? new Date(data.completedDate) : null,
      },
    })
    return NextResponse.json(project, { status: 201 })
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
    const project = await prisma.project.update({ where: { id }, data })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
