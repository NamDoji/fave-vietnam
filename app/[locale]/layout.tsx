import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      default: `${t('siteName')} - Giải Pháp HVAC Toàn Diện`,
      template: `%s | ${t('siteName')}`,
    },
    description: t('siteDescription'),
    keywords: t('keywords'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://fave.com.vn'),
    alternates: {
      canonical: '/',
      languages: {
        vi: '/vi',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      siteName: t('siteName'),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://fave-hvac.vercel.app',
  name: 'FAVE Vietnam',
  alternateName: 'Công ty TNHH FAVE Việt Nam',
  description: 'Đơn vị hàng đầu cung cấp giải pháp HVAC tại Việt Nam — bảo trì, sửa chữa, lắp đặt hệ thống điều hòa trung tâm, Chiller, VRV/VRF',
  url: 'https://fave-hvac.vercel.app',
  telephone: '+84-981-907-109',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '348 Đường Bưởi, Nghĩa Đô',
    addressLocality: 'Ba Đình',
    addressRegion: 'Hà Nội',
    postalCode: '100000',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.0496,
    longitude: 105.8176,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:30', closes: '17:30' },
  ],
  sameAs: [
    'https://www.facebook.com/favevietnam',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HVAC Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bảo trì HVAC định kỳ' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sửa chữa hệ thống HVAC' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lắp đặt điều hòa trung tâm' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hệ thống VRV/VRF' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tư vấn thiết kế HVAC' } },
    ],
  },
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
