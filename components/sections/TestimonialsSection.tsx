'use client'

import { useLocale } from 'next-intl'

const TESTIMONIALS_VI = [
  {
    quote: 'Hệ thống Chiller 500TR của chúng tôi đã vận hành liên tục 3 năm không một lần sự cố nghiêm trọng nhờ đội bảo trì của FAVE. Phản hồi khẩn cấp lúc 2 giờ sáng — ấn tượng.',
    name: 'Nguyễn Văn Minh',
    title: 'Facility Manager',
    company: 'Tòa nhà Sài Gòn Times',
    initials: 'NM',
    color: '#1565C0',
  },
  {
    quote: 'FAVE thiết kế và thi công hệ thống VRV cho 8 tầng văn phòng trong 45 ngày, đúng tiến độ và budget. Kỹ sư rất chuyên nghiệp, giải thích rõ ràng.',
    name: 'Trần Thị Lan',
    title: 'Giám đốc Vận hành',
    company: 'Công ty CP Phát Triển XYZ',
    initials: 'TL',
    color: '#0a2342',
  },
  {
    quote: 'Hệ thống phòng sạch ISO 7 cho nhà máy dược phẩm đạt chuẩn GMP-WHO trong lần kiểm tra đầu tiên. FAVE là lựa chọn tin cậy cho dự án quan trọng.',
    name: 'Lê Quốc Hùng',
    title: 'Giám đốc Kỹ thuật',
    company: 'Công ty Dược ABC',
    initials: 'LH',
    color: '#E65100',
  },
  {
    quote: 'Tiết kiệm 35% điện năng sau khi FAVE cải tạo hệ thống HVAC toàn tòa nhà. Đội kỹ thuật làm việc ban đêm để không ảnh hưởng hoạt động kinh doanh.',
    name: 'Phạm Thu Hà',
    title: 'Quản lý Tòa nhà',
    company: 'TTTM Sunrise',
    initials: 'PH',
    color: '#1565C0',
  },
  {
    quote: 'Hợp đồng bảo trì 3 năm với FAVE — tốt nhất từ trước đến nay. Lịch bảo dưỡng đúng hẹn, báo cáo chi tiết sau mỗi lần bảo trì.',
    name: 'Võ Thanh Bình',
    title: 'COO',
    company: 'Tập đoàn Sản xuất DEF',
    initials: 'VB',
    color: '#0a2342',
  },
]

const TESTIMONIALS_EN = [
  {
    quote: "Our 500TR Chiller system has run continuously for 3 years without a serious incident thanks to FAVE's maintenance team. Emergency response at 2am — truly impressive.",
    name: 'Nguyen Van Minh',
    title: 'Facility Manager',
    company: 'Saigon Times Building',
    initials: 'NM',
    color: '#1565C0',
  },
  {
    quote: 'FAVE designed and installed the VRV system for 8 office floors in 45 days, on schedule and on budget. Engineers were professional and communicated clearly throughout.',
    name: 'Tran Thi Lan',
    title: 'Director of Operations',
    company: 'XYZ Development JSC',
    initials: 'TL',
    color: '#0a2342',
  },
  {
    quote: 'Our ISO 7 cleanroom for the pharmaceutical plant passed GMP-WHO standards on the very first inspection. FAVE is the trusted choice for mission-critical projects.',
    name: 'Le Quoc Hung',
    title: 'Technical Director',
    company: 'ABC Pharma Company',
    initials: 'LH',
    color: '#E65100',
  },
  {
    quote: 'We saved 35% on electricity after FAVE renovated the entire building HVAC system. The technical team worked overnight to avoid disrupting our business operations.',
    name: 'Pham Thu Ha',
    title: 'Building Manager',
    company: 'Sunrise Shopping Center',
    initials: 'PH',
    color: '#1565C0',
  },
  {
    quote: "Our 3-year maintenance contract with FAVE — the best we've ever had. Scheduled servicing is always on time, with detailed reports after every visit.",
    name: 'Vo Thanh Binh',
    title: 'COO',
    company: 'DEF Manufacturing Group',
    initials: 'VB',
    color: '#0a2342',
  },
]

function StarRating() {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const locale = useLocale()
  const testimonials = locale === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_VI

  const heading = locale === 'en'
    ? { badge: 'What Clients Say', title: 'Trusted by Hundreds of Businesses' }
    : { badge: 'Khách Hàng Nói Gì', title: 'Được Tin Tưởng Bởi Hàng Trăm Doanh Nghiệp' }

  const stats = locale === 'en'
    ? ['500+ Projects', '10+ Years', 'ISO 9001:2015', 'Daikin & Carrier Authorized']
    : ['500+ dự án', '10+ năm', 'ISO 9001:2015', 'Đại lý Daikin & Carrier']

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge-blue mb-4 inline-block">{heading.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            {heading.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card card-hover bg-white p-6 flex flex-col gap-4"
            >
              <StarRating />
              <p className="text-gray-700 leading-relaxed text-base italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.title} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
