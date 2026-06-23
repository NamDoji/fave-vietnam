'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { Menu, X, ChevronDown, Phone, Globe, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  key: string
  href: string
  children?: { key: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/gioi-thieu' },
  {
    key: 'services',
    href: '/dich-vu',
    children: [
      { key: 'Điều hòa trung tâm', href: '/dich-vu/dieu-hoa-trung-tam' },
      { key: 'Thông gió công nghiệp', href: '/dich-vu/thong-gio-cong-nghiep' },
      { key: 'Hệ thống lạnh', href: '/dich-vu/he-thong-lanh' },
      { key: 'VRV/VRF', href: '/dich-vu/vrv-vrf' },
      { key: 'Xử lý không khí sạch', href: '/dich-vu/xu-ly-khong-khi-sach' },
    ],
  },
  { key: 'products', href: '/san-pham' },
  { key: 'projects', href: '/du-an' },
  { key: 'capability', href: '/nang-luc' },
  { key: 'news', href: '/tin-tuc' },
  { key: 'contact', href: '/lien-he' },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  function getHref(href: string) {
    if (locale === 'en') {
      return `/${locale}${href === '/' ? '' : href}`
    }
    return href
  }

  function switchLocale(newLocale: string) {
    const strippedPath = (pathname
      .replace(/^\/vi(\/|$)/, '/')
      .replace(/^\/en(\/|$)/, '/') || '/')
    router.replace(strippedPath as any, { locale: newLocale as 'vi' | 'en' })
  }

  function isActive(href: string) {
    const currentPath = pathname.replace(/^\/(vi|en)/, '') || '/'
    if (href === '/') return currentPath === '/'
    return currentPath.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      {/* Top bar */}
      <div className="bg-[#1a3a5c] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="hidden sm:block opacity-80">
            348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:0981907109"
              className="flex items-center gap-1.5 hover:text-[#00a0e9] transition-colors"
            >
              <Phone size={13} />
              <span className="font-medium">0981 907 109</span>
            </a>
            <a
              href="mailto:Favevietnam@gmail.com"
              className="hidden sm:block hover:text-[#00a0e9] transition-colors opacity-80"
            >
              Favevietnam@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={getHref('/')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-lg flex items-center justify-center">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#1a3a5c] leading-tight">FAVE</div>
              <div className="text-xs text-[#00a0e9] font-medium tracking-widest uppercase">Vietnam</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="relative">
                {item.children ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive(item.href)
                        ? 'text-[#00a0e9]'
                        : 'text-gray-700 hover:text-[#1a3a5c]'
                    )}
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.key ? null : item.key)
                    }
                  >
                    {t(item.key)}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform',
                        openDropdown === item.key && 'rotate-180'
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={getHref(item.href)}
                    className={cn(
                      'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive(item.href)
                        ? 'text-[#00a0e9]'
                        : 'text-gray-700 hover:text-[#1a3a5c]'
                    )}
                  >
                    {t(item.key)}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === item.key && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                    <Link
                      href={getHref(item.href)}
                      className="block px-4 py-2 text-sm text-[#1a3a5c] font-semibold hover:bg-blue-50 border-b border-gray-100"
                    >
                      {t(item.key)} — Tất cả
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={getHref(child.href)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#1a3a5c] transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.key}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1a3a5c] transition-colors"
              onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
            >
              <Globe size={15} />
              <span className="font-medium">{locale === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            {/* CTA */}
            <Link
              href={getHref('/lien-he')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a0e9] text-white text-sm font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Phone size={14} />
              {t('getQuote')}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#1a3a5c] hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300',
          isMobileOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              <Link
                href={getHref(item.href)}
                className={cn(
                  'block px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-blue-50 text-[#00a0e9]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#1a3a5c]'
                )}
              >
                {t(item.key)}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={getHref(child.href)}
                      className="block px-3 py-2 text-xs text-gray-500 hover:text-[#1a3a5c] transition-colors"
                    >
                      {child.key}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <button
              className="flex items-center gap-1.5 text-sm text-gray-600"
              onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
            >
              <Globe size={15} />
              {locale === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
            <Link
              href={getHref('/lien-he')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00a0e9] text-white text-sm font-semibold rounded-lg"
            >
              <Phone size={14} />
              Báo giá
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
