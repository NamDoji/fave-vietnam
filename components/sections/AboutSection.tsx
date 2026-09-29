'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Download, ArrowRight, Building2, Users, Trophy, Clock } from 'lucide-react'

const DEFAULT_STATS = [
  { value: '10+', label: 'Năm kinh nghiệm', desc: 'Thành lập từ 2014', key: 'stat_years', icon: Clock },
  { value: '500+', label: 'Dự án hoàn thành', desc: 'Trên toàn quốc', key: 'stat_projects', icon: Building2 },
  { value: '100+', label: 'Kỹ sư & kỹ thuật viên', desc: 'Được đào tạo chuyên sâu', key: 'stat_engineers', icon: Users },
  { value: '50+', label: 'Khách hàng trung thành', desc: 'Doanh nghiệp lớn', key: 'stat_clients', icon: Trophy },
]

const MILESTONES = [
  { year: '2014', text: 'Thành lập FAVE Vietnam, khởi đầu với bảo trì HVAC tại Hà Nội' },
  { year: '2018', text: 'Mở rộng vào miền Nam, ký đại lý ủy quyền Daikin & Carrier' },
  { year: '2021', text: 'Đạt chứng nhận ISO 9001:2015, vượt mốc 100 kỹ sư' },
  { year: '2024', text: 'Hơn 500 dự án, top HVAC B2B uy tín toàn quốc' },
]

interface StatItem { value: string; label: string; desc: string; key: string; icon: React.ElementType }

export default function AboutSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS)

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        setStats(DEFAULT_STATS.map(s => ({ ...s, value: d[s.key] || s.value })))
      })
      .catch(() => {})
  }, [])

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
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function href(path: string) {
    if (locale === 'en') return `/en${path}`
    return path
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: '#f8fafc' }}>
      {/* Subtle decorative accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left column: content */}
          <div className="slide-left">
            <span className="section-badge mb-5 inline-flex">Về Chúng Tôi</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a1628] mb-4 leading-tight">
              Hơn 10 Năm<br />
              <span className="gradient-text">Đồng Hành Cùng Doanh Nghiệp Việt</span>
            </h2>
            <div className="section-divider mb-6" />

            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              FAVE Vietnam là đối tác HVAC tin cậy của 500+ doanh nghiệp, bệnh viện và nhà máy trên toàn quốc.
              Đội ngũ 100+ kỹ sư được đào tạo chuyên sâu, là đại lý ủy quyền chính thức của Daikin &amp; Carrier Vietnam.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-base">
              Chúng tôi cam kết phản hồi trong 2 giờ, tư vấn kỹ thuật hoàn toàn miễn phí,
              và bảo hành công trình 12 tháng sau bàn giao.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href={href('/gioi-thieu')} className="btn-primary text-sm">
                Tìm hiểu thêm <ArrowRight size={14} />
              </Link>
              <a href="/files/ho-so-nang-luc-fave.pdf" download className="btn-outline-blue text-sm">
                <Download size={14} /> Tải hồ sơ năng lực
              </a>
            </div>
          </div>

          {/* Right column: stats grid + timeline */}
          <div className="slide-right space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-default"
                    style={{ background: '#0a1628', border: '1px solid rgba(0,102,255,0.15)' }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(circle at top left, rgba(0,102,255,0.15), transparent)' }}
                    />
                    <div className="relative">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.25)' }}
                      >
                        <Icon size={16} className="text-blue-400" />
                      </div>
                      <div
                        className="text-4xl font-black mb-1"
                        style={{ background: 'linear-gradient(135deg, #93c5fd, #0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/80 font-semibold text-sm leading-tight">{stat.label}</div>
                      <div className="text-white/35 text-xs mt-0.5">{stat.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Timeline milestones */}
            <div className="p-5 rounded-2xl bg-white shadow-sm" style={{ border: '1px solid #e2e8f0' }}>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Hành trình phát triển</p>
              <div className="space-y-4">
                {MILESTONES.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="text-xs font-black px-2.5 py-1 rounded flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(0,102,255,0.08)', color: '#0066ff', border: '1px solid rgba(0,102,255,0.15)' }}
                    >
                      {item.year}
                    </div>
                    <span className="text-slate-500 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ISO card */}
            <div
              className="p-4 rounded-2xl flex items-center gap-4"
              style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(0,102,255,0.12)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs text-center leading-tight"
                style={{ background: '#0a1628', color: '#93c5fd' }}
              >
                ISO<br />9001
              </div>
              <div>
                <div className="text-[#0a1628] font-bold text-sm mb-0.5">ISO 9001:2015 Certified</div>
                <div className="text-slate-400 text-xs leading-relaxed">
                  Bureau Veritas cấp năm 2021 · Phạm vi: Dịch vụ HVAC toàn quốc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
