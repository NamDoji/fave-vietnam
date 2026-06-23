import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `Sản Phẩm HVAC | ${t('siteName')}`,
    description: 'Phân phối thiết bị HVAC chính hãng: máy nén, AHU, tháp giải nhiệt, VRV, FCU từ Carrier, Daikin, Trane, York, Mitsubishi.',
  }
}

const CATEGORIES = ['Tất cả', 'Máy Nén', 'Xử Lý Không Khí', 'Thiết Bị Phụ Trợ', 'VRV/VRF', 'FCU', 'Bo Mạch & Linh Kiện']

const PRODUCTS = [
  { slug: 'may-nen-truc-vit-carrier', name: 'Máy Nén Trục Vít Carrier 30XA', category: 'Máy Nén', desc: 'Công suất 100-400TR, COP 6.1, nước mát, air-cooled', isFeatured: true },
  { slug: 'may-nen-ly-tam-york', name: 'Máy Nén Ly Tâm York YVAA', category: 'Máy Nén', desc: 'Công suất 150-550TR, công nghệ từ tính không dầu', isFeatured: true },
  { slug: 'ahu-trane', name: 'AHU Trane Series', category: 'Xử Lý Không Khí', desc: '5.000-100.000 m³/h, tích hợp lọc HEPA, làm ẩm' },
  { slug: 'fcu-daikin', name: 'FCU Daikin FWD Series', category: 'FCU', desc: 'Âm trần 2-12kW, tiêu chuẩn châu Âu' },
  { slug: 'thap-giai-nhiet-spx', name: 'Tháp Giải Nhiệt SPX Marley', category: 'Thiết Bị Phụ Trợ', desc: '50-3000TR, ngược chiều/chéo dòng' },
  { slug: 'vrv-iv-daikin', name: 'VRV IV Daikin', category: 'VRV/VRF', desc: '14-76HP, inverter, COP 4.3', isFeatured: true },
  { slug: 'bo-mach-pcb-dieu-hoa', name: 'Bo Mạch PCB Điều Hòa Đa Năng', category: 'Bo Mạch & Linh Kiện', desc: 'Thay thế nhiều model: Daikin, Mitsubishi, LG' },
  { slug: 'motor-quat-ec', name: 'Motor Quạt EC Inverter', category: 'Bo Mạch & Linh Kiện', desc: '50-200W, tiết kiệm 50% năng lượng' },
  { slug: 'bom-grunfos', name: 'Bơm Tuần Hoàn Grundfos', category: 'Thiết Bị Phụ Trợ', desc: 'Bơm chiller water, hiệu suất cao, inverter' },
  { slug: 'van-dieu-khien-belimo', name: 'Van Điều Khiển Belimo', category: 'Thiết Bị Phụ Trợ', desc: 'Van 2/3 ngả, tuyến tính/đặc tính bằng nhau' },
  { slug: 'cam-bien-nhiet-do', name: 'Cảm Biến Nhiệt Độ & Độ Ẩm', category: 'Bo Mạch & Linh Kiện', desc: 'Honeywell, Siemens, đo nhiệt/độ ẩm chính xác' },
  { slug: 'he-thong-duct-insulation', name: 'Hệ Thống Đường Ống & Cách Nhiệt', category: 'Thiết Bị Phụ Trợ', desc: 'Duct sắt mạ kẽm, cách nhiệt Armaflex, Kaiflex' },
]

export default async function ProductsPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0a2840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Sản phẩm
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Thiết Bị HVAC Chất Lượng Cao</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Phân phối thiết bị HVAC chính hãng từ các thương hiệu hàng đầu thế giới
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c] transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/san-pham/${product.slug}`}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f7] flex items-center justify-center relative">
                  <Package size={48} className="text-[#1a3a5c]/20" />
                  {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-[#00a0e9] text-white text-xs px-2 py-0.5 rounded-full">
                      Nổi bật
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#00a0e9] font-medium mb-1">{product.category}</div>
                  <h3 className="font-bold text-[#1a3a5c] text-sm mb-2 group-hover:text-[#00a0e9] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mb-3">{product.desc}</p>
                  <span className="flex items-center gap-1 text-[#00a0e9] text-xs font-medium">
                    Xem chi tiết <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
