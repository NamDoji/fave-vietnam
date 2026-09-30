'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Menu, Bell, LogOut, User, ChevronDown, ChevronRight,
  Search, PanelLeftClose, PanelLeftOpen, Home,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const LABEL_MAP: Record<string, string> = {
  admin: 'Admin',
  news: 'Tin tức',
  'news-categories': 'Danh mục TT',
  services: 'Dịch vụ',
  'service-categories': 'Danh mục DV',
  products: 'Sản phẩm',
  'product-categories': 'Danh mục SP',
  projects: 'Dự án',
  'project-categories': 'Danh mục DA',
  banners: 'Banner',
  team: 'Đội ngũ',
  partners: 'Đối tác',
  clients: 'Khách hàng',
  certificates: 'Chứng chỉ',
  capabilities: 'Năng lực',
  menus: 'Menu',
  'page-content': 'Nội dung trang',
  media: 'Media',
  users: 'Người dùng',
  settings: 'Cài đặt',
  quotes: 'Báo giá',
  contacts: 'Liên hệ',
  recruitment: 'Tuyển dụng',
  new: 'Tạo mới',
  edit: 'Chỉnh sửa',
}

interface AdminHeaderProps {
  onMobileMenuOpen: () => void
  collapsed: boolean
  onToggleCollapsed: () => void
}

export default function AdminHeader({
  onMobileMenuOpen,
  collapsed,
  onToggleCollapsed,
}: AdminHeaderProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    href: '/' + segments.slice(0, i + 1).join('/'),
    label: LABEL_MAP[seg] ?? (seg.length > 24 ? 'Chi tiết' : seg.charAt(0).toUpperCase() + seg.slice(1)),
  }))
  const innerCrumbs = crumbs.slice(1) // skip 'admin' root

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0 sticky top-0 z-30 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-2">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuOpen}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors md:hidden"
          aria-label="Mở menu"
        >
          <Menu size={20} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapsed}
          className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Breadcrumb — desktop */}
        <nav className="hidden md:flex items-center gap-1 text-sm ml-1">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
            <Home size={14} />
          </Link>
          {innerCrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              <ChevronRight size={13} className="text-gray-300" />
              {i === innerCrumbs.length - 1 ? (
                <span className="text-gray-700 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Mobile: title */}
        <Image src="/logo-fave.svg" alt="FAVE Vietnam" width={90} height={56} className="md:hidden h-7 w-auto" unoptimized />
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div
          className={cn(
            'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm',
            searchFocused
              ? 'border-[#0066ff] bg-white w-48'
              : 'border-gray-200 bg-gray-50 w-36'
          )}
        >
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-xs min-w-0"
            placeholder="Tìm kiếm..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0066ff] rounded-full ring-2 ring-white" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#0066ff] to-[#1B5BB8] rounded-lg flex items-center justify-center shrink-0">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:block text-left min-w-0 max-w-[110px]">
              <div className="text-xs font-semibold text-gray-800 truncate leading-tight">
                {session?.user?.name || 'Admin'}
              </div>
              <div className="text-[10px] text-gray-400 truncate leading-tight">
                {session?.user?.email}
              </div>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block shrink-0" />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-400 mb-0.5">Đăng nhập với</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {session?.user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                </div>
                <div className="p-1.5">
                  <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
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
