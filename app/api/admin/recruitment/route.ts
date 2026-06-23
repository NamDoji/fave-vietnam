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
  location: z.string().optional(),
  salary: z.string().optional(),
  experience: z.string().optional(),
  deadline: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const [jobs, total] = await Promise.all([
      prisma.recruitment.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { applicants: true } } },
      }),
      prisma.recruitment.count(),
    ])
    return NextResponse.json({ jobs, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const slug = data.slug || slugify(data.titleVi)
    const job = await prisma.recruitment.create({
      data: {
        ...data,
        slug,
        deadline: data.deadline ? new Date(data.deadline) : null,
      },
    })
    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, deadline, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const job = await prisma.recruitment.update({
      where: { id },
      data: { ...data, ...(deadline && { deadline: new Date(deadline) }) },
    })
    return NextResponse.json(job)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.recruitment.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
