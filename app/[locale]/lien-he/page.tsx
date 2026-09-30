import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactPage from './_contact-page'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Liên Hệ | Tư vấn HVAC miễn phí — ${t('siteName')}`,
    description:
      'Liên hệ FAVE Vietnam để được tư vấn giải pháp HVAC miễn phí. Phản hồi trong 2 giờ làm việc. Hotline 24/7: 0981 907 109. Địa chỉ: 348 Đường Bưởi, Ba Đình, Hà Nội.',
    keywords: 'liên hệ HVAC, tư vấn điều hòa miễn phí, hotline HVAC Hà Nội, báo giá HVAC, FAVE Vietnam liên hệ, 0981907109',
  }
}

export default function Page() {
  return <ContactPage />
}
