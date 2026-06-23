import { useTranslations } from 'next-intl'

const PARTNERS = [
  { name: 'Carrier', logo: '/images/partner-carrier.png' },
  { name: 'Daikin', logo: '/images/partner-daikin.png' },
  { name: 'Trane', logo: '/images/partner-trane.png' },
  { name: 'York', logo: '/images/partner-york.png' },
  { name: 'LG Electronics', logo: '/images/partner-lg.png' },
  { name: 'Mitsubishi Electric', logo: '/images/partner-mitsubishi.png' },
  { name: 'Siemens', logo: '/images/partner-siemens.png' },
  { name: 'Honeywell', logo: '/images/partner-honeywell.png' },
]

export default function PartnersSection() {
  const t = useTranslations('partners')

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            {t('badge')}
          </div>
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-2">{t('title')}</h2>
          <p className="text-gray-500 text-sm">{t('description')}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center h-14 px-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              title={partner.name}
            >
              <div className="text-[#1a3a5c] font-bold text-xl tracking-wide">{partner.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
