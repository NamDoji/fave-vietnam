import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))
    return NextResponse.json(settingsMap)
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const updates = await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: value as Parameters<typeof prisma.siteSetting.update>[0]['data']['value'] },
          create: { key, value: value as Parameters<typeof prisma.siteSetting.create>[0]['data']['value'] },
        })
      )
    )
    return NextResponse.json({ success: true, updated: updates.length })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
