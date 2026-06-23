import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Dự Án Tiêu Biểu | ${t('siteName')}`,
    description: 'Hơn 500 dự án HVAC tiêu biểu tại Việt Nam: Unilever, Samsung, bệnh viện, nhà máy điện, khách sạn 5 sao.',
  }
}

const PROJECTS = [
  { slug: 'unilever-bac-ninh', title: 'Nhà Máy Unilever Bắc Ninh', sector: 'Công nghiệp', location: 'Bắc Ninh', scale: '500TR', client: 'Unilever Vietnam', year: '2023', color: 'from-blue-700 to-blue-900' },
  { slug: 'vien-huyet-hoc', title: 'Viện Huyết Học - Truyền Máu TW', sector: 'Y tế', location: 'Hà Nội', scale: '200TR', client: 'Bộ Y tế', year: '2022', color: 'from-red-700 to-red-900' },
  { slug: 'nhiet-dien-mong-duong', title: 'Nhà Máy Nhiệt Điện Mông Dương', sector: 'Năng lượng', location: 'Quảng Ninh', scale: '1000TR', client: 'EVN', year: '2021', color: 'from-gray-700 to-gray-900' },
  { slug: 'bo-cong-an', title: 'Trụ Sở Bộ Công An', sector: 'Hành chính', location: 'Hà Nội', scale: '300TR', client: 'Bộ Công An', year: '2022', color: 'from-slate-700 to-slate-900' },
  { slug: 'jw-marriott-hanoi', title: 'Khách Sạn JW Marriott Hà Nội', sector: 'Khách sạn', location: 'Hà Nội', scale: '800TR', client: 'JW Marriott', year: '2020', color: 'from-amber-700 to-amber-900' },
  { slug: 'samsung-thai-nguyen', title: 'Samsung Electronics Thái Nguyên', sector: 'Công nghiệp', location: 'Thái Nguyên', scale: '2000TR', client: 'Samsung', year: '2019', color: 'from-blue-800 to-indigo-900' },
  { slug: 'vinmec-times-city', title: 'Bệnh Viện Vinmec Times City', sector: 'Y tế', location: 'Hà Nội', scale: '400TR', client: 'Vinmec', year: '2021', color: 'from-green-700 to-green-900' },
  { slug: 'khu-cong-nghiep-vsip', title: 'Khu Công Nghiệp VSIP Bắc Ninh', sector: 'Công nghiệp', location: 'Bắc Ninh', scale: '800TR', client: 'VSIP Group', year: '2023', color: 'from-teal-700 to-teal-900' },
]

const SECTORS = ['Tất cả', 'Công nghiệp', 'Y tế', 'Năng lượng', 'Hành chính', 'Khách sạn']

export default async function ProjectsPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Dự án
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Dự Án Tiêu Biểu</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Hơn 500 dự án hoàn thành thành công, từ nhà máy công nghiệp đến tòa nhà thương mại trên toàn quốc
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-10">
            {SECTORS.map((s) => (
              <button key={s} className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c] transition-all">
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PROJECTS.map((project) => (
              <Link key={project.slug} href={`/du-an/${project.slug}`} className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-44 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                  <Building2 size={48} className="text-white/20" />
                  <div className="absolute bottom-2 left-3 bg-white/90 text-[#1a3a5c] text-xs px-2 py-0.5 rounded-full font-medium">
                    {project.sector}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#00a0e9] text-white text-xs px-2 py-0.5 rounded-full">
                    {project.year}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-[#1a3a5c] mb-2 text-sm group-hover:text-[#00a0e9] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-[#00a0e9]" />{project.location}</span>
                    <span className="font-medium text-[#1a3a5c]">{project.scale}</span>
                  </div>
                  <div className="text-xs text-gray-400">{project.client}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f7f9fc]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-3">Bạn có dự án cần triển khai?</h2>
          <p className="text-gray-500 mb-6">Liên hệ ngay để được tư vấn giải pháp HVAC phù hợp và nhận báo giá chi tiết</p>
          <Link href="/lien-he" className="inline-flex items-center gap-2 px-8 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-lg">
            Liên hệ tư vấn <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
