import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    const status = searchParams.get('status') as 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'DONE' | null

    const where = status ? { status } : {}
    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.quoteRequest.count({ where }),
    ])
    return NextResponse.json({ quotes, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, note } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(note !== undefined && { note }),
      },
    })
    return NextResponse.json(quote)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
