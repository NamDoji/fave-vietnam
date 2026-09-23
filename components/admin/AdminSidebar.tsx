'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Settings, Package, Building2, Newspaper,
  MessageSquare, FileText, Image, Award, Handshake, Briefcase,
  Zap, X, ChevronRight, Layers, Star, Users, UserCog
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/banners', label: 'Banner', icon: Layers },
  { href: '/admin/services', label: 'Dịch vụ', icon: Settings },
  { href: '/admin/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/projects', label: 'Dự án', icon: Building2 },
  { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/recruitment', label: 'Tuyển dụng', icon: Briefcase },
  { href: '/admin/quotes', label: 'Báo giá', icon: FileText },
  { href: '/admin/contacts', label: 'Liên hệ', icon: MessageSquare },
  { href: '/admin/clients', label: 'Khách hàng', icon: Star },
  { href: '/admin/partners', label: 'Đối tác', icon: Handshake },
  { href: '/admin/certificates', label: 'Chứng chỉ', icon: Award },
  { href: '/admin/team', label: 'Đội ngũ', icon: Users },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/users', label: 'Tài khoản', icon: UserCog },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

// Quick-access items shown in mobile bottom bar (most used)
const BOTTOM_BAR_ITEMS = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard, exact: true },
  { href: '/admin/quotes', label: 'Báo giá', icon: FileText },
  { href: '/admin/contacts', label: 'Liên hệ', icon: MessageSquare },
  { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
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
      <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onMobileClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-[#1B5BB8] to-[#2E74D0] rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">FAVE Admin</div>
            <div className="text-white/40 text-[10px] uppercase tracking-wide">Management</div>
          </div>
        </Link>
        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 md:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 overflow-y-auto space-y-0.5">
        {NAV_ITEMS.map(item => {
          const active = item.exact ? pathname === item.href : isActive(item.href)
          return (
            <Link key={item.href} href={item.href} onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                active ? 'bg-[#1B5BB8] text-white shadow-md shadow-blue-900/20' : 'text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <item.icon size={16} className={active ? 'text-white' : 'text-white/40 group-hover:text-white/70'} />
              <span>{item.label}</span>
              {active && <ChevronRight size={13} className="ml-auto opacity-50" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <a href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/30 hover:text-white/60 text-xs hover:bg-white/8 transition-colors">
          🌐 <span>Xem website</span>
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-[#0a1628] text-white flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile: Full-screen drawer */}
      <div className={cn('fixed inset-0 z-50 md:hidden transition-all duration-300', mobileOpen ? 'visible' : 'invisible')}>
        <div className={cn('absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity', mobileOpen ? 'opacity-100' : 'opacity-0')} onClick={onMobileClose} />
        <aside className={cn('absolute left-0 top-0 bottom-0 w-64 bg-[#0a1628] text-white flex flex-col shadow-2xl transition-transform duration-300', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
          <SidebarContent />
        </aside>
      </div>

      {/* Mobile: Bottom quick-access bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-xl safe-area-pb">
        <div className="flex items-stretch">
          {BOTTOM_BAR_ITEMS.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin'
            return (
              <Link key={item.href} href={item.href}
                className={cn('flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors min-h-[56px]',
                  active ? 'text-[#1B5BB8]' : 'text-gray-400'
                )}
              >
                <item.icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="leading-tight">{item.label}</span>
                {active && <div className="w-4 h-0.5 bg-[#1B5BB8] rounded-full" />}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
