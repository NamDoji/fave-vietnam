'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink, Shield, Award } from 'lucide-react'

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

  const trustBadges = [
    { code: 'ISO', label: 'ISO 9001:2015', desc: 'Quản lý chất lượng', color: '#1565C0' },
    { code: 'BV', label: 'Bureau Veritas', desc: 'Kiểm định quốc tế', color: '#0288D1' },
    { code: 'DK', label: 'Daikin', desc: 'Đại lý ủy quyền', color: '#1976D2' },
    { code: 'CR', label: 'Carrier', desc: 'Đối tác chính thức', color: '#0d47a1' },
  ]

  return (
    <footer style={{ background: '#060e1e' }} className="text-white">

      {/* CTA bar */}
      <div style={{ background: 'linear-gradient(135deg, #0a2342 0%, #1565C0 60%, #0288D1 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-bold text-xl text-white">Sẵn sàng bắt đầu dự án HVAC của bạn?</p>
            <p className="text-blue-100/70 text-sm mt-1">Đội ngũ kỹ sư FAVE tư vấn miễn phí — báo giá chi tiết trong 24 giờ làm việc</p>
          </div>
          <Link
            href={href('/lien-he')}
            className="flex items-center gap-2 px-6 py-3.5 bg-white font-bold rounded-xl hover:bg-orange-50 hover:text-orange-700 transition-all whitespace-nowrap flex-shrink-0"
            style={{ color: '#0a2342', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
          >
            Yêu cầu báo giá <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Trust badges bar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {trustBadges.map((badge) => (
            <div key={badge.code} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                style={{
                  background: `${badge.color}22`,
                  border: `1px solid ${badge.color}44`,
                  color: badge.color,
                }}
              >
                {badge.code}
              </div>
              <div>
                <div className="text-white/65 text-xs font-semibold">{badge.label}</div>
                <div className="text-white/30 text-[10px]">{badge.desc}</div>
              </div>
            </div>
          ))}
          <div className="hidden sm:flex items-center gap-2 text-white/30 text-xs">
            <span className="h-3 w-px bg-white/10" />
            <Award size={12} className="text-white/30" />
            <span>10+ Năm kinh nghiệm</span>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div>
            <Link href={href('/')} className="inline-block mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-fave.svg"
                alt="FAVE Vietnam — Giải pháp HVAC"
                className="h-12 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Social links */}
            <div className="flex gap-2 mb-6">
              <a
                href="https://linkedin.com/company/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px', fontWeight: 800 }}
                aria-label="LinkedIn"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0A66C2'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0A66C2' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                in
              </a>
              <a
                href="https://facebook.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', fontWeight: 900 }}
                aria-label="Facebook"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1877F2'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1877F2' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                fb
              </a>
              <a
                href="https://youtube.com/favevietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px', fontWeight: 900 }}
                aria-label="YouTube"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF0000'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FF0000' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                yt
              </a>
              <a
                href="https://zalo.me/0981907109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px', fontWeight: 900 }}
                aria-label="Zalo"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0068FF'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0068FF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                Za
              </a>
            </div>

            {/* Company info */}
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Shield size={10} className="text-white/25" />
                <div className="text-white/25 text-[10px] font-semibold uppercase tracking-widest">Công ty TNHH</div>
              </div>
              <div className="text-white/45 text-xs leading-relaxed">
                FAVE VIETNAM<br />
                MST: 0109xxxxxx
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white/55 font-bold mb-5 text-xs uppercase tracking-widest">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 group py-0.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                      style={{ background: 'rgba(21,101,192,0.4)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.background = '#1565C0' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.background = 'rgba(21,101,192,0.4)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-white/55 font-bold mb-5 text-xs uppercase tracking-widest">
              {t('services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 group py-0.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(21,101,192,0.4)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white/55 font-bold mb-5 text-xs uppercase tracking-widest">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#1976D2' }} />
                <div>
                  <span className="text-white/40 text-sm leading-relaxed block">
                    348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
                  </span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold transition-colors hover:text-blue-200"
                    style={{ color: '#90caf9' }}
                  >
                    <ExternalLink size={10} />
                    Xem trên Google Maps
                  </a>
                </div>
              </li>

              <li className="flex gap-3">
                <Phone size={15} className="mt-1 flex-shrink-0" style={{ color: '#ff7043' }} />
                <div>
                  <a
                    href="tel:0981907109"
                    className="text-white font-bold hover:text-orange-300 transition-colors text-base block"
                  >
                    0981 907 109
                  </a>
                  <span className="text-white/30 text-xs">Hotline — hỗ trợ 24/7</span>
                </div>
              </li>

              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#1976D2' }} />
                <a
                  href="mailto:Favevietnam@gmail.com"
                  className="text-white/40 text-sm hover:text-white transition-colors"
                >
                  Favevietnam@gmail.com
                </a>
              </li>

              <li className="flex gap-3">
                <Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#1976D2' }} />
                <div>
                  <span className="text-white/40 text-sm block">Thứ 2 – Thứ 7: 8:00 – 18:00</span>
                  <span className="text-white/40 text-sm">Chủ nhật: 8:00 – 12:00</span>
                </div>
              </li>
            </ul>

            {/* Emergency badge */}
            <div
              className="mt-5 p-3.5 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(230,81,0,0.08)', border: '1px solid rgba(230,81,0,0.2)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <div className="text-white text-xs font-semibold">Hỗ trợ khẩn cấp 24/7</div>
                <a
                  href="tel:0981907109"
                  className="text-xs hover:text-orange-200 transition-colors font-medium"
                  style={{ color: '#ff8a65' }}
                >
                  Gọi ngay: 0981 907 109
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <p className="text-white/20 text-sm">
              {t('copyright')}
            </p>
            <span className="hidden sm:block text-white/10 text-xs">|</span>
            <span className="text-white/15 text-xs">MST: 0109xxxxxx</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/20">
            <Link href={href('/chinh-sach-bao-mat')} className="hover:text-white/50 transition-colors text-xs">
              {t('privacyPolicy')}
            </Link>
            <Link href={href('/dieu-khoan')} className="hover:text-white/50 transition-colors text-xs">
              {t('terms')}
            </Link>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors flex items-center gap-1 text-xs"
            >
              <MapPin size={11} />
              Bản đồ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
