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

const PHONE = '0981907109'
const PHONE_DISPLAY = '0981 907 109'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('services')
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
      {/* Top info bar — desktop only */}
      <div
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(5, 13, 26, 0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          height: '36px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white/35 text-xs font-medium">
              Giải pháp HVAC B2B chuyên nghiệp — Phục vụ toàn quốc
            </span>
            <span
              className="h-3 w-px"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />
            <span className="text-white/35 text-xs">T2–T7: 7:30–17:30 · CN: 8:00–12:00</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:Favevietnam@gmail.com"
              className="text-white/35 text-xs hover:text-white/70 transition-colors"
            >
              Favevietnam@gmail.com
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: '#60a5fa' }}
            >
              <Phone size={11} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'navbar-glass' : 'navbar-solid',
        )}
        style={{ top: '36px' }}
      >
        {/* Scroll progress line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.4), transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}>
                <Wind size={18} className="text-white" />
                <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }} />
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
                        'nav-link-underline flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200',
                        'text-white/65 hover:text-white hover:bg-white/05',
                        isActive(item.href) && 'text-white active',
                      )}
                      style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    >
                      {t(item.key)}
                      <ChevronDown size={10} className={cn('opacity-50 transition-transform duration-200', openDropdown === item.key && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={getHref(item.href)}
                      className={cn(
                        'nav-link-underline block px-3 py-2 rounded-md transition-all duration-200',
                        'text-white/65 hover:text-white hover:bg-white/05',
                        isActive(item.href) && 'text-white active',
                      )}
                      style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      {t(item.key)}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.children && openDropdown === item.key && (
                    <div
                      className="absolute top-full left-0 mt-2 w-60 z-50 overflow-hidden rounded-xl shadow-2xl"
                      style={{ background: 'rgba(8, 18, 36, 0.98)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,102,255,0.2)' }}
                    >
                      <div style={{ height: '2px', background: 'linear-gradient(90deg, #0066ff, #3385ff)' }} />
                      <Link
                        href={getHref(item.href)}
                        className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-blue-500/10"
                        style={{ color: '#60a5fa', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        Tất cả {t(item.key)} <ArrowRight size={11} />
                      </Link>
                      <div className="py-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={getHref(child.href)}
                            className="flex items-center gap-3 px-4 py-2.5 transition-colors group/item"
                            style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,102,255,0.08)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLAnchorElement).style.background = '' }}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(0,102,255,0.6)', flexShrink: 0, display: 'inline-block' }} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop right: Phone + Language + CTA */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Phone number prominent */}
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all group"
                style={{ border: '1px solid rgba(0,102,255,0.2)', background: 'rgba(0,102,255,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,102,255,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,102,255,0.06)' }}
              >
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Phone size={10} className="text-white" />
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">{PHONE_DISPLAY}</span>
              </a>

              {/* Language */}
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="px-2.5 py-1.5 rounded-md text-white/50 hover:text-white transition-colors hover:bg-white/05"
                style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em' }}
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>

              {/* CTA — "Báo giá ngay" */}
              <Link
                href={getHref('/lien-he')}
                className="btn-luxury"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem', letterSpacing: '0.06em' }}
              >
                Báo giá ngay
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex lg:hidden items-center gap-1.5">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)' }}
                aria-label="Call hotline"
              >
                <Phone size={14} className="text-blue-400" />
              </a>
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-all active:scale-95"
                style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em' }}
                aria-label="Switch language"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white transition-all"
                style={{ background: isMobileOpen ? 'rgba(0,102,255,0.2)' : 'transparent', border: isMobileOpen ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent' }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed left-0 right-0 bottom-0 z-40 lg:hidden flex flex-col transition-all duration-300',
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        )}
        style={{
          top: '36px',
          background: 'rgba(8, 18, 36, 0.99)',
          backdropFilter: 'blur(24px)',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease, opacity 0.3s ease, visibility 0.3s',
        }}
      >
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.6), transparent)' }} />

        {/* Header bar in drawer */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <div className="text-white font-black text-lg gradient-text">FAVE Vietnam</div>
            <div className="text-white/35 text-xs">Giải pháp HVAC B2B chuyên nghiệp</div>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)', color: '#60a5fa' }}
          >
            <Phone size={13} />
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-3.5 rounded-xl transition-all',
                      isActive(item.href)
                        ? 'text-white bg-blue-500/10'
                        : 'text-white/55 hover:text-white hover:bg-white/03',
                    )}
                    style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronDown size={14} className={cn('opacity-40 transition-transform duration-300', mobileExpanded === item.key && 'rotate-180 opacity-70')} />
                  </button>
                  {mobileExpanded === item.key && (
                    <div className="ml-3 mt-1 mb-2 space-y-0.5 rounded-xl overflow-hidden"
                      style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(0,102,255,0.1)' }}>
                      <Link
                        href={getHref(item.href)}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-blue-500/10"
                        style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <ArrowRight size={12} />
                        Xem tất cả {t(item.key)}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={getHref(child.href)}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/05"
                          style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}
                        >
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,102,255,0.6)', flexShrink: 0, display: 'inline-block' }} />
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
                    'flex items-center w-full px-3 py-3.5 rounded-xl transition-all',
                    isActive(item.href)
                      ? 'text-white bg-blue-500/10'
                      : 'text-white/55 hover:text-white hover:bg-white/03',
                  )}
                  style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  {t(item.key)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-8 pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href={getHref('/lien-he')}
            onClick={() => setIsMobileOpen(false)}
            className="btn-luxury flex items-center justify-center gap-2 w-full py-4"
          >
            <ArrowRight size={15} />
            Yêu cầu báo giá ngay
          </Link>
          <div className="flex items-center justify-center gap-6 pt-1">
            <a href="https://facebook.com/favevietnam" target="_blank" rel="noopener noreferrer"
              className="text-white/30 text-xs hover:text-white/60 transition-colors font-semibold">
              Facebook
            </a>
            <a href="https://zalo.me/0981907109" target="_blank" rel="noopener noreferrer"
              className="text-white/30 text-xs hover:text-white/60 transition-colors font-semibold">
              Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for top info bar + navbar */}
      <div className="hidden lg:block" style={{ height: '36px' }} />
    </>
  )
}
