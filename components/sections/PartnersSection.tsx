'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const FALLBACK_PARTNERS = [
  { nameVi: 'Daikin', desc: 'Đại lý ủy quyền' },
  { nameVi: 'Carrier', desc: 'Đối tác phân phối' },
  { nameVi: 'Trane', desc: 'Đại lý chính thức' },
  { nameVi: 'York', desc: 'Nhà phân phối' },
  { nameVi: 'Mitsubishi', desc: 'Đối tác' },
  { nameVi: 'LG HVAC', desc: 'Đại lý' },
  { nameVi: 'Gree', desc: 'Phân phối' },
  { nameVi: 'Hitachi', desc: 'Đối tác' },
  { nameVi: 'Samsung HVAC', desc: 'Nhà phân phối' },
  { nameVi: 'Panasonic', desc: 'Đại lý' },
  { nameVi: 'Emerson', desc: 'Đối tác kỹ thuật' },
  { nameVi: 'Danfoss', desc: 'Phân phối' },
]

const FALLBACK_CLIENTS = [
  { nameVi: 'Unilever Vietnam', industry: 'FMCG' },
  { nameVi: 'Samsung Electronics', industry: 'Công nghiệp' },
  { nameVi: 'EVN', industry: 'Năng lượng' },
  { nameVi: 'Vinmec', industry: 'Y tế' },
  { nameVi: 'JW Marriott', industry: 'Khách sạn' },
  { nameVi: 'VSIP Group', industry: 'Bất động sản KCN' },
  { nameVi: 'Bộ Công An', industry: 'Hành chính' },
  { nameVi: 'FPT Complex', industry: 'Công nghệ' },
  { nameVi: 'Vingroup', industry: 'Đa ngành' },
]

interface PartnerItem { nameVi: string; desc: string; logoUrl?: string | null }
interface ClientItem { nameVi: string; industry: string; logoUrl?: string | null }

function PartnerCard({ name, desc, logoUrl }: { name: string; desc: string; logoUrl?: string | null }) {
  return (
    <div
      className="flex-shrink-0 mx-3 px-6 py-3.5 rounded-xl flex flex-col items-center justify-center group cursor-default hover:-translate-y-1 transition-all duration-300"
      style={{ background: 'white', border: '1px solid rgba(0,102,255,0.1)', minWidth: '140px', height: '72px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      {logoUrl
        ? (
          <Image
            src={logoUrl}
            alt={name}
            width={120}
            height={32}
            className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
            unoptimized
          />
        )
        : (
          <>
            <div className="font-black text-base text-slate-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">{name}</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">{desc}</div>
          </>
        )}
    </div>
  )
}

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [partners, setPartners] = useState<PartnerItem[]>([])
  const [clients, setClients] = useState<ClientItem[]>([])

  useEffect(() => {
    fetch('/api/partners')
      .then(r => r.json())
      .then(d => {
        if (d.partners && d.partners.length > 0) {
          setPartners(d.partners.map((p: { nameVi: string; logoUrl?: string | null }) => ({ nameVi: p.nameVi, desc: '', logoUrl: p.logoUrl })))
        }
      })
      .catch(() => {})

    fetch('/api/clients')
      .then(r => r.json())
      .then(d => {
        if (d.clients && d.clients.length > 0) {
          setClients(d.clients.map((c: { nameVi: string; industry?: string; logoUrl?: string | null }) => ({ nameVi: c.nameVi, industry: c.industry || '', logoUrl: c.logoUrl })))
        }
      })
      .catch(() => {})
  }, [])

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
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const displayPartners = partners.length > 0 ? partners : FALLBACK_PARTNERS.map(p => ({ ...p, logoUrl: null }))
  const displayClients = clients.length > 0 ? clients : FALLBACK_CLIENTS.map(c => ({ ...c, logoUrl: null }))

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <span className="section-badge mb-4 inline-flex">🤝 Đối tác</span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: '#0a1628' }}>
            Đối Tác & <span className="text-blue-600">Thương Hiệu</span>
          </h2>
          <div className="section-divider mx-auto mt-4" />
          <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Phân phối và lắp đặt thiết bị chính hãng từ các thương hiệu HVAC hàng đầu thế giới
          </p>
        </div>

        {/* Partner logo carousel */}
        <div className="relative mb-4 fade-in">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #f8faff, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #f8faff, transparent)' }} />

          <div className="overflow-hidden py-2">
            <div className="marquee-track">
              {[...displayPartners, ...displayPartners].map((p, i) => (
                <PartnerCard key={i} name={p.nameVi} desc={p.desc} logoUrl={p.logoUrl} />
              ))}
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div
          className="flex flex-wrap justify-center gap-8 py-6 mb-8 rounded-2xl fade-in"
          style={{ background: 'white', border: '1px solid rgba(0,102,255,0.08)' }}
        >
          {[
            { value: '12+', label: 'Thương hiệu đối tác' },
            { value: '500+', label: 'Dự án lắp đặt' },
            { value: '10+', label: 'Năm hợp tác' },
            { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
          ].map((item, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-2xl font-black text-blue-600">{item.value}</div>
              <div className="text-slate-500 text-xs mt-0.5 font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Clients section */}
        <div className="fade-in">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#94a3b8' }}>
            Khách hàng tiêu biểu — đối tác tin cậy
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {displayClients.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-default hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: 'white', border: '1px solid rgba(0,102,255,0.1)', color: '#475569' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = '#0066ff'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,102,255,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = '#475569'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,102,255,0.1)' }}
              >
                {client.logoUrl
                  ? (
                    <Image
                      src={client.logoUrl}
                      alt={client.nameVi}
                      width={60}
                      height={16}
                      className="h-4 w-auto object-contain"
                      unoptimized
                    />
                  )
                  : <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                }
                {client.nameVi}
                {client.industry && (
                  <span className="text-xs text-slate-400 font-normal">· {client.industry}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
