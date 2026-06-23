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
        isScrolled ? 'navbar-glass' : 'navbar-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

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
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.key} className="relative">
                  {item.children ? (
                    <button
                      className={cn(
                        'nav-link-underline flex items-center gap-1 px-3 py-2 transition-all duration-200',
                        'text-white/70 hover:text-white',
                        isActive(item.href) && 'text-white active'
                      )}
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    >
                      {t(item.key)}
                      <ChevronDown size={11} className={cn('transition-transform duration-200 opacity-50', openDropdown === item.key && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={getHref(item.href)}
                      className={cn(
                        'nav-link-underline block px-3 py-2 transition-all duration-200',
                        'text-white/70 hover:text-white',
                        isActive(item.href) && 'text-white active'
                      )}
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      {t(item.key)}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.children && openDropdown === item.key && (
                    <div
                      className="absolute top-full left-0 mt-3 w-56 z-50 overflow-hidden"
                      style={{ background: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,169,110,0.15)' }}
                    >
                      {/* Top gold line */}
                      <div style={{ height: '1px', background: 'rgba(200,169,110,0.4)' }} />
                      <Link
                        href={getHref(item.href)}
                        className="flex items-center justify-between px-4 py-3 transition-colors"
                        style={{ color: 'rgba(200,169,110,0.9)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        Tất cả {t(item.key)} <ArrowRight size={11} />
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={getHref(child.href)}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/05"
                          style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.9)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)' }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(200,169,110,0.5)', flexShrink: 0, display: 'inline-block' }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              {/* Language */}
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="text-white/50 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em' }}
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              <Link
                href={getHref('/lien-he')}
                className="btn-ghost"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                <Phone size={12} />
                Liên hệ
              </Link>
            </div>

            {/* Mobile right: VI/EN + Dark + Hamburger (always visible) */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Language badge */}
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-all active:scale-95"
                style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em' }}
                aria-label="Switch language"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-all active:scale-95"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              {/* Hamburger */}
              <button
                className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-white transition-all"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed left-0 right-0 bottom-0 z-40 lg:hidden flex flex-col transition-all duration-400',
          isMobileOpen ? 'opacity-100 visible top-16' : 'opacity-0 invisible top-16 pointer-events-none'
        )}
        style={{ background: 'rgba(10,10,20,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* No duplicate logo here — main navbar logo is visible above */}
        {/* Top close bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/08">
          <span className="text-white/50 text-xs uppercase tracking-widest">Menu</span>
          <div className="flex items-center gap-3">
            <button onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all">
              {locale === 'vi' ? 'EN' : 'VI'}
            </button>
            <button onClick={toggleDarkMode} className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Thin gold line under header */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)' }} />

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    className={cn(
                      'w-full flex items-center justify-between py-3.5 transition-all',
                      isActive(item.href) ? 'text-white' : 'text-white/55 hover:text-white'
                    )}
                    style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronDown size={14} className={cn('opacity-40 transition-transform duration-300', mobileExpanded === item.key && 'rotate-180 opacity-70')} />
                  </button>
                  {/* Submenu */}
                  {mobileExpanded === item.key && (
                    <div className="ml-2 py-2 space-y-0">
                      <Link
                        href={getHref(item.href)}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-2 transition-colors"
                        style={{ color: 'rgba(200,169,110,0.8)', fontSize: '0.75rem', fontWeight: 500 }}
                      >
                        <ArrowRight size={11} />
                        Xem tất cả {t(item.key)}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={getHref(child.href)}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-2 py-2 px-2 transition-colors"
                          style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}
                          onTouchStart={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
                        >
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(200,169,110,0.5)', flexShrink: 0, display: 'inline-block' }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={getHref(item.href)}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center w-full py-3.5 transition-all',
                    isActive(item.href) ? 'text-white' : 'text-white/55 hover:text-white'
                  )}
                  style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {t(item.key)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-8 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href={getHref('/lien-he')}
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 btn-luxury"
            style={{ justifyContent: 'center' }}
          >
            <Phone size={13} />
            Liên hệ &amp; Báo giá
          </Link>
        </div>
      </div>
    </>
  )
}
