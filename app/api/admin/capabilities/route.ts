import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const profiles = await prisma.capabilityProfile.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ profiles, total: profiles.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { titleVi, titleEn, contentVi, contentEn, fileUrl, version, isActive } = body
    if (!titleVi || !contentVi) return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    const profile = await prisma.capabilityProfile.create({
      data: { titleVi, titleEn: titleEn || titleVi, contentVi, contentEn: contentEn || contentVi, fileUrl, version, isActive: isActive ?? true },
    })
    return NextResponse.json(profile, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const profile = await prisma.capabilityProfile.update({ where: { id }, data })
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.capabilityProfile.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
