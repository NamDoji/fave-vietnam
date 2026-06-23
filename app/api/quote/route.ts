import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { sendQuoteEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(5),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const quote = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message,
        status: 'NEW',
      },
    })

    // Send email notification (don't block response)
    sendQuoteEmail({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      company: data.company,
      service: data.service,
      message: data.message,
    }).catch(console.error)

    return NextResponse.json({ success: true, id: quote.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Quote API error:', error)
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
