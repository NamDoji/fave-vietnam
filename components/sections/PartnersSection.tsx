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
      className="flex-shrink-0 mx-4 px-7 py-4 rounded-xl flex flex-col items-center justify-center group cursor-default hover:-translate-y-1 transition-all duration-300"
      style={{
        background: 'white',
        border: '1px solid rgba(0, 102, 255, 0.08)',
        minWidth: '140px',
        height: '72px',
      }}
    >
      <div className="font-black text-lg text-slate-800 group-hover:text-blue-600 transition-colors whitespace-nowrap">
        {name}
      </div>
      <div className="text-xs text-slate-400 mt-0.5 font-medium">{desc}</div>
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

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <span className="section-badge mb-4 inline-flex">🤝 Đối tác</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Đối Tác & <span className="text-blue-600">Thương Hiệu</span>
          </h2>
          <div className="section-divider mx-auto mt-4" />
          <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
            Phân phối và lắp đặt thiết bị chính hãng từ các thương hiệu HVAC hàng đầu thế giới
          </p>
        </div>

        {/* Marquee - Partners/Brands */}
        <div className="relative mb-6 fade-in">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, white, transparent)' }} />

          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <PartnerCard key={i} name={p.name} desc={p.desc} />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-10 fade-in" />

        {/* Clients grid */}
        <div className="fade-in">
          <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mb-6">
            Khách hàng tiêu biểu
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CLIENTS.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-default hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: '#f8faff', border: '1px solid rgba(0, 102, 255, 0.08)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {client.name}
                <span className="text-xs text-slate-400 font-normal">· {client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
