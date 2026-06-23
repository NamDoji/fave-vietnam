'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Settings, Package, Building2, Newspaper,
  Users, MessageSquare, FileText, Image, Award, Handshake, Briefcase, Zap
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

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-60 bg-[#0f2540] text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">FAVE Admin</div>
            <div className="text-xs text-gray-400">Quản lý website</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-[#00a0e9] text-white font-medium'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
          Xem website →
        </Link>
      </div>
    </aside>
  )
}
