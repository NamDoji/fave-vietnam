import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    const settingsMap = Object.fromEntries(
      settings.map((s) => [s.key, s.value])
    )
    return NextResponse.json(settingsMap)
  } catch {
    // Return defaults if DB not available
    return NextResponse.json({
      company_name: 'FAVE Việt Nam',
      hotline: '0981907109',
      email: 'Favevietnam@gmail.com',
      address: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội',
    })
  }
}
