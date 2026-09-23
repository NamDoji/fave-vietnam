import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const job = await prisma.recruitment.findUnique({
      where: { slug },
      include: { _count: { select: { applicants: true } } },
    })
    if (!job || !job.isActive) return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    return NextResponse.json(job)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
