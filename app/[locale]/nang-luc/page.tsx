import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Download, Award, Users, Wrench, Shield, CheckCircle } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Năng Lực Công Ty | ${t('siteName')}`,
    description: 'Năng lực FAVE Việt Nam: ISO 9001:2015, 100+ kỹ sư, thiết bị thi công hiện đại, kinh nghiệm 15 năm HVAC.',
  }
}

const CERTIFICATES = [
  { name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng', issuedBy: 'Bureau Veritas', year: '2021' },
  { name: 'Chứng chỉ PCCC', desc: 'Phòng cháy chữa cháy số 247/CN-PCCC', issuedBy: 'Cảnh sát PCCC TP.Hà Nội', year: '2023' },
  { name: 'Giấy phép XD', desc: 'Giấy phép xây dựng & thi công cơ điện', issuedBy: 'Bộ Xây Dựng', year: '2020' },
  { name: 'Đại lý Daikin', desc: 'Đại lý ủy quyền chính thức Daikin Việt Nam', issuedBy: 'Daikin Vietnam', year: '2019' },
  { name: 'Đại lý Carrier', desc: 'Đối tác phân phối Carrier Southeast Asia', issuedBy: 'Carrier Corporation', year: '2018' },
  { name: 'Chứng chỉ EPC', desc: 'Năng lực thiết kế, mua sắm, thi công', issuedBy: 'Hiệp hội Nhà thầu VN', year: '2022' },
]

const EQUIPMENT = [
  'Thiết bị đo kiểm HVAC: máy đo lưu lượng gió, máy đo nhiệt độ/độ ẩm, thiết bị đo áp suất',
  'Máy hàn đồng và thép không gỉ chuyên dụng cho đường ống lạnh',
  'Bộ thiết bị nạp ga lạnh chuyên nghiệp (R22, R32, R410A, R134a)',
  'Máy khoan, cắt, uốn ống tự động CNC',
  'Cần trục và xe nâng hàng phục vụ lắp đặt thiết bị nặng',
  'Thiết bị kiểm tra độ kín ống (pressure testing): khí N2, nước',
  'Phần mềm tính toán tải nhiệt HAP 5.0, Carrier HAP, Trace 700',
  'Phần mềm vẽ AutoCAD MEP, Revit MEP cho bản vẽ kỹ thuật',
]

const TEAM = [
  { role: 'Kỹ sư thiết kế HVAC', count: 15, cert: 'Bằng kỹ sư + chứng chỉ ASHRAE' },
  { role: 'Kỹ sư giám sát thi công', count: 20, cert: 'Bằng kỹ sư + chứng chỉ PCCC' },
  { role: 'Kỹ thuật viên lắp đặt', count: 40, cert: 'Trung cấp/CĐ chuyên ngành' },
  { role: 'Kỹ thuật viên bảo trì', count: 25, cert: 'Chứng chỉ vận hành thiết bị lạnh' },
  { role: 'Kỹ sư điện - tự động hóa', count: 10, cert: 'Bằng kỹ sư điện' },
  { role: 'Đội ngũ quản lý dự án', count: 8, cert: 'PMP / PMI certified' },
]

export default async function CapabilityPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                Năng lực
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Năng Lực Của Chúng Tôi</h1>
              <p className="text-gray-300 max-w-2xl text-lg">
                Với đội ngũ chuyên gia và trang thiết bị hiện đại, FAVE sẵn sàng đáp ứng mọi yêu cầu kỹ thuật phức tạp nhất
              </p>
            </div>
            <a
              href="/files/ho-so-nang-luc-fave.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all whitespace-nowrap hover:shadow-lg"
            >
              <Download size={18} />
              Tải hồ sơ năng lực
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Award, value: '15+', label: 'Năm kinh nghiệm' },
              { icon: Users, value: '100+', label: 'Kỹ sư & KTV' },
              { icon: Wrench, value: '500+', label: 'Dự án hoàn thành' },
              { icon: Shield, value: '6', label: 'Chứng chỉ & Giấy phép' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1a3a5c]">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a3a5c] text-center mb-12">Chứng Chỉ & Giấy Phép</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert) => (
              <div key={cert.name} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a3a5c]">{cert.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{cert.desc}</div>
                    <div className="text-xs text-[#00a0e9] mt-1">{cert.issuedBy} · {cert.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a3a5c] text-center mb-12">Đội Ngũ Kỹ Thuật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div key={member.role} className="flex gap-4 p-5 bg-[#f7f9fc] rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {member.count}
                </div>
                <div>
                  <div className="font-semibold text-[#1a3a5c] text-sm">{member.role}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{member.cert}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a3a5c] text-center mb-12">Thiết Bị Thi Công</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EQUIPMENT.map((item) => (
              <div key={item} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <CheckCircle size={18} className="text-[#00a0e9] shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Tải Hồ Sơ Năng Lực FAVE</h2>
          <p className="text-gray-300 mb-6">Hồ sơ năng lực chi tiết với đầy đủ thông tin về dự án, chứng chỉ và đội ngũ kỹ thuật</p>
          <a
            href="/files/ho-so-nang-luc-fave.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00a0e9] text-white font-semibold rounded-lg hover:bg-[#0080c0] transition-all hover:shadow-lg"
          >
            <Download size={18} />
            Tải hồ sơ năng lực (PDF)
          </a>
        </div>
      </section>
    </div>
  )
}
