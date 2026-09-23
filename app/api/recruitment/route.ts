import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const jobs = await prisma.recruitment.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: { id: true, slug: true, titleVi: true, titleEn: true, descriptionVi: true, descriptionEn: true, location: true, salary: true, experience: true, deadline: true, createdAt: true },
    })
    return NextResponse.json({ jobs, total: jobs.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
