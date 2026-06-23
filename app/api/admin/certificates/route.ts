import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const schema = z.object({
  nameVi: z.string().min(2),
  nameEn: z.string().min(2),
  descriptionVi: z.string().optional(),
  descriptionEn: z.string().optional(),
  imageUrl: z.string().optional(),
  fileUrl: z.string().optional(),
  issuedBy: z.string().optional(),
  issuedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(certificates)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    const cert = await prisma.certificate.create({
      data: {
        ...data,
        issuedAt: data.issuedAt ? new Date(data.issuedAt) : null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    })
    return NextResponse.json(cert, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, issuedAt, expiresAt, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const cert = await prisma.certificate.update({
      where: { id },
      data: {
        ...data,
        ...(issuedAt && { issuedAt: new Date(issuedAt) }),
        ...(expiresAt && { expiresAt: new Date(expiresAt) }),
      },
    })
    return NextResponse.json(cert)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.certificate.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
