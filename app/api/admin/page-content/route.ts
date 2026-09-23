import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageKey = searchParams.get('pageKey')
    if (pageKey) {
      const content = await prisma.pageContent.findUnique({ where: { pageKey } })
      return NextResponse.json(content || null)
    }
    const contents = await prisma.pageContent.findMany({ orderBy: { pageKey: 'asc' } })
    return NextResponse.json({ contents, total: contents.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageKey, titleVi, titleEn, contentVi, contentEn, metaData } = body
    if (!pageKey) return NextResponse.json({ error: 'Thiếu pageKey' }, { status: 400 })
    const content = await prisma.pageContent.upsert({
      where: { pageKey },
      update: { titleVi, titleEn, contentVi, contentEn, metaData },
      create: { pageKey, titleVi, titleEn, contentVi, contentEn, metaData },
    })
    return NextResponse.json(content, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    const content = await prisma.pageContent.update({ where: { id }, data })
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.pageContent.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
