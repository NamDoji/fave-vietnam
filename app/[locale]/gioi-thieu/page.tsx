import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CheckCircle, Award, Users, Building2, Target, Eye, Heart } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Giới Thiệu | ${t('siteName')}`,
    description: 'FAVE Việt Nam - 15 năm kinh nghiệm trong ngành HVAC. Đơn vị cung cấp giải pháp điều hòa không khí, thông gió và làm lạnh công nghiệp chuyên nghiệp.',
  }
}

const TIMELINE = [
  { year: '2009', content: 'Thành lập công ty FAVE Việt Nam tại Hà Nội, khởi đầu với lĩnh vực bảo trì và sửa chữa hệ thống điều hòa không khí.' },
  { year: '2012', content: 'Mở rộng sang lĩnh vực lắp đặt hệ thống HVAC cho các tòa nhà văn phòng và chung cư cao tầng.' },
  { year: '2015', content: 'Ký kết hợp tác với các nhà sản xuất thiết bị HVAC hàng đầu thế giới như Carrier, Daikin, Trane.' },
  { year: '2018', content: 'Thực hiện thành công các dự án HVAC quy mô lớn cho khu công nghiệp tại Bắc Ninh, Hưng Yên, Hải Phòng.' },
  { year: '2021', content: 'Đạt chứng chỉ ISO 9001:2015. Đội ngũ vượt mốc 100 kỹ sư và kỹ thuật viên.' },
  { year: '2024', content: 'Hoàn thành hơn 500 dự án, khẳng định vị thế là một trong những đơn vị HVAC uy tín hàng đầu miền Bắc.' },
]

const WHY_US = [
  { icon: Award, title: 'Kinh nghiệm dày dặn', desc: '15 năm hoạt động với hơn 500 dự án thành công trong các lĩnh vực công nghiệp và dân dụng' },
  { icon: Users, title: 'Đội ngũ chuyên nghiệp', desc: 'Hơn 100 kỹ sư, kỹ thuật viên được đào tạo bài bản và có chứng chỉ chuyên môn quốc tế' },
  { icon: Building2, title: 'Công nghệ hiện đại', desc: 'Sử dụng phần mềm thiết kế tiên tiến và thiết bị thi công hiện đại nhất' },
  { icon: Target, title: 'Tư vấn tận tâm', desc: 'Đội ngũ tư vấn chuyên nghiệp, hỗ trợ 24/7, luôn sẵn sàng giải đáp mọi thắc mắc' },
  { icon: Eye, title: 'Giải pháp tiết kiệm năng lượng', desc: 'Thiết kế hệ thống tối ưu hóa hiệu suất năng lượng, giảm chi phí vận hành' },
  { icon: Heart, title: 'Bảo hành & bảo trì', desc: 'Chính sách bảo hành rõ ràng và dịch vụ bảo trì định kỳ chuyên nghiệp' },
]

export default async function AboutPage() {
  return (
    <div className="pt-[88px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Về chúng tôi
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Giới Thiệu FAVE Việt Nam</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            15 năm đồng hành cùng sự phát triển bền vững của các doanh nghiệp Việt Nam
          </p>
        </div>
      </section>

      {/* About content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-[#1a3a5c] mb-5">
                Đơn Vị HVAC Hàng Đầu Miền Bắc
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FAVE Việt Nam (Công ty TNHH FAVE) được thành lập năm 2009 tại Hà Nội, chuyên cung cấp giải pháp toàn diện về hệ thống điều hòa không khí, thông gió và làm lạnh (HVAC) cho các công trình dân dụng và công nghiệp.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Với hơn 15 năm kinh nghiệm, chúng tôi đã hoàn thành hơn 500 dự án lớn nhỏ trên toàn quốc, từ các nhà máy sản xuất quy mô lớn, bệnh viện, khách sạn cao cấp đến các tòa nhà văn phòng và trung tâm thương mại.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Đội ngũ hơn 100 kỹ sư và kỹ thuật viên được đào tạo chuyên sâu, trang bị thiết bị hiện đại là nền tảng để FAVE cam kết mang đến những giải pháp HVAC tốt nhất, tiết kiệm năng lượng và thân thiện môi trường.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '15+', label: 'Năm kinh nghiệm' },
                  { value: '500+', label: 'Dự án' },
                  { value: '50+', label: 'Khách hàng' },
                  { value: '100+', label: 'Kỹ sư' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#f7f9fc] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#1a3a5c]">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-2xl p-10 text-white">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold mb-2">FAVE</div>
                <div className="text-[#00a0e9] text-xl font-light tracking-widest">VIETNAM</div>
              </div>
              <div className="border-t border-white/20 pt-6 space-y-3">
                {['ISO 9001:2015', 'Chứng chỉ thi công PCCC', 'Đại lý ủy quyền Daikin', 'Đối tác chính thức Carrier'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-[#00a0e9] shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Eye, label: 'Tầm nhìn', text: 'Trở thành đơn vị cung cấp giải pháp HVAC hàng đầu Đông Nam Á, mang đến môi trường sống và làm việc tốt nhất.' },
              { icon: Target, label: 'Sứ mệnh', text: 'Cung cấp các giải pháp HVAC toàn diện, chất lượng cao với chi phí tối ưu, đóng góp vào sự phát triển bền vững.' },
              { icon: Heart, label: 'Giá trị cốt lõi', text: 'Chính trực - Chất lượng - Đổi mới - Hợp tác. Cam kết thực hiện đúng những gì đã hứa với khách hàng.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="bg-[#f7f9fc] rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1a3a5c] mb-3">{item.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a3a5c] text-center mb-12">
            Lịch Sử Hình Thành & Phát Triển
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-gradient-to-b from-[#00a0e9] to-[#1a3a5c]" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="text-[#00a0e9] font-bold text-lg mb-1">{item.year}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#00a0e9] border-4 border-white rounded-full shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a3a5c] text-center mb-12">
            Tại Sao Chọn FAVE?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 p-5 bg-[#f7f9fc] rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a5c] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
