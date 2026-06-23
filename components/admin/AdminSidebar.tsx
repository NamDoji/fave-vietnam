'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Settings, Package, Building2, Newspaper,
  Users, MessageSquare, FileText, Image, Award, Handshake, Briefcase, Zap, X, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Dịch vụ', icon: Settings },
  { href: '/admin/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/projects', label: 'Dự án', icon: Building2 },
  { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/recruitment', label: 'Tuyển dụng', icon: Briefcase },
  { href: '/admin/quotes', label: 'Báo giá', icon: FileText },
  { href: '/admin/contacts', label: 'Liên hệ', icon: MessageSquare },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/partners', label: 'Đối tác', icon: Handshake },
  { href: '/admin/certificates', label: 'Chứng chỉ', icon: Award },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

interface AdminSidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export default function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href) && href !== '/admin'
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onMobileClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">FAVE Admin</div>
            <div className="text-white/40 text-xs">Management</div>
          </div>
        </Link>
        {/* Close on mobile */}
        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors md:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = item.exact ? pathname === item.href : isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <item.icon size={16} className={cn(active ? 'text-white' : 'text-white/50 group-hover:text-white/80')} />
              <span>{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10">
        <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 text-xs hover:bg-white/8 transition-colors">
          <span>🌐</span>
          <span>Xem website</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-[#0a1628] text-white flex-col shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div className={cn(
        'fixed inset-0 z-50 md:hidden transition-all duration-300',
        mobileOpen ? 'visible' : 'invisible'
      )}>
        {/* Overlay */}
        <div
          className={cn('absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300', mobileOpen ? 'opacity-100' : 'opacity-0')}
          onClick={onMobileClose}
        />
        {/* Drawer */}
        <aside className={cn(
          'absolute left-0 top-0 bottom-0 w-64 bg-[#0a1628] text-white flex flex-col shadow-2xl transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <SidebarContent />
        </aside>
      </div>
    </>
  )
}
