'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'

interface Client {
  id: string
  name: string
  logo?: string
}

const STATIC_CLIENTS: Client[] = [
  { id: '1', name: 'Vingroup' },
  { id: '2', name: 'Big C' },
  { id: '3', name: 'Lotte Mart' },
  { id: '4', name: 'BV Tâm Anh' },
  { id: '5', name: 'Samsung Vina' },
  { id: '6', name: 'KCN Amata' },
  { id: '7', name: 'Hyatt Regency' },
  { id: '8', name: 'Savills VN' },
  { id: '9', name: 'Panasonic VN' },
  { id: '10', name: 'Aeon Mall' },
  { id: '11', name: 'BV Nhi Đồng' },
  { id: '12', name: 'Phú Mỹ Hưng' },
]

function LogoCard({ client }: { client: Client }) {
  const initials = client.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-center p-5 min-h-[90px] transition-all duration-200 hover:shadow-md hover:border-blue-200 cursor-default">
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt={client.name} className="max-h-10 max-w-full object-contain" />
      ) : (
        <div className="text-center">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-700 font-bold text-sm">{initials}</span>
          </div>
          <span className="text-gray-600 text-xs font-medium leading-tight block text-center">
            {client.name}
          </span>
        </div>
      )}
    </div>
  )
}

export default function ClientsSection() {
  const locale = useLocale()
  const [clients, setClients] = useState<Client[]>(STATIC_CLIENTS)

  useEffect(() => {
    fetch('/api/clients')
      .then((r) => r.json())
      .then((data: Client[]) => {
        if (Array.isArray(data) && data.length > 0) setClients(data)
      })
      .catch(() => {})
  }, [])

  const heading =
    locale === 'en'
      ? {
          badge: 'Trusted Partners',
          title: 'Hundreds of Businesses Have Chosen FAVE',
          subtitle: 'From office buildings and shopping malls to factories and hospitals',
          footer: 'And hundreds more businesses nationwide',
          cta: 'View Our Projects',
        }
      : {
          badge: 'Đối Tác Tin Tưởng',
          title: 'Hàng Trăm Doanh Nghiệp Đã Chọn FAVE',
          subtitle: 'Từ tòa nhà văn phòng, trung tâm thương mại đến nhà máy sản xuất và bệnh viện',
          footer: 'Và hàng trăm doanh nghiệp khác trên toàn quốc',
          cta: 'Xem Dự Án Của Chúng Tôi',
        }

  const projectsHref = locale === 'en' ? '/en/projects' : '/du-an'

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-blue mb-4 inline-block">{heading.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            {heading.title}
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">{heading.subtitle}</p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10">
          {clients.map((client) => (
            <LogoCard key={client.id} client={client} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-5 italic">{heading.footer}</p>
          <Link
            href={projectsHref}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors"
          >
            {heading.cta}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
