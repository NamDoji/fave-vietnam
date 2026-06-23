import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  company: z.string().optional(),
  message: z.string().min(5),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const contact = await prisma.contactRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        company: data.company || null,
        message: data.message,
      },
    })

    sendContactEmail({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      company: data.company,
      message: data.message,
    }).catch(console.error)

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
