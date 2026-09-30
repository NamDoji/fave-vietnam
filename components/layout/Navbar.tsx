'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  key: string
  href: string
  children?: { label: string; href: string; icon?: string }[]
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
const EMAIL = 'Favevietnam@gmail.com'

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
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
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
        className="hidden lg:block fixed top-0 left-0 right-0 z-50"
        style={{
          background: '#0a2342',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          height: '36px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-white/40 text-xs">
              Giải pháp HVAC B2B chuyên nghiệp — Phục vụ toàn quốc
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-white/40 text-xs">T2–T7: 8:00–18:00 &nbsp;·&nbsp; CN: 8:00–12:00</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="text-white/40 text-xs hover:text-white/70 transition-colors"
            >
              {EMAIL}
            </a>
            <span className="h-3 w-px bg-white/10" />
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-xs font-bold transition-colors"
              style={{ color: '#ff7043' }}
            >
              <Phone size={11} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-200',
          'top-0 lg:top-9',
          isScrolled
            ? 'bg-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.05)]'
            : 'bg-white border-b border-gray-200',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center group flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-fave-compact.svg"
                alt="FAVE Vietnam — Giải pháp HVAC"
                className="h-12 w-auto group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop nav */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.key} className="relative">
                  {item.children ? (
                    <button
                      className={cn(
                        'nav-link-underline flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium',
                        isActive(item.href)
                          ? 'text-[#1565C0] active'
                          : 'text-slate-600 hover:text-[#0a2342] hover:bg-slate-50',
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    >
                      {t(item.key)}
                      <ChevronDown
                        size={13}
                        className={cn('opacity-50 transition-transform duration-200', openDropdown === item.key && 'rotate-180')}
                      />
                    </button>
                  ) : (
                    <Link
                      href={getHref(item.href)}
                      className={cn(
                        'nav-link-underline block px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium',
                        isActive(item.href)
                          ? 'text-[#1565C0] active'
                          : 'text-slate-600 hover:text-[#0a2342] hover:bg-slate-50',
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.children && openDropdown === item.key && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 z-50 overflow-hidden rounded-xl bg-white"
                      style={{
                        boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.06)',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <div style={{ height: '3px', background: 'linear-gradient(90deg, #0a2342, #1565C0)' }} />
                      <Link
                        href={getHref(item.href)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors"
                        style={{
                          color: '#1565C0',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid #F1F5F9',
                        }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        Tất cả {t(item.key)} <ArrowRight size={11} />
                      </Link>
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={getHref(child.href)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-[#0a2342] hover:bg-slate-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: '#1565C0', opacity: 0.5 }}
                            />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop right: Language + Phone + CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="px-2.5 py-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs font-semibold tracking-widest"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>

              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm font-semibold"
                style={{
                  color: '#0a2342',
                  borderColor: '#CBD5E1',
                  background: '#F8FAFC',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = '#1565C0'
                  el.style.color = '#1565C0'
                  el.style.background = '#EFF6FF'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = '#CBD5E1'
                  el.style.color = '#0a2342'
                  el.style.background = '#F8FAFC'
                }}
              >
                <Phone size={13} />
                {PHONE_DISPLAY}
              </a>

              <Link
                href={getHref('/lien-he')}
                className="btn-orange pulse-orange"
                style={{ padding: '0.5rem 1.125rem', fontSize: '0.875rem' }}
              >
                Báo giá miễn phí
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex lg:hidden items-center gap-1.5">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                style={{ background: '#FFF3E0', border: '1px solid #FFCCBC', color: '#E65100' }}
                aria-label="Hotline"
              >
                <Phone size={15} />
              </a>
              <button
                onClick={() => switchLocale(locale === 'vi' ? 'en' : 'vi')}
                className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-700 transition-all text-xs font-bold tracking-widest"
                aria-label="Switch language"
              >
                {locale === 'vi' ? 'EN' : 'VI'}
              </button>
              <button
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg transition-all',
                  isMobileOpen
                    ? 'bg-slate-100 text-slate-800'
                    : 'text-slate-600 hover:bg-slate-100',
                )}
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
          'fixed left-0 right-0 bottom-0 z-40 lg:hidden flex flex-col',
          'top-16',
          'transition-transform duration-300 ease-in-out',
          isMobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{
          background: '#ffffff',
          borderLeft: '1px solid #E2E8F0',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Accent top line */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #0a2342, #1565C0, #E65100)' }} />

        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-fave-compact.svg" alt="FAVE Vietnam" className="h-10 w-auto" />
          </div>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all"
            style={{ background: '#FFF3E0', border: '1px solid #FFCCBC', color: '#E65100' }}
          >
            <Phone size={13} />
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-3.5 rounded-xl transition-all text-sm font-semibold',
                      isActive(item.href)
                        ? 'text-[#1565C0] bg-blue-50'
                        : 'text-slate-600 hover:text-[#0a2342] hover:bg-slate-50',
                    )}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronDown
                      size={14}
                      className={cn('opacity-40 transition-transform duration-300', mobileExpanded === item.key && 'rotate-180 opacity-70')}
                    />
                  </button>
                  {mobileExpanded === item.key && (
                    <div
                      className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                    >
                      <Link
                        href={getHref(item.href)}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-xs font-bold hover:bg-blue-50 transition-colors"
                        style={{ color: '#1565C0', borderBottom: '1px solid #E2E8F0' }}
                      >
                        <ArrowRight size={12} />
                        Xem tất cả {t(item.key)}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={getHref(child.href)}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
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
                    'flex items-center w-full px-3 py-3.5 rounded-xl transition-all text-sm font-semibold',
                    isActive(item.href)
                      ? 'text-[#1565C0] bg-blue-50'
                      : 'text-slate-600 hover:text-[#0a2342] hover:bg-slate-50',
                  )}
                >
                  {t(item.key)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-5 pb-8 pt-4 space-y-3" style={{ borderTop: '1px solid #F1F5F9' }}>
          <Link
            href={getHref('/lien-he')}
            onClick={() => setIsMobileOpen(false)}
            className="btn-orange flex items-center justify-center gap-2 w-full"
            style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}
          >
            <ArrowRight size={16} />
            Yêu cầu báo giá miễn phí
          </Link>
          <div className="flex items-center justify-center gap-6 pt-1">
            <a href="https://facebook.com/favevietnam" target="_blank" rel="noopener noreferrer"
              className="text-slate-400 text-xs hover:text-slate-600 transition-colors font-semibold">
              Facebook
            </a>
            <a href="https://zalo.me/0981907109" target="_blank" rel="noopener noreferrer"
              className="text-slate-400 text-xs hover:text-slate-600 transition-colors font-semibold">
              Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Spacer: top info bar (desktop only) */}
      <div className="hidden lg:block" style={{ height: '36px' }} />
    </>
  )
}
