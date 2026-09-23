import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')
    const isReadParam = searchParams.get('isRead')

    const where = isReadParam !== null ? { isRead: isReadParam === 'true' } : {}

    const [contacts, total] = await Promise.all([
      prisma.contactRequest.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.contactRequest.count({ where }),
    ])
    return NextResponse.json({ contacts, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, isRead, note } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })

    const contact = await prisma.contactRequest.update({
      where: { id },
      data: {
        ...(isRead !== undefined && { isRead }),
        ...(note !== undefined && { note }),
      },
    })
    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })
    await prisma.contactRequest.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
