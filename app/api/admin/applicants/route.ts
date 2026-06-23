import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    const status = searchParams.get('status') as 'NEW' | 'REVIEWING' | 'INTERVIEWED' | 'ACCEPTED' | 'REJECTED' | null
    const take = parseInt(searchParams.get('take') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    const where = {
      ...(jobId && { jobId }),
      ...(status && { status }),
    }

    const [applicants, total] = await Promise.all([
      prisma.applicant.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
        include: { job: { select: { titleVi: true, titleEn: true } } },
      }),
      prisma.applicant.count({ where }),
    ])
    return NextResponse.json({ applicants, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, note } = body
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })

    const applicant = await prisma.applicant.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(note !== undefined && { note }),
      },
    })
    return NextResponse.json(applicant)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
