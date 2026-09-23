'use client'

import { useEffect, useRef, useState } from 'react'

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
    <div className="flex-shrink-0 mx-4 px-7 py-4 rounded-xl flex flex-col items-center justify-center group cursor-default hover:-translate-y-1 transition-all duration-300"
      style={{ background: 'white', border: '1px solid rgba(0, 102, 255, 0.08)', minWidth: '140px', height: '72px' }}>
      {logoUrl
        ? <img src={logoUrl} alt={name} className="h-8 object-contain max-w-[120px] group-hover:opacity-80 transition-opacity" />
        : <>
          <div className="font-black text-lg text-slate-800 group-hover:text-blue-600 transition-colors whitespace-nowrap">{name}</div>
          <div className="text-xs text-slate-400 mt-0.5 font-medium">{desc}</div>
        </>
      }
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const displayPartners = partners.length > 0 ? partners : FALLBACK_PARTNERS.map(p => ({ ...p, logoUrl: null }))
  const displayClients = clients.length > 0 ? clients : FALLBACK_CLIENTS.map(c => ({ ...c, logoUrl: null }))

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
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

        <div className="relative mb-6 fade-in">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...displayPartners, ...displayPartners].map((p, i) => (
                <PartnerCard key={i} name={p.nameVi} desc={p.desc} logoUrl={p.logoUrl} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 my-10 fade-in" />

        <div className="fade-in">
          <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mb-6">
            Khách hàng tiêu biểu
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {displayClients.map((client, i) => (
              <div key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-default hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: '#f8faff', border: '1px solid rgba(0, 102, 255, 0.08)' }}>
                {client.logoUrl
                  ? <img src={client.logoUrl} alt={client.nameVi} className="h-4 object-contain" />
                  : <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                }
                {client.nameVi}
                {client.industry && <span className="text-xs text-slate-400 font-normal">· {client.industry}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
