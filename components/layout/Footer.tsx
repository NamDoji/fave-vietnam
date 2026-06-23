import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const serviceLinks = [
    { label: 'Bảo trì điều hòa', href: '/dich-vu/bao-tri-dieu-hoa' },
    { label: 'Bảo dưỡng Chiller', href: '/dich-vu/bao-duong-chiller' },
    { label: 'Sửa chữa HVAC', href: '/dich-vu/sua-chua-hvac' },
    { label: 'Cải tạo, nâng cấp', href: '/dich-vu/cai-tao-nang-cap' },
    { label: 'Vệ sinh công nghiệp', href: '/dich-vu/ve-sinh-cong-nghiep' },
    { label: 'Thiết kế HVAC', href: '/dich-vu/thiet-ke-hvac' },
  ]

  const quickLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Dự án', href: '/du-an' },
    { label: 'Năng lực', href: '/nang-luc' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ', href: '/lien-he' },
  ]

  return (
    <footer style={{ background: '#0D0D0D' }} className="text-white">
      {/* Top gold line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.5) 20%, rgba(200,169,110,0.5) 80%, transparent 100%)' }} />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <div>
            <Link href={href('/')} className="inline-block mb-6">
              <div
                className="font-bold italic text-2xl text-white"
                style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', letterSpacing: '-0.01em' }}
              >
                FAVE
              </div>
              <div
                className="text-[9px] font-semibold tracking-[0.24em] uppercase mt-0.5"
                style={{ color: 'rgba(200,169,110,0.7)' }}
              >
                VIỆT NAM
              </div>
            </Link>

            {/* Thin divider */}
            <div style={{ height: '1px', background: 'rgba(200,169,110,0.2)', marginBottom: '1.25rem' }} />

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem', lineHeight: 1.8 }} className="mb-6">
              {t('description')}
            </p>

            {/* Social links */}
            <div className="flex gap-2.5">
              {[
                { href: 'https://facebook.com/favevietnam', label: 'Facebook', text: 'fb' },
                { href: 'https://youtube.com/favevietnam', label: 'YouTube', text: 'yt' },
                { href: 'https://zalo.me/0981907109', label: 'Zalo', text: 'Za' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(200,169,110,0.2)',
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.6)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.9)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.2)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)'
                  }}
                  aria-label={social.label}
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.7)',
              }}
            >
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="transition-colors"
                    style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', display: 'block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.7)',
              }}
            >
              {t('services')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="transition-colors"
                    style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', display: 'block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.7)',
              }}
            >
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,110,0.6)' }} />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem', lineHeight: 1.7 }}>
                  348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,110,0.6)' }} />
                <div>
                  <a
                    href="tel:0981907109"
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', fontWeight: 500, display: 'block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.9)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}
                  >
                    0981 907 109
                  </a>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hotline 24/7</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,110,0.6)' }} />
                <a
                  href="mailto:Favevietnam@gmail.com"
                  style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)' }}
                >
                  Favevietnam@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,110,0.6)' }} />
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem' }}>
                  <span className="block">T2 – T7: 7:30 – 17:30</span>
                  <span className="block">CN: 8:00 – 12:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom divider + copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            {t('copyright')}
          </p>
          <div className="flex gap-6" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            <Link
              href={href('/chinh-sach-bao-mat')}
              className="transition-colors"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.2)' }}
            >
              {t('privacyPolicy')}
            </Link>
            <Link
              href={href('/dieu-khoan')}
              className="transition-colors"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.2)' }}
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
