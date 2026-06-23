import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { uploadFile } from '@/lib/upload'
import { sendApplyEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  jobId: z.string().optional(),
  jobTitle: z.string().optional(),
  coverLetter: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data = schema.parse({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      jobId: formData.get('jobId'),
      jobTitle: formData.get('jobTitle'),
      coverLetter: formData.get('coverLetter'),
    })

    let cvUrl: string | undefined

    const cvFile = formData.get('cv') as File | null
    if (cvFile && cvFile.size > 0) {
      const result = await uploadFile(cvFile, 'cvs')
      cvUrl = result.url
    }

    // Find or use a default job
    let jobId = data.jobId
    if (!jobId) {
      const firstJob = await prisma.recruitment.findFirst({
        where: { isActive: true },
      }).catch(() => null)
      jobId = firstJob?.id
    }

    if (!jobId) {
      // Create applicant without job reference for now
      return NextResponse.json({ error: 'Không tìm thấy vị trí tuyển dụng' }, { status: 404 })
    }

    const applicant = await prisma.applicant.create({
      data: {
        jobId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        cvUrl: cvUrl || null,
        coverLetter: data.coverLetter || null,
        status: 'NEW',
      },
    })

    sendApplyEmail({
      name: data.name,
      phone: data.phone,
      email: data.email,
      jobTitle: data.jobTitle || 'Vị trí tuyển dụng',
      coverLetter: data.coverLetter,
      cvUrl,
    }).catch(console.error)

    return NextResponse.json({ success: true, id: applicant.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })
    }
    console.error('Apply API error:', error)
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
