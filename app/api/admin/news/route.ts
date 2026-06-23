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
  categoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  publishedAt: z.string().optional(),
  metaTitleVi: z.string().optional(),
  metaTitleEn: z.string().optional(),
  metaDescVi: z.string().optional(),
  metaDescEn: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    const status = searchParams.get('status') as 'DRAFT' | 'PUBLISHED' | null

    const where = status ? { status } : {}
    const [posts, total] = await Promise.all([
      prisma.newsPost.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip, include: { category: true } }),
      prisma.newsPost.count({ where }),
    ])
    return NextResponse.json({ posts, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const slug = data.slug || slugify(data.titleVi)
    const post = await prisma.newsPost.create({
      data: {
        ...data,
        slug,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : (data.status === 'PUBLISHED' ? new Date() : null),
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, publishedAt, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        ...data,
        ...(publishedAt && { publishedAt: new Date(publishedAt) }),
        ...(data.status === 'PUBLISHED' && !publishedAt && { publishedAt: new Date() }),
      },
    })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.newsPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
