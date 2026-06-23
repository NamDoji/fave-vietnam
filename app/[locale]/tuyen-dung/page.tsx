import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, DollarSign, Clock, Calendar, ArrowRight, Briefcase } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Tuyển Dụng | ${t('siteName')}`,
    description: 'FAVE Việt Nam tuyển dụng kỹ sư HVAC, kỹ thuật viên lắp đặt, nhân viên kinh doanh. Môi trường chuyên nghiệp, thu nhập cạnh tranh.',
  }
}

const JOBS = [
  {
    slug: 'ky-su-thiet-ke-hvac',
    title: 'Kỹ Sư Thiết Kế HVAC',
    location: 'Hà Nội',
    salary: '15-25 triệu/tháng',
    experience: '2-5 năm',
    deadline: '2025-01-31',
    desc: 'Tính toán tải nhiệt, thiết kế hệ thống HVAC bằng phần mềm HAP, AutoCAD MEP cho các dự án thương mại và công nghiệp.',
    tags: ['Full-time', 'Kỹ thuật', 'CAD'],
  },
  {
    slug: 'ky-thuat-vien-lap-dat',
    title: 'Kỹ Thuật Viên Lắp Đặt HVAC',
    location: 'Hà Nội / Bắc Ninh',
    salary: '10-18 triệu/tháng',
    experience: '1-3 năm',
    deadline: '2025-01-31',
    desc: 'Lắp đặt, vận hành và commissioning hệ thống điều hòa trung tâm, VRV/VRF và hệ thống lạnh công nghiệp tại các dự án.',
    tags: ['Full-time', 'Kỹ thuật', 'Hiện trường'],
  },
  {
    slug: 'ky-su-bao-tri',
    title: 'Kỹ Sư Bảo Trì HVAC',
    location: 'Hà Nội',
    salary: '12-20 triệu/tháng',
    experience: '2-4 năm',
    deadline: '2025-02-28',
    desc: 'Thực hiện bảo trì định kỳ, khắc phục sự cố và sửa chữa hệ thống HVAC cho các khách hàng doanh nghiệp trên địa bàn Hà Nội.',
    tags: ['Full-time', 'Bảo trì', 'Cơ điện'],
  },
  {
    slug: 'nhan-vien-kinh-doanh',
    title: 'Nhân Viên Kinh Doanh Dự Án',
    location: 'Hà Nội',
    salary: '12-20 triệu + hoa hồng',
    experience: '1-3 năm',
    deadline: '2025-02-15',
    desc: 'Tìm kiếm và phát triển khách hàng mới, tư vấn giải pháp HVAC, theo dõi dự án từ báo giá đến ký hợp đồng.',
    tags: ['Full-time', 'Kinh doanh', 'B2B'],
  },
]

export default async function RecruitmentPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Tuyển dụng
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Gia Nhập Đội Ngũ FAVE</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Nơi tài năng được phát triển, công sức được ghi nhận và cơ hội không có giới hạn
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { icon: '💰', title: 'Thu nhập cạnh tranh', desc: 'Lương thưởng xứng đáng + phụ cấp + thưởng hiệu quả' },
              { icon: '📚', title: 'Đào tạo & phát triển', desc: 'Training chuyên sâu, cử học nước ngoài, chứng chỉ quốc tế' },
              { icon: '🏥', title: 'Phúc lợi đầy đủ', desc: 'BHXH, BHYT, bảo hiểm sức khỏe cao cấp, nghỉ phép 12+ ngày' },
              { icon: '🚀', title: 'Môi trường chuyên nghiệp', desc: 'Đội ngũ năng động, dự án quy mô lớn, công nghệ hiện đại' },
            ].map((item) => (
              <div key={item.title} className="text-center p-5 bg-[#f7f9fc] rounded-xl">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-[#1a3a5c] text-sm mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-8">Vị Trí Đang Tuyển ({JOBS.length})</h2>
          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.slug} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-50 text-[#00a0e9] px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">{job.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{job.desc}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-[#00a0e9]" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12} className="text-[#00a0e9]" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} className="text-[#00a0e9]" />{job.experience}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-[#00a0e9]" />Hạn: {job.deadline}</span>
                    </div>
                  </div>
                  <Link
                    href={`/tuyen-dung/${job.slug}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#00a0e9] text-white text-sm font-semibold rounded-lg hover:bg-[#0080c0] transition-all whitespace-nowrap"
                  >
                    Ứng tuyển <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
