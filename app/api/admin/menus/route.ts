import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      include: { children: { orderBy: { sortOrder: 'asc' } } },
      where: { parentId: null },
    })
    return NextResponse.json({ menus })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { labelVi, labelEn, href, parentId, sortOrder, isActive } = body
    if (!labelVi || !href) return NextResponse.json({ error: 'Thiếu nhãn hoặc đường dẫn' }, { status: 400 })
    const menu = await prisma.menu.create({
      data: { labelVi, labelEn: labelEn || labelVi, href, parentId: parentId || null, sortOrder: sortOrder ?? 0, isActive: isActive ?? true },
    })
    return NextResponse.json(menu, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const menu = await prisma.menu.update({ where: { id }, data })
    return NextResponse.json(menu)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.menu.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
