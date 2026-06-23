'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Download, CheckCircle2, ArrowRight } from 'lucide-react'

const STATS = [
  { value: '15+', label: 'Năm\nkinh nghiệm', desc: 'Hoạt động từ 2009' },
  { value: '500+', label: 'Dự án\nhoàn thành', desc: 'Trên toàn quốc' },
  { value: '100+', label: 'Kỹ sư &\nkỹ thuật viên', desc: 'Được đào tạo chuyên sâu' },
  { value: '50+', label: 'Khách hàng\ntrung thành', desc: 'Doanh nghiệp lớn' },
]

const STRENGTHS = [
  'Đại lý ủy quyền chính thức Daikin & Carrier Vietnam',
  'Chứng chỉ ISO 9001:2015 và các tiêu chuẩn ASHRAE',
  'Đội kỹ sư thiết kế HVAC kinh nghiệm 10+ năm',
  'Dịch vụ bảo trì 24/7, phản hồi trong 2-4 giờ',
  'Phần mềm tính toán chuyên nghiệp: HAP, Trace 700',
  'Bảo hành công trình 12 tháng sau bàn giao',
]

export default function AboutSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#0a1628' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="slide-left">
            <span className="section-badge-dark mb-5 inline-flex">🏢 Năng lực</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Tại Sao Chọn
              <br />
              <span className="gradient-text">FAVE Vietnam?</span>
            </h2>
            <div className="w-16 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #0066ff, #60a5fa)' }} />

            <p className="text-white/55 leading-relaxed mb-8">
              Với 15 năm kinh nghiệm trong lĩnh vực HVAC, FAVE Vietnam đã trở thành đối tác
              tin cậy của hàng trăm doanh nghiệp, bệnh viện và nhà máy hàng đầu Việt Nam.
              Chúng tôi không chỉ cung cấp thiết bị — chúng tôi mang lại giải pháp toàn diện.
            </p>

            {/* Strengths */}
            <ul className="space-y-3 mb-8">
              {STRENGTHS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/65 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href={href('/nang-luc')} className="btn-primary text-sm">
                Xem năng lực <ArrowRight size={14} />
              </Link>
              <a
                href="/files/ho-so-nang-luc-fave.pdf"
                download
                className="btn-outline text-sm"
              >
                <Download size={14} />
                Tải hồ sơ năng lực
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="slide-right">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(circle at top left, rgba(0, 102, 255, 0.08), transparent)' }}
                  />
                  <div className="relative">
                    <div
                      className="text-4xl font-black mb-1"
                      style={{ background: 'linear-gradient(135deg, #60a5fa, #0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white/80 font-semibold text-sm leading-tight whitespace-pre-line">
                      {stat.label}
                    </div>
                    <div className="text-white/30 text-xs mt-1">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom card */}
            <div
              className="mt-4 p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.12), rgba(0, 102, 255, 0.06))',
                border: '1px solid rgba(0, 102, 255, 0.2)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">📜</div>
                <div>
                  <div className="text-white font-semibold text-sm">ISO 9001:2015 Certified</div>
                  <div className="text-white/45 text-xs mt-0.5">
                    Hệ thống quản lý chất lượng quốc tế · Bureau Veritas cấp 2021
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
