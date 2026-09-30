'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard, Settings, Package, Building2, Newspaper,
  MessageSquare, FileText, Image, Award, Handshake, Briefcase,
  X, Layers, Star, Users, UserCog,
  FolderOpen, LayoutTemplate, Navigation, BookOpen,
  ChevronRight, LogOut, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  exact?: boolean
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'CRM',
    items: [
      { href: '/admin/contacts', label: 'Liên hệ', icon: MessageSquare },
      { href: '/admin/quotes', label: 'Báo giá', icon: FileText },
    ],
  },
  {
    label: 'Nội dung',
    items: [
      { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
      { href: '/admin/services', label: 'Dịch vụ', icon: Settings },
      { href: '/admin/products', label: 'Sản phẩm', icon: Package },
      { href: '/admin/projects', label: 'Dự án', icon: Building2 },
      { href: '/admin/recruitment', label: 'Tuyển dụng', icon: Briefcase },
      { href: '/admin/page-content', label: 'Trang', icon: LayoutTemplate },
    ],
  },
  {
    label: 'Truyền thông',
    items: [
      { href: '/admin/banners', label: 'Banner', icon: Layers },
      { href: '/admin/team', label: 'Đội ngũ', icon: Users },
      { href: '/admin/partners', label: 'Đối tác', icon: Handshake },
      { href: '/admin/clients', label: 'Khách hàng', icon: Star },
      { href: '/admin/certificates', label: 'Chứng chỉ', icon: Award },
      { href: '/admin/capabilities', label: 'Năng lực', icon: BookOpen },
    ],
  },
  {
    label: 'Hệ thống',
    items: [
      { href: '/admin/media', label: 'Media', icon: Image },
      { href: '/admin/menus', label: 'Menu', icon: Navigation },
      { href: '/admin/users', label: 'Người dùng', icon: UserCog },
      { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
    ],
  },
]

const BOTTOM_NAV: NavItem[] = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard, exact: true },
  { href: '/admin/quotes', label: 'Báo giá', icon: FileText },
  { href: '/admin/contacts', label: 'Liên hệ', icon: MessageSquare },
  { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

interface AdminSidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
  collapsed?: boolean
}

function NavItemRow({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick?: () => void
}) {
  return (
    <div className="relative">
      {active && (
        <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0066ff] rounded-r-full" />
      )}
      <Link
        href={item.href}
        onClick={onClick}
        title={collapsed ? item.label : undefined}
        className={cn(
          'relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all group/item',
          collapsed ? 'justify-center p-3' : 'px-3 py-2.5',
          active
            ? 'bg-[#0066ff]/15 text-white'
            : 'text-white/60 hover:bg-white/8 hover:text-white'
        )}
      >
        <item.icon
          size={16}
          className={cn(
            'shrink-0',
            active ? 'text-[#0066ff]' : 'text-white/40 group-hover/item:text-white/70'
          )}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && active && (
          <ChevronRight size={13} className="ml-auto opacity-50 shrink-0" />
        )}
        {/* Tooltip when collapsed */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {item.label}
          </div>
        )}
      </Link>
    </div>
  )
}

export default function AdminSidebar({
  mobileOpen,
  onMobileClose,
  collapsed = false,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  const dashboardActive = pathname === '/admin'

  const sidebarInner = (isMobile: boolean) => {
    const isCollapsed = collapsed && !isMobile
    return (
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div
          className={cn(
            'flex items-center border-b border-white/10 shrink-0 h-16',
            isCollapsed ? 'justify-center px-0' : 'px-4 justify-between'
          )}
        >
          <Link
            href="/admin"
            className="flex items-center gap-2.5"
            onClick={isMobile ? onMobileClose : undefined}
          >
            {isCollapsed ? (
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                <NextImage src="/logo-fave.svg" alt="FAVE" width={32} height={32} className="w-8 h-8 object-contain brightness-0 invert" />
              </div>
            ) : (
              <NextImage src="/logo-fave.svg" alt="FAVE Vietnam" width={110} height={68} className="h-8 w-auto brightness-0 invert opacity-90" />
            )}
          </Link>
          {isMobile && (
            <button
              onClick={onMobileClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Dashboard */}
        <div className="px-2 pt-2">
          <div className="relative">
            {dashboardActive && (
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0066ff] rounded-r-full" />
            )}
            <Link
              href="/admin"
              onClick={isMobile ? onMobileClose : undefined}
              title={isCollapsed ? 'Dashboard' : undefined}
              className={cn(
                'relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all group/dash',
                isCollapsed ? 'justify-center p-3' : 'px-3 py-2.5',
                dashboardActive
                  ? 'bg-[#0066ff]/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <LayoutDashboard
                size={16}
                className={cn(
                  'shrink-0',
                  dashboardActive ? 'text-[#0066ff]' : 'text-white/40 group-hover/dash:text-white/70'
                )}
              />
              {!isCollapsed && <span>Dashboard</span>}
              {!isCollapsed && dashboardActive && (
                <ChevronRight size={13} className="ml-auto opacity-50 shrink-0" />
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover/dash:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  Dashboard
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {isCollapsed ? (
                <div className="py-1">
                  <div className="w-full h-px bg-white/10" />
                </div>
              ) : (
                <div className="px-3 pb-1 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItemRow
                    key={item.href}
                    item={item}
                    active={isActive(item.href, item.exact)}
                    collapsed={isCollapsed}
                    onClick={isMobile ? onMobileClose : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User info + logout */}
        <div
          className={cn(
            'border-t border-white/10 shrink-0',
            isCollapsed ? 'p-2' : 'p-3'
          )}
        >
          {isCollapsed ? (
            <div className="relative group/logout">
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="w-full flex justify-center p-2.5 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
              </button>
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover/logout:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Đăng xuất
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5">
                <div className="w-7 h-7 bg-gradient-to-br from-[#0066ff] to-[#1B5BB8] rounded-lg flex items-center justify-center shrink-0">
                  <UserCog size={13} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    {session?.user?.name || 'Admin'}
                  </div>
                  <div className="text-[10px] text-white/40 truncate">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <a
                  href="/"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-white/30 hover:text-white/60 text-xs hover:bg-white/8 transition-colors"
                >
                  <ExternalLink size={12} />
                  <span>Website</span>
                </a>
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-red-400/70 hover:text-red-400 text-xs hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={12} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex bg-[#0a1628] text-white flex-col shrink-0 h-screen sticky top-0 overflow-hidden transition-all duration-300',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {sidebarInner(false)}
      </aside>

      {/* Mobile: drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-64 bg-[#0a1628] text-white flex flex-col shadow-2xl z-50 md:hidden transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarInner(true)}
      </aside>

      {/* Mobile: Bottom quick-access bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-xl">
        <div className="flex items-stretch">
          {BOTTOM_NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && item.href !== '/admin'
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors min-h-[56px]',
                  active ? 'text-[#0066ff]' : 'text-gray-400'
                )}
              >
                <item.icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="leading-tight">{item.label}</span>
                {active && <div className="w-4 h-0.5 bg-[#0066ff] rounded-full" />}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
