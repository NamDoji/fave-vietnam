'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

const PAIN_VI = [
  'Điều hòa, Chiller hỏng đột ngột, không tìm được thợ đêm khuya',
  'Hóa đơn điện tăng 20-40% không rõ nguyên nhân',
  'Nhà cung cấp bảo trì không đúng hẹn, thiếu chuyên nghiệp',
  'Dự án mới cần đơn vị uy tín thi công HVAC đúng tiến độ',
  'Phòng sạch/nhà máy cần đạt chuẩn GMP, ISO nhưng chưa có đối tác',
]

const SOLUTION_VI = [
  'Đội ứng cứu 24/7 — phản hồi trong 2 giờ, có mặt trong đêm',
  'Kiểm tra và tối ưu hiệu suất — tiết kiệm 20-35% điện năng',
  'Hợp đồng bảo trì có SLA rõ ràng, báo cáo minh bạch sau mỗi lần',
  'Đội dự án 50+ kỹ sư, tiến độ cam kết bằng hợp đồng',
  'Chuyên gia phòng sạch ISO, đạt chuẩn ngay lần kiểm tra đầu',
]

const PAIN_EN = [
  'AC or Chiller breaks down suddenly — no technician available overnight',
  'Electricity bills spike 20-40% with no clear cause',
  'Current maintenance provider misses schedules and lacks professionalism',
  'New project needs a reliable contractor to deliver HVAC on time',
  'Cleanroom or factory must meet GMP/ISO standards but no partner yet',
]

const SOLUTION_EN = [
  '24/7 emergency team — 2-hour response, on-site overnight if needed',
  'System inspection & optimization — save 20-35% on energy bills',
  'Maintenance contracts with clear SLAs and transparent post-service reports',
  '50+ project engineers, schedule commitments backed by contract',
  'ISO cleanroom specialists — passing certification on the first inspection',
]

export default function PainPointsSection() {
  const locale = useLocale()

  const pains = locale === 'en' ? PAIN_EN : PAIN_VI
  const solutions = locale === 'en' ? SOLUTION_EN : SOLUTION_VI

  const heading =
    locale === 'en'
      ? {
          painTitle: 'What Problems Are You Facing?',
          painSub: 'Common HVAC challenges businesses struggle with',
          solTitle: 'FAVE Solves It',
          solSub: 'Fast, reliable, backed by experience',
          cta: 'Call Now — Free Consultation',
          or: 'or fill the form for our engineer to call you back',
        }
      : {
          painTitle: 'Bạn Đang Gặp Vấn Đề Gì?',
          painSub: 'Những thách thức HVAC phổ biến mà doanh nghiệp thường gặp',
          solTitle: 'FAVE Giải Quyết Ngay',
          solSub: 'Nhanh, đáng tin, có kinh nghiệm dày dặn',
          cta: 'Gọi Ngay — Tư Vấn Miễn Phí',
          or: 'hoặc điền form để kỹ sư liên hệ lại',
        }

  const contactHref = locale === 'en' ? '/en/contact' : '/lien-he'
  const quoteHref = locale === 'en' ? '/en/contact#quote' : '/lien-he#bao-gia'

  return (
    <section className="section-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Left: Pain points */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
              {heading.painTitle}
            </h2>
            <p className="text-white/50 text-sm mb-8">{heading.painSub}</p>
            <ul className="space-y-4">
              {pains.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5"
                >
                  <span className="text-red-400 text-lg leading-none mt-0.5 flex-shrink-0">❌</span>
                  <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Solutions */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
              {heading.solTitle}
            </h2>
            <p className="text-white/50 text-sm mb-8">{heading.solSub}</p>
            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                  style={{ background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(21,101,192,0.4)' }}
                >
                  <span className="text-green-400 text-lg leading-none mt-0.5 flex-shrink-0">✅</span>
                  <span className="text-white/90 text-sm leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={contactHref}
            className="btn-orange inline-flex items-center gap-2 text-base px-8 py-4 rounded-xl mb-3"
          >
            📞 {heading.cta}
          </Link>
          <p className="text-white/40 text-sm mt-3">
            {heading.or}{' '}
            <Link href={quoteHref} className="text-blue-400 underline hover:text-blue-300 transition-colors">
              →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
