'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Download, CheckCircle2, ArrowRight, Building2, Users, Trophy, Clock } from 'lucide-react'

const DEFAULT_STATS = [
  { value: '10+', label: 'Năm kinh nghiệm', desc: 'Thành lập từ 2016', key: 'stat_years', icon: Clock },
  { value: '500+', label: 'Dự án hoàn thành', desc: 'Trên toàn quốc', key: 'stat_projects', icon: Building2 },
  { value: '100+', label: 'Kỹ sư & kỹ thuật viên', desc: 'Được đào tạo chuyên sâu', key: 'stat_engineers', icon: Users },
  { value: '50+', label: 'Khách hàng trung thành', desc: 'Doanh nghiệp lớn', key: 'stat_clients', icon: Trophy },
]

const FALLBACK_STRENGTHS = [
  'Đại lý ủy quyền chính thức Daikin & Carrier Vietnam',
  'Chứng chỉ ISO 9001:2015 và các tiêu chuẩn ASHRAE',
  'Đội kỹ sư thiết kế HVAC kinh nghiệm 10+ năm',
  'Dịch vụ bảo trì 24/7, phản hồi trong 2–4 giờ',
  'Phần mềm tính toán chuyên nghiệp: HAP, Trace 700',
  'Bảo hành công trình 12 tháng sau bàn giao',
]

const CERT_BADGES = [
  { code: 'ISO\n9001', label: 'ISO 9001:2015', color: '#0066ff' },
  { code: 'BV', label: 'Bureau Veritas', color: '#0099cc' },
  { code: 'DK', label: 'Daikin Vietnam', color: '#336699' },
  { code: 'CR', label: 'Carrier Partner', color: '#005580' },
]

interface StatItem { value: string; label: string; desc: string; key: string; icon: React.ElementType }

export default function AboutSection() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS)
  const [strengths, setStrengths] = useState<string[]>(FALLBACK_STRENGTHS)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        setStats(DEFAULT_STATS.map(s => ({ ...s, value: d[s.key] || s.value })))
        if (d.about_strengths) {
          try {
            const parsed = JSON.parse(d.about_strengths)
            if (Array.isArray(parsed) && parsed.length > 0) setStrengths(parsed)
          } catch {
            const lines = d.about_strengths.split('\n').map((l: string) => l.trim()).filter(Boolean)
            if (lines.length > 0) setStrengths(lines)
          }
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: '#0a1628' }}>
      <div className="absolute inset-0 tech-grid" style={{ opacity: 0.25 }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,100,200,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left column */}
          <div className="slide-left">
            <span className="section-badge-dark mb-5 inline-flex">🏢 Năng lực công ty</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Tại Sao Chọn<br />
              <span className="gradient-text">FAVE Vietnam?</span>
            </h2>
            <div className="w-16 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #0066ff, #60a5fa)' }} />

            <p className="text-white/50 leading-relaxed mb-8 text-base">
              Với {stats.find(s => s.key === 'stat_years')?.value || '10+'} năm kinh nghiệm trong lĩnh vực HVAC, FAVE Vietnam
              đã trở thành đối tác tin cậy của hàng trăm doanh nghiệp, bệnh viện và nhà máy hàng đầu Việt Nam.
            </p>

            {/* Strengths list */}
            <ul className="space-y-3 mb-8">
              {strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href={href('/nang-luc')} className="btn-primary text-sm">
                Xem năng lực đầy đủ <ArrowRight size={14} />
              </Link>
              <a href="/files/ho-so-nang-luc-fave.pdf" download className="btn-outline text-sm">
                <Download size={14} /> Tải hồ sơ năng lực
              </a>
            </div>

            {/* Cert badges */}
            <div>
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Chứng chỉ & Đối tác</p>
              <div className="flex flex-wrap gap-3">
                {CERT_BADGES.map((cert) => (
                  <div
                    key={cert.code}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-black leading-tight text-center whitespace-pre"
                      style={{ background: `${cert.color}25`, border: `1px solid ${cert.color}40`, color: '#93c5fd' }}
                    >
                      {cert.code}
                    </div>
                    <span className="text-white/55 text-xs font-medium">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="slide-right space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(circle at top left, rgba(0,102,255,0.1), transparent)' }}
                    />
                    <div className="relative">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,102,255,0.2)' }}
                      >
                        <Icon size={16} className="text-blue-400" />
                      </div>
                      <div
                        className="text-4xl font-black mb-1"
                        style={{ background: 'linear-gradient(135deg, #93c5fd, #0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/75 font-semibold text-sm leading-tight">{stat.label}</div>
                      <div className="text-white/30 text-xs mt-0.5">{stat.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ISO cert card */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.12), rgba(0,102,255,0.05))', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs text-center leading-tight"
                  style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)', color: '#93c5fd' }}
                >
                  ISO<br />9001
                </div>
                <div>
                  <div className="text-white font-bold text-sm mb-0.5">ISO 9001:2015 Certified</div>
                  <div className="text-white/40 text-xs leading-relaxed">
                    Hệ thống quản lý chất lượng quốc tế theo tiêu chuẩn ISO<br />
                    Bureau Veritas cấp năm 2021 · Phạm vi: Dịch vụ HVAC
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline milestone */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">Hành trình phát triển</p>
              <div className="space-y-3">
                {[
                  { year: '2016', text: 'Thành lập FAVE Vietnam tại Hà Nội' },
                  { year: '2018', text: 'Đạt 100 dự án đầu tiên, mở rộng vào miền Nam' },
                  { year: '2021', text: 'Nhận chứng nhận ISO 9001:2015' },
                  { year: '2024', text: 'Hơn 500 dự án, 100+ kỹ sư chuyên nghiệp' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="text-xs font-black px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(0,102,255,0.2)', color: '#60a5fa' }}
                    >
                      {item.year}
                    </div>
                    <span className="text-white/45 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
