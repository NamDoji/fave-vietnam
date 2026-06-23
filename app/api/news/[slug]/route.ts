import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await prisma.newsPost.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: { category: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Không tìm thấy bài viết' }, { status: 404 })
    }

    // Increment view count asynchronously
    prisma.newsPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    }).catch(console.error)

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
