import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, Phone, ArrowRight, ChevronRight, Download } from 'lucide-react'
import prisma from '@/lib/prisma'

type Props = { params: Promise<{ locale: string; slug: string }> }

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

const SERVICE_CONTENT: Record<string, {
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
}> = {
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
      { slug: 'thiet-ke-hvac', label: 'Thiết kế HVAC', emoji: '🔧' },
      { slug: 'lap-dat-hvac', label: 'Lắp đặt HVAC', emoji: '📐' },
      { slug: 'cung-cap-thiet-bi', label: 'Cung cấp thiết bị', emoji: '🖥️' },
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
      { slug: 've-sinh-cong-nghiep', label: 'Vệ sinh công nghiệp', emoji: '🧪' },
      { slug: 'thiet-ke-hvac', label: 'Thiết kế HVAC', emoji: '🔧' },
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
      'Sự cố dừng máy đột ngột giữa giờ cao điểm gây ảnh hưởng trực tiếp đến hoạt động văn phòng, SLA thuê tòa nhà và trải nghiệm khách hàng tại TTTM',
      'Thiếu nhật ký bảo trì chuẩn hóa khiến facility manager khó chứng minh tuân thủ với đơn vị bảo hiểm và đơn vị quản lý tòa nhà',
      'Nước ngưng tụ tràn hoặc rò rỉ gas lạnh R410A gây hư hỏng nội thất, tiềm ẩn nguy cơ cháy nổ và vi phạm quy định môi trường',
      'Chi phí sửa chữa đột xuất cao hơn 3–5 lần so với bảo trì phòng ngừa có kế hoạch do phải thay thế linh kiện khẩn cấp',
    ],
    solutions: [
      'Lập lịch bảo trì định kỳ theo chuẩn ASHRAE 180 và khuyến nghị OEM (Daikin, Carrier, Trane), tần suất tối ưu theo tải vận hành thực tế',
      'Kiểm tra và hiệu chỉnh áp suất gas lạnh R410A/R32, đo COP thực tế và đối chiếu với thông số thiết kế để phát hiện suy giảm sớm',
      'Vệ sinh cụm dàn lạnh, dàn nóng bằng máy rửa áp lực cao và hóa chất chuyên dụng HVAC-grade; súc rửa đường ống nước ngưng',
      'Phát hành báo cáo kỹ thuật sau mỗi lần bảo trì kèm ảnh hiện trạng, thông số đo lường và khuyến nghị khắc phục theo thứ tự ưu tiên',
      'Tích hợp giám sát IoT qua cảm biến nhiệt độ/áp suất để cảnh báo sớm bất thường trước khi xảy ra sự cố, giảm OPEX tổng thể',
    ],
    process: [
      { step: 1, title: 'Ký hợp đồng & lập kế hoạch', desc: 'Khảo sát inventorying toàn bộ thiết bị, xác định tần suất bảo trì và SLA theo từng loại dịch vụ. Lập lịch năm chi tiết.' },
      { step: 2, title: 'Bảo trì tháng 1 & baseline', desc: 'Đo đạc thông số gốc: áp suất gas, nhiệt độ đầu hút/đầu đẩy, dòng điện động cơ, lưu lượng gió. Lập hồ sơ thiết bị.' },
      { step: 3, title: 'Vệ sinh & hiệu chỉnh', desc: 'Vệ sinh bộ lọc, dàn trao đổi nhiệt, kiểm tra điện cách điện, bôi trơn ổ đỡ, kiểm tra van điện từ và board mạch điều khiển.' },
      { step: 4, title: 'Kiểm tra an toàn', desc: 'Test bảo vệ quá nhiệt, quá dòng, áp suất cao/thấp. Kiểm tra kết nối điện, tiếp đất và chống sét theo QCVN.' },
      { step: 5, title: 'Báo cáo kỹ thuật', desc: 'Phát hành Service Report ghi nhận toàn bộ hạng mục đã thực hiện, thông số đo và bất thường phát hiện kèm ảnh chụp.' },
      { step: 6, title: 'Theo dõi & hỗ trợ 24/7', desc: 'Hotline kỹ thuật 24/7, phản hồi trong 4 giờ với sự cố khẩn cấp. Báo cáo tổng kết quý và đề xuất cải tiến.' },
    ],
    benefits: [
      'Giảm 20–30% chi phí điện năng nhờ duy trì COP ở mức thiết kế quanh năm',
      'Tăng MTBF (Mean Time Between Failures) lên 2–3 lần so với không bảo trì định kỳ',
      'Tuổi thọ thiết bị kéo dài từ 10 năm lên 15–18 năm khi bảo trì chuẩn OEM',
      'SLA cam kết: phản hồi trong 4 giờ, hoàn thành xử lý sự cố trong 24 giờ với linh kiện thông thường',
      'Hồ sơ bảo trì chuẩn hóa đáp ứng yêu cầu kiểm toán ISO 50001 và bảo hiểm tài sản',
      'Phát hiện và xử lý rò rỉ gas lạnh đúng quy trình, tuân thủ nghị định quản lý chất làm lạnh',
    ],
    faqs: [
      { q: 'Tần suất bảo trì hệ thống VRV/VRF và FCU là bao nhiêu?', a: 'Theo ASHRAE 180 và khuyến nghị Daikin/Mitsubishi, bảo trì tối thiểu 2 lần/năm với FCU văn phòng và 4 lần/năm với VRV/VRF tải nặng. FAVE tư vấn tần suất tối ưu dựa trên giờ vận hành thực tế và điều kiện môi trường cụ thể.' },
      { q: 'FAVE có cung cấp hợp đồng bảo trì toàn diện (full-service) không?', a: 'Có. Gói Full-Service bao gồm toàn bộ nhân công bảo trì định kỳ, linh kiện tiêu hao (bộ lọc, dầu bôi trơn), ứng phó sự cố 24/7 và thay thế linh kiện thông thường trong phạm vi hợp đồng. Giúp facility manager kiểm soát OPEX với chi phí cố định hàng năm.' },
      { q: 'Báo cáo bảo trì có thể dùng để nộp cho đơn vị bảo hiểm không?', a: 'Báo cáo của FAVE được chuẩn hóa theo format kỹ thuật, có chữ ký kỹ sư có chứng chỉ và ảnh hiện trạng timestamp. Được các công ty bảo hiểm lớn như PTI, Bảo Việt chấp nhận trong hồ sơ bồi thường thiết bị.' },
      { q: 'FAVE xử lý gas lạnh rò rỉ như thế nào theo quy định môi trường?', a: 'FAVE sử dụng máy phát hiện rò rỉ điện tử độ nhạy 5g/năm và thiết bị thu hồi gas đạt chuẩn EPA 608. Toàn bộ lượng gas thu hồi được xử lý đúng quy trình, tránh xả trực tiếp ra môi trường theo Nghị định 06/2022/NĐ-CP.' },
      { q: 'SLA phản hồi sự cố là bao lâu?', a: 'Cam kết trong hợp đồng: 4 giờ phản hồi điện thoại/email, 8 giờ có kỹ sư tại hiện trường đối với sự cố Priority 1 (dừng toàn hệ thống). Sự cố Priority 2 (giảm hiệu suất) hoàn thành trong 24–48 giờ.' },
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
      'Hiệu suất Chiller suy giảm do cáu bám trong bình bay hơi (evaporator) và bình ngưng (condenser), làm tăng chi phí điện 15–25% so với thông số thiết kế',
      'Máy nén lạnh hoạt động quá tải hoặc bị trip do thiếu dầu bôi trơn, áp suất gas lạnh ngoài dải cho phép hoặc bộ lọc dầu tắc nghẽn',
      'Hệ thống BMS/BAS không nhận cảnh báo kịp thời, dẫn đến sự cố dừng máy đột ngột trong giờ cao điểm gây tổn thất vận hành nghiêm trọng',
      'Tháp giải nhiệt (cooling tower) đóng cặn sinh học và khoáng chất, lưu lượng nước ngưng giảm làm tăng nhiệt độ đầu thải (LCT) lên 3–5°C, kéo theo tăng kWh/TR đáng kể',
      'Thiếu nhật ký bảo dưỡng chuẩn theo ASHRAE 180, khó chứng minh tuân thủ với đơn vị bảo hiểm thiết bị và khó lập kế hoạch vốn thay thế (CAPEX planning)',
    ],
    solutions: [
      'Đánh giá hiệu suất Chiller định kỳ theo chuẩn ASHRAE 180 Standard Inspection and Maintenance cho Commercial Building HVAC Systems',
      'Phân tích dầu bôi trơn máy nén bằng phương pháp quang phổ, phát hiện kim loại mài mòn sớm trước khi gây hỏng bearing hoặc screw rotor',
      'Súc rửa ống bình ngưng và bình bay hơi bằng thiết bị làm sạch cơ học (tube brush) và hóa chất tẩy cáu chuyên dụng scale inhibitor',
      'Kiểm tra và hiệu chỉnh toàn bộ thông số vận hành: áp suất hút/đẩy, subcooling, superheat, dòng điện máy nén, lưu lượng nước ngưng/nước lạnh',
      'Cung cấp báo cáo Performance Assessment với xu hướng kWh/TR theo thời gian, so sánh với thiết kế gốc và đề xuất cải tiến có ROI cụ thể',
    ],
    process: [
      { step: 1, title: 'Khảo sát & lập kế hoạch bảo dưỡng', desc: 'Thu thập hồ sơ kỹ thuật Chiller, lịch sử vận hành và sự cố. Lên kế hoạch bảo dưỡng năm với khung thời gian phù hợp lịch thấp điểm của tòa nhà.' },
      { step: 2, title: 'Kiểm tra trước khi dừng máy (Pre-shutdown)', desc: 'Log toàn bộ thông số vận hành thực tế: CHWS/CHWR temp, CWS/CWR temp, kW, kWh/TR, rung động, tiếng ồn bất thường. So sánh với baseline.' },
      { step: 3, title: 'Kiểm tra hệ thống điện & điều khiển', desc: 'Kiểm tra điện trở cách điện động cơ máy nén, kiểm tra contactor, relay bảo vệ, cầu chì, board điều khiển và kết nối BMS. Hiệu chỉnh sensor nhiệt độ và áp suất.' },
      { step: 4, title: 'Bảo dưỡng cơ khí & trao đổi nhiệt', desc: 'Súc rửa ống ngưng, kiểm tra nước xử lý tháp giải nhiệt, thay thế dầu/bộ lọc dầu, kiểm tra phớt trục (shaft seal) và van an toàn áp suất.' },
      { step: 5, title: 'Nạp gas & hiệu chỉnh vận hành', desc: 'Kiểm tra rò rỉ gas bằng máy điện tử độ nhạy cao, bổ sung gas lạnh đúng chủng loại (R134a/R1234ze/R513A), hiệu chỉnh van tiết lưu điện tử EEV.' },
      { step: 6, title: 'Nghiệm thu & báo cáo Performance', desc: 'Vận hành thử nghiệm toàn tải và bán tải, ghi nhận kWh/TR sau bảo dưỡng. Phát hành Chiller Performance Report kèm đề xuất cải tiến.' },
    ],
    benefits: [
      'Khôi phục COP thiết kế, giảm chi phí điện 12–25% so với trước bảo dưỡng đã được xác nhận bằng data logger',
      'Phát hiện sớm mài mòn máy nén qua phân tích dầu, ngăn ngừa sự cố catastrophic failure trị giá hàng trăm triệu đồng',
      'Kéo dài tuổi thọ Chiller thêm 5–8 năm so với vận hành không bảo dưỡng đúng chuẩn',
      'Hồ sơ bảo dưỡng chuẩn ASHRAE đáp ứng yêu cầu kiểm toán năng lượng ISO 50001 và bảo hiểm thiết bị công nghiệp',
      'Giảm nguy cơ dừng máy không kế hoạch (unplanned downtime) xuống <1% thời gian vận hành mỗi năm',
      'Dịch vụ khẩn cấp 24/7 với kỹ sư chuyên Chiller có mặt trong 8 giờ tại Hà Nội và TP.HCM',
    ],
    faqs: [
      { q: 'Tần suất bảo dưỡng Chiller water-cooled tiêu chuẩn là bao nhiêu?', a: 'ASHRAE 180 khuyến nghị kiểm tra toàn diện (Level 2) ít nhất 1 lần/năm và kiểm tra cơ bản (Level 1) mỗi quý. Với Chiller vận hành >16 giờ/ngày như data center hoặc bệnh viện, FAVE khuyến nghị bảo dưỡng toàn diện 2 lần/năm để duy trì warranty từ nhà sản xuất.' },
      { q: 'Chiller bị sự cố ngoài giờ hành chính, FAVE có hỗ trợ khẩn cấp không?', a: 'Có. FAVE có đội kỹ thuật trực 24/7/365 với cam kết phản hồi trong 2 giờ và có mặt tại hiện trường trong 8 giờ tại Hà Nội và các tỉnh lân cận. Khách hàng hợp đồng bảo trì được ưu tiên dispatch trước.' },
      { q: 'FAVE xử lý gas lạnh R134a thu hồi từ Chiller như thế nào?', a: 'FAVE sử dụng máy thu hồi gas (recovery unit) đạt tiêu chuẩn EPA 608 Section 608 Technician Certification. Gas thu hồi được lưu trữ trong bình chứa có nhãn đúng quy định và xử lý qua đơn vị tái chế được cấp phép, không xả thẳng ra môi trường theo Nghị định 06/2022/NĐ-CP.' },
      { q: 'Chi phí bảo dưỡng Chiller hàng năm thường là bao nhiêu?', a: 'Chi phí phụ thuộc vào công suất, loại Chiller và tần suất bảo dưỡng. Thông thường dao động từ 15–25 triệu đồng/lần cho Chiller 200–500TR (chưa bao gồm vật tư thay thế). FAVE cung cấp báo giá cụ thể sau khảo sát miễn phí.' },
      { q: 'Phân tích dầu máy nén Chiller có cần thiết không?', a: 'Rất cần thiết với Chiller screw compressor và centrifugal compressor. Phân tích quang phổ dầu phát hiện các hạt kim loại mài mòn từ bearing và rotor, cho phép dự đoán hỏng hóc trước 3–6 tháng. Chi phí phân tích dầu chỉ khoảng 2–3 triệu nhưng tiết kiệm rủi ro sự cố máy nén trị giá hàng tỷ đồng.' },
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
      'Máy nén lạnh (compressor) hỏng đột ngột do quá tải, thiếu bôi trơn hoặc surge—chi phí thay thế máy nén lớn nếu không có kỹ thuật viên chuyên sâu',
      'Board mạch inverter VRV/VRF lỗi khiến cả zone bị mất điều hòa; mã lỗi phức tạp đòi hỏi thiết bị chẩn đoán chuyên dụng của từng hãng',
      'Rò rỉ đường ống nước lạnh (CHW) hoặc nước ngưng gây hư hỏng trần thạch cao, sàn và thiết bị điện bên dưới',
      'Hệ thống BMS mất kết nối với HVAC do lỗi giao thức BACnet/Modbus, gây mất kiểm soát điều phối toàn tòa nhà',
      'Thiếu linh kiện chính hãng tại Việt Nam dẫn đến thời gian chờ sửa chữa kéo dài, tổn thất vận hành theo ngày',
    ],
    solutions: [
      'Chẩn đoán lỗi bằng thiết bị chuyên dụng từng hãng: Daikin Service Tool, Carrier Service Assistant, Trane Tracer TU—xác định chính xác nguyên nhân trước khi can thiệp',
      'Kho linh kiện dự phòng tại Hà Nội và TP.HCM: board inverter, compressor 5–50HP, EEV, cảm biến áp suất/nhiệt độ, van solenoid—xuất kho trong 2–4 giờ',
      'Đội thợ ống nước chuyên HVAC sửa chữa rò rỉ đường ống CHW/CW, hàn TIG inert gas cho ống đồng refrigerant theo tiêu chuẩn ASTM B88',
      'Kỹ sư BMS/Controls tích hợp lại giao thức BACnet MS/TP, Modbus RTU/TCP, LON và kết nối lại với SCADA/BMS của tòa nhà',
      'Cam kết cấp phép working permit và VSMT, làm việc ngoài giờ hành chính để giảm thiểu gián đoạn hoạt động văn phòng',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận & phân loại sự cố', desc: 'Hotline 24/7 tiếp nhận thông tin sự cố. Phân loại Priority 1/2/3 theo mức độ ảnh hưởng. Dispatch kỹ sư phù hợp chuyên môn trong vòng 2 giờ.' },
      { step: 2, title: 'Chẩn đoán kỹ thuật tại hiện trường', desc: 'Sử dụng thiết bị chẩn đoán chuyên dụng: oscilloscope, analyser đa năng, máy phát hiện rò rỉ điện tử, camera nhiệt IR để xác định nguyên nhân gốc rễ.' },
      { step: 3, title: 'Báo giá sửa chữa', desc: 'Phát hành báo giá tức thì cho hạng mục sửa chữa đã xác định. Linh kiện chính hãng kèm C/O, C/Q. Khách hàng duyệt trước khi thực hiện.' },
      { step: 4, title: 'Thực hiện sửa chữa', desc: 'Thi công theo quy trình kỹ thuật chính hãng. Với gas lạnh: thu hồi đúng quy định, nạp lại theo trọng lượng bằng cân điện tử. Kiểm tra rò rỉ sau nạp.' },
      { step: 5, title: 'Kiểm tra & chạy thử', desc: 'Vận hành thử nghiệm toàn tải 30–60 phút, ghi nhận các thông số vận hành, so sánh với baseline. Đảm bảo hệ thống ổn định trước khi bàn giao.' },
      { step: 6, title: 'Bàn giao & bảo hành sửa chữa', desc: 'Phát hành Service Report mô tả chi tiết nguyên nhân, hạng mục đã thực hiện và linh kiện thay thế. Bảo hành công trình sửa chữa 3–6 tháng.' },
    ],
    benefits: [
      'Thời gian phục hồi hệ thống (MTTR) trung bình dưới 8 giờ cho sự cố thông thường với linh kiện có sẵn trong kho',
      'Chẩn đoán chính xác bằng thiết bị chuyên dụng, tránh sửa chữa thừa và chi phí không cần thiết',
      'Linh kiện chính hãng có C/O, C/Q đảm bảo tương thích và duy trì warranty nhà sản xuất',
      'Kỹ sư được đào tạo và cấp chứng chỉ bởi Daikin, Carrier, Trane và Mitsubishi Electric tại Việt Nam',
      'Dịch vụ 24/7/365 kể cả ngày lễ Tết—phù hợp với tòa nhà, bệnh viện và data center vận hành liên tục',
      'Bảo hành sửa chữa 3–6 tháng, hỗ trợ lập hồ sơ bảo hiểm thiết bị khi có yêu cầu',
    ],
    faqs: [
      { q: 'Máy nén Chiller hỏng hoàn toàn, FAVE có thể sửa chữa hay chỉ thay mới?', a: 'Tùy mức độ hư hỏng. Với máy nén scroll/screw bị vỡ bearing hoặc burn out motor, thường cần thay mới. FAVE cung cấp lựa chọn: máy nén chính hãng mới (OEM), máy nén tái chế có kiểm định (remanufactured), hoặc nâng cấp sang model hiệu suất cao hơn. Báo giá cả 3 phương án để khách hàng quyết định theo ngân sách.' },
      { q: 'Lỗi board inverter VRV/VRF có phải mua board mới không?', a: 'Không nhất thiết. FAVE có kỹ sư điện tử chuyên sửa board inverter HVAC tại xưởng, có thể phục hồi 60–70% trường hợp board lỗi do linh kiện điện tử hỏng (IGBT, capacitor, driver IC). Chi phí sửa board thường chỉ bằng 15–30% giá board mới.' },
      { q: 'Rò rỉ đường ống copper refrigerant, FAVE hàn lại có đảm bảo không?', a: 'FAVE sử dụng phương pháp hàn TIG (GTAW) với khí bảo vệ nitrogen purging bên trong ống, đảm bảo mối hàn sạch không oxy hóa theo tiêu chuẩn ASTM B88. Sau hàn, test áp suất nitrogen 450 psi trong 24 giờ trước khi nạp lại gas lạnh.' },
      { q: 'Sửa chữa cần mua linh kiện nhập khẩu mất bao lâu?', a: 'FAVE duy trì kho linh kiện fast-moving tại Hà Nội và TP.HCM. Với linh kiện thông thường: cấp trong 2–4 giờ. Linh kiện đặc thù cần nhập khẩu: 5–7 ngày làm việc từ Singapore hoặc 10–14 ngày từ nhà máy (tùy hãng). FAVE cung cấp thiết bị tạm thời (rental) nếu cần thiết trong thời gian chờ.' },
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
      'Dịch vụ cải tạo và nâng cấp hệ thống HVAC hiện hữu cho các công trình muốn tối ưu hiệu suất năng lượng, mở rộng công suất hoặc retrofit công nghệ mới (inverter, VRF, free cooling). FAVE thực hiện với downtime tối thiểu, đảm bảo continuity of operations trong suốt quá trình cải tạo.',
    problems: [
      'Hệ thống HVAC đã vận hành 10–15 năm, hiệu suất suy giảm nghiêm trọng, chi phí điện tăng 40–60% so với thiết kế ban đầu',
      'Công suất lạnh không đáp ứng khi tòa nhà mở rộng diện tích hoặc tăng mật độ thiết bị IT/điện tử sinh nhiệt cao',
      'Thiết bị lỗi thời không còn được hỗ trợ linh kiện thay thế (end-of-life), rủi ro hỏng hóc ngày càng cao',
      'Hệ thống không tích hợp được với BMS hiện đại, không thể giám sát từ xa và tối ưu hóa vận hành tự động',
      'Áp lực từ ban quản lý về ESG và tiêu chí LEED/LOTUS rating đòi hỏi cải thiện PUE và chỉ số năng lượng EUI',
    ],
    solutions: [
      'Kiểm toán năng lượng hệ thống HVAC theo ASHRAE Level II, xác định cơ hội tiết kiệm (ECM) với phân tích ROI và payback period',
      'Retrofit Chiller cũ bằng máy nén trục vít biến tần (variable speed screw) hoặc ly tâm từ tính (magnetic bearing centrifugal) đạt COP > 7.0',
      'Thêm biến tần VFD cho toàn bộ bơm tuần hoàn và quạt AHU/cooling tower, tiết kiệm 30–40% điện năng hệ thống phụ trợ',
      'Lắp đặt hệ thống BMS/EMS mới tích hợp AI-based optimization cho toàn bộ HVAC plant, kết nối cloud dashboard real-time',
      'Áp dụng free cooling economizer và heat recovery để tận dụng điều kiện khí hậu thuận lợi, giảm giờ vận hành máy nén',
    ],
    process: [
      { step: 1, title: 'Kiểm toán năng lượng (Energy Audit)', desc: 'Lắp data logger đo kWh, nhiệt độ, áp suất và lưu lượng trong 2–4 tuần. Phân tích baseline và xác định ECM priority theo ASHRAE Level II.' },
      { step: 2, title: 'Thiết kế kỹ thuật cải tạo', desc: 'Thiết kế chi tiết bao gồm: chọn thiết bị thay thế, bản vẽ as-built update, tính toán thủy lực và nhiệt động mới, kế hoạch migration.' },
      { step: 3, title: 'Lập kế hoạch cải tạo không gián đoạn', desc: 'Xây dựng phasing plan để cải tạo từng phần trong khi hệ thống cũ vẫn vận hành một phần. Xác định cut-over windows phù hợp lịch tòa nhà.' },
      { step: 4, title: 'Thi công & lắp đặt thiết bị mới', desc: 'Lắp đặt thiết bị mới song song với hệ thống cũ. Kết nối thử nghiệm từng phần, hiệu chỉnh thông số vận hành trước khi chuyển toàn bộ tải.' },
      { step: 5, title: 'Commissioning & tối ưu hóa', desc: 'Commissioning theo ASHRAE Guideline 0 và 1.1. Đo kiểm hiệu suất thực tế, so sánh kWh/TR với thiết kế và lập trình BMS optimization.' },
      { step: 6, title: 'M&V (Measurement & Verification)', desc: 'Theo dõi tiết kiệm năng lượng thực tế trong 3–6 tháng sau cải tạo theo IPMVP Option C. Phát hành báo cáo M&V với xác nhận ROI đạt được.' },
    ],
    benefits: [
      'Tiết kiệm 30–50% chi phí điện HVAC sau cải tạo, payback period thông thường 2–4 năm',
      'Loại bỏ rủi ro end-of-life equipment failure, thiết bị mới có vòng đời 15–20 năm',
      'Nâng cấp khả năng giám sát từ xa và AI optimization giảm chi phí vận hành 15–20%',
      'Cải thiện LEED Energy & Atmosphere credit, hỗ trợ mục tiêu ESG và báo cáo GHG emissions',
      'Đảm bảo continuous operation trong suốt quá trình cải tạo với downtime <4 giờ mỗi giai đoạn',
      'Báo cáo M&V chuẩn IPMVP làm bằng chứng xác nhận với ban lãnh đạo và hội đồng quản trị',
    ],
    faqs: [
      { q: 'Cải tạo hệ thống HVAC có cần dừng toàn bộ hoạt động tòa nhà không?', a: 'Không nhất thiết. FAVE chuyên thiết kế phasing plan để cải tạo từng cụm thiết bị trong khi toàn hệ thống vẫn hoạt động. Downtime thực tế thường chỉ 2–4 giờ mỗi giai đoạn cut-over, thực hiện vào cuối tuần hoặc đêm muộn để giảm thiểu ảnh hưởng.' },
      { q: 'Payback period của dự án cải tạo HVAC thường là bao lâu?', a: 'Với cải tạo toàn diện (thay Chiller + VFD + BMS), payback thường 2.5–4 năm với mức điện tiết kiệm 35–50%. Nếu chỉ retrofit VFD cho bơm và quạt, payback có thể dưới 18 tháng. FAVE cung cấp phân tích NPV và IRR chi tiết trong báo cáo kiểm toán năng lượng.' },
      { q: 'FAVE có thể thực hiện dự án cải tạo theo mô hình EPC (Energy Performance Contracting) không?', a: 'Có. FAVE hợp tác với các đối tác tài chính để cung cấp mô hình EPC, trong đó FAVE cam kết mức tiết kiệm năng lượng tối thiểu và khách hàng trả dần từ khoản tiết kiệm điện thực tế. Phù hợp cho dự án >10 tỷ đồng.' },
      { q: 'Cải tạo HVAC có giúp đạt chứng chỉ LEED hoặc LOTUS không?', a: 'Có. Cải tạo hệ thống HVAC đúng chuẩn có thể đóng góp 15–25 điểm LEED v4.1 trong danh mục Energy & Atmosphere. FAVE có kinh nghiệm hỗ trợ tài liệu LEED và làm việc trực tiếp với LEED Commissioning Authority (CxA).' },
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
      'Đường ống gió (air duct) tích tụ bụi, nấm mốc và vi khuẩn Legionella sau 2–3 năm vận hành, gây ô nhiễm không khí trong nhà (IAQ) và nguy cơ bệnh hô hấp cho người dùng',
      'Dàn lạnh FCU/AHU bám bẩn dày làm giảm lưu lượng gió 30–50%, hệ thống phải làm việc quá tải để đạt nhiệt độ đặt, tăng tiêu thụ điện và nguy cơ đóng băng dàn lạnh',
      'Tháp giải nhiệt tích tụ biofilm và cáu khoáng chất làm giảm hiệu suất trao đổi nhiệt, tiềm ẩn nguy cơ Legionellosis cho người trong tòa nhà',
      'Bình ngưng Chiller đóng cáu canxi làm tăng nhiệt độ ngưng (TCond) lên 3–5°C, kéo theo tăng kWh/TR đáng kể và rút ngắn tuổi thọ máy nén',
      'Không có chứng nhận vệ sinh duct định kỳ vi phạm yêu cầu IAQ của một số chứng chỉ tòa nhà xanh và tiêu chuẩn WELL Building Standard',
    ],
    solutions: [
      'Vệ sinh đường ống gió bằng robot inspection + mechanical agitation brush system kết hợp hút công suất cao (negative pressure) theo tiêu chuẩn NADCA ACR',
      'Vệ sinh dàn lạnh AHU/FCU bằng hóa chất alkaline coil cleaner và máy phun áp lực phù hợp cánh nhôm, khử khuẩn bằng quaternary ammonium compound',
      'Xử lý nước tháp giải nhiệt: diệt khuẩn Legionella bằng chlorine shock treatment, súc rửa bể nước, phủ coating chống bám vi sinh',
      'Súc rửa ống ngưng Chiller bằng thiết bị tube cleaning cơ học và hóa chất descaler không gây ăn mòn ống đồng, kiểm tra độ dày ống bằng ultrasonic',
      'Cấp chứng nhận vệ sinh có timestamp theo NADCA và ASHRAE 62.1 để sử dụng trong hồ sơ LEED/WELL và báo cáo ESG',
    ],
    process: [
      { step: 1, title: 'Kiểm tra IAQ ban đầu', desc: 'Đo chất lượng không khí trong nhà: CO2, PM2.5, PM10, TVOC, độ ẩm và nhiệt độ theo ASHRAE 62.1. Camera nội soi đường ống để đánh giá mức độ bám bẩn.' },
      { step: 2, title: 'Lập kế hoạch vệ sinh', desc: 'Xác định vùng ưu tiên, lựa chọn phương pháp vệ sinh phù hợp, lên lịch thực hiện ngoài giờ hành chính để không gián đoạn vận hành tòa nhà.' },
      { step: 3, title: 'Vệ sinh hệ thống cấp/hồi gió', desc: 'Cô lập từng đoạn duct, vệ sinh cơ học bằng robot brush, hút bụi công suất cao đặt tại điểm cuối. Khử khuẩn bằng fogging hóa chất diệt khuẩn.' },
      { step: 4, title: 'Vệ sinh thiết bị đầu cuối', desc: 'Tháo, vệ sinh và lắp lại bộ lọc FCU/AHU. Vệ sinh dàn lạnh, khay nước ngưng và motor quạt. Kiểm tra cánh điều hướng gió (vane).' },
      { step: 5, title: 'Vệ sinh thiết bị trung tâm', desc: 'Súc rửa bình ngưng/bay hơi Chiller, vệ sinh tháp giải nhiệt, xử lý nước và lấy mẫu kiểm tra vi sinh Legionella.' },
      { step: 6, title: 'Kiểm tra IAQ sau vệ sinh & cấp chứng nhận', desc: 'Đo lại IAQ, so sánh với baseline. Chụp ảnh nội soi duct sau vệ sinh. Phát hành Certificate of Cleaning với đầy đủ documentation theo NADCA.' },
    ],
    benefits: [
      'Cải thiện chất lượng không khí trong nhà (IAQ), giảm phàn nàn về mùi, dị ứng và bệnh hô hấp của người dùng tòa nhà',
      'Tăng hiệu suất hệ thống HVAC 15–25% nhờ dàn trao đổi nhiệt sạch, giảm áp giảm lưu lượng gió',
      'Giảm 10–20% tiêu thụ điện năng của quạt AHU/FCU do giảm pressure drop qua dàn và bộ lọc',
      'Ngăn ngừa nguy cơ bệnh Legionnaires disease liên quan đến hệ thống làm mát nước, bảo vệ trách nhiệm pháp lý của chủ tòa nhà',
      'Chứng nhận vệ sinh NADCA đáp ứng yêu cầu LEED IEQ credit và WELL Building Standard Feature 31',
      'Kéo dài tuổi thọ thiết bị HVAC do giảm tải và nhiệt độ vận hành, giảm tần suất sửa chữa',
    ],
    faqs: [
      { q: 'Tần suất vệ sinh đường ống gió (duct cleaning) cần thực hiện bao nhiêu lần/năm?', a: 'NADCA ACR 2021 và ASHRAE 62.1 khuyến nghị kiểm tra duct mỗi 2 năm và vệ sinh khi mức độ bám bẩn vượt ngưỡng tiêu chuẩn. Thực tế tại Hà Nội, với chất lượng không khí ngoài trời PM2.5 cao, tòa nhà văn phòng nên vệ sinh duct mỗi 1–2 năm và vệ sinh dàn lạnh FCU mỗi 6–12 tháng.' },
      { q: 'Có cần cách ly khu vực trong quá trình vệ sinh không? Ảnh hưởng đến hoạt động văn phòng?', a: 'FAVE sử dụng negative pressure containment—toàn bộ bụi và hóa chất được hút về thiết bị lọc, không phát tán ra khu vực làm việc. Vệ sinh từng zone riêng biệt, lên lịch ngoài giờ cao điểm. Khu vực được vệ sinh xong thường có thể sử dụng lại sau 2–4 giờ thông gió.' },
      { q: 'Kiểm tra Legionella trong tháp giải nhiệt như thế nào?', a: 'FAVE lấy mẫu nước tháp giải nhiệt và gửi đến phòng thí nghiệm được công nhận ISO 17025 để test Legionella pneumophila theo tiêu chuẩn ISO 11731. Kết quả có trong 5–7 ngày. Nếu phát hiện, thực hiện ngay quy trình khử khuẩn shock chlorination và test lại.' },
      { q: 'Hóa chất vệ sinh HVAC có an toàn cho người trong tòa nhà không?', a: 'FAVE chỉ sử dụng hóa chất có MSDS (Material Safety Data Sheet) đầy đủ, đã được kiểm định an toàn cho ứng dụng HVAC. Với hệ thống trong phòng sạch (cleanroom) hay bệnh viện, FAVE sử dụng hóa chất đặc thù food-grade hoặc medical-grade theo yêu cầu.' },
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
      'Dịch vụ tư vấn và thiết kế kỹ thuật hệ thống HVAC cho tòa nhà văn phòng, trung tâm thương mại, bệnh viện và nhà máy sản xuất. FAVE cung cấp hồ sơ thiết kế từ Schematic Design đến Construction Document theo tiêu chuẩn ASHRAE, QCVN và yêu cầu của chủ đầu tư.',
    problems: [
      'Thiết kế HVAC tải nhiệt sai lệch lớn dẫn đến lắp thiết bị quá công suất (oversized) gây lãng phí CAPEX hoặc thiếu công suất (undersized) không đảm bảo tiện nghi',
      'Hồ sơ thiết kế thiếu chi tiết thi công khiến nhà thầu đơn giá cao, tranh chấp khối lượng và thay đổi thiết kế nhiều lần trong quá trình thi công',
      'Không tối ưu được năng lượng từ giai đoạn thiết kế, bỏ lỡ cơ hội đạt LEED/LOTUS và tiết kiệm OPEX dài hạn',
      'Thiết kế không phối hợp tốt với MEP khác (plumbing, electrical, fire protection) gây conflict ống xuyên dầm, hết không gian technical space',
      'Thiếu kinh nghiệm thiết kế cho công trình đặc thù như cleanroom, data center, bệnh viện với yêu cầu pressurization, filter HEPA và redundancy N+1',
    ],
    solutions: [
      'Tính toán tải nhiệt chính xác bằng phần mềm HAP (Hourly Analysis Program) của Carrier và Trane TRACE 700, mô phỏng theo khí hậu Hà Nội/TP.HCM',
      'Thiết kế hệ thống BIM 3D trên Revit MEP, phối hợp clash detection với kiến trúc và kết cấu ngay từ giai đoạn thiết kế kỹ thuật',
      'Tư vấn lựa chọn hệ thống phù hợp ngân sách và mục tiêu năng lượng: VRF, CAV, VAV, Chiller Plant với phân tích LCC (Life Cycle Cost)',
      'Thiết kế tích hợp BMS/EMS ngay từ đầu, đảm bảo khả năng tự động hóa và giám sát năng lượng real-time sau khi đưa vào vận hành',
      'Hỗ trợ kiểm toán thiết kế độc lập (Design Review) và hồ sơ LEED/LOTUS Energy Model theo ASHRAE 90.1 Appendix G',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận yêu cầu & Schematic Design', desc: 'Thu thập brief từ chủ đầu tư: chức năng công trình, tiêu chuẩn tiện nghi, ngân sách CAPEX, mục tiêu năng lượng. Đề xuất 2–3 phương án hệ thống để lựa chọn.' },
      { step: 2, title: 'Design Development', desc: 'Tính toán tải nhiệt chi tiết theo ASHRAE Fundamentals, chọn thiết bị, thiết kế sơ đồ nguyên lý (schematic diagram) và layout thiết bị cơ bản.' },
      { step: 3, title: 'Construction Documents', desc: 'Hoàn thiện bản vẽ thi công chi tiết: bố trí đường ống, kích thước duct, bố trí thiết bị, sơ đồ điều khiển DDC. Lập bộ specification thiết bị.' },
      { step: 4, title: 'Lập dự toán & hồ sơ mời thầu', desc: 'Lập bảng khối lượng (BOQ) chi tiết, dự toán theo đơn giá thị trường. Chuẩn bị hồ sơ RFQ/ITB cho đấu thầu nhà thầu thi công.' },
      { step: 5, title: 'Hỗ trợ thi công (CA)', desc: 'Construction Administration: trả lời RFI, duyệt shop drawing của nhà thầu, hướng dẫn kỹ thuật tại hiện trường và giám sát compliance với thiết kế.' },
      { step: 6, title: 'Commissioning & As-Built', desc: 'Tham gia nghiệm thu commissioning, xác nhận hệ thống đúng thiết kế. Cập nhật bản vẽ as-built và lập hồ sơ O&M manual cho vận hành.' },
    ],
    benefits: [
      'Tải nhiệt tính toán chính xác ±5% nhờ phần mềm HAP/TRACE, tránh oversized/undersized gây lãng phí CAPEX 10–20%',
      'Hồ sơ BIM 3D giảm thiểu conflict thi công, tiết kiệm 5–10% chi phí xây dựng do ít thay đổi thiết kế',
      'Thiết kế tối ưu năng lượng đạt ASHRAE 90.1-2019, giảm 20–40% OPEX điện HVAC so với thiết kế thông thường',
      'Hồ sơ đầy đủ cho đấu thầu cạnh tranh, minh bạch và so sánh được giữa các nhà thầu',
      'Kinh nghiệm thiết kế 500+ công trình tại Việt Nam, hiểu rõ điều kiện khí hậu và quy chuẩn địa phương',
      'Hỗ trợ trọn vẹn từ concept đến commissioning, chịu trách nhiệm kỹ thuật suốt vòng đời dự án',
    ],
    faqs: [
      { q: 'FAVE thiết kế theo tiêu chuẩn nào? Có tương thích với tiêu chuẩn Việt Nam không?', a: 'FAVE áp dụng song song tiêu chuẩn ASHRAE (Fundamentals, 62.1, 90.1, 55), SMACNA cho duct, và các QCVN liên quan: QCVN 09:2017/BXD (công trình sử dụng năng lượng hiệu quả), TCVN 5687:2010 (thông gió điều tiết không khí). Với dự án quốc tế, FAVE có thể áp dụng thêm EN 13779 hoặc BS EN 15232 theo yêu cầu.' },
      { q: 'Phí thiết kế HVAC thường tính theo phương thức nào?', a: 'FAVE áp dụng phí thiết kế theo tỷ lệ % giá trị hệ thống HVAC (thông thường 2–5% tùy phức tạp) hoặc phí lump-sum theo số giờ công. Với dự án lớn >50 tỷ, có thể thương lượng gói milestone-based. FAVE cung cấp báo giá sau brief meeting miễn phí đầu tiên.' },
      { q: 'Thiết kế BIM 3D có bắt buộc cho mọi dự án không?', a: 'BIM 3D được khuyến nghị cho tất cả dự án >3.000m² và bắt buộc với dự án phức tạp như bệnh viện, cleanroom, data center. Với dự án nhỏ hơn, FAVE cung cấp bản vẽ 2D AutoCAD đầy đủ thi công. Tất cả thiết kế đều qua clash check dù là 2D hay 3D.' },
      { q: 'FAVE có hỗ trợ xin phép xây dựng cho hạng mục HVAC không?', a: 'Có. FAVE chuẩn bị đầy đủ hồ sơ thiết kế cơ sở và thiết kế kỹ thuật theo yêu cầu của Sở Xây dựng, bao gồm thuyết minh tính toán, bản vẽ kỹ thuật có đóng dấu kỹ sư có chứng chỉ hành nghề theo quy định Nghị định 15/2021/NĐ-CP.' },
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
      'Dịch vụ thi công lắp đặt hệ thống HVAC toàn phần cho tòa nhà văn phòng, trung tâm thương mại, bệnh viện và nhà máy sản xuất. FAVE đảm nhận trọn gói từ cung cấp thiết bị, thi công ống, lắp đặt thiết bị, đấu nối điện/BMS đến commissioning và bàn giao hoàn công.',
    problems: [
      'Nhà thầu cơ điện thiếu kinh nghiệm HVAC chuyên sâu dẫn đến lắp đặt sai kỹ thuật: đường ống gió rò rỉ, slope nước ngưng không đúng, gas lạnh nạp sai trọng lượng',
      'Tiến độ thi công MEP thường bị chậm do phối hợp kém giữa các nhà thầu ống nước, điện và điều hòa trong không gian kỹ thuật chật hẹp',
      'Chất lượng vật tư không kiểm soát được khi nhà thầu tự mua, dẫn đến sử dụng thiết bị không đúng chủng loại trong hợp đồng',
      'Commissioning không đúng quy trình: thiếu pressure test, không flush đường ống nước, nạp gas không theo trọng lượng—dẫn đến sự cố sớm sau bàn giao',
      'Hồ sơ hoàn công không đầy đủ, thiếu as-built drawings, test records và O&M manual gây khó khăn cho vận hành và bảo trì về sau',
    ],
    solutions: [
      'Thi công theo bản vẽ shop drawing đã được FAVE review và duyệt, phối hợp BIM clash detection với nhà thầu MEP khác trước khi thi công',
      'Đội thi công chuyên HVAC gồm thợ ống đồng được cấp chứng chỉ hàn, thợ duct sheet metal và kỹ sư commissioning riêng biệt',
      'Kiểm soát vật tư 100%: tất cả thiết bị chính và phụ đều có C/O, C/Q, kiểm tra kích thước và serial number trước khi đưa vào lắp đặt',
      'Commissioning theo ASHRAE Guideline 0: pressure test, flushing, balancing (TAB) và performance verification trước khi bàn giao',
      'Bàn giao hồ sơ hoàn công đầy đủ: as-built Revit/AutoCAD, test reports, commissioning checklist, warranty cards và O&M manual tiếng Việt',
    ],
    process: [
      { step: 1, title: 'Hợp đồng & mobilization', desc: 'Ký hợp đồng với scope rõ ràng. Duyệt tiến độ tổng thể, phân công đội thi công và kỹ sư QA/QC. Lập phương án thi công và VSMT.' },
      { step: 2, title: 'Shop Drawing & vật tư', desc: 'Lập shop drawing chi tiết từ bản vẽ thiết kế, duyệt với PMC/tư vấn giám sát. Đặt hàng thiết bị sớm để tránh delay—lead time Chiller thường 8–12 tuần.' },
      { step: 3, title: 'Thi công phần ngầm & kết cấu đỡ', desc: 'Lắp đặt hanger, support cho duct và ống. Đi ống đồng refrigerant và ống nước trong tường, sàn theo đúng bản vẽ, đảm bảo slope và độ bền đỡ.' },
      { step: 4, title: 'Lắp đặt thiết bị chính', desc: 'Cẩu và lắp đặt Chiller, AHU, FCU, cooling tower theo hướng dẫn OEM. Đấu nối ống nước, ống gió và kết nối điện điều khiển.' },
      { step: 5, title: 'Commissioning & TAB', desc: 'Pressure test đường ống, flushing hệ thống nước, nạp gas lạnh theo trọng lượng. TAB (Testing, Adjusting, Balancing) lưu lượng gió và nước theo thiết kế.' },
      { step: 6, title: 'Nghiệm thu & bàn giao', desc: 'Nghiệm thu với PMC và chủ đầu tư. Đào tạo đội vận hành của tòa nhà. Bàn giao hồ sơ hoàn công đầy đủ và chạy bảo hành 12 tháng.' },
    ],
    benefits: [
      'Tổng thầu HVAC duy nhất chịu trách nhiệm từ thiết kế đến commissioning, không đùn đẩy trách nhiệm giữa nhà thầu thiết bị và nhà thầu thi công',
      'Tiến độ thi công đáng tin cậy nhờ đội quản lý dự án chuyên HVAC và kho linh kiện/phụ kiện sẵn có tại Hà Nội',
      'Chất lượng thi công được kiểm soát bởi QA/QC nội bộ và kỹ sư commissioning độc lập',
      'Commissioning đúng chuẩn đảm bảo hệ thống hoạt động ở 95–100% công suất thiết kế ngay từ ngày đầu vận hành',
      'Hồ sơ hoàn công đầy đủ giúp tòa nhà dễ dàng vận hành, bảo trì và xử lý bảo hiểm khi cần',
      'Bảo hành 12 tháng sau bàn giao cho toàn bộ hệ thống, dịch vụ bảo trì tiếp theo có thể ký hợp đồng dài hạn',
    ],
    faqs: [
      { q: 'FAVE có nhận thầu thi công theo thiết kế của đơn vị tư vấn khác không?', a: 'Có. FAVE nhận thi công theo hồ sơ thiết kế của bất kỳ đơn vị tư vấn nào, với điều kiện hồ sơ đủ chi tiết để lập shop drawing. Nếu hồ sơ chưa đủ chi tiết, FAVE cung cấp dịch vụ lập shop drawing và hỗ trợ thiết kế thi công với phí riêng.' },
      { q: 'Thời gian thi công lắp đặt HVAC cho tòa văn phòng 10 tầng là bao lâu?', a: 'Tòa văn phòng 10 tầng với hệ thống VRF thường mất 3–5 tháng thi công. Hệ thống Chiller water-cooled cần 5–7 tháng do lead time thiết bị. FAVE cung cấp tiến độ chi tiết (master schedule) sau khi có hồ sơ thiết kế.' },
      { q: 'FAVE có kinh nghiệm thi công trong tòa nhà đang hoạt động không?', a: 'Có. Đây là thế mạnh của FAVE với kinh nghiệm 15+ năm. Phương án thi công trong môi trường live building bao gồm: phân chia zone, bao che công trường, lịch thi công ngoài giờ, phối hợp với property manager để không ảnh hưởng tenant. FAVE đã hoàn thành nhiều dự án retrofit trong khi tòa nhà vẫn vận hành bình thường.' },
      { q: 'Điều kiện bảo hành sau lắp đặt là gì?', a: 'FAVE bảo hành 12 tháng cho toàn bộ công trình lắp đặt sau ngày bàn giao. Bảo hành bao gồm: công lao động sửa chữa sự cố do lỗi thi công, linh kiện hỏng trong bảo hành nếu không do sử dụng sai. Thiết bị chính (Chiller, VRF outdoor unit) được bảo hành thêm theo chính sách OEM (thường 12–24 tháng).' },
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
      'Cung cấp toàn bộ thiết bị HVAC chính hãng có C/O, C/Q cho nhà thầu thi công, chủ đầu tư và đơn vị bảo trì: Chiller (Carrier, Trane, York), VRV/VRF (Daikin, Mitsubishi, Fujitsu), AHU, FCU, quạt công nghiệp, tháp giải nhiệt, thiết bị kiểm soát và linh kiện phụ tùng. Kho hàng thường trực tại Hà Nội, giao hàng trong 24–48 giờ với hàng có sẵn.',
    problems: [
      'Khó xác minh xuất xứ và chất lượng thiết bị HVAC nhập khẩu từ nhà cung cấp không chính thức, rủi ro hàng giả/hàng kém chất lượng gây hỏng hóc sớm',
      'Lead time thiết bị chính (Chiller, outdoor unit VRF) dài 8–16 tuần nếu không đặt hàng kịp thời, gây trễ tiến độ dự án và phát sinh phạt hợp đồng',
      'Thiếu tư vấn kỹ thuật khi lựa chọn thiết bị dẫn đến mua sai model, sai công suất hoặc không tương thích với hệ thống hiện hữu',
      'Chính sách bảo hành thiết bị không rõ ràng khi mua qua nhiều tầng đại lý, khó xử lý khi thiết bị hỏng trong bảo hành',
      'Không có nguồn cung linh kiện phụ tùng OEM tin cậy cho bảo trì, phải dùng hàng thay thế (aftermarket) kém chất lượng',
    ],
    solutions: [
      'Đại lý chính thức (Authorized Dealer) của Daikin, Carrier và các hãng lớn tại Việt Nam—thiết bị nhập khẩu trực tiếp, đầy đủ C/O, C/Q, warranty card chính hãng',
      'Tư vấn lựa chọn thiết bị miễn phí bởi kỹ sư HVAC: phân tích tải nhiệt, so sánh COP/EER/IPLV, tính toán payback period và tổng chi phí sở hữu (TCO)',
      'Kho thiết bị thường trực tại Hà Nội: FCU, VRF indoor/outdoor unit thông dụng, linh kiện phụ tùng Daikin/Carrier/Mitsubishi—xuất kho trong 2–4 giờ',
      'Đặt hàng trước cho thiết bị lead time dài: Chiller, AHU tùy chỉnh. FAVE theo dõi tiến độ sản xuất và cập nhật chủ đầu tư hàng tuần',
      'Hỗ trợ startup và commissioning kỹ thuật sau khi giao hàng, đảm bảo thiết bị hoạt động đúng thông số ngay từ đầu',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận yêu cầu & tư vấn kỹ thuật', desc: 'Xem xét hồ sơ kỹ thuật (specifications, datasheet yêu cầu). Tư vấn model phù hợp, so sánh phương án từ nhiều hãng nếu cần.' },
      { step: 2, title: 'Báo giá & điều kiện thương mại', desc: 'Phát hành báo giá chi tiết với model number, xuất xứ, điều kiện bảo hành, Incoterms, payment terms và lead time cụ thể.' },
      { step: 3, title: 'Xác nhận đơn hàng & đặt cọc', desc: 'Ký Purchase Order, xác nhận thông số kỹ thuật lần cuối (submittal approval). Đặt cọc theo điều khoản hợp đồng.' },
      { step: 4, title: 'Theo dõi sản xuất & logistics', desc: 'FAVE cập nhật tiến độ sản xuất tại nhà máy (factory order status), theo dõi lộ trình vận chuyển và thủ tục hải quan nhập khẩu.' },
      { step: 5, title: 'Giao nhận & kiểm tra tại kho', desc: 'Giao hàng đến kho dự án hoặc công trình. Kiểm tra số lượng, tình trạng đóng gói, serial number và đối chiếu với packing list trước khi ký nhận.' },
      { step: 6, title: 'Hỗ trợ startup & bảo hành', desc: 'Kỹ thuật viên FAVE hỗ trợ startup và commissioning thiết bị tại công trường. Quản lý hồ sơ bảo hành và xử lý claim với nhà sản xuất khi cần.' },
    ],
    benefits: [
      'Thiết bị chính hãng 100% với C/O, C/Q đầy đủ—đảm bảo xuất xứ rõ ràng cho kiểm toán và bảo hiểm',
      'Warranty card chính hãng kích hoạt, hỗ trợ warranty claim trực tiếp với hãng khi thiết bị gặp sự cố trong bảo hành',
      'Tư vấn kỹ thuật miễn phí giúp chọn thiết bị đúng công suất, tiết kiệm CAPEX không cần thiết do oversized',
      'Kho linh kiện thường trực đảm bảo nguồn cung cho bảo trì, tránh downtime kéo dài do chờ linh kiện',
      'Một điểm liên hệ (single point of contact) cho cả thiết bị, lắp đặt và bảo trì—đơn giản hóa quản lý nhà cung cấp',
      'Giao hàng đúng hạn theo cam kết hợp đồng, track record >95% on-time delivery với 500+ dự án',
    ],
    faqs: [
      { q: 'FAVE là đại lý chính thức của những hãng HVAC nào?', a: 'FAVE là Authorized Dealer của Daikin (VRV/VRF, FCU, cassette), Carrier (Chiller, AHU, package unit) và là nhà phân phối của Mitsubishi Electric, Fujitsu, Trane, York và nhiều thương hiệu phụ kiện HVAC. Tất cả có hợp đồng đại lý và được hãng xác nhận tại Việt Nam.' },
      { q: 'Thiết bị Chiller có thể đặt hàng theo thông số kỹ thuật tùy chỉnh không?', a: 'Có. Chiller và AHU thường được sản xuất theo đơn đặt hàng (make-to-order) với thông số tùy chỉnh: công suất, chủng loại gas lạnh (R134a, R1234ze, R513A), điện áp, kết nối ống nước và tùy chọn inverter. FAVE hỗ trợ lập submittal và theo dõi sản xuất. Lead time thông thường 8–16 tuần tùy hãng và model.' },
      { q: 'Giá thiết bị FAVE có cạnh tranh so với nhập khẩu trực tiếp không?', a: 'Với vai trò đại lý chính thức số lượng lớn, FAVE có mức giá cạnh tranh so với nhập khẩu lẻ, cộng thêm dịch vụ hỗ trợ kỹ thuật và xử lý warranty. Quan trọng hơn, mua qua đại lý chính thức đảm bảo thiết bị không phải hàng refurbished, hàng xuất kho năm cũ hoặc hàng xách tay không có warranty hợp lệ.' },
      { q: 'Có thể mua linh kiện phụ tùng OEM cho Chiller và VRF không? Giá như thế nào?', a: 'Có. FAVE cung cấp full range linh kiện OEM: board điều khiển, cảm biến, van tiết lưu EEV, contactor, capacitor, bộ lọc gas. Giá OEM cao hơn aftermarket 20–50% nhưng đảm bảo tương thích 100%, duy trì warranty và tuổi thọ thiết bị. Linh kiện thông dụng có sẵn trong kho tại Hà Nội.' },
      { q: 'Điều kiện thanh toán và giao hàng như thế nào?', a: 'Điều kiện thanh toán thông thường: 30–50% đặt cọc khi đặt hàng, phần còn lại trước khi xuất kho hoặc theo milestone (với dự án lớn). Giao hàng DAP công trình tại Hà Nội và các tỉnh miền Bắc. Giao hàng miền Nam qua đội ngũ FAVE TP.HCM hoặc qua forwarder.' },
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
    { slug: 'thiet-ke-hvac', label: 'Thiết kế HVAC', emoji: '🔧' },
    { slug: 'lap-dat-hvac', label: 'Lắp đặt HVAC', emoji: '📐' },
    { slug: 'cung-cap-thiet-bi', label: 'Cung cấp thiết bị', emoji: '🖥️' },
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
    const data = {
      titleVi: locale === 'vi' ? service.titleVi : service.titleEn,
      emoji: '⚙️',
      color: '#0066ff',
      descVi: locale === 'vi' ? service.descriptionVi : service.descriptionEn,
      ...DEFAULT_CONTENT,
    }
    return <ServiceDetailContent data={data} />
  }

  return <ServiceDetailContent data={content} />
}

function ServiceDetailContent({ data }: {
  data: {
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
}) {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f8faff', borderBottom: '1px solid #e8f0ff' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight size={14} className="opacity-40" />
          <Link href="/dich-vu" className="hover:text-blue-600 transition-colors">Dịch vụ</Link>
          <ChevronRight size={14} className="opacity-40" />
          <span className="text-slate-900 font-medium">{data.titleVi}</span>
        </div>
      </div>

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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Problems */}
            {data.problems.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  🎯 Vấn đề khách hàng thường gặp
                </h2>
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

            {/* Solutions */}
            {data.solutions.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  ✅ Giải pháp từ FAVE
                </h2>
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

            {/* Process */}
            {data.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">
                  🔄 Quy trình thực hiện
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.process.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-5 rounded-xl"
                      style={{ background: '#f8faff', border: '1px solid rgba(0,102,255,0.06)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0066ff, #3385ff)' }}
                      >
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

            {/* Benefits */}
            {data.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">
                  💡 Lợi ích khi chọn FAVE
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
            )}

            {/* FAQs */}
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

          {/* Sidebar */}
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
                '✅ 15+ năm kinh nghiệm HVAC',
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
