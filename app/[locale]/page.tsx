import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PartnersSection from '@/components/sections/PartnersSection'
import NewsSection from '@/components/sections/NewsSection'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `${t('siteName')} - Giải Pháp HVAC Toàn Diện`,
    description: t('siteDescription'),
  }
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      <PartnersSection />
      <NewsSection />
      <QuoteFormSection />
    </>
  )
}
