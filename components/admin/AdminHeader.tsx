'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Menu, Bell, LogOut, User, ChevronDown } from 'lucide-react'

interface AdminHeaderProps {
  onMobileMenuOpen: () => void
}

export default function AdminHeader({ onMobileMenuOpen }: AdminHeaderProps) {
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0 sticky top-0 z-40 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuOpen}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        {/* Logo label on mobile */}
        <span className="md:hidden font-bold text-[#0a1628] text-sm">FAVE Admin</span>
        {/* Desktop title */}
        <span className="hidden md:block text-sm text-gray-500 font-medium">Quản trị hệ thống</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
              {session?.user?.name || 'Admin'}
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-400">Đăng nhập với</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{session?.user?.email}</p>
                </div>
                <div className="p-1">
                  <a href="/" target="_blank"
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    🌐 Xem website
                  </a>
                  <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={15} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
