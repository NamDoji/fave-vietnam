import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Admin - FAVE Việt Nam',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
