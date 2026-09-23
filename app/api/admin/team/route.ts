import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json({ members, total: members.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nameVi, nameEn, positionVi, positionEn, bioVi, bioEn, imageUrl, email, linkedin, isActive, sortOrder } = body
    if (!nameVi || !positionVi) return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    const member = await prisma.teamMember.create({
      data: { nameVi, nameEn: nameEn || nameVi, positionVi, positionEn: positionEn || positionVi, bioVi, bioEn, imageUrl, email, linkedin, isActive: isActive ?? true, sortOrder: sortOrder ?? 0 },
    })
    return NextResponse.json(member, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const member = await prisma.teamMember.update({ where: { id }, data })
    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
