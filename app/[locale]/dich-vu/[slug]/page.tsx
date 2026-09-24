import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CheckCircle2, Phone, ArrowRight, ChevronRight, Download,
  Clock, AlertTriangle, Wrench, Settings, BarChart3,
  Shield, TrendingUp, Zap, Building2, Package,
  ClipboardCheck, CalendarDays, Gauge, Layers,
  Target, Thermometer, Timer, RefreshCw, Award,
  ShieldCheck, Star, Activity, Droplets, Cpu, FlaskConical,
} from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

type ServiceData = {
  titleVi: string
  emoji: string
  color: string
  descVi: string
  problems: string[]
  solutions: string[]
  process: { step: number; title: string; desc: string }[]
  benefits: string[]
  faqs: { q: string; a: string }[]
  relatedServices: { slug: string; label: string; emoji: string }[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const content = SERVICE_CONTENT[slug]
  if (!content) {
    const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
    if (!service) return { title: `Dịch vụ | ${t('siteName')}` }
    return {
      title: `${locale === 'vi' ? service.titleVi : service.titleEn} | ${t('siteName')}`,
      description: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
    }
  }
  return {
    title: `${content.titleVi} | ${t('siteName')}`,
    description: content.descVi.slice(0, 160),
  }
}

const SERVICE_CONTENT: Record<string, ServiceData> = {
  'dieu-hoa-trung-tam': {
    titleVi: 'Điều Hòa Trung Tâm (Chiller System)',
    emoji: '❄️',
    color: '#0066ff',
    descVi:
      'Giải pháp toàn diện về hệ thống điều hòa không khí trung tâm sử dụng Chiller water-cooled hoặc air-cooled, AHU, FCU cho các công trình quy mô lớn từ 50TR đến hàng nghìn TR.',
    problems: [
      'Môi trường làm việc quá nóng, ảnh hưởng năng suất nhân viên',
      'Chi phí điện năng cao do hệ thống lỗi thời, hiệu suất thấp',
      'Tiếng ồn lớn từ thiết bị cũ gây khó chịu',
      'Phân bổ nhiệt độ không đồng đều giữa các tầng',
      'Hệ thống thường xuyên hỏng hóc, chi phí bảo trì cao',
    ],
    solutions: [
      'Chiller trục vít / ly tâm tiết kiệm năng lượng COP > 6.0',
      'Biến tần VFD cho bơm và quạt AHU/FCU, tiết kiệm 30-40% điện',
      'Hệ thống điều khiển tự động BACnet/Modbus tích hợp BMS',
      'Thiết kế phân vùng nhiệt độ linh hoạt cho từng khu vực',
      'Tháp giải nhiệt hiệu suất cao, tiêu thụ nước tối ưu',
    ],
    process: [
      { step: 1, title: 'Khảo sát & phân tích', desc: 'Khảo sát hiện trường, đo đạc không gian, phân tích tải nhiệt và yêu cầu kỹ thuật chi tiết.' },
      { step: 2, title: 'Thiết kế giải pháp', desc: 'Tính toán tải nhiệt bằng HAP/Trace 700, lựa chọn thiết bị tối ưu, thiết kế bản vẽ AutoCAD MEP.' },
      { step: 3, title: 'Báo giá & ký hợp đồng', desc: 'Lập dự toán chi tiết, minh bạch và ký kết hợp đồng với cam kết tiến độ rõ ràng.' },
      { step: 4, title: 'Cung cấp thiết bị', desc: 'Nhập khẩu và kiểm tra thiết bị chính hãng tại kho trước khi lắp đặt.' },
      { step: 5, title: 'Lắp đặt & vận hành', desc: 'Thi công theo đúng thiết kế, vận hành thử nghiệm và hiệu chỉnh hệ thống.' },
      { step: 6, title: 'Bàn giao & bảo trì', desc: 'Bàn giao hồ sơ hoàn công, hướng dẫn vận hành và ký hợp đồng bảo trì định kỳ.' },
    ],
    benefits: [
      'Tiết kiệm 30-50% chi phí điện so với hệ thống cũ',
      'Tuổi thọ thiết bị 15-20 năm khi bảo trì đúng cách',
      'Môi trường tiện nghi, tăng năng suất 15-20%',
      'Điều khiển thông minh, giám sát từ xa 24/7',
      'Bảo hành thiết bị 1-2 năm, công trình 12 tháng',
      'Đáp ứng tiêu chuẩn ASHRAE 90.1 về tiết kiệm năng lượng',
    ],
    faqs: [
      { q: 'Thời gian hoàn thiện một dự án điều hòa trung tâm?', a: 'Tùy quy mô, thông thường từ 2-6 tháng kể từ ký hợp đồng.' },
      { q: 'FAVE có cam kết tiến độ không?', a: 'Có. Cam kết tiến độ trong hợp đồng với chế tài phạt nếu trễ.' },
      { q: 'Thiết bị có bảo hành không?', a: 'Bảo hành 12-24 tháng tùy hãng, công trình bảo hành 12 tháng sau bàn giao.' },
      { q: 'Có hỗ trợ bảo trì sau lắp đặt không?', a: 'Có dịch vụ bảo trì định kỳ và khẩn cấp 24/7 toàn quốc.' },
    ],
    relatedServices: [
      { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
      { slug: 'tu-van-thiet-ke', label: 'Tư vấn thiết kế', emoji: '📐' },
      { slug: 'he-thong-bms', label: 'Hệ thống BMS', emoji: '🖥️' },
    ],
  },
  'thong-gio-cong-nghiep': {
    titleVi: 'Thông Gió Công Nghiệp',
    emoji: '🌀',
    color: '#0099cc',
    descVi:
      'Hệ thống thông gió và xử lý không khí cho nhà máy sản xuất, xưởng cơ khí, hóa chất, dệt may. Đảm bảo môi trường làm việc an toàn và đạt tiêu chuẩn QCVN.',
    problems: [
      'Nhiệt độ xưởng sản xuất quá cao, công nhân làm việc kém hiệu quả',
      'Khói, bụi, hơi hóa chất gây nguy hiểm sức khỏe',
      'Hệ thống thông gió cũ không đáp ứng lưu lượng gió cần thiết',
      'Tiêu chuẩn môi trường làm việc không đạt QCVN',
      'Chi phí điện cao cho hệ thống thông gió hoạt động liên tục',
    ],
    solutions: [
      'Thiết kế hệ thống cấp/hút theo ACGIH và QCVN',
      'Quạt hướng trục, ly tâm áp suất cao hiệu suất vượt trội',
      'Hệ thống lọc bụi túi vải, lọc tĩnh điện cho môi trường độc hại',
      'Biến tần VFD điều tốc quạt theo nhu cầu thực tế',
      'Hệ thống đo kiểm chất lượng không khí online',
    ],
    process: [
      { step: 1, title: 'Khảo sát', desc: 'Đo đạc lưu lượng gió, nhiệt độ, bụi và chất gây ô nhiễm tại xưởng.' },
      { step: 2, title: 'Thiết kế', desc: 'Tính toán cân bằng áp suất, chọn thiết bị và thiết kế đường ống.' },
      { step: 3, title: 'Thi công', desc: 'Lắp đặt hệ thống theo đúng thiết kế kỹ thuật đã phê duyệt.' },
      { step: 4, title: 'Nghiệm thu', desc: 'Đo kiểm lưu lượng, áp suất và kiểm tra chất lượng không khí.' },
    ],
    benefits: [
      'Môi trường làm việc đạt tiêu chuẩn QCVN 24:2016',
      'Giảm nguy cơ tai nạn lao động và bệnh nghề nghiệp',
      'Tiết kiệm điện 25-35% với hệ thống biến tần',
      'Tuổi thọ thiết bị 10-15 năm',
    ],
    faqs: [
      { q: 'Tiêu chuẩn thông gió công nghiệp nào FAVE áp dụng?', a: 'ACGIH, QCVN 24:2016/BYT, ASHRAE 62.1 và các tiêu chuẩn quốc tế.' },
      { q: 'Thời gian thi công hệ thống thông gió nhà máy?', a: 'Từ 4-8 tuần tùy quy mô nhà máy.' },
    ],
    relatedServices: [
      { slug: 'xu-ly-khong-khi-sach', label: 'Xử lý không khí sạch', emoji: '🧪' },
      { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
    ],
  },

  'bao-tri-dieu-hoa': {
    titleVi: 'Bảo Trì Hệ Thống Điều Hòa Không Khí',
    emoji: '🔧',
    color: '#0066ff',
    descVi:
      'Dịch vụ bảo trì định kỳ hệ thống điều hòa không khí VRV/VRF, FCU, AHU và Cassette cho tòa nhà văn phòng, trung tâm thương mại và bệnh viện. FAVE cam kết SLA 4 giờ phản hồi, giúp duy trì COP tối ưu và giảm thiểu downtime không kế hoạch.',
    problems: [
      'Hệ thống điều hòa suy giảm hiệu suất sau 2–3 năm vận hành, tiêu hao điện năng tăng 20–30% do bộ lọc bám bẩn và trao đổi nhiệt bị cáu bám',
      'Sự cố dừng máy đột ngột giữa giờ cao điểm gây ảnh hưởng trực tiếp đến hoạt động văn phòng và trải nghiệm khách hàng',
      'Thiếu nhật ký bảo trì chuẩn hóa khiến facility manager khó chứng minh tuân thủ với đơn vị bảo hiểm',
      'Nước ngưng tụ tràn hoặc rò rỉ gas lạnh R410A gây hư hỏng nội thất và vi phạm quy định môi trường',
      'Chi phí sửa chữa đột xuất cao hơn 3–5 lần so với bảo trì phòng ngừa có kế hoạch',
    ],
    solutions: [
      'Lập lịch bảo trì định kỳ theo chuẩn ASHRAE 180 và khuyến nghị OEM (Daikin, Carrier, Trane)',
      'Kiểm tra và hiệu chỉnh áp suất gas lạnh R410A/R32, đo COP thực tế và đối chiếu với thông số thiết kế',
      'Vệ sinh cụm dàn lạnh, dàn nóng bằng máy rửa áp lực cao và hóa chất chuyên dụng HVAC-grade',
      'Phát hành báo cáo kỹ thuật sau mỗi lần bảo trì kèm ảnh hiện trạng và khuyến nghị khắc phục',
      'Tích hợp giám sát IoT qua cảm biến nhiệt độ/áp suất để cảnh báo sớm bất thường',
    ],
    process: [
      { step: 1, title: 'Ký hợp đồng & lập kế hoạch', desc: 'Khảo sát inventorying toàn bộ thiết bị, xác định tần suất bảo trì và SLA theo từng loại dịch vụ. Lập lịch năm chi tiết.' },
      { step: 2, title: 'Bảo trì tháng 1 & baseline', desc: 'Đo đạc thông số gốc: áp suất gas, nhiệt độ đầu hút/đẩy, dòng điện động cơ, lưu lượng gió. Lập hồ sơ thiết bị.' },
      { step: 3, title: 'Vệ sinh & hiệu chỉnh', desc: 'Vệ sinh bộ lọc, dàn trao đổi nhiệt, kiểm tra điện cách điện, bôi trơn ổ đỡ, kiểm tra van điện từ và board mạch điều khiển.' },
      { step: 4, title: 'Kiểm tra an toàn', desc: 'Test bảo vệ quá nhiệt, quá dòng, áp suất cao/thấp. Kiểm tra kết nối điện, tiếp đất và chống sét theo QCVN.' },
      { step: 5, title: 'Báo cáo kỹ thuật', desc: 'Phát hành Service Report ghi nhận toàn bộ hạng mục đã thực hiện, thông số đo và bất thường phát hiện kèm ảnh chụp.' },
      { step: 6, title: 'Theo dõi & hỗ trợ 24/7', desc: 'Hotline kỹ thuật 24/7, phản hồi trong 4 giờ với sự cố khẩn cấp. Báo cáo tổng kết quý và đề xuất cải tiến.' },
    ],
    benefits: [
      'Giảm 20–30% chi phí điện năng nhờ duy trì COP ở mức thiết kế quanh năm',
      'Tăng MTBF lên 2–3 lần so với không bảo trì định kỳ',
      'Tuổi thọ thiết bị kéo dài từ 10 năm lên 15–18 năm',
      'SLA cam kết: phản hồi trong 4 giờ, hoàn thành trong 24 giờ',
      'Hồ sơ bảo trì chuẩn hóa đáp ứng yêu cầu kiểm toán ISO 50001',
      'Phát hiện và xử lý rò rỉ gas đúng quy trình, tuân thủ Nghị định 06/2022',
    ],
    faqs: [
      { q: 'Tần suất bảo trì hệ thống VRV/VRF và FCU là bao nhiêu?', a: 'Theo ASHRAE 180 và khuyến nghị Daikin/Mitsubishi, bảo trì tối thiểu 2 lần/năm với FCU văn phòng và 4 lần/năm với VRV/VRF tải nặng. FAVE tư vấn tần suất tối ưu dựa trên giờ vận hành thực tế và điều kiện môi trường cụ thể.' },
      { q: 'FAVE có cung cấp hợp đồng bảo trì toàn diện (full-service) không?', a: 'Có. Gói Full-Service bao gồm toàn bộ nhân công bảo trì định kỳ, linh kiện tiêu hao, ứng phó sự cố 24/7 và thay thế linh kiện thông thường. Giúp facility manager kiểm soát OPEX với chi phí cố định hàng năm.' },
      { q: 'Báo cáo bảo trì có thể dùng để nộp cho đơn vị bảo hiểm không?', a: 'Báo cáo của FAVE được chuẩn hóa theo format kỹ thuật, có chữ ký kỹ sư có chứng chỉ và ảnh hiện trạng timestamp. Được các công ty bảo hiểm lớn như PTI, Bảo Việt chấp nhận trong hồ sơ bồi thường thiết bị.' },
      { q: 'SLA phản hồi sự cố là bao lâu?', a: 'Cam kết trong hợp đồng: 4 giờ phản hồi điện thoại/email, 8 giờ có kỹ sư tại hiện trường đối với sự cố Priority 1 (dừng toàn hệ thống). Sự cố Priority 2 hoàn thành trong 24–48 giờ.' },
    ],
    relatedServices: [
      { slug: 'bao-duong-chiller', label: 'Bảo dưỡng Chiller', emoji: '❄️' },
      { slug: 'sua-chua-hvac', label: 'Sửa chữa hệ thống HVAC', emoji: '🛠️' },
      { slug: 've-sinh-cong-nghiep', label: 'Vệ sinh công nghiệp HVAC', emoji: '🧹' },
    ],
  },

  'bao-duong-chiller': {
    titleVi: 'Bảo Dưỡng Chiller',
    emoji: '❄️',
    color: '#0099cc',
    descVi:
      'Dịch vụ bảo dưỡng chuyên sâu hệ thống Chiller water-cooled và air-cooled công suất từ 50TR đến 2.000TR cho tòa nhà văn phòng, khách sạn, bệnh viện và trung tâm dữ liệu. Đội ngũ kỹ sư được đào tạo chuyên sâu tại Carrier, Trane và York đảm bảo Chiller vận hành ở COP tối ưu quanh năm.',
    problems: [
      'Hiệu suất Chiller suy giảm do cáu bám trong bình bay hơi và bình ngưng, làm tăng chi phí điện 15–25%',
      'Máy nén lạnh hoạt động quá tải hoặc bị trip do thiếu dầu bôi trơn, áp suất gas lạnh ngoài dải cho phép',
      'Hệ thống BMS/BAS không nhận cảnh báo kịp thời, dẫn đến sự cố dừng máy đột ngột trong giờ cao điểm',
      'Tháp giải nhiệt đóng cặn sinh học và khoáng chất, lưu lượng nước ngưng giảm làm tăng kWh/TR đáng kể',
      'Thiếu nhật ký bảo dưỡng chuẩn theo ASHRAE 180, khó chứng minh tuân thủ với đơn vị bảo hiểm',
    ],
    solutions: [
      'Đánh giá hiệu suất Chiller định kỳ theo chuẩn ASHRAE 180 Standard Inspection and Maintenance',
      'Phân tích dầu bôi trơn máy nén bằng phương pháp quang phổ, phát hiện kim loại mài mòn sớm',
      'Súc rửa ống bình ngưng và bình bay hơi bằng thiết bị cơ học và hóa chất tẩy cáu chuyên dụng',
      'Kiểm tra và hiệu chỉnh toàn bộ thông số vận hành: áp suất hút/đẩy, subcooling, superheat',
      'Cung cấp báo cáo Performance Assessment với xu hướng kWh/TR theo thời gian',
    ],
    process: [
      { step: 1, title: 'Khảo sát & lập kế hoạch', desc: 'Thu thập hồ sơ kỹ thuật Chiller, lịch sử vận hành và sự cố. Lên kế hoạch bảo dưỡng năm phù hợp lịch thấp điểm tòa nhà.' },
      { step: 2, title: 'Kiểm tra Pre-shutdown', desc: 'Log toàn bộ thông số vận hành thực tế: CHWS/CHWR temp, CWS/CWR temp, kW, kWh/TR, rung động, tiếng ồn bất thường.' },
      { step: 3, title: 'Kiểm tra điện & điều khiển', desc: 'Kiểm tra điện trở cách điện, contactor, relay bảo vệ, board điều khiển và kết nối BMS. Hiệu chỉnh sensor nhiệt độ và áp suất.' },
      { step: 4, title: 'Bảo dưỡng cơ khí & trao đổi nhiệt', desc: 'Súc rửa ống ngưng, kiểm tra nước xử lý tháp giải nhiệt, thay dầu/bộ lọc dầu, kiểm tra phớt trục và van an toàn.' },
      { step: 5, title: 'Nạp gas & hiệu chỉnh', desc: 'Kiểm tra rò rỉ gas bằng máy điện tử độ nhạy cao, bổ sung gas lạnh đúng chủng loại, hiệu chỉnh van tiết lưu điện tử EEV.' },
      { step: 6, title: 'Nghiệm thu & báo cáo Performance', desc: 'Vận hành thử nghiệm toàn tải và bán tải, ghi nhận kWh/TR sau bảo dưỡng. Phát hành Chiller Performance Report.' },
    ],
    benefits: [
      'Khôi phục COP thiết kế, giảm chi phí điện 12–25% được xác nhận bằng data logger',
      'Phát hiện sớm mài mòn máy nén qua phân tích dầu, ngăn ngừa sự cố catastrophic failure',
      'Kéo dài tuổi thọ Chiller thêm 5–8 năm so với vận hành không bảo dưỡng đúng chuẩn',
      'Hồ sơ bảo dưỡng chuẩn ASHRAE đáp ứng yêu cầu kiểm toán ISO 50001 và bảo hiểm',
      'Giảm nguy cơ dừng máy không kế hoạch xuống <1% thời gian vận hành mỗi năm',
      'Dịch vụ khẩn cấp 24/7 với kỹ sư chuyên Chiller trong 8 giờ tại Hà Nội và TP.HCM',
    ],
    faqs: [
      { q: 'Tần suất bảo dưỡng Chiller water-cooled tiêu chuẩn là bao nhiêu?', a: 'ASHRAE 180 khuyến nghị kiểm tra toàn diện (Level 2) ít nhất 1 lần/năm và kiểm tra cơ bản (Level 1) mỗi quý. Với Chiller vận hành >16 giờ/ngày, FAVE khuyến nghị bảo dưỡng toàn diện 2 lần/năm để duy trì warranty từ nhà sản xuất.' },
      { q: 'Chiller bị sự cố ngoài giờ hành chính, FAVE có hỗ trợ khẩn cấp không?', a: 'Có. FAVE có đội kỹ thuật trực 24/7/365 với cam kết phản hồi trong 2 giờ và có mặt tại hiện trường trong 8 giờ tại Hà Nội. Khách hàng hợp đồng bảo trì được ưu tiên dispatch trước.' },
      { q: 'Chi phí bảo dưỡng Chiller hàng năm thường là bao nhiêu?', a: 'Chi phí phụ thuộc vào công suất, loại Chiller và tần suất bảo dưỡng. Thông thường dao động từ 15–25 triệu đồng/lần cho Chiller 200–500TR (chưa bao gồm vật tư thay thế). FAVE cung cấp báo giá cụ thể sau khảo sát miễn phí.' },
      { q: 'Phân tích dầu máy nén Chiller có cần thiết không?', a: 'Rất cần thiết với Chiller screw và centrifugal compressor. Phân tích quang phổ dầu phát hiện hạt kim loại mài mòn từ bearing và rotor, cho phép dự đoán hỏng hóc trước 3–6 tháng. Chi phí phân tích dầu chỉ 2–3 triệu nhưng tiết kiệm rủi ro sự cố trị giá hàng tỷ.' },
    ],
    relatedServices: [
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì điều hòa không khí', emoji: '🔧' },
      { slug: 'sua-chua-hvac', label: 'Sửa chữa hệ thống HVAC', emoji: '🛠️' },
      { slug: 've-sinh-cong-nghiep', label: 'Vệ sinh công nghiệp HVAC', emoji: '🧹' },
    ],
  },

  'sua-chua-hvac': {
    titleVi: 'Sửa Chữa Hệ Thống HVAC',
    emoji: '🛠️',
    color: '#e63946',
    descVi:
      'Dịch vụ sửa chữa chuyên nghiệp toàn bộ hệ thống HVAC: Chiller, VRV/VRF, AHU, FCU, hệ thống đường ống, tháp giải nhiệt và tủ điện điều khiển. Đội kỹ thuật 100+ kỹ sư, kho linh kiện chính hãng tại Hà Nội và TP.HCM, cam kết khắc phục sự cố trong 24 giờ.',
    problems: [
      'Máy nén lạnh hỏng đột ngột do quá tải, thiếu bôi trơn hoặc surge—chi phí cao nếu không có kỹ thuật viên chuyên sâu',
      'Board mạch inverter VRV/VRF lỗi khiến cả zone bị mất điều hòa; mã lỗi phức tạp đòi thiết bị chẩn đoán chuyên dụng',
      'Rò rỉ đường ống nước lạnh (CHW) gây hư hỏng trần thạch cao, sàn và thiết bị điện bên dưới',
      'Hệ thống BMS mất kết nối với HVAC do lỗi giao thức BACnet/Modbus, mất kiểm soát toàn tòa nhà',
      'Thiếu linh kiện chính hãng tại Việt Nam dẫn đến thời gian chờ sửa chữa kéo dài',
    ],
    solutions: [
      'Chẩn đoán lỗi bằng thiết bị chuyên dụng từng hãng: Daikin Service Tool, Carrier Service Assistant, Trane Tracer TU',
      'Kho linh kiện dự phòng tại Hà Nội và TP.HCM: board inverter, compressor 5–50HP, EEV, cảm biến—xuất kho trong 2–4 giờ',
      'Đội thợ ống nước chuyên HVAC sửa chữa rò rỉ, hàn TIG inert gas cho ống đồng refrigerant theo ASTM B88',
      'Kỹ sư BMS/Controls tích hợp lại giao thức BACnet MS/TP, Modbus RTU/TCP, LON',
      'Cam kết working permit và VSMT, làm việc ngoài giờ hành chính để giảm thiểu gián đoạn',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận & phân loại sự cố', desc: 'Hotline 24/7 tiếp nhận thông tin sự cố. Phân loại Priority 1/2/3 theo mức độ ảnh hưởng. Dispatch kỹ sư phù hợp trong vòng 2 giờ.' },
      { step: 2, title: 'Chẩn đoán kỹ thuật', desc: 'Sử dụng thiết bị chẩn đoán chuyên dụng: oscilloscope, analyser đa năng, máy phát hiện rò rỉ điện tử, camera nhiệt IR.' },
      { step: 3, title: 'Báo giá sửa chữa', desc: 'Phát hành báo giá tức thì cho hạng mục đã xác định. Linh kiện chính hãng kèm C/O, C/Q. Khách hàng duyệt trước khi thực hiện.' },
      { step: 4, title: 'Thực hiện sửa chữa', desc: 'Thi công theo quy trình kỹ thuật chính hãng. Với gas lạnh: thu hồi đúng quy định, nạp lại theo trọng lượng. Kiểm tra rò rỉ sau nạp.' },
      { step: 5, title: 'Kiểm tra & chạy thử', desc: 'Vận hành thử nghiệm toàn tải 30–60 phút, ghi nhận thông số vận hành, so sánh với baseline trước sự cố.' },
      { step: 6, title: 'Bàn giao & bảo hành', desc: 'Phát hành Service Report mô tả chi tiết nguyên nhân, hạng mục đã thực hiện và linh kiện thay thế. Bảo hành 3–6 tháng.' },
    ],
    benefits: [
      'MTTR trung bình dưới 8 giờ cho sự cố thông thường với linh kiện có sẵn trong kho',
      'Chẩn đoán chính xác bằng thiết bị chuyên dụng, tránh sửa chữa thừa',
      'Linh kiện chính hãng có C/O, C/Q đảm bảo tương thích và duy trì warranty',
      'Kỹ sư được đào tạo bởi Daikin, Carrier, Trane và Mitsubishi Electric',
      'Dịch vụ 24/7/365 kể cả ngày lễ Tết—phù hợp bệnh viện và data center',
      'Bảo hành sửa chữa 3–6 tháng, hỗ trợ lập hồ sơ bảo hiểm thiết bị',
    ],
    faqs: [
      { q: 'Máy nén Chiller hỏng hoàn toàn, FAVE có thể sửa chữa hay chỉ thay mới?', a: 'Tùy mức độ hư hỏng. FAVE cung cấp 3 phương án: máy nén chính hãng mới (OEM), máy nén tái chế có kiểm định, hoặc nâng cấp sang model hiệu suất cao hơn. Báo giá cả 3 để khách hàng quyết định theo ngân sách.' },
      { q: 'Lỗi board inverter VRV/VRF có phải mua board mới không?', a: 'Không nhất thiết. FAVE có kỹ sư điện tử chuyên sửa board inverter HVAC, có thể phục hồi 60–70% trường hợp. Chi phí sửa board thường chỉ bằng 15–30% giá board mới.' },
      { q: 'Sửa chữa cần mua linh kiện nhập khẩu mất bao lâu?', a: 'FAVE duy trì kho linh kiện fast-moving tại Hà Nội và TP.HCM. Linh kiện thông thường: cấp trong 2–4 giờ. Linh kiện đặc thù cần nhập khẩu: 5–7 ngày từ Singapore. FAVE cung cấp thiết bị tạm thời (rental) nếu cần.' },
    ],
    relatedServices: [
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì điều hòa không khí', emoji: '🔧' },
      { slug: 'bao-duong-chiller', label: 'Bảo dưỡng Chiller', emoji: '❄️' },
      { slug: 'cai-tao-nang-cap', label: 'Cải tạo & nâng cấp HVAC', emoji: '⚡' },
    ],
  },

  'cai-tao-nang-cap': {
    titleVi: 'Cải Tạo & Nâng Cấp Hệ Thống Điều Hòa',
    emoji: '⚡',
    color: '#f4a261',
    descVi:
      'Dịch vụ cải tạo và nâng cấp hệ thống HVAC hiện hữu cho các công trình muốn tối ưu hiệu suất năng lượng, mở rộng công suất hoặc retrofit công nghệ mới (inverter, VRF, free cooling). Thực hiện với downtime tối thiểu, đảm bảo continuity of operations trong suốt quá trình cải tạo.',
    problems: [
      'Hệ thống HVAC đã vận hành 10–15 năm, hiệu suất suy giảm nghiêm trọng, chi phí điện tăng 40–60%',
      'Công suất lạnh không đáp ứng khi tòa nhà mở rộng diện tích hoặc tăng mật độ thiết bị IT sinh nhiệt cao',
      'Thiết bị lỗi thời không còn được hỗ trợ linh kiện (end-of-life), rủi ro hỏng hóc ngày càng cao',
      'Hệ thống không tích hợp được với BMS hiện đại, không thể giám sát từ xa và tối ưu hóa tự động',
      'Áp lực từ ban quản lý về ESG và tiêu chí LEED/LOTUS rating đòi hỏi cải thiện PUE và EUI',
    ],
    solutions: [
      'Kiểm toán năng lượng hệ thống HVAC theo ASHRAE Level II, xác định cơ hội tiết kiệm (ECM) với phân tích ROI',
      'Retrofit Chiller cũ bằng máy nén trục vít biến tần hoặc ly tâm từ tính đạt COP > 7.0',
      'Thêm biến tần VFD cho toàn bộ bơm tuần hoàn và quạt AHU/cooling tower, tiết kiệm 30–40%',
      'Lắp đặt hệ thống BMS/EMS mới tích hợp AI-based optimization, kết nối cloud dashboard real-time',
      'Áp dụng free cooling economizer và heat recovery để tận dụng điều kiện khí hậu thuận lợi',
    ],
    process: [
      { step: 1, title: 'Kiểm toán năng lượng (Energy Audit)', desc: 'Lắp data logger đo kWh, nhiệt độ, áp suất và lưu lượng trong 2–4 tuần. Phân tích baseline và xác định ECM priority theo ASHRAE Level II.' },
      { step: 2, title: 'Thiết kế kỹ thuật cải tạo', desc: 'Thiết kế chi tiết: chọn thiết bị thay thế, bản vẽ as-built update, tính toán thủy lực và nhiệt động mới, kế hoạch migration.' },
      { step: 3, title: 'Kế hoạch cải tạo không gián đoạn', desc: 'Xây dựng phasing plan để cải tạo từng phần trong khi hệ thống cũ vẫn vận hành. Xác định cut-over windows phù hợp lịch tòa nhà.' },
      { step: 4, title: 'Thi công & lắp đặt thiết bị mới', desc: 'Lắp đặt thiết bị mới song song với hệ thống cũ. Kết nối thử nghiệm từng phần, hiệu chỉnh thông số trước khi chuyển toàn bộ tải.' },
      { step: 5, title: 'Commissioning & tối ưu hóa', desc: 'Commissioning theo ASHRAE Guideline 0 và 1.1. Đo kiểm hiệu suất thực tế và lập trình BMS optimization.' },
      { step: 6, title: 'M&V (Measurement & Verification)', desc: 'Theo dõi tiết kiệm năng lượng thực tế trong 3–6 tháng theo IPMVP Option C. Phát hành báo cáo M&V với xác nhận ROI.' },
    ],
    benefits: [
      'Tiết kiệm 30–50% chi phí điện HVAC sau cải tạo, payback period thông thường 2–4 năm',
      'Loại bỏ rủi ro end-of-life equipment failure, thiết bị mới có vòng đời 15–20 năm',
      'Nâng cấp giám sát từ xa và AI optimization giảm chi phí vận hành 15–20%',
      'Cải thiện LEED Energy & Atmosphere credit, hỗ trợ mục tiêu ESG',
      'Đảm bảo continuous operation trong suốt cải tạo với downtime <4 giờ mỗi giai đoạn',
      'Báo cáo M&V chuẩn IPMVP làm bằng chứng xác nhận với ban lãnh đạo',
    ],
    faqs: [
      { q: 'Cải tạo HVAC có cần dừng toàn bộ hoạt động tòa nhà không?', a: 'Không nhất thiết. FAVE chuyên thiết kế phasing plan để cải tạo từng cụm thiết bị trong khi toàn hệ thống vẫn hoạt động. Downtime thực tế thường chỉ 2–4 giờ mỗi giai đoạn cut-over, thực hiện vào cuối tuần hoặc đêm muộn.' },
      { q: 'Payback period của dự án cải tạo HVAC thường là bao lâu?', a: 'Với cải tạo toàn diện (thay Chiller + VFD + BMS), payback thường 2.5–4 năm với mức điện tiết kiệm 35–50%. Nếu chỉ retrofit VFD cho bơm và quạt, payback có thể dưới 18 tháng. FAVE cung cấp phân tích NPV và IRR trong báo cáo kiểm toán năng lượng.' },
      { q: 'FAVE có thực hiện dự án theo mô hình EPC không?', a: 'Có. FAVE hợp tác với đối tác tài chính để cung cấp mô hình EPC, trong đó FAVE cam kết mức tiết kiệm năng lượng tối thiểu và khách hàng trả dần từ khoản tiết kiệm điện thực tế. Phù hợp cho dự án >10 tỷ đồng.' },
    ],
    relatedServices: [
      { slug: 'thiet-ke-hvac', label: 'Thiết kế hệ thống HVAC', emoji: '📐' },
      { slug: 'lap-dat-hvac', label: 'Lắp đặt hệ thống HVAC', emoji: '🏗️' },
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì điều hòa không khí', emoji: '🔧' },
    ],
  },

  've-sinh-cong-nghiep': {
    titleVi: 'Vệ Sinh Công Nghiệp Hệ Thống HVAC',
    emoji: '🧹',
    color: '#2a9d8f',
    descVi:
      'Dịch vụ vệ sinh công nghiệp chuyên sâu toàn bộ hệ thống HVAC: đường ống gió (duct cleaning), dàn lạnh AHU/FCU, bình ngưng Chiller, tháp giải nhiệt và hệ thống xử lý không khí sạch. Sử dụng thiết bị chuyên dụng và hóa chất HVAC-grade đạt tiêu chuẩn NADCA và ASHRAE 62.1.',
    problems: [
      'Đường ống gió tích tụ bụi, nấm mốc và vi khuẩn Legionella gây ô nhiễm IAQ và nguy cơ bệnh hô hấp',
      'Dàn lạnh FCU/AHU bám bẩn dày làm giảm lưu lượng gió 30–50%, hệ thống quá tải để đạt nhiệt độ đặt',
      'Tháp giải nhiệt tích tụ biofilm và cáu khoáng chất, tiềm ẩn nguy cơ Legionellosis',
      'Bình ngưng Chiller đóng cáu canxi làm tăng nhiệt độ ngưng (TCond) lên 3–5°C, tăng kWh/TR đáng kể',
      'Không có chứng nhận vệ sinh duct định kỳ vi phạm yêu cầu IAQ của chứng chỉ WELL Building Standard',
    ],
    solutions: [
      'Vệ sinh đường ống gió bằng robot inspection + mechanical brush system kết hợp hút công suất cao (negative pressure) theo NADCA ACR',
      'Vệ sinh dàn lạnh AHU/FCU bằng hóa chất alkaline coil cleaner và máy phun áp lực phù hợp cánh nhôm',
      'Xử lý nước tháp giải nhiệt: diệt khuẩn Legionella bằng chlorine shock, súc rửa bể, phủ coating chống bám vi sinh',
      'Súc rửa ống ngưng Chiller bằng thiết bị tube cleaning cơ học và hóa chất descaler không ăn mòn ống đồng',
      'Cấp chứng nhận vệ sinh có timestamp theo NADCA và ASHRAE 62.1 cho hồ sơ LEED/WELL',
    ],
    process: [
      { step: 1, title: 'Kiểm tra IAQ ban đầu', desc: 'Đo chất lượng không khí trong nhà: CO2, PM2.5, PM10, TVOC, độ ẩm theo ASHRAE 62.1. Camera nội soi đường ống để đánh giá mức độ bám bẩn.' },
      { step: 2, title: 'Lập kế hoạch vệ sinh', desc: 'Xác định vùng ưu tiên, lựa chọn phương pháp vệ sinh, lên lịch ngoài giờ hành chính để không gián đoạn vận hành tòa nhà.' },
      { step: 3, title: 'Vệ sinh hệ thống cấp/hồi gió', desc: 'Cô lập từng đoạn duct, vệ sinh cơ học bằng robot brush, hút bụi công suất cao. Khử khuẩn bằng fogging hóa chất diệt khuẩn.' },
      { step: 4, title: 'Vệ sinh thiết bị đầu cuối', desc: 'Tháo, vệ sinh và lắp lại bộ lọc FCU/AHU. Vệ sinh dàn lạnh, khay nước ngưng và motor quạt.' },
      { step: 5, title: 'Vệ sinh thiết bị trung tâm', desc: 'Súc rửa bình ngưng/bay hơi Chiller, vệ sinh tháp giải nhiệt, xử lý nước và lấy mẫu kiểm tra vi sinh Legionella.' },
      { step: 6, title: 'Kiểm tra IAQ sau vệ sinh & cấp chứng nhận', desc: 'Đo lại IAQ, so sánh với baseline. Chụp ảnh nội soi duct sau vệ sinh. Phát hành Certificate of Cleaning theo NADCA.' },
    ],
    benefits: [
      'Cải thiện chất lượng không khí trong nhà (IAQ), giảm phàn nàn về mùi, dị ứng và bệnh hô hấp',
      'Tăng hiệu suất hệ thống HVAC 15–25% nhờ dàn trao đổi nhiệt sạch',
      'Giảm 10–20% tiêu thụ điện năng của quạt AHU/FCU do giảm pressure drop',
      'Ngăn ngừa nguy cơ bệnh Legionnaires disease, bảo vệ trách nhiệm pháp lý của chủ tòa nhà',
      'Chứng nhận vệ sinh NADCA đáp ứng LEED IEQ credit và WELL Building Standard Feature 31',
      'Kéo dài tuổi thọ thiết bị HVAC do giảm tải và nhiệt độ vận hành',
    ],
    faqs: [
      { q: 'Tần suất vệ sinh đường ống gió (duct cleaning) cần thực hiện bao nhiêu lần/năm?', a: 'NADCA ACR 2021 và ASHRAE 62.1 khuyến nghị kiểm tra duct mỗi 2 năm và vệ sinh khi mức độ bám bẩn vượt ngưỡng. Thực tế tại Hà Nội, với chất lượng không khí PM2.5 cao, tòa nhà văn phòng nên vệ sinh duct mỗi 1–2 năm và vệ sinh dàn lạnh FCU mỗi 6–12 tháng.' },
      { q: 'Có cần cách ly khu vực trong quá trình vệ sinh không?', a: 'FAVE sử dụng negative pressure containment—toàn bộ bụi và hóa chất được hút về thiết bị lọc, không phát tán ra khu vực làm việc. Vệ sinh từng zone riêng biệt, lên lịch ngoài giờ cao điểm. Khu vực được vệ sinh xong có thể sử dụng lại sau 2–4 giờ thông gió.' },
      { q: 'Kiểm tra Legionella trong tháp giải nhiệt như thế nào?', a: 'FAVE lấy mẫu nước tháp giải nhiệt và gửi đến phòng thí nghiệm ISO 17025 để test Legionella pneumophila theo tiêu chuẩn ISO 11731. Kết quả có trong 5–7 ngày. Nếu phát hiện, thực hiện ngay quy trình khử khuẩn shock chlorination.' },
    ],
    relatedServices: [
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì điều hòa không khí', emoji: '🔧' },
      { slug: 'bao-duong-chiller', label: 'Bảo dưỡng Chiller', emoji: '❄️' },
      { slug: 'sua-chua-hvac', label: 'Sửa chữa hệ thống HVAC', emoji: '🛠️' },
    ],
  },

  'thiet-ke-hvac': {
    titleVi: 'Thiết Kế Hệ Thống HVAC',
    emoji: '📐',
    color: '#6a0dad',
    descVi:
      'Dịch vụ tư vấn và thiết kế kỹ thuật hệ thống HVAC cho tòa nhà văn phòng, trung tâm thương mại, bệnh viện và nhà máy. FAVE cung cấp hồ sơ thiết kế từ Schematic Design đến Construction Document theo tiêu chuẩn ASHRAE, QCVN và yêu cầu của chủ đầu tư.',
    problems: [
      'Thiết kế HVAC tải nhiệt sai lệch lớn dẫn đến lắp thiết bị quá công suất (oversized) gây lãng phí CAPEX hoặc thiếu công suất không đảm bảo tiện nghi',
      'Hồ sơ thiết kế thiếu chi tiết khiến nhà thầu đơn giá cao và tranh chấp khối lượng nhiều lần',
      'Không tối ưu được năng lượng từ giai đoạn thiết kế, bỏ lỡ cơ hội đạt LEED/LOTUS',
      'Thiết kế không phối hợp tốt với MEP khác gây conflict ống xuyên dầm, hết không gian technical space',
      'Thiếu kinh nghiệm thiết kế cho công trình đặc thù như cleanroom, data center, bệnh viện',
    ],
    solutions: [
      'Tính toán tải nhiệt chính xác bằng phần mềm HAP (Hourly Analysis Program) và Trane TRACE 700',
      'Thiết kế BIM 3D trên Revit MEP, phối hợp clash detection với kiến trúc và kết cấu',
      'Tư vấn lựa chọn hệ thống phù hợp ngân sách: VRF, CAV, VAV, Chiller Plant với phân tích LCC',
      'Thiết kế tích hợp BMS/EMS ngay từ đầu, đảm bảo tự động hóa và giám sát năng lượng real-time',
      'Hỗ trợ kiểm toán thiết kế độc lập (Design Review) và hồ sơ LEED/LOTUS Energy Model',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận yêu cầu & Schematic Design', desc: 'Thu thập brief từ chủ đầu tư: chức năng, tiêu chuẩn tiện nghi, ngân sách CAPEX, mục tiêu năng lượng. Đề xuất 2–3 phương án hệ thống.' },
      { step: 2, title: 'Design Development', desc: 'Tính toán tải nhiệt chi tiết theo ASHRAE Fundamentals, chọn thiết bị, thiết kế sơ đồ nguyên lý và layout thiết bị cơ bản.' },
      { step: 3, title: 'Construction Documents', desc: 'Hoàn thiện bản vẽ thi công chi tiết: bố trí đường ống, kích thước duct, bố trí thiết bị, sơ đồ điều khiển DDC. Lập bộ specification.' },
      { step: 4, title: 'Lập dự toán & hồ sơ mời thầu', desc: 'Lập bảng khối lượng (BOQ) chi tiết, dự toán theo đơn giá thị trường. Chuẩn bị hồ sơ RFQ/ITB cho đấu thầu nhà thầu thi công.' },
      { step: 5, title: 'Hỗ trợ thi công (CA)', desc: 'Construction Administration: trả lời RFI, duyệt shop drawing, hướng dẫn kỹ thuật tại hiện trường và giám sát compliance với thiết kế.' },
      { step: 6, title: 'Commissioning & As-Built', desc: 'Tham gia nghiệm thu commissioning, xác nhận hệ thống đúng thiết kế. Cập nhật bản vẽ as-built và lập hồ sơ O&M manual.' },
    ],
    benefits: [
      'Tải nhiệt tính toán chính xác ±5% nhờ HAP/TRACE, tránh oversized/undersized gây lãng phí CAPEX 10–20%',
      'Hồ sơ BIM 3D giảm thiểu conflict thi công, tiết kiệm 5–10% chi phí xây dựng',
      'Thiết kế tối ưu năng lượng đạt ASHRAE 90.1-2019, giảm 20–40% OPEX điện HVAC',
      'Hồ sơ đầy đủ cho đấu thầu cạnh tranh, minh bạch và so sánh được giữa các nhà thầu',
      'Kinh nghiệm thiết kế 500+ công trình tại Việt Nam, hiểu rõ điều kiện khí hậu địa phương',
      'Hỗ trợ trọn vẹn từ concept đến commissioning, chịu trách nhiệm kỹ thuật suốt vòng đời',
    ],
    faqs: [
      { q: 'FAVE thiết kế theo tiêu chuẩn nào?', a: 'FAVE áp dụng song song ASHRAE (Fundamentals, 62.1, 90.1, 55), SMACNA cho duct, và các QCVN liên quan: QCVN 09:2017/BXD, TCVN 5687:2010. Với dự án quốc tế, có thể áp dụng thêm EN 13779 hoặc BS EN 15232.' },
      { q: 'Phí thiết kế HVAC tính theo phương thức nào?', a: 'FAVE áp dụng phí thiết kế theo tỷ lệ % giá trị hệ thống (thông thường 2–5% tùy phức tạp) hoặc phí lump-sum theo số giờ công. Với dự án lớn >50 tỷ, có thể thương lượng gói milestone-based. FAVE cung cấp báo giá sau brief meeting miễn phí.' },
      { q: 'Thiết kế BIM 3D có bắt buộc không?', a: 'BIM 3D được khuyến nghị cho dự án >3.000m² và bắt buộc với dự án phức tạp như bệnh viện, cleanroom, data center. Với dự án nhỏ hơn, FAVE cung cấp bản vẽ 2D AutoCAD đầy đủ thi công.' },
    ],
    relatedServices: [
      { slug: 'lap-dat-hvac', label: 'Lắp đặt hệ thống HVAC', emoji: '🏗️' },
      { slug: 'cai-tao-nang-cap', label: 'Cải tạo & nâng cấp HVAC', emoji: '⚡' },
      { slug: 'cung-cap-thiet-bi', label: 'Cung cấp thiết bị HVAC', emoji: '📦' },
    ],
  },

  'lap-dat-hvac': {
    titleVi: 'Lắp Đặt Hệ Thống HVAC',
    emoji: '🏗️',
    color: '#e76f51',
    descVi:
      'Dịch vụ thi công lắp đặt hệ thống HVAC toàn phần cho tòa nhà văn phòng, trung tâm thương mại, bệnh viện và nhà máy. FAVE đảm nhận trọn gói từ cung cấp thiết bị, thi công ống, lắp đặt thiết bị, đấu nối điện/BMS đến commissioning và bàn giao hoàn công.',
    problems: [
      'Nhà thầu cơ điện thiếu kinh nghiệm HVAC dẫn đến lắp đặt sai: đường ống gió rò rỉ, slope nước ngưng không đúng, gas lạnh nạp sai trọng lượng',
      'Tiến độ thi công MEP thường bị chậm do phối hợp kém giữa các nhà thầu trong không gian kỹ thuật chật hẹp',
      'Chất lượng vật tư không kiểm soát được khi nhà thầu tự mua, dẫn đến thiết bị không đúng chủng loại',
      'Commissioning không đúng quy trình: thiếu pressure test, không flush đường ống, nạp gas không theo trọng lượng',
      'Hồ sơ hoàn công không đầy đủ gây khó khăn cho vận hành và bảo trì về sau',
    ],
    solutions: [
      'Thi công theo bản vẽ shop drawing đã được FAVE review, phối hợp BIM clash detection với nhà thầu MEP khác',
      'Đội thi công chuyên HVAC: thợ ống đồng có chứng chỉ hàn, thợ duct sheet metal và kỹ sư commissioning',
      'Kiểm soát vật tư 100%: tất cả thiết bị có C/O, C/Q, kiểm tra kích thước và serial number trước lắp đặt',
      'Commissioning theo ASHRAE Guideline 0: pressure test, flushing, TAB và performance verification',
      'Bàn giao hồ sơ hoàn công đầy đủ: as-built Revit/AutoCAD, test reports, commissioning checklist, O&M manual',
    ],
    process: [
      { step: 1, title: 'Hợp đồng & mobilization', desc: 'Ký hợp đồng với scope rõ ràng. Duyệt tiến độ, phân công đội thi công và kỹ sư QA/QC. Lập phương án thi công và VSMT.' },
      { step: 2, title: 'Shop Drawing & vật tư', desc: 'Lập shop drawing chi tiết từ bản vẽ thiết kế. Đặt hàng thiết bị sớm để tránh delay—lead time Chiller thường 8–12 tuần.' },
      { step: 3, title: 'Thi công phần ngầm & kết cấu đỡ', desc: 'Lắp đặt hanger, support cho duct và ống. Đi ống đồng refrigerant và ống nước theo đúng bản vẽ, đảm bảo slope và độ bền.' },
      { step: 4, title: 'Lắp đặt thiết bị chính', desc: 'Cẩu và lắp đặt Chiller, AHU, FCU, cooling tower theo hướng dẫn OEM. Đấu nối ống nước, ống gió và kết nối điện điều khiển.' },
      { step: 5, title: 'Commissioning & TAB', desc: 'Pressure test đường ống, flushing hệ thống nước, nạp gas theo trọng lượng. TAB lưu lượng gió và nước theo thiết kế.' },
      { step: 6, title: 'Nghiệm thu & bàn giao', desc: 'Nghiệm thu với PMC và chủ đầu tư. Đào tạo đội vận hành. Bàn giao hồ sơ hoàn công đầy đủ và chạy bảo hành 12 tháng.' },
    ],
    benefits: [
      'Tổng thầu HVAC duy nhất chịu trách nhiệm từ thiết kế đến commissioning, không đùn đẩy trách nhiệm',
      'Tiến độ thi công đáng tin cậy nhờ đội quản lý dự án chuyên HVAC và kho phụ kiện sẵn có',
      'Chất lượng thi công được kiểm soát bởi QA/QC nội bộ và kỹ sư commissioning độc lập',
      'Commissioning đúng chuẩn đảm bảo hệ thống hoạt động ở 95–100% công suất thiết kế',
      'Hồ sơ hoàn công đầy đủ giúp tòa nhà dễ dàng vận hành, bảo trì và xử lý bảo hiểm',
      'Bảo hành 12 tháng sau bàn giao, dịch vụ bảo trì tiếp theo có thể ký hợp đồng dài hạn',
    ],
    faqs: [
      { q: 'FAVE có nhận thầu theo thiết kế của đơn vị tư vấn khác không?', a: 'Có. FAVE nhận thi công theo hồ sơ thiết kế của bất kỳ đơn vị tư vấn nào, với điều kiện hồ sơ đủ chi tiết để lập shop drawing. Nếu hồ sơ chưa đủ chi tiết, FAVE cung cấp dịch vụ lập shop drawing với phí riêng.' },
      { q: 'Thời gian thi công lắp đặt HVAC cho tòa văn phòng 10 tầng là bao lâu?', a: 'Tòa văn phòng 10 tầng với hệ thống VRF thường mất 3–5 tháng thi công. Hệ thống Chiller water-cooled cần 5–7 tháng do lead time thiết bị. FAVE cung cấp tiến độ chi tiết (master schedule) sau khi có hồ sơ thiết kế.' },
      { q: 'Điều kiện bảo hành sau lắp đặt là gì?', a: 'FAVE bảo hành 12 tháng cho toàn bộ công trình lắp đặt sau bàn giao, bao gồm công lao động sửa chữa sự cố do lỗi thi công và linh kiện hỏng trong bảo hành. Thiết bị chính được bảo hành thêm theo chính sách OEM (12–24 tháng).' },
    ],
    relatedServices: [
      { slug: 'thiet-ke-hvac', label: 'Thiết kế hệ thống HVAC', emoji: '📐' },
      { slug: 'cung-cap-thiet-bi', label: 'Cung cấp thiết bị HVAC', emoji: '📦' },
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì sau lắp đặt', emoji: '🔧' },
    ],
  },

  'cung-cap-thiet-bi': {
    titleVi: 'Cung Cấp Thiết Bị HVAC',
    emoji: '📦',
    color: '#457b9d',
    descVi:
      'Cung cấp toàn bộ thiết bị HVAC chính hãng có C/O, C/Q: Chiller (Carrier, Trane, York), VRV/VRF (Daikin, Mitsubishi, Fujitsu), AHU, FCU, quạt công nghiệp, tháp giải nhiệt, thiết bị kiểm soát và linh kiện phụ tùng. Kho hàng thường trực tại Hà Nội, giao hàng trong 24–48 giờ với hàng có sẵn.',
    problems: [
      'Khó xác minh xuất xứ và chất lượng thiết bị HVAC từ nhà cung cấp không chính thức, rủi ro hàng giả kém chất lượng',
      'Lead time thiết bị chính (Chiller, outdoor unit VRF) dài 8–16 tuần nếu không đặt hàng kịp, gây trễ tiến độ',
      'Thiếu tư vấn kỹ thuật khi lựa chọn thiết bị dẫn đến mua sai model, sai công suất hoặc không tương thích',
      'Chính sách bảo hành không rõ ràng khi mua qua nhiều tầng đại lý, khó xử lý khi thiết bị hỏng',
      'Không có nguồn cung linh kiện phụ tùng OEM tin cậy, phải dùng hàng aftermarket kém chất lượng',
    ],
    solutions: [
      'Đại lý chính thức (Authorized Dealer) của Daikin, Carrier và các hãng lớn—thiết bị nhập khẩu trực tiếp, đầy đủ C/O, C/Q',
      'Tư vấn lựa chọn thiết bị miễn phí bởi kỹ sư HVAC: phân tích COP/EER/IPLV, tính toán payback và TCO',
      'Kho thiết bị thường trực tại Hà Nội: FCU, VRF indoor/outdoor unit thông dụng, linh kiện—xuất kho trong 2–4 giờ',
      'Đặt hàng trước cho thiết bị lead time dài: Chiller, AHU tùy chỉnh. FAVE theo dõi tiến độ sản xuất hàng tuần',
      'Hỗ trợ startup và commissioning kỹ thuật sau giao hàng, đảm bảo thiết bị hoạt động đúng thông số',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận yêu cầu & tư vấn', desc: 'Xem xét hồ sơ kỹ thuật (specifications, datasheet yêu cầu). Tư vấn model phù hợp, so sánh phương án từ nhiều hãng nếu cần.' },
      { step: 2, title: 'Báo giá & điều kiện thương mại', desc: 'Phát hành báo giá chi tiết với model number, xuất xứ, điều kiện bảo hành, Incoterms, payment terms và lead time cụ thể.' },
      { step: 3, title: 'Xác nhận đơn hàng & đặt cọc', desc: 'Ký Purchase Order, xác nhận thông số kỹ thuật lần cuối (submittal approval). Đặt cọc theo điều khoản hợp đồng.' },
      { step: 4, title: 'Theo dõi sản xuất & logistics', desc: 'FAVE cập nhật tiến độ sản xuất tại nhà máy, theo dõi lộ trình vận chuyển và thủ tục hải quan nhập khẩu.' },
      { step: 5, title: 'Giao nhận & kiểm tra tại kho', desc: 'Giao hàng đến kho dự án. Kiểm tra số lượng, tình trạng đóng gói, serial number và đối chiếu packing list trước khi ký nhận.' },
      { step: 6, title: 'Hỗ trợ startup & bảo hành', desc: 'Kỹ thuật viên FAVE hỗ trợ startup và commissioning tại công trường. Quản lý hồ sơ bảo hành và xử lý claim với nhà sản xuất.' },
    ],
    benefits: [
      'Thiết bị chính hãng 100% với C/O, C/Q đầy đủ—đảm bảo xuất xứ rõ ràng cho kiểm toán và bảo hiểm',
      'Warranty card chính hãng kích hoạt, hỗ trợ warranty claim trực tiếp với hãng',
      'Tư vấn kỹ thuật miễn phí giúp chọn thiết bị đúng công suất, tiết kiệm CAPEX',
      'Kho linh kiện thường trực đảm bảo nguồn cung cho bảo trì, tránh downtime kéo dài',
      'Một điểm liên hệ (single point of contact) cho cả thiết bị, lắp đặt và bảo trì',
      'Giao hàng đúng hạn theo cam kết hợp đồng, track record >95% on-time delivery với 500+ dự án',
    ],
    faqs: [
      { q: 'FAVE là đại lý chính thức của những hãng HVAC nào?', a: 'FAVE là Authorized Dealer của Daikin (VRV/VRF, FCU, cassette), Carrier (Chiller, AHU, package unit) và là nhà phân phối của Mitsubishi Electric, Fujitsu, Trane, York và nhiều thương hiệu phụ kiện HVAC. Tất cả có hợp đồng đại lý và được hãng xác nhận tại Việt Nam.' },
      { q: 'Thiết bị Chiller có thể đặt hàng theo thông số kỹ thuật tùy chỉnh không?', a: 'Có. Chiller và AHU thường được sản xuất theo đơn đặt hàng với thông số tùy chỉnh: công suất, chủng loại gas lạnh (R134a, R1234ze, R513A), điện áp và tùy chọn inverter. Lead time thông thường 8–16 tuần tùy hãng và model.' },
      { q: 'Điều kiện thanh toán và giao hàng như thế nào?', a: 'Điều kiện thanh toán thông thường: 30–50% đặt cọc khi đặt hàng, phần còn lại trước khi xuất kho. Giao hàng DAP công trình tại Hà Nội và các tỉnh miền Bắc. Giao hàng miền Nam qua đội ngũ FAVE TP.HCM.' },
    ],
    relatedServices: [
      { slug: 'lap-dat-hvac', label: 'Lắp đặt hệ thống HVAC', emoji: '🏗️' },
      { slug: 'thiet-ke-hvac', label: 'Thiết kế hệ thống HVAC', emoji: '📐' },
      { slug: 'bao-tri-dieu-hoa', label: 'Bảo trì sau lắp đặt', emoji: '🔧' },
    ],
  },
}

const DEFAULT_CONTENT = {
  problems: [] as string[],
  solutions: [] as string[],
  process: [] as { step: number; title: string; desc: string }[],
  benefits: [] as string[],
  faqs: [] as { q: string; a: string }[],
  relatedServices: [
    { slug: 'bao-tri-bao-duong', label: 'Bảo trì bảo dưỡng', emoji: '🔧' },
    { slug: 'tu-van-thiet-ke', label: 'Tư vấn thiết kế', emoji: '📐' },
    { slug: 'he-thong-bms', label: 'Hệ thống BMS', emoji: '🖥️' },
  ],
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return []
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params

  const content = SERVICE_CONTENT[slug]

  if (!content) {
    const service = await prisma.service.findUnique({ where: { slug } }).catch(() => null)
    if (!service) notFound()
    const data: ServiceData = {
      titleVi: locale === 'vi' ? service.titleVi : service.titleEn,
      emoji: '⚙️',
      color: '#0066ff',
      descVi: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
      ...DEFAULT_CONTENT,
    }
    return <ServiceDetailContent data={data} slug={slug} />
  }

  return <ServiceDetailContent data={content} slug={slug} />
}

// ================================================================
// SERVICE-SPECIFIC UNIQUE SECTION COMPONENTS
// ================================================================

// 1. BAO-TRI-DIEU-HOA — Timeline Checklist Layout
function BaoTriDieuHoaSection({ data }: { data: ServiceData }) {
  const schedules = [
    {
      freq: 'Hàng tháng',
      emoji: '📅',
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.05)',
      border: 'rgba(37,99,235,0.15)',
      barPct: '100%',
      tasks: [
        'Vệ sinh / thay bộ lọc bụi',
        'Kiểm tra nhiệt độ đầu hút/đẩy',
        'Kiểm tra thông tắc đường nước ngưng',
        'Vệ sinh khay nước ngưng',
        'Ghi nhật ký thông số vận hành',
      ],
    },
    {
      freq: 'Hàng quý',
      emoji: '🔄',
      color: '#ea580c',
      bg: 'rgba(234,88,12,0.05)',
      border: 'rgba(234,88,12,0.15)',
      barPct: '33%',
      tasks: [
        'Đo áp suất gas lạnh R410A/R32',
        'Đo COP thực tế & so sánh thiết kế',
        'Kiểm tra điện trở cách điện motor',
        'Vệ sinh dàn lạnh bằng hóa chất HVAC',
        'Kiểm tra van điện từ & board mạch',
        'Bôi trơn ổ đỡ & kiểm tra dây curoa',
      ],
    },
    {
      freq: 'Hàng năm',
      emoji: '⚙️',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.05)',
      border: 'rgba(124,58,237,0.15)',
      barPct: '10%',
      tasks: [
        'Đại tu toàn bộ hệ thống',
        'Kiểm tra rò rỉ gas toàn bộ',
        'Bổ sung / thay dầu bôi trơn',
        'Kiểm tra board mạch inverter',
        'Cân chỉnh thông số vận hành',
        'Báo cáo tổng kết & khuyến nghị',
      ],
    },
  ]

  const kpis = [
    { icon: <Thermometer size={18} />, label: 'Nhiệt độ ΔT', value: '10–14°C' },
    { icon: <Gauge size={18} />, label: 'COP thực tế', value: '≥ Thiết kế' },
    { icon: <Zap size={18} />, label: 'Dòng điện', value: '< 110% FLA' },
    { icon: <Activity size={18} />, label: 'Áp suất gas', value: 'Trong dải OK' },
  ]

  return (
    <div className="space-y-10">
      {/* Maintenance Schedule */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <ClipboardCheck size={22} className="text-blue-600" />
          Lịch bảo trì chuẩn hóa
        </h2>
        <div className="space-y-4">
          {schedules.map((s) => (
            <div key={s.freq} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">{s.freq}</div>
                  <div className="text-xs text-slate-500">{s.tasks.length} hạng mục kiểm tra</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1.5">Tần suất</div>
                  <div className="h-2 w-28 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full" style={{ width: s.barPct, background: s.color }} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.tasks.map((task, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                    {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI monitoring */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 size={22} className="text-blue-600" />
          Thông số kiểm tra định kỳ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: '#f0f7ff', border: '1px solid rgba(0,102,255,0.1)' }}>
              <div className="flex justify-center mb-2 text-blue-600">{item.icon}</div>
              <div className="text-xs text-slate-500 mb-1">{item.label}</div>
              <div className="font-bold text-slate-900 text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <RefreshCw size={22} className="text-blue-600" />
          Quy trình thực hiện
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.process.map((step) => (
            <div key={step.step} className="flex gap-4 p-5 rounded-xl" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}>
                {step.step}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. BAO-DUONG-CHILLER — Technical Specs + Stats Layout
function BaoDuongChillerSection({ data }: { data: ServiceData }) {
  const stats = [
    { label: 'COP phục hồi', value: '+15–25%', icon: <TrendingUp size={20} />, color: '#16a34a' },
    { label: 'Chi phí điện giảm', value: '12–25%', icon: <Zap size={20} />, color: '#2563eb' },
    { label: 'Tuổi thọ tăng thêm', value: '5–8 năm', icon: <Timer size={20} />, color: '#7c3aed' },
  ]

  const components = [
    { icon: '⚙️', name: 'Máy nén lạnh', checks: ['Phân tích dầu bôi trơn quang phổ', 'Đo dòng điện & rung động', 'Kiểm tra bearing / rotor'] },
    { icon: '❄️', name: 'Bình bay hơi', checks: ['Súc rửa ống trao đổi nhiệt', 'Đo ΔT nước lạnh CHWS/CHWR', 'Kiểm tra áp suất bay hơi'] },
    { icon: '🌊', name: 'Bình ngưng tụ', checks: ['Tẩy cáu khoáng ống ngưng', 'Kiểm tra lưu lượng nước ngưng', 'Đo áp suất ngưng tụ TCond'] },
    { icon: '🖥️', name: 'Điều khiển BMS', checks: ['Hiệu chỉnh sensor nhiệt/áp', 'Kiểm tra board điều khiển', 'Kết nối BMS / BACnet'] },
  ]

  const comparison = [
    { metric: 'COP', before: '3.8 – 4.5', after: '5.5 – 6.5' },
    { metric: 'kWh/TR', before: '0.88 – 0.95', after: '0.68 – 0.75' },
    { metric: 'TCond (°C)', before: '36 – 40°C', after: '30 – 34°C' },
    { metric: 'Nhiệt độ dầu', before: '65 – 70°C', after: '50 – 55°C' },
    { metric: 'Tiếng ồn / rung', before: 'Bất thường', after: 'Bình thường' },
  ]

  return (
    <div className="space-y-10">
      {/* Performance Stats */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <BarChart3 size={22} className="text-blue-600" />
          Hiệu quả sau bảo dưỡng
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-5 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
              <div className="flex justify-center mb-2" style={{ color: s.color }}>{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Check Grid */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Settings size={22} className="text-blue-600" />
          Kiểm tra từng cấu phần Chiller
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {components.map((comp, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.08)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{comp.icon}</span>
                <div className="font-bold text-slate-900">{comp.name}</div>
              </div>
              <ul className="space-y-1.5">
                {comp.checks.map((check, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 size={12} className="text-blue-500 flex-shrink-0" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Table */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Activity size={22} className="text-blue-600" />
          So sánh trước / sau bảo dưỡng
        </h2>
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,102,255,0.1)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,102,255,0.06)' }}>
                <th className="text-left px-4 py-3 font-bold text-slate-700">Thông số</th>
                <th className="text-center px-4 py-3 font-bold text-red-600">🔴 Trước bảo dưỡng</th>
                <th className="text-center px-4 py-3 font-bold text-green-600">🟢 Sau bảo dưỡng</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(0,102,255,0.06)' }}>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.metric}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-mono text-xs">{row.before}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-mono text-xs font-semibold" style={{ background: 'rgba(22,163,74,0.03)' }}>{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 3. SUA-CHUA-HVAC — Emergency Response Layout
function SuaChuaHvacSection({ data }: { data: ServiceData }) {
  const timeline = [
    { icon: '📞', label: 'Báo sự cố', time: '0h', color: '#ef4444' },
    { icon: '⏱️', label: 'Phản hồi', time: '≤ 2h', color: '#f97316' },
    { icon: '🔧', label: 'Kỹ sư tại hiện trường', time: '4–8h', color: '#eab308' },
    { icon: '🔍', label: 'Khắc phục', time: '4–24h', color: '#22c55e' },
    { icon: '✅', label: 'Hoàn thành', time: '≤ 24h', color: '#16a34a' },
  ]

  const statuses = [
    { icon: '🔴', label: 'Sự cố xảy ra', desc: 'Hotline 24/7/365 tiếp nhận' },
    { icon: '🟡', label: 'Đang xử lý', desc: 'Kỹ sư đang tại hiện trường' },
    { icon: '🟢', label: 'Hoàn thành', desc: 'Hệ thống hoạt động bình thường' },
  ]

  const failures = [
    { icon: '⚙️', name: 'Máy nén hỏng', desc: 'Compressor tripped, burn out, seized bearing' },
    { icon: '🔌', name: 'Board inverter lỗi', desc: 'VRV/VRF error code, mất gió cả zone' },
    { icon: '💧', name: 'Rò rỉ gas lạnh', desc: 'R410A/R32 leak, áp suất thấp bất thường' },
    { icon: '❄️', name: 'Dàn lạnh đóng băng', desc: 'Icing, low airflow, clogged filter' },
    { icon: '🌡️', name: 'Không đủ lạnh', desc: 'Poor cooling, high superheat, low COP' },
    { icon: '💨', name: 'Mất gió / ồn rung', desc: 'Fan motor failure, belt broken, vibration' },
  ]

  return (
    <div className="space-y-10">
      {/* Response Timeline */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Clock size={22} className="text-red-600" />
          Quy trình phản hồi khẩn cấp 24/7
        </h2>
        <div className="overflow-x-auto">
          <div className="flex items-start gap-0 min-w-max pb-2">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center text-center w-[100px]">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 shadow-sm" style={{ background: `${item.color}15`, border: `2px solid ${item.color}` }}>
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight mb-1">{item.label}</div>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${item.color}15`, color: item.color }}>{item.time}</div>
                </div>
                {i < timeline.length - 1 && (
                  <div className="mt-6 flex-1 h-0.5 min-w-[20px] mx-1" style={{ background: 'linear-gradient(to right, #e2e8f0, #e2e8f0)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Target size={22} className="text-red-600" />
          Theo dõi trạng thái sự cố
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {statuses.map((s, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: '#f8faff', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-bold text-slate-900 text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Failures Grid */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <AlertTriangle size={22} className="text-orange-500" />
          Các loại sự cố thường gặp
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {failures.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <div className="font-bold text-slate-900 text-sm">{f.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 4. CAI-TAO-NANG-CAP — Before/After Comparison Layout
function CaiTaoNangCapSection({ data }: { data: ServiceData }) {
  const comparisons = [
    { metric: 'COP hệ thống', old: '3.5 – 4.5', newVal: '6.5 – 7.5 (+65%)', improved: true },
    { metric: 'Điều khiển', old: 'ON/OFF thủ công', newVal: 'VFD + BMS AI tối ưu', improved: true },
    { metric: 'Giám sát', old: 'Tại chỗ, mỗi ca', newVal: 'Real-time 24/7 cloud', improved: true },
    { metric: 'Tuổi thọ thiết bị', old: 'Còn 2 – 5 năm', newVal: '15 – 20 năm mới', improved: true },
    { metric: 'Rủi ro sự cố', old: 'Cao (end-of-life)', newVal: 'Thấp (thiết bị mới)', improved: true },
  ]

  const roiMetrics = [
    { icon: <Zap size={20} />, label: 'Tiết kiệm điện', value: '30–50%', color: '#2563eb' },
    { icon: <Timer size={20} />, label: 'Hoàn vốn', value: '2–4 năm', color: '#16a34a' },
    { icon: <TrendingUp size={20} />, label: 'IRR dự án', value: '25–45%', color: '#7c3aed' },
    { icon: <Award size={20} />, label: 'LEED điểm +', value: '15–25', color: '#ea580c' },
  ]

  return (
    <div className="space-y-10">
      {/* Before/After Comparison Table */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <RefreshCw size={22} className="text-orange-500" />
          Hệ thống cũ vs Hệ thống mới
        </h2>
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 font-bold text-slate-700" style={{ background: '#f8faff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>Tiêu chí</th>
                <th className="text-center px-4 py-3 font-bold text-red-600" style={{ background: 'rgba(239,68,68,0.05)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>🔴 Hệ thống cũ</th>
                <th className="text-center px-4 py-3 font-bold text-green-600" style={{ background: 'rgba(22,163,74,0.05)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>🟢 Sau cải tạo</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.metric}</td>
                  <td className="px-4 py-3 text-center text-slate-400 text-xs">{row.old}</td>
                  <td className="px-4 py-3 text-center text-green-700 text-xs font-semibold" style={{ background: 'rgba(22,163,74,0.03)' }}>{row.newVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Metrics */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <BarChart3 size={22} className="text-orange-500" />
          Phân tích ROI & Hiệu quả tài chính
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {roiMetrics.map((m, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
              <div className="flex justify-center mb-2" style={{ color: m.color }}>{m.icon}</div>
              <div className="text-xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-slate-600">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Layers size={22} className="text-orange-500" />
          Quy trình cải tạo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.process.map((step) => (
            <div key={step.step} className="flex gap-4 p-5 rounded-xl" style={{ background: '#fffaf5', border: '1px solid rgba(234,88,12,0.1)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #ea580c, #fb923c)' }}>
                {step.step}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. VE-SINH-CONG-NGHIEP — What We Clean Layout
function VeSinhCongNghiepSection({ data }: { data: ServiceData }) {
  const components = [
    { icon: '🏭', name: 'AHU (Air Handling Unit)', method: 'Pressure wash + alkaline coil cleaner', freq: '6–12 tháng' },
    { icon: '❄️', name: 'FCU dàn lạnh & quạt', method: 'Chemical soak + brush + rinse kỹ', freq: '6–12 tháng' },
    { icon: '💨', name: 'Đường ống gió (Air Duct)', method: 'Robot brush + negative pressure vacuum', freq: '1–2 năm' },
    { icon: '🌊', name: 'Bình ngưng Chiller', method: 'Mechanical tube brush + descaler', freq: '1–2 năm' },
    { icon: '🏗️', name: 'Tháp giải nhiệt', method: 'Chlorine shock + biofilm removal', freq: '6–12 tháng' },
    { icon: '🔍', name: 'Khay nước & hệ thống lọc', method: 'Replace filters + drain pan clean', freq: '3–6 tháng' },
  ]

  const chemicals = [
    { icon: <FlaskConical size={16} />, name: 'Alkaline Coil Cleaner', use: 'Vệ sinh dàn trao đổi nhiệt nhôm/đồng, an toàn với cánh tản nhiệt' },
    { icon: <Droplets size={16} />, name: 'Scale Inhibitor / Descaler', use: 'Tẩy cáu khoáng bình ngưng Chiller và đường ống nước ngưng' },
    { icon: <Shield size={16} />, name: 'Quaternary Ammonium (QAC)', use: 'Khử khuẩn Legionella trong tháp giải nhiệt và bể nước' },
  ]

  const iaqMetrics = [
    { label: 'CO₂', change: '↓ 10–15%', icon: '🌬️' },
    { label: 'PM2.5', change: '↓ 30–50%', icon: '🌫️' },
    { label: 'TVOC', change: '↓ 20–40%', icon: '🧪' },
    { label: 'Legionella', change: 'Not detected', icon: '🦠' },
  ]

  return (
    <div className="space-y-10">
      {/* Component Grid */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Layers size={22} className="text-teal-600" />
          Phạm vi vệ sinh toàn hệ thống
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {components.map((comp, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(42,157,143,0.04)', border: '1px solid rgba(42,157,143,0.12)' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{comp.icon}</span>
                <div className="font-bold text-slate-900 text-sm">{comp.name}</div>
              </div>
              <div className="text-xs text-slate-500 mb-2">
                Phương pháp: <span className="text-slate-700">{comp.method}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(42,157,143,0.1)', color: '#2a9d8f' }}>
                <Clock size={10} /> {comp.freq}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IAQ Metrics */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Activity size={22} className="text-teal-600" />
          Cải thiện chất lượng không khí (IAQ) sau vệ sinh
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {iaqMetrics.map((m, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(42,157,143,0.05)', border: '1px solid rgba(42,157,143,0.15)' }}>
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="font-bold text-slate-900 text-sm mb-1">{m.label}</div>
              <div className="text-xs font-semibold" style={{ color: '#2a9d8f' }}>{m.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chemicals */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <FlaskConical size={22} className="text-teal-600" />
          Hóa chất chuyên dụng HVAC-grade
        </h2>
        <div className="space-y-3">
          {chemicals.map((c, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#f0fdfa', border: '1px solid rgba(42,157,143,0.15)' }}>
              <div className="mt-0.5" style={{ color: '#2a9d8f' }}>{c.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.use}</div>
              </div>
              <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#2a9d8f' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 6. THIET-KE-HVAC — Engineering Process Layout
function ThietKeHvacSection({ data }: { data: ServiceData }) {
  const tools = [
    { icon: '📊', name: 'Carrier HAP', version: 'v5.11', desc: 'Tính toán tải nhiệt & mô phỏng năng lượng theo giờ' },
    { icon: '📐', name: 'AutoCAD MEP', version: '2024', desc: 'Bản vẽ 2D cấu trúc đường ống, duct, thiết bị' },
    { icon: '🏗️', name: 'Revit MEP', version: '2024', desc: 'Mô hình BIM 3D, clash detection tự động' },
    { icon: '📈', name: 'Trane TRACE 700', version: 'v6.3', desc: 'Tối ưu hóa hệ thống, phân tích life-cycle cost' },
  ]

  const deliverables = [
    'Bản vẽ thi công AutoCAD MEP (2D) hoặc Revit MEP (3D)',
    'Thuyết minh tính toán tải nhiệt bằng HAP / TRACE 700',
    'Bảng thống kê khối lượng (BOQ) chi tiết, dự toán',
    'Specification thiết bị & tiêu chuẩn kỹ thuật đầy đủ',
    'Sơ đồ điều khiển DDC / BACnet / BMS integration',
    'Energy Model theo ASHRAE 90.1 Appendix G',
    'Hồ sơ xin phép xây dựng theo NĐ 15/2021/NĐ-CP',
    'O&M Manual tiếng Việt sau khi commissioning',
  ]

  return (
    <div className="space-y-10">
      {/* Software Tools */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Cpu size={22} className="text-purple-600" />
          Công cụ thiết kế chuyên nghiệp
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(106,13,173,0.04)', border: '1px solid rgba(106,13,173,0.12)' }}>
              <span className="text-3xl flex-shrink-0">{tool.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-slate-900">{tool.name}</div>
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-mono" style={{ background: 'rgba(106,13,173,0.1)', color: '#6a0dad' }}>{tool.version}</span>
                </div>
                <div className="text-xs text-slate-500">{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Deliverables */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <ClipboardCheck size={22} className="text-purple-600" />
          Hồ sơ thiết kế bàn giao
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-xl text-sm text-slate-700" style={{ background: 'rgba(106,13,173,0.03)', border: '1px solid rgba(106,13,173,0.08)' }}>
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#6a0dad' }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Design Process */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Layers size={22} className="text-purple-600" />
          Quy trình thiết kế
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.process.map((step) => (
            <div key={step.step} className="flex gap-4 p-5 rounded-xl" style={{ background: '#faf5ff', border: '1px solid rgba(106,13,173,0.08)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6a0dad, #9333ea)' }}>
                {step.step}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 7. LAP-DAT-HVAC — Project Timeline Layout
function LapDatHvacSection({ data }: { data: ServiceData }) {
  const phases = [
    {
      num: '01',
      name: 'Thi công phần ngầm & kết cấu đỡ',
      duration: '2–4 tuần',
      color: '#e76f51',
      activities: ['Lắp hanger & support cho duct/ống', 'Đi ống đồng refrigerant trong tường', 'Ống nước CHW/CW trong sàn & giếng kỹ thuật'],
    },
    {
      num: '02',
      name: 'Lắp đặt thiết bị chính',
      duration: '2–4 tuần',
      color: '#f4a261',
      activities: ['Cẩu lắp Chiller / AHU tại phòng máy', 'Lắp FCU, indoor unit VRF tại các tầng', 'Lắp cooling tower trên mái'],
    },
    {
      num: '03',
      name: 'Kết nối & đấu nối hoàn chỉnh',
      duration: '1–2 tuần',
      color: '#2a9d8f',
      activities: ['Đấu nối điện điều khiển & panel', 'Kết nối BMS / DDC / BACnet', 'Đấu ống gió & flex duct tại đầu cuối'],
    },
    {
      num: '04',
      name: 'Commissioning & TAB',
      duration: '1–2 tuần',
      color: '#2563eb',
      activities: ['Pressure test đường ống refrigerant 450 psi', 'Nạp gas lạnh theo trọng lượng (cân điện tử)', 'TAB lưu lượng gió & nước theo thiết kế'],
    },
    {
      num: '05',
      name: 'Nghiệm thu & Bàn giao',
      duration: '1 tuần',
      color: '#16a34a',
      activities: ['Nghiệm thu với PMC & chủ đầu tư', 'Đào tạo vận hành đội kỹ thuật tòa nhà', 'Bàn giao hồ sơ hoàn công đầy đủ'],
    },
  ]

  const qcPoints = [
    { code: 'QC-1', label: 'Pressure Test', desc: 'Test 450 psi nitrogen 24h' },
    { code: 'QC-2', label: 'Flushing', desc: 'Súc rửa sạch đường ống nước' },
    { code: 'QC-3', label: 'TAB', desc: 'Cân bằng lưu lượng gió/nước' },
    { code: 'QC-4', label: 'Performance', desc: '95–100% công suất thiết kế' },
  ]

  return (
    <div className="space-y-10">
      {/* Project Phases */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <CalendarDays size={22} className="text-orange-600" />
          Tiến độ thi công theo giai đoạn
        </h2>
        <div className="space-y-3">
          {phases.map((phase) => (
            <div key={phase.num} className="rounded-2xl p-5" style={{ background: `${phase.color}06`, border: `1px solid ${phase.color}20` }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: phase.color }}>
                  {phase.num}
                </div>
                <div className="flex-1 font-bold text-slate-900">{phase.name}</div>
                <div className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${phase.color}15`, color: phase.color }}>
                  <Clock size={11} />
                  {phase.duration}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pl-14">
                {phase.activities.map((act, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded-full text-slate-600" style={{ background: 'rgba(0,0,0,0.04)' }}>
                    ✓ {act}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Checkpoints */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck size={22} className="text-orange-600" />
          Điểm kiểm tra chất lượng (QC)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {qcPoints.map((qc, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(231,111,81,0.05)', border: '1px solid rgba(231,111,81,0.15)' }}>
              <div className="font-mono font-black text-sm mb-1" style={{ color: '#e76f51' }}>{qc.code}</div>
              <div className="font-bold text-slate-900 text-sm mb-1">{qc.label}</div>
              <div className="text-xs text-slate-500">{qc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty Summary */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(22,163,74,0.05)', border: '1px solid rgba(22,163,74,0.15)' }}>
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} className="text-green-600" />
          <h3 className="font-bold text-slate-900">Điều kiện bảo hành sau bàn giao</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Công trình thi công', value: '12 tháng sau bàn giao' },
            { label: 'Thiết bị chính (OEM)', value: '12–24 tháng theo hãng' },
            { label: 'Hỗ trợ kỹ thuật', value: '24/7 trong thời gian bảo hành' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-slate-500 mb-1">{item.label}</div>
              <div className="font-bold text-green-700 text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 8. CUNG-CAP-THIET-BI — Product Catalog Style Layout
function CungCapThietBiSection({ data }: { data: ServiceData }) {
  const brands = [
    { abbr: 'DAI', name: 'Daikin', country: '🇯🇵 Nhật Bản', products: 'VRV/VRF, FCU, Cassette, Chiller', type: 'Authorized Dealer', color: '#0047ab' },
    { abbr: 'MHI', name: 'Mitsubishi Electric', country: '🇯🇵 Nhật Bản', products: 'City Multi VRF, AHU, FCU Split', type: 'Distributor', color: '#c0392b' },
    { abbr: 'CAR', name: 'Carrier', country: '🇺🇸 Hoa Kỳ', products: 'Chiller, AHU, Package Unit', type: 'Authorized Dealer', color: '#1a56db' },
    { abbr: 'YRK', name: 'York / JCI', country: '🇺🇸 Hoa Kỳ', products: 'Chiller, AHU, HVAC Controls', type: 'Distributor', color: '#e74c3c' },
    { abbr: 'TRN', name: 'Trane', country: '🇺🇸 Hoa Kỳ', products: 'Chiller, AHU, Tracer BAS', type: 'Distributor', color: '#27ae60' },
    { abbr: 'CPL', name: 'Copeland / Emerson', country: '🇺🇸 Hoa Kỳ', products: 'Scroll & Screw Compressor OEM', type: 'Distributor', color: '#8e44ad' },
  ]

  const categories = [
    { icon: '❄️', name: 'Chiller Plant', desc: '50 – 2,000 TR, water-cooled / air-cooled, screw, centrifugal, inverter' },
    { icon: '🌀', name: 'VRV / VRF System', desc: '2 – 20HP outdoor unit, heat pump, heat recovery, multi-zone' },
    { icon: '💨', name: 'AHU / FCU / Cassette', desc: 'Custom AHU, fan coil, cassette, ceiling mounted, floor standing' },
    { icon: '🖥️', name: 'Controls & BMS Parts', desc: 'DDC controller, sensor, actuator, BACnet gateway, BMS components' },
  ]

  return (
    <div className="space-y-10">
      {/* Brand Grid */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Star size={22} className="text-blue-600" />
          Thương hiệu chính hãng được cung cấp
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: '#f8faff', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xs text-center flex-shrink-0" style={{ background: brand.color }}>
                {brand.abbr}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="font-bold text-slate-900 text-sm">{brand.name}</div>
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>{brand.type}</span>
                </div>
                <div className="text-xs text-slate-500 mb-0.5">{brand.country}</div>
                <div className="text-xs text-slate-600">{brand.products}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Package size={22} className="text-blue-600" />
          Danh mục sản phẩm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.1)' }}>
              <span className="text-3xl flex-shrink-0">{cat.icon}</span>
              <div>
                <div className="font-bold text-slate-900 mb-1">{cat.name}</div>
                <div className="text-xs text-slate-500">{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genuine Guarantee Badge */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,102,255,0.03))', border: '1px solid rgba(0,102,255,0.15)' }}>
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck size={24} className="text-blue-600" />
          <h3 className="font-black text-slate-900 text-lg">Cam kết hàng chính hãng 100%</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📄', label: 'C/O & C/Q đầy đủ', desc: 'Chứng nhận xuất xứ & chất lượng từ nhà sản xuất' },
            { icon: '🏷️', label: 'Warranty Card kích hoạt', desc: 'Warranty claim trực tiếp với hãng khi có sự cố' },
            { icon: '📦', label: 'Nguyên đai nguyên kiện', desc: 'Không tái chế, không refurbished, không hàng cũ' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-bold text-slate-900 text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-green-600" />
          Lợi ích khi chọn FAVE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// DEFAULT — Generic Layout for non-specific services
function DefaultMainSection({ data }: { data: ServiceData }) {
  return (
    <div className="space-y-12">
      {data.problems.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-5">🎯 Vấn đề khách hàng thường gặp</h2>
          <ul className="space-y-3">
            {data.problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.08)' }}>
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                <span className="text-slate-600 text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.solutions.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-5">✅ Giải pháp từ FAVE</h2>
          <ul className="space-y-3">
            {data.solutions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.08)' }}>
                <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.process.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">🔄 Quy trình thực hiện</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.process.map((step) => (
              <div key={step.step} className="flex gap-4 p-5 rounded-xl" style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}>
                  {step.step}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.benefits.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-5">💡 Lợi ích khi chọn FAVE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                {b}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// DISPATCHER — Routes to the correct unique section per slug
function UniqueServiceSection({ slug, data }: { slug: string; data: ServiceData }) {
  if (slug === 'bao-tri-dieu-hoa') return <BaoTriDieuHoaSection data={data} />
  if (slug === 'bao-duong-chiller') return <BaoDuongChillerSection data={data} />
  if (slug === 'sua-chua-hvac') return <SuaChuaHvacSection data={data} />
  if (slug === 'cai-tao-nang-cap') return <CaiTaoNangCapSection data={data} />
  if (slug === 've-sinh-cong-nghiep') return <VeSinhCongNghiepSection data={data} />
  if (slug === 'thiet-ke-hvac') return <ThietKeHvacSection data={data} />
  if (slug === 'lap-dat-hvac') return <LapDatHvacSection data={data} />
  if (slug === 'cung-cap-thiet-bi') return <CungCapThietBiSection data={data} />
  return <DefaultMainSection data={data} />
}

// ================================================================
// MAIN LAYOUT SHELL (shared: breadcrumb, hero, sidebar, FAQ)
// ================================================================
function ServiceDetailContent({ data, slug }: { data: ServiceData; slug: string }) {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Hero */}
      <section
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}
      >
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6"
              style={{ background: `${data.color}15` }}
            >
              {data.emoji}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {data.titleVi}
            </h1>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
              {data.descVi}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/lien-he" className="btn-primary text-sm">
                <Phone size={15} /> Liên hệ báo giá <ArrowRight size={14} />
              </Link>
              <a href="tel:0981907109" className="btn-outline text-sm">
                0981 907 109
              </a>
              <a
                href="/files/ho-so-nang-luc-fave.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-white/45 hover:text-white/70 text-sm font-medium transition-colors"
              >
                <Download size={14} />
                Hồ sơ năng lực
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content — 2/3 width */}
          <div className="lg:col-span-2 space-y-12">

            {/* Unique service section (different for each slug) */}
            <UniqueServiceSection slug={slug} data={data} />

            {/* FAQs — always shown */}
            {data.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  ❓ Câu hỏi thường gặp
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{ border: '1px solid rgba(0,102,255,0.08)', background: 'rgba(0,102,255,0.02)' }}
                    >
                      <h3 className="font-bold text-slate-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-5">
            {/* Contact card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'linear-gradient(160deg, #0a1628, #0d2040)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-bold text-white text-lg mb-2">Liên hệ tư vấn miễn phí</h3>
              <p className="text-white/50 text-sm mb-6">Kỹ sư FAVE tư vấn và báo giá trong 24h làm việc</p>
              <div className="space-y-2">
                <a
                  href="tel:0981907109"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors"
                >
                  <Phone size={15} /> 0981 907 109
                </a>
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Gửi yêu cầu <ArrowRight size={14} />
                </Link>
                <a
                  href="/files/ho-so-nang-luc-fave.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-white/50 text-sm transition-colors hover:text-white/80"
                >
                  <Download size={14} /> Tải hồ sơ năng lực
                </a>
              </div>
            </div>

            {/* Related services */}
            <div
              className="rounded-2xl p-5"
              style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}
            >
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Dịch vụ liên quan</h3>
              <ul className="space-y-2">
                {data.relatedServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/dich-vu/${item.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={14} className="ml-auto opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why FAVE */}
            <div className="rounded-2xl p-5" style={{ border: '1px solid rgba(0,102,255,0.1)', background: 'rgba(0,102,255,0.02)' }}>
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Tại sao chọn FAVE?</h3>
              {[
                '✅ 10+ năm kinh nghiệm HVAC',
                '✅ ISO 9001:2015',
                '✅ Đại lý Daikin & Carrier',
                '✅ Đội ngũ 100+ kỹ sư',
                '✅ Bảo hành 12 tháng',
              ].map((item, i) => (
                <div key={i} className="text-sm text-slate-600 py-1.5 border-b border-slate-100 last:border-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}