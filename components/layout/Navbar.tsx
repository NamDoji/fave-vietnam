'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { Menu, X, ChevronDown, Phone, ArrowRight, Wind, Sun, Moon } from 'lucide-react'
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
      { label: 'Bảo trì điều hòa', href: '/dich-vu/bao-tri-dieu-hoa' },
      { label: 'Bảo dưỡng Chiller', href: '/dich-vu/bao-duong-chiller' },
      { label: 'Sửa chữa HVAC', href: '/dich-vu/sua-chua-hvac' },
      { label: 'Cải tạo, nâng cấp', href: '/dich-vu/cai-tao-nang-cap' },
      { label: 'Vệ sinh công nghiệp', href: '/dich-vu/ve-sinh-cong-nghiep' },
      { label: 'Thiết kế HVAC', href: '/dich-vu/thiet-ke-hvac' },
      { label: 'Lắp đặt HVAC', href: '/dich-vu/lap-dat-hvac' },
      { label: 'Cung cấp thiết bị', href: '/dich-vu/cung-cap-thiet-bi' },
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
  // Mobile submenu expand state
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('services')
  // Dark mode
  const [isDark, setIsDark] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fave-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  function toggleDarkMode() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('fave-theme', next ? 'dark' : 'light')
  }

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
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  function getHref(href: string) {
    return locale === 'en' ? `/${locale}${href === '/' ? '' : href}` : href
  }

  function switchLocale(newLocale: string) {
    const stripped = (pathname.replace(/^\/vi(\/|$)/, '/').replace(/^\/en(\/|$)/, '/') || '/')
    router.replace(stripped as Parameters<typeof router.replace>[0], { locale: newLocale as 'vi' | 'en' })
  }

  function isActive(href: string) {
    const cur = pathname.replace(/^\/(vi|en)/, '') || '/'
    return href === '/' ? cur === '/' : cur.startsWith(href)
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'navbar-glass shadow-lg shadow-black/20' : 'navbar-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 bg-gradient-to-br from-[#0066ff] to-[#3385ff] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <Wind size={18} className="text-white" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="leading-none">
                <div className="font-black text-xl text-white tracking-tight gradient-text">FAVE</div>
                <div className="text-[10px] text-blue-400/80 font-semibold tracking-[0.2em] uppercase">Vietnam</div>
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
                        isActive(item.href) ? 'text-blue-400 active' : 'text-white/80 hover:text-white'
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    >
                      {t(item.key)}
                      <ChevronDown size={13} className={cn('transition-transform duration-200 opacity-60', openDropdown === item.key && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link href={getHref(item.href)} className={cn('nav-link-underline block px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md', isActive(item.href) ? 'text-blue-400 active' : 'text-white/80 hover:text-white')}>
                      {t(item.key)}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.children && openDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-2 w-60 rounded-xl overflow-hidden shadow-2xl shadow-black/40 z-50"
                      style={{ background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.10)' }}>
                      <Link href={getHref(item.href)}
                        className="flex items-center justify-between px-4 py-3 text-sm text-blue-300 font-semibold border-b border-white/10 hover:bg-blue-500/15 transition-colors"
                        onClick={() => setOpenDropdown(null)}>
                        Tất cả {t(item.key)} <ArrowRight size={13} />
                      </Link>
                      {item.children.map((child) => (
                        <Link key={child.href} href={getHref(child.href)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/06 transition-colors"
                          onClick={() => setOpenDropdown(null)}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Dark mode */}
              <button onClick={toggleDarkMode} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/08 transition-all" aria-label="Toggle dark mode">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {/* Language */}
              <button onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="px-2.5 py-1 rounded-md text-xs font-bold text-white/70 hover:text-white bg-white/06 hover:bg-white/12 transition-all border border-white/10">
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              <Link href={getHref('/lien-he')}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 text-white/80 text-sm font-medium rounded-lg hover:bg-white/10 hover:text-white transition-all">
                Liên hệ
              </Link>
            </div>

            {/* Mobile right: VI/EN + Dark + Hamburger (always visible) */}
            <div className="flex lg:hidden items-center gap-1.5">
              {/* Language badge */}
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600/80 text-white text-xs font-bold hover:bg-blue-500 transition-all active:scale-95"
                aria-label="Switch language"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {/* Hamburger */}
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-400',
        isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )} style={{ background: 'rgba(8,18,36,0.98)', backdropFilter: 'blur(24px)' }}>

        {/* Mobile header bar */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/08">
          {/* Logo */}
          <Link href={getHref('/')} onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <Wind size={15} className="text-white" />
            </div>
            <span className="font-black text-white text-lg gradient-text">FAVE</span>
          </Link>

          {/* Right: VI/EN + Dark + Close */}
          <div className="flex items-center gap-2">
            <button onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
              className="h-9 px-3 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all">
              {locale === 'vi' ? '🌐 EN' : '🌐 VI'}
            </button>
            <button onClick={toggleDarkMode}
              className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setIsMobileOpen(false)}
              className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-red-500/30 transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              {item.children ? (
                // Items with submenu: button to toggle expand
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all',
                      isActive(item.href) ? 'bg-blue-600/25 text-blue-300' : 'text-white/85 hover:bg-white/06'
                    )}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronDown size={17} className={cn('opacity-50 transition-transform duration-300', mobileExpanded === item.key && 'rotate-180 opacity-100 text-blue-400')} />
                  </button>
                  {/* Submenu */}
                  {mobileExpanded === item.key && (
                    <div className="ml-3 mt-1 mb-2 border-l-2 border-blue-500/30 pl-3 space-y-0.5">
                      <Link href={getHref(item.href)} onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 font-semibold rounded-lg hover:bg-blue-500/12 transition-colors">
                        <ArrowRight size={13} />
                        Xem tất cả {t(item.key)}
                      </Link>
                      {item.children.map((child) => (
                        <Link key={child.href} href={getHref(child.href)} onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/65 hover:text-white hover:bg-white/05 rounded-lg transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={getHref(item.href)} onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3.5 rounded-xl text-base font-semibold transition-all',
                    isActive(item.href) ? 'bg-blue-600/25 text-blue-300' : 'text-white/85 hover:bg-white/06 hover:text-white'
                  )}>
                  {t(item.key)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-4 pb-8 pt-4 border-t border-white/08">
          <Link href={getHref('/lien-he')} onClick={() => setIsMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl text-base hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/30">
            Liên hệ &amp; Báo giá <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}
