import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { CheckCircle, ArrowRight, Award, Users, Building2, Clock } from 'lucide-react'

const STATS = [
  { icon: Clock, value: '15+', key: 'years' },
  { icon: Building2, value: '500+', key: 'projects' },
  { icon: Users, value: '50+', key: 'clients' },
  { icon: Award, value: '100+', key: 'engineers' },
]

const WHY_US = [
  'Đội ngũ kỹ sư được đào tạo quốc tế',
  'Công nghệ và thiết bị hiện đại',
  'Cam kết tiến độ và chất lượng',
  'Bảo hành dài hạn, hỗ trợ 24/7',
  'Tư vấn thiết kế miễn phí',
  'Chứng chỉ ISO 9001:2015',
]

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#00a0e9] rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              {t('badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mb-5 leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-[#1a3a5c] mb-4">{t('whyUs')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WHY_US.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#00a0e9] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={locale === 'en' ? '/en/gioi-thieu' : '/gioi-thieu'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3a5c] text-white font-semibold rounded-lg hover:bg-[#2a5a8c] transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('learnMore')}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.key}
                  className="bg-gradient-to-br from-[#f7f9fc] to-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-[#1a3a5c] mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{t(`stats.${stat.key}`)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
