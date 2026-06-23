'use client'

import { useSession, signOut } from 'next-auth/react'
import { LogOut, User, Bell } from 'lucide-react'

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="text-sm text-gray-500">
        Quản Trị Hệ Thống FAVE Việt Nam
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={17} />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-[#1a3a5c] rounded-full flex items-center justify-center">
            <User size={15} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-gray-700">{session?.user?.name || 'Admin'}</div>
            <div className="text-xs text-gray-400">{session?.user?.email}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Đăng xuất"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
