'use client'

import { useEffect, useRef } from 'react'

const PARTNERS = [
  { name: 'Daikin', desc: 'Đại lý ủy quyền' },
  { name: 'Carrier', desc: 'Đối tác phân phối' },
  { name: 'Trane', desc: 'Đại lý chính thức' },
  { name: 'York', desc: 'Nhà phân phối' },
  { name: 'Mitsubishi', desc: 'Đối tác' },
  { name: 'LG HVAC', desc: 'Đại lý' },
  { name: 'Gree', desc: 'Phân phối' },
  { name: 'Hitachi', desc: 'Đối tác' },
  { name: 'Samsung HVAC', desc: 'Nhà phân phối' },
  { name: 'Panasonic', desc: 'Đại lý' },
  { name: 'Emerson', desc: 'Đối tác kỹ thuật' },
  { name: 'Danfoss', desc: 'Phân phối' },
]

const CLIENTS = [
  { name: 'Unilever Vietnam', sector: 'FMCG' },
  { name: 'Samsung Electronics', sector: 'Công nghiệp' },
  { name: 'EVN', sector: 'Năng lượng' },
  { name: 'Vinmec', sector: 'Y tế' },
  { name: 'JW Marriott', sector: 'Khách sạn' },
  { name: 'VSIP Group', sector: 'Bất động sản KCN' },
  { name: 'Bộ Công An', sector: 'Hành chính' },
  { name: 'Bộ Y tế', sector: 'Y tế' },
  { name: 'FPT Complex', sector: 'Công nghệ' },
  { name: 'Vingroup', sector: 'Đa ngành' },
]

function PartnerCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div
      className="flex-shrink-0 mx-3 flex flex-col items-center justify-center group cursor-default transition-all duration-300"
      style={{
        minWidth: '140px',
        height: '68px',
        padding: '0 1.5rem',
        border: '1px solid rgba(26,60,110,0.1)',
        background: '#F5F3EF',
        filter: 'grayscale(100%) opacity(0.55)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0%) opacity(1)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.4)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(100%) opacity(0.55)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,60,110,0.1)'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#0D0D0D',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: '0.625rem',
          fontWeight: 500,
          color: '#8A8A8A',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '0.2rem',
        }}
      >
        {desc}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-28 overflow-hidden" style={{ background: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 fade-in">
          <div className="section-label mb-4" style={{ color: '#C8A96E' }}>
            Đối Tác & Thương Hiệu
          </div>
          <div style={{ width: '40px', height: '1px', background: 'rgba(200,169,110,0.5)', margin: '0 auto 1.25rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#0D0D0D',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Phân phối & lắp đặt{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>thiết bị chính hãng</span>
          </h2>
          <p style={{ color: '#6B6B6B', fontSize: '0.875rem', marginTop: '0.875rem', maxWidth: '420px', margin: '0.875rem auto 0' }}>
            Thiết bị HVAC từ các thương hiệu hàng đầu thế giới — được phân phối và bảo hành chính thức
          </p>
        </div>

        {/* Marquee — Partners/Brands */}
        <div className="relative mb-10 fade-in">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F5F3EF, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #F5F3EF, transparent)' }}
          />

          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <PartnerCard key={i} name={p.name} desc={p.desc} />
              ))}
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <div style={{ height: '1px', background: 'rgba(26,60,110,0.08)', margin: '2.5rem 0' }} />

        {/* Clients grid */}
        <div className="fade-in">
          <div
            className="text-center mb-6"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#8A8A8A',
            }}
          >
            Khách hàng tiêu biểu
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {CLIENTS.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 cursor-default transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid rgba(26,60,110,0.1)',
                  background: '#FFFFFF',
                  color: '#4A4A4A',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.4)'
                  ;(e.currentTarget as HTMLDivElement).style.color = '#0D0D0D'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,60,110,0.1)'
                  ;(e.currentTarget as HTMLDivElement).style.color = '#4A4A4A'
                }}
              >
                {client.name}
                <span style={{ color: 'rgba(26,60,110,0.3)', fontSize: '0.6875rem', fontWeight: 400 }}>· {client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
