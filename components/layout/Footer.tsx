'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, Mail, Clock, Wind, ArrowRight, ExternalLink } from 'lucide-react'

const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=348+Duong+Buoi+Nghia+Do+Ba+Dinh+Ha+Noi'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  const serviceLinks = [
    { label: 'Bảo trì điều hòa trung tâm', href: '/dich-vu/bao-tri-dieu-hoa' },
    { label: 'Bảo dưỡng Chiller', href: '/dich-vu/bao-duong-chiller' },
    { label: 'Sửa chữa hệ thống HVAC', href: '/dich-vu/sua-chua-hvac' },
    { label: 'VRV/VRF & hệ thống lạnh', href: '/dich-vu/cai-tao-nang-cap' },
    { label: 'Vệ sinh công nghiệp', href: '/dich-vu/ve-sinh-cong-nghiep' },
    { label: 'Thiết kế & lắp đặt HVAC', href: '/dich-vu/thiet-ke-hvac' },
  ]

  const quickLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu công ty', href: '/gioi-thieu' },
    { label: 'Năng lực & Chứng chỉ', href: '/nang-luc' },
    { label: 'Dự án tiêu biểu', href: '/du-an' },
    { label: 'Tin tức & Kiến thức', href: '/tin-tuc' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ & Báo giá', href: '/lien-he' },
  ]

  const certBadges = [
    { code: 'ISO', label: 'ISO 9001:2015', desc: 'Quản lý chất lượng' },
    { code: 'BV', label: 'Bureau Veritas', desc: 'Kiểm định quốc tế' },
    { code: 'DK', label: 'Daikin', desc: 'Đại lý ủy quyền' },
    { code: 'CR', label: 'Carrier', desc: 'Đối tác chính thức' },
  ]

  return (
    <footer style={{ background: '#050d1a' }} className="text-white">

      {/* CTA bar */}
      <div style={{ background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 50%, #3385ff 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg text-white">Sẵn sàng bắt đầu dự án HVAC của bạn?</p>
            <p className="text-blue-100/75 text-sm mt-0.5">Đội ngũ kỹ sư FAVE tư vấn miễn phí — báo giá chi tiết trong 24 giờ làm việc</p>
          </div>
          <Link
            href={href('/lien-he')}
            className="flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl hover:bg-blue-50 transition-all whitespace-nowrap flex-shrink-0 hover:shadow-xl"
            style={{ color: '#0052cc' }}
          >
            Yêu cầu báo giá <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Cert badges bar */}
      <div style={{ background: 'rgba(0,102,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {certBadges.map((badge) => (
            <div key={badge.code} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-black"
                style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)', color: '#60a5fa' }}
              >
                {badge.code}
              </div>
              <div>
                <div className="text-white/70 text-xs font-semibold">{badge.label}</div>
                <div className="text-white/30 text-[10px]">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div>
            <Link href={href('/')} className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
                style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}>
                <Wind size={18} className="text-white" />
              </div>
              <div>
                <div className="font-black text-xl text-white tracking-tight">FAVE</div>
                <div className="text-[10px] text-blue-400/70 font-semibold tracking-[0.2em] uppercase">Vietnam</div>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Social links */}
            <div className="flex gap-2 mb-6">
              <a
                href="https://facebook.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-blue-600"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Facebook"
              >
                <span className="text-[11px] font-black">fb</span>
              </a>
              <a
                href="https://youtube.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-red-600"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="YouTube"
              >
                <span className="text-[11px] font-black">yt</span>
              </a>
              <a
                href="https://zalo.me/0981907109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all font-bold"
                style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px' }}
                aria-label="Zalo"
              >
                Za
              </a>
            </div>

            {/* Registered info */}
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="text-white/25 text-[10px] font-semibold uppercase tracking-widest mb-1">Công ty TNHH</div>
              <div className="text-white/45 text-xs leading-relaxed">FAVE VIETNAM<br />MST: 0109xxxxxx</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white/50 font-semibold mb-5 text-xs uppercase tracking-widest">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-white/50 font-semibold mb-5 text-xs uppercase tracking-widest">
              {t('services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white/50 font-semibold mb-5 text-xs uppercase tracking-widest">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              {/* Address + Map link */}
              <li className="flex gap-3">
                <MapPin size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white/40 text-sm leading-relaxed block">
                    348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
                  </span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold transition-colors hover:text-blue-300"
                    style={{ color: '#60a5fa' }}
                  >
                    <ExternalLink size={10} />
                    Xem trên Google Maps
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex gap-3">
                <Phone size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:0981907109"
                    className="text-white font-bold hover:text-blue-400 transition-colors text-base block"
                  >
                    0981 907 109
                  </a>
                  <span className="text-white/30 text-xs">Hotline 24/7</span>
                </div>
              </li>

              {/* Email */}
              <li className="flex gap-3">
                <Mail size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="text-white/40 text-sm hover:text-white transition-colors"
                >
                  Favevietnam@gmail.com
                </a>
              </li>

              {/* Hours */}
              <li className="flex gap-3">
                <Clock size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white/40 text-sm block">Thứ 2 – Thứ 7: 7:30 – 17:30</span>
                  <span className="text-white/40 text-sm">Chủ nhật: 8:00 – 12:00</span>
                </div>
              </li>
            </ul>

            {/* Emergency badge */}
            <div
              className="mt-5 p-3 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <div className="text-white text-xs font-semibold">Hỗ trợ khẩn cấp 24/7</div>
                <a href="tel:0981907109" className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
                  Gọi ngay: 0981 907 109
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-sm">
            {t('copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/20">
            <Link href={href('/chinh-sach-bao-mat')} className="hover:text-white/50 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href={href('/dieu-khoan')} className="hover:text-white/50 transition-colors">
              {t('terms')}
            </Link>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors flex items-center gap-1"
            >
              <MapPin size={12} />
              Bản đồ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
