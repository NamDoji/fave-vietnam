import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// TEMPORARY DEBUG ENDPOINT - DELETE AFTER USE
export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@fave.com.vn' }
    })
    
    if (!user) return NextResponse.json({ error: 'User not found' })
    
    const testHash = await bcrypt.hash('***', 12)
    const isValid = await bcrypt.compare('***', user.password)
    
    return NextResponse.json({
      found: true,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
      passwordHashStart: user.password.slice(0, 20),
      passwordValid: isValid,
      testHash: testHash.slice(0, 20),
    })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 })
  }
}
