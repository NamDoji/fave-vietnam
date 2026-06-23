import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/upload'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const subfolder = (formData.get('subfolder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Không có file' }, { status: 400 })
    }

    const result = await uploadFile(file, subfolder)

    // Save to media library
    const media = await prisma.media.create({
      data: {
        filename: result.filename,
        url: result.url,
        mimeType: result.mimeType,
        size: result.size,
      },
    }).catch(() => null)

    return NextResponse.json({ ...result, mediaId: media?.id }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Upload thất bại' }, { status: 500 })
  }
}
