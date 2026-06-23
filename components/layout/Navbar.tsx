'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { Menu, X, ChevronDown, Phone, ArrowRight, Wind } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  key: string
  href: string
  children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/gioi-thieu' },
  {
    key: 'services',
    href: '/dich-vu',
    children: [
      { label: 'Điều hòa trung tâm', href: '/dich-vu/dieu-hoa-trung-tam' },
      { label: 'Thông gió công nghiệp', href: '/dich-vu/thong-gio-cong-nghiep' },
      { label: 'Hệ thống lạnh', href: '/dich-vu/he-thong-lanh' },
      { label: 'VRV/VRF', href: '/dich-vu/vrv-vrf' },
      { label: 'Xử lý không khí sạch', href: '/dich-vu/xu-ly-khong-khi-sach' },
      { label: 'Bảo trì bảo dưỡng', href: '/dich-vu/bao-tri-bao-duong' },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

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
    router.replace(strippedPath as Parameters<typeof router.replace>[0], { locale: newLocale as 'vi' | 'en' })
  }

  function isActive(href: string) {
    const currentPath = pathname.replace(/^\/(vi|en)/, '') || '/'
    if (href === '/') return currentPath === '/'
    return currentPath.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'navbar-glass shadow-lg shadow-black/20'
            : 'navbar-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 bg-gradient-to-br from-[#0066ff] to-[#3385ff] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <Wind size={18} className="text-white" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="leading-none">
                <div className="font-black text-xl text-white tracking-tight">
                  <span className="gradient-text">FAVE</span>
                </div>
                <div className="text-[10px] text-blue-400/80 font-semibold tracking-[0.2em] uppercase">
                  Vietnam
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.key} className="relative">
                  {item.children ? (
                    <button
                      className={cn(
                        'nav-link-underline flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md',
                        isActive(item.href)
                          ? 'text-blue-400 active'
                          : 'text-white/75 hover:text-white'
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    >
                      {t(item.key)}
                      <ChevronDown
                        size={13}
                        className={cn(
                          'transition-transform duration-200 opacity-60',
                          openDropdown === item.key && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={getHref(item.href)}
                      className={cn(
                        'nav-link-underline block px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md',
                        isActive(item.href)
                          ? 'text-blue-400 active'
                          : 'text-white/75 hover:text-white'
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && openDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-2 w-60 rounded-xl overflow-hidden shadow-2xl shadow-black/30 z-50"
                      style={{ background: 'rgba(10, 22, 40, 0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Link
                        href={getHref(item.href)}
                        className="flex items-center justify-between px-4 py-3 text-sm text-blue-400 font-semibold border-b border-white/05 hover:bg-blue-500/10 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {t(item.key)} — Tất cả
                        <ArrowRight size={13} />
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={getHref(child.href)}
                          className="flex items-center px-4 py-2.5 text-sm text-white/65 hover:text-white hover:bg-blue-500/08 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-500/60 mr-2.5 flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <button
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-white/60 hover:text-white bg-white/05 hover:bg-white/10 transition-all border border-white/08"
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                aria-label="Switch language"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>

              {/* Hotline */}
              <a
                href="tel:0981907109"
                className="hidden md:flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-blue-400 transition-colors"
              >
                <Phone size={13} className="text-blue-400" />
                0981 907 109
              </a>

              {/* CTA Button */}
              <Link
                href={getHref('/lien-he')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                Báo giá ngay
                <ArrowRight size={14} />
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/08 transition-all"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(10, 22, 40, 0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
          {/* Nav items */}
          <nav className="flex-1 space-y-1">
            {NAV_ITEMS.map((item, idx) => (
              <div key={item.key}>
                <Link
                  href={getHref(item.href)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all',
                    isActive(item.href)
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-white/80 hover:text-white hover:bg-white/05'
                  )}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {t(item.key)}
                  {item.children && <ChevronDown size={16} className="opacity-40" />}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-0.5 mb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={getHref(child.href)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/45 hover:text-white/80 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="border-t border-white/08 pt-6 space-y-3">
            <a
              href="tel:0981907109"
              className="flex items-center gap-3 px-4 py-3.5 bg-white/05 rounded-xl text-white/80 hover:text-white transition-colors"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone size={16} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-white/40 font-medium">Hotline</div>
                <div className="font-semibold">0981 907 109</div>
              </div>
            </a>
            <div className="flex gap-3">
              <Link
                href={getHref('/lien-he')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-500 transition-colors"
              >
                Báo giá ngay <ArrowRight size={14} />
              </Link>
              <button
                className="px-4 py-3 bg-white/08 text-white/70 font-bold rounded-xl text-sm border border-white/08"
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
