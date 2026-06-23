import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import AdminShell from '@/components/admin/AdminShell'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Admin — FAVE Việt Nam',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProvider>
          <AdminShell>{children}</AdminShell>
        </SessionProvider>
      </body>
    </html>
  )
}
