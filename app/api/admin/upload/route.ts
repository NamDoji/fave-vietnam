import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/upload'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const take = parseInt(searchParams.get('take') || '100')
    const skip = parseInt(searchParams.get('skip') || '0')
    const mimeType = searchParams.get('mimeType')

    const where = mimeType ? { mimeType: { contains: mimeType } } : {}
    const [media, total] = await Promise.all([
      prisma.media.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.media.count({ where }),
    ])
    return NextResponse.json({ media, total })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const subfolder = (formData.get('subfolder') as string) || 'admin'

    if (!file) return NextResponse.json({ error: 'Không có file' }, { status: 400 })

    const result = await uploadFile(file, subfolder)
    const media = await prisma.media.create({
      data: {
        filename: result.filename,
        url: result.url,
        mimeType: result.mimeType,
        size: result.size,
        alt: (formData.get('alt') as string) || file.name,
      },
    })
    return NextResponse.json({ ...result, id: media.id }, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Upload thất bại'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 })

    const media = await prisma.media.findUnique({ where: { id } })
    if (!media) return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })

    await prisma.media.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
