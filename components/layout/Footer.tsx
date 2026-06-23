import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, Mail, Clock, Wind, ArrowRight } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const serviceLinks = [
    { label: 'Điều hòa trung tâm', href: '/dich-vu/dieu-hoa-trung-tam' },
    { label: 'Thông gió công nghiệp', href: '/dich-vu/thong-gio-cong-nghiep' },
    { label: 'Hệ thống lạnh', href: '/dich-vu/he-thong-lanh' },
    { label: 'VRV/VRF', href: '/dich-vu/vrv-vrf' },
    { label: 'Xử lý không khí sạch', href: '/dich-vu/xu-ly-khong-khi-sach' },
    { label: 'Bảo trì bảo dưỡng', href: '/dich-vu/bao-tri-bao-duong' },
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
    <footer style={{ background: '#0a1628' }} className="text-white">
      {/* Top CTA bar */}
      <div style={{ background: 'linear-gradient(135deg, #0066ff, #0052cc)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Sẵn sàng bắt đầu dự án HVAC của bạn?</p>
            <p className="text-blue-100/80 text-sm">Đội ngũ kỹ sư FAVE tư vấn miễn phí, báo giá trong 24h</p>
          </div>
          <Link
            href={href('/lien-he')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all whitespace-nowrap flex-shrink-0 hover:shadow-lg"
          >
            Yêu cầu báo giá <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div>
            <Link href={href('/')} className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Wind size={17} className="text-white" />
              </div>
              <div>
                <div className="font-black text-xl text-white tracking-tight">FAVE</div>
                <div className="text-[10px] text-blue-400/70 font-semibold tracking-[0.2em] uppercase">Vietnam</div>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              <a
                href="https://facebook.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/08"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Facebook"
              >
                <span className="text-[11px] font-bold">fb</span>
              </a>
              <a
                href="https://youtube.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/08"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="YouTube"
              >
                <span className="text-[11px] font-bold">yt</span>
              </a>
              <a
                href="https://zalo.me/0981907109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/08 text-[11px] font-bold"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Zalo"
              >
                Za
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest opacity-60">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest opacity-60">
              {t('services')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest opacity-60">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/45 text-sm leading-relaxed">
                  348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:0981907109"
                    className="text-white font-semibold hover:text-blue-400 transition-colors text-sm block"
                  >
                    0981 907 109
                  </a>
                  <span className="text-white/30 text-xs">Hotline 24/7</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="text-white/45 text-sm hover:text-white transition-colors"
                >
                  Favevietnam@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white/45 text-sm block">T2 - T7: 7:30 - 17:30</span>
                  <span className="text-white/45 text-sm">CN: 8:00 - 12:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-sm">
            {t('copyright')}
          </p>
          <div className="flex gap-5 text-sm text-white/25">
            <Link href={href('/chinh-sach-bao-mat')} className="hover:text-white/60 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href={href('/dieu-khoan')} className="hover:text-white/60 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
