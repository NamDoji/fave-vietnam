import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

type CsvRow = Record<string, string | number | boolean | null | undefined>

function toCSV(rows: CsvRow[]): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const lines = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => {
        const val = row[h]
        const str = val === null || val === undefined ? '' : String(val)
        return `"${str.replace(/"/g, '""')}"`
      }).join(',')
    ),
  ]
  return lines.join('\n')
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    let csv = ''
    let filename = 'export.csv'

    if (type === 'contacts') {
      const rows = await prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } })
      csv = toCSV(rows.map(r => ({ id: r.id, name: r.name, phone: r.phone, email: r.email ?? '', company: r.company ?? '', message: r.message, isRead: String(r.isRead), createdAt: r.createdAt.toISOString() })))
      filename = 'lien-he.csv'
    } else if (type === 'quotes') {
      const rows = await prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } })
      csv = toCSV(rows.map(r => ({ id: r.id, name: r.name, phone: r.phone, email: r.email ?? '', company: r.company ?? '', service: r.service ?? '', message: r.message, status: r.status, createdAt: r.createdAt.toISOString() })))
      filename = 'bao-gia.csv'
    } else if (type === 'applicants') {
      const rows = await prisma.applicant.findMany({ orderBy: { createdAt: 'desc' }, include: { job: { select: { titleVi: true } } } })
      csv = toCSV(rows.map(r => ({ id: r.id, job: r.job.titleVi, name: r.name, phone: r.phone, email: r.email, status: r.status, createdAt: r.createdAt.toISOString() })))
      filename = 'ung-vien.csv'
    } else {
      return NextResponse.json({ error: 'type phải là: contacts | quotes | applicants' }, { status: 400 })
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
