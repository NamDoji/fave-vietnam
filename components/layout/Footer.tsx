import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, Mail, Clock, Zap } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const quickLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Dịch vụ', href: '/dich-vu' },
    { label: 'Sản phẩm', href: '/san-pham' },
    { label: 'Dự án', href: '/du-an' },
    { label: 'Năng lực', href: '/nang-luc' },
  ]

  const serviceLinks = [
    { label: 'Điều hòa trung tâm', href: '/dich-vu/dieu-hoa-trung-tam' },
    { label: 'Thông gió công nghiệp', href: '/dich-vu/thong-gio-cong-nghiep' },
    { label: 'Hệ thống lạnh', href: '/dich-vu/he-thong-lanh' },
    { label: 'VRV/VRF', href: '/dich-vu/vrv-vrf' },
    { label: 'Xử lý không khí sạch', href: '/dich-vu/xu-ly-khong-khi-sach' },
    { label: 'Bảo trì bảo dưỡng', href: '/dich-vu/bao-tri-bao-duong' },
  ]

  const otherLinks = [
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ', href: '/lien-he' },
  ]

  return (
    <footer className="bg-[#0f2540] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href={href('/')} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-lg flex items-center justify-center">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-white leading-tight">FAVE</div>
                <div className="text-xs text-[#00a0e9] font-medium tracking-widest">VIETNAM</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {t('description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a3a5c] rounded-full flex items-center justify-center hover:bg-[#00a0e9] transition-colors"
                aria-label="Facebook"
              >
                <span className="text-[10px] font-bold">fb</span>
              </a>
              <a
                href="https://youtube.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a3a5c] rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <span className="text-[10px] font-bold">yt</span>
              </a>
              <a
                href="https://zalo.me/0981907109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a3a5c] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-xs font-bold"
                aria-label="Zalo"
              >
                Za
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-gray-400 text-sm hover:text-[#00a0e9] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-[#00a0e9] rounded-full opacity-60" />
                    {link.label}
                  </Link>
                </li>
              ))}
              {otherLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-gray-400 text-sm hover:text-[#00a0e9] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-[#00a0e9] rounded-full opacity-60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-gray-400 text-sm hover:text-[#00a0e9] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-[#00a0e9] rounded-full opacity-60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#00a0e9] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-[#00a0e9] mt-0.5 shrink-0" />
                <div>
                  <a
                    href="tel:0981907109"
                    className="text-white font-semibold hover:text-[#00a0e9] transition-colors block"
                  >
                    0981 907 109
                  </a>
                  <span className="text-gray-500 text-xs">Hotline 24/7</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#00a0e9] mt-0.5 shrink-0" />
                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="text-gray-400 text-sm hover:text-[#00a0e9] transition-colors"
                >
                  Favevietnam@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-[#00a0e9] mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-400 text-sm block">T2 - T7: 7:30 - 17:30</span>
                  <span className="text-gray-400 text-sm">CN: 8:00 - 12:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-sm">
            {t('copyright')}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href={href('/chinh-sach-bao-mat')} className="hover:text-[#00a0e9] transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href={href('/dieu-khoan')} className="hover:text-[#00a0e9] transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
