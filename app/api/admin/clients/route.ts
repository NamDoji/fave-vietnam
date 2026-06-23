import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const clients = await prisma.featuredClient.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json({ clients })
  } catch { return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const client = await prisma.featuredClient.create({ data: body })
    return NextResponse.json(client, { status: 201 })
  } catch { return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 }) }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json()
    const client = await prisma.featuredClient.update({ where: { id }, data })
    return NextResponse.json(client)
  } catch { return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 }) }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.featuredClient.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 }) }
}
