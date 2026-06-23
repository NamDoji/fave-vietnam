import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding FAVE Vietnam database...')

  // Admin user
  const passwordHash = await bcrypt.hash('Admin@123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fave.com.vn' },
    update: {},
    create: { email: 'admin@fave.com.vn', name: 'FAVE Admin', password: passwordHash, role: 'ADMIN' },
  })
  console.log('✅ Admin user created:', admin.email)

  // Site settings
  const settings = [
    { key: 'company_name', value: 'FAVE Việt Nam' },
    { key: 'company_name_en', value: 'FAVE Vietnam' },
    { key: 'tagline_vi', value: 'Chuyên Nghiệp - Tin Cậy - Đúng Hạn' },
    { key: 'tagline_en', value: 'Professional - Reliable - On Time' },
    { key: 'hotline', value: '0981907109' },
    { key: 'email', value: 'Favevietnam@gmail.com' },
    { key: 'address_vi', value: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội' },
    { key: 'address_en', value: '348 Buoi Street, Nghia Do, Ba Dinh, Hanoi, Vietnam' },
    { key: 'facebook_url', value: 'https://facebook.com/favevietnam' },
    { key: 'zalo_url', value: 'https://zalo.me/0981907109' },
    { key: 'meta_title', value: 'FAVE Việt Nam - Dịch vụ HVAC Chuyên Nghiệp | Bảo Trì & Sửa Chữa Điều Hòa' },
    { key: 'meta_description', value: 'FAVE Việt Nam cung cấp dịch vụ bảo trì, sửa chữa, lắp đặt và cung cấp thiết bị HVAC chuyên nghiệp cho tòa nhà, trung tâm thương mại, nhà máy.' },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: { key: s.key, value: s.value } })
  }
  console.log('✅ Site settings seeded')

  // Service categories
  const svcCat = await prisma.serviceCategory.upsert({
    where: { slug: 'hvac-services' },
    update: {},
    create: { nameVi: 'Dịch vụ HVAC', nameEn: 'HVAC Services', slug: 'hvac-services', sortOrder: 0 },
  })

  // Services
  const services = [
    { slug: 'bao-tri-dieu-hoa', titleVi: 'Bảo trì hệ thống điều hòa không khí', titleEn: 'Air Conditioning Maintenance', icon: '🔧', sortOrder: 1, descriptionVi: 'Dịch vụ bảo trì định kỳ hệ thống điều hòa không khí cục bộ, bán trung tâm VRV, trung tâm Chiller cho tòa nhà văn phòng, TTTM và nhà máy.', descriptionEn: 'Periodic maintenance of local, VRV semi-central, and central Chiller air conditioning systems for office buildings, shopping malls and factories.' },
    { slug: 'bao-duong-chiller', titleVi: 'Bảo dưỡng Chiller', titleEn: 'Chiller Maintenance', icon: '❄️', sortOrder: 2, descriptionVi: 'Bảo dưỡng toàn diện hệ thống Chiller giải nhiệt nước, giải nhiệt gió. Kiểm tra máy nén, tháp giải nhiệt, bơm tuần hoàn và hệ thống điện điều khiển.', descriptionEn: 'Comprehensive maintenance of water-cooled and air-cooled Chiller systems including compressor, cooling tower, circulation pump and control systems.' },
    { slug: 'sua-chua-hvac', titleVi: 'Sửa chữa hệ thống HVAC', titleEn: 'HVAC Repair Services', icon: '⚙️', sortOrder: 3, descriptionVi: 'Sửa chữa, khắc phục sự cố nhanh chóng cho tất cả các loại hệ thống HVAC. Đội ngũ kỹ thuật 24/7 sẵn sàng xử lý mọi tình huống khẩn cấp.', descriptionEn: 'Fast repair and troubleshooting for all types of HVAC systems. 24/7 technical team ready to handle any emergency situation.' },
    { slug: 'cai-tao-nang-cap', titleVi: 'Cải tạo, nâng cấp hệ thống điều hòa', titleEn: 'HVAC Renovation & Upgrade', icon: '🔄', sortOrder: 4, descriptionVi: 'Tư vấn và thi công cải tạo, nâng cấp hệ thống HVAC cũ sang công nghệ mới tiết kiệm năng lượng. Tối ưu hiệu suất, giảm chi phí vận hành.', descriptionEn: 'Consultation and renovation of old HVAC systems to new energy-saving technology. Optimize performance and reduce operating costs.' },
    { slug: 've-sinh-cong-nghiep', titleVi: 'Vệ sinh công nghiệp hệ thống HVAC', titleEn: 'Industrial HVAC Cleaning', icon: '🧹', sortOrder: 5, descriptionVi: 'Vệ sinh công nghiệp toàn bộ hệ thống HVAC: dàn lạnh, dàn nóng, AHU, FCU, ống gió, tháp giải nhiệt. Sử dụng hóa chất chuyên dụng an toàn.', descriptionEn: 'Industrial cleaning of the entire HVAC system: cooling coils, condensers, AHU, FCU, air ducts, cooling towers using specialized safe chemicals.' },
    { slug: 'thiet-ke-hvac', titleVi: 'Thiết kế hệ thống HVAC', titleEn: 'HVAC System Design', icon: '📐', sortOrder: 6, descriptionVi: 'Thiết kế hệ thống điều hòa không khí và thông gió phù hợp với từng loại công trình. Tính toán tải lạnh, chọn thiết bị và lập bản vẽ thi công.', descriptionEn: 'Design air conditioning and ventilation systems suitable for each type of construction. Calculate cooling load, select equipment and create construction drawings.' },
    { slug: 'lap-dat-hvac', titleVi: 'Lắp đặt hệ thống HVAC', titleEn: 'HVAC System Installation', icon: '🏗️', sortOrder: 7, descriptionVi: 'Thi công lắp đặt hệ thống HVAC theo đúng thiết kế và tiêu chuẩn kỹ thuật. Đảm bảo tiến độ, chất lượng và an toàn trong suốt quá trình thi công.', descriptionEn: 'Install HVAC systems according to design and technical standards. Ensure progress, quality and safety throughout the construction process.' },
    { slug: 'cung-cap-thiet-bi', titleVi: 'Cung cấp thiết bị HVAC', titleEn: 'HVAC Equipment Supply', icon: '📦', sortOrder: 8, descriptionVi: 'Cung cấp đầy đủ thiết bị HVAC chính hãng: máy điều hòa, Chiller, AHU, FCU, máy nén, linh kiện phụ tùng từ các thương hiệu uy tín hàng đầu.', descriptionEn: 'Supply genuine HVAC equipment: air conditioners, Chillers, AHUs, FCUs, compressors, spare parts from leading reputable brands.' },
    { slug: 'dich-vu-ky-thuat-khac', titleVi: 'Dịch vụ kỹ thuật khác', titleEn: 'Other Technical Services', icon: '🛠️', sortOrder: 9, descriptionVi: 'Các dịch vụ kỹ thuật bổ sung: đào tạo vận hành, kiểm tra hiệu suất năng lượng, tư vấn giải pháp tiết kiệm điện cho hệ thống HVAC.', descriptionEn: 'Additional technical services: operation training, energy performance audits, energy-saving solution consulting for HVAC systems.' },
  ]
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, categoryId: svcCat.id, contentVi: '', contentEn: '', isActive: true },
    })
  }
  console.log('✅ Services seeded:', services.length)

  // Product categories
  const prodCats = [
    { slug: 'may-nen-lanh', nameVi: 'Máy nén lạnh', nameEn: 'Refrigeration Compressors' },
    { slug: 'bo-mach', nameVi: 'Bo mạch điều hòa', nameEn: 'AC Control Boards' },
    { slug: 'motor-quat', nameVi: 'Motor quạt', nameEn: 'Fan Motors' },
    { slug: 'dieu-khien', nameVi: 'Điều khiển điều hòa', nameEn: 'AC Controllers' },
    { slug: 'linh-kien', nameVi: 'Linh kiện HVAC', nameEn: 'HVAC Spare Parts' },
    { slug: 'thiet-bi-khac', nameVi: 'Thiết bị HVAC khác', nameEn: 'Other HVAC Equipment' },
  ]
  const catMap: Record<string, string> = {}
  for (const c of prodCats) {
    const cat = await prisma.productCategory.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, sortOrder: 0 } })
    catMap[c.slug] = cat.id
  }

  // Products
  const products = [
    { slug: 'may-nen-copeland-scroll', nameVi: 'Máy nén Copeland Scroll', nameEn: 'Copeland Scroll Compressor', catSlug: 'may-nen-lanh', descriptionVi: 'Máy nén lạnh Copeland Scroll cao cấp, tiết kiệm năng lượng, độ bền cao, ứng dụng cho hệ thống HVAC thương mại và công nghiệp.', isFeatured: true },
    { slug: 'may-nen-daikin-vfd', nameVi: 'Máy nén Daikin Inverter', nameEn: 'Daikin Inverter Compressor', catSlug: 'may-nen-lanh', descriptionVi: 'Máy nén biến tần Daikin, điều chỉnh công suất linh hoạt, tiết kiệm điện tối ưu cho hệ thống VRV/VRF.', isFeatured: false },
    { slug: 'bo-mach-main-pcb', nameVi: 'Bo mạch chủ điều hòa Daikin', nameEn: 'Daikin Main PCB Board', catSlug: 'bo-mach', descriptionVi: 'Bo mạch chủ (Main PCB) chính hãng Daikin cho các dòng máy điều hòa dân dụng và thương mại, đảm bảo tương thích hoàn toàn.', isFeatured: true },
    { slug: 'bo-mach-mitsubishi', nameVi: 'Bo mạch điều hòa Mitsubishi', nameEn: 'Mitsubishi AC PCB Board', catSlug: 'bo-mach', descriptionVi: 'Bo mạch điều khiển chính hãng Mitsubishi Electric, dùng cho dòng máy lạnh gia dụng và thương mại MSY, MSZ series.', isFeatured: false },
    { slug: 'motor-quat-dan-nong', nameVi: 'Motor quạt dàn nóng', nameEn: 'Condenser Fan Motor', catSlug: 'motor-quat', descriptionVi: 'Motor quạt dàn nóng đa chủng loại, tương thích nhiều hãng (Daikin, Mitsubishi, Carrier, York, Trane), công suất từ 20W đến 200W.', isFeatured: true },
    { slug: 'motor-quat-dan-lanh', nameVi: 'Motor quạt dàn lạnh (Evaporator)', nameEn: 'Evaporator Fan Motor', catSlug: 'motor-quat', descriptionVi: 'Motor quạt lồng sóc dàn lạnh FCU, AHU các loại. Điện áp 220V/380V, nhiều mức công suất, thay thế trực tiếp không cần chỉnh sửa.', isFeatured: false },
    { slug: 'remote-dieu-khien', nameVi: 'Remote điều khiển trung tâm BMS', nameEn: 'Central BMS Controller', catSlug: 'dieu-khien', descriptionVi: 'Bộ điều khiển trung tâm BMS cho hệ thống VRV/VRF, tích hợp giao thức BACnet/Modbus, quản lý tập trung toàn bộ hệ thống điều hòa.', isFeatured: false },
    { slug: 'phin-loc-dau-gas', nameVi: 'Phin lọc dầu gas HVAC', nameEn: 'HVAC Oil & Gas Filter', catSlug: 'linh-kien', descriptionVi: 'Phin lọc dầu và gas cho hệ thống lạnh, các loại kích thước từ 1/4" đến 1-1/8", phù hợp với refrigerant R22, R134a, R410A.', isFeatured: false },
    { slug: 'van-dien-tu', nameVi: 'Van điện từ (Solenoid Valve)', nameEn: 'Solenoid Valve HVAC', catSlug: 'linh-kien', descriptionVi: 'Van điện từ kiểm soát lưu lượng gas lạnh trong hệ thống HVAC. Áp suất làm việc đến 45 bar, nhiều cỡ kết nối 3/8" - 1-1/8".', isFeatured: false },
    { slug: 'cau-thu-am', nameVi: 'Cầu thu ẩm (Liquid Sight Glass)', nameEn: 'Liquid Line Filter Drier', catSlug: 'linh-kien', descriptionVi: 'Cầu thu ẩm cho đường lỏng hệ thống lạnh, loại bỏ độ ẩm và tạp chất, bảo vệ máy nén và van tiết lưu.', isFeatured: false },
    { slug: 'chiller-carrier', nameVi: 'Chiller giải nhiệt nước Carrier', nameEn: 'Carrier Water-Cooled Chiller', catSlug: 'thiet-bi-khac', descriptionVi: 'Máy làm lạnh nước trung tâm (Chiller) Carrier, công suất từ 50 RT đến 2000 RT, công nghệ biến tần tiết kiệm điện, COP cao.', isFeatured: true },
    { slug: 'ahu-air-handling-unit', nameVi: 'Tổ máy xử lý không khí (AHU)', nameEn: 'Air Handling Unit (AHU)', catSlug: 'thiet-bi-khac', descriptionVi: 'AHU xử lý và phân phối không khí điều hòa cho các không gian lớn: nhà xưởng, hội trường, bệnh viện. Lọc bụi, trao đổi nhiệt, điều chỉnh độ ẩm.', isFeatured: true },
  ]
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug, nameVi: p.nameVi, nameEn: p.nameEn,
        descriptionVi: p.descriptionVi, descriptionEn: p.descriptionVi,
        contentVi: '', contentEn: '', categoryId: catMap[p.catSlug],
        isActive: true, isFeatured: p.isFeatured, sortOrder: 0,
      },
    })
  }
  console.log('✅ Products seeded:', products.length)

  // Project categories
  const prjCat = await prisma.projectCategory.upsert({
    where: { slug: 'cong-trinh-tieu-bieu' },
    update: {},
    create: { nameVi: 'Công trình tiêu biểu', nameEn: 'Featured Projects', slug: 'cong-trinh-tieu-bieu', sortOrder: 0 },
  })

  // Projects
  const projects = [
    { slug: 'unilever-bac-ninh', titleVi: 'Nhà máy Unilever Bắc Ninh', titleEn: 'Unilever Bac Ninh Factory', clientName: 'Unilever Việt Nam', location: 'KCN VSIP, Bắc Ninh', sectorVi: 'Nhà máy', descriptionVi: 'Bảo trì và sửa chữa toàn bộ hệ thống điều hòa không khí trung tâm tại nhà máy Unilever Bắc Ninh. Bao gồm hệ thống Chiller giải nhiệt nước Trane 1200RT, hệ thống AHU/FCU và tháp giải nhiệt.', isFeatured: true },
    { slug: 'vien-huyet-hoc', titleVi: 'Viện Huyết học Truyền máu Trung ương', titleEn: 'National Blood Transfusion Institute', clientName: 'Bộ Y tế', location: 'Hà Nội', sectorVi: 'Bệnh viện', descriptionVi: 'Bảo dưỡng định kỳ và sửa chữa lớn hệ thống HVAC tại Viện Huyết học Truyền máu TW. Đảm bảo nhiệt độ và độ sạch không khí tại phòng lưu trữ máu và phòng phẫu thuật.', isFeatured: true },
    { slug: 'nha-may-nhiet-dien-hai-phong', titleVi: 'Nhà máy Nhiệt điện Hải Phòng', titleEn: 'Hai Phong Thermal Power Plant', clientName: 'Tập đoàn Điện lực Việt Nam', location: 'Hải Phòng', sectorVi: 'Nhà máy', descriptionVi: 'Cải tạo và nâng cấp hệ thống điều hòa không khí tại trung tâm điều khiển và nhà điều hành Nhà máy Nhiệt điện Hải Phòng. Thay mới toàn bộ hệ thống Chiller York 800RT.', isFeatured: true },
    { slug: 'bo-cong-an', titleVi: 'Tổ hợp trụ sở Bộ Công An', titleEn: 'Ministry of Public Security HQ', clientName: 'Bộ Công An', location: 'Hà Nội', sectorVi: 'Tòa nhà văn phòng', descriptionVi: 'Bảo trì hệ thống HVAC tổng hợp tại khu phức hợp trụ sở Bộ Công An. Hệ thống VRV Daikin 500HP và hệ thống FCU Carrier toàn nhà.', isFeatured: true },
    { slug: 'tong-lien-doan-lao-dong', titleVi: 'Tổng Liên đoàn Lao động Việt Nam', titleEn: 'Vietnam General Confederation of Labour', clientName: 'VGCL', location: 'Hà Nội', sectorVi: 'Tòa nhà văn phòng', descriptionVi: 'Bảo dưỡng và sửa chữa hệ thống VRV Mitsubishi và hệ thống cấp gió tươi tại trụ sở Tổng Liên đoàn Lao động Việt Nam.', isFeatured: false },
    { slug: 'vien-nghien-cuu-bao-ho', titleVi: 'Viện Nghiên cứu KHKT Bảo hộ Lao động', titleEn: 'Institute for Occupational Safety Research', clientName: 'Bộ Lao động', location: 'Hà Nội', sectorVi: 'Tòa nhà văn phòng', descriptionVi: 'Lắp đặt mới và bảo trì hệ thống điều hòa không khí tổng thể cho tòa nhà nghiên cứu 8 tầng. Hệ thống VRV Daikin và thông gió hồi nhiệt ERV.', isFeatured: false },
    { slug: 'vincom-center', titleVi: 'Vincom Center (Hợp đồng bảo trì)', titleEn: 'Vincom Center (Maintenance Contract)', clientName: 'Vingroup', location: 'Hà Nội & TP.HCM', sectorVi: 'Trung tâm thương mại', descriptionVi: 'Hợp đồng bảo trì định kỳ hệ thống HVAC trung tâm thương mại Vincom. Đội ngũ kỹ thuật trực 24/7, đảm bảo môi trường trong lành cho hàng nghìn khách mỗi ngày.', isFeatured: true },
    { slug: 'kcn-thang-long', titleVi: 'KCN Thăng Long - Hệ thống HVAC nhà xưởng', titleEn: 'Thang Long Industrial Park HVAC', clientName: 'Ban quản lý KCN Thăng Long', location: 'Đông Anh, Hà Nội', sectorVi: 'Nhà máy', descriptionVi: 'Thiết kế và lắp đặt hệ thống thông gió và điều hòa không khí cho 5 nhà xưởng tại KCN Thăng Long. Tổng công suất 300 tấn lạnh, đảm bảo nhiệt độ và độ ẩm theo yêu cầu sản xuất.', isFeatured: false },
  ]
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug, titleVi: p.titleVi, titleEn: p.titleEn, clientName: p.clientName,
        location: p.location, sectorVi: p.sectorVi, sectorEn: p.sectorVi,
        descriptionVi: p.descriptionVi, descriptionEn: p.descriptionVi,
        contentVi: '', contentEn: '', categoryId: prjCat.id,
        isActive: true, isFeatured: p.isFeatured,
      },
    })
  }
  console.log('✅ Projects seeded:', projects.length)

  // Partners
  const partners = [
    { nameVi: 'Daikin', nameEn: 'Daikin Industries', website: 'https://daikin.com.vn', sortOrder: 1 },
    { nameVi: 'Mitsubishi Electric', nameEn: 'Mitsubishi Electric', website: 'https://www.mitsubishielectric.com', sortOrder: 2 },
    { nameVi: 'Carrier', nameEn: 'Carrier Global', website: 'https://www.carrier.com', sortOrder: 3 },
    { nameVi: 'Trane', nameEn: 'Trane Technologies', website: 'https://www.trane.com', sortOrder: 4 },
    { nameVi: 'York (JCI)', nameEn: 'York Johnson Controls', website: 'https://www.johnsoncontrols.com', sortOrder: 5 },
    { nameVi: 'Copeland', nameEn: 'Copeland (Emerson)', website: 'https://www.copeland.com', sortOrder: 6 },
  ]
  await prisma.partner.deleteMany({})
  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }
  console.log('✅ Partners seeded:', partners.length)

  // News categories
  const newsCats = [
    { slug: 'tin-cong-ty', nameVi: 'Tin công ty', nameEn: 'Company News' },
    { slug: 'ky-thuat-hvac', nameVi: 'Chia sẻ kỹ thuật HVAC', nameEn: 'HVAC Technical Sharing' },
    { slug: 'van-hanh-bao-tri', nameVi: 'Hướng dẫn vận hành & bảo trì', nameEn: 'Operation & Maintenance Guide' },
    { slug: 'tuyen-dung', nameVi: 'Tin tuyển dụng', nameEn: 'Recruitment News' },
  ]
  const newsCatMap: Record<string, string> = {}
  for (const c of newsCats) {
    const cat = await prisma.newsCategory.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, sortOrder: 0 } })
    newsCatMap[c.slug] = cat.id
  }

  // News posts
  const posts = [
    {
      slug: 'bao-duong-dinh-ky-chiller-khi-nao-va-tai-sao',
      titleVi: 'Bảo dưỡng định kỳ Chiller: Khi nào và tại sao?',
      titleEn: 'Periodic Chiller Maintenance: When and Why?',
      catSlug: 'van-hanh-bao-tri',
      contentVi: '<h2>Tầm quan trọng của bảo dưỡng Chiller định kỳ</h2><p>Hệ thống Chiller là thiết bị trung tâm trong các tòa nhà thương mại và công nghiệp. Việc bảo dưỡng định kỳ không chỉ kéo dài tuổi thọ thiết bị mà còn tiết kiệm đáng kể chi phí vận hành.</p><h2>Chu kỳ bảo dưỡng khuyến nghị</h2><p>Theo tiêu chuẩn ASHRAE, Chiller nên được bảo dưỡng ít nhất 2 lần/năm với các hạng mục cơ bản và 1 lần/năm cho đại tu tổng thể.</p><h2>Hạng mục kiểm tra chính</h2><ul><li>Kiểm tra áp suất gas, dầu bôi trơn</li><li>Vệ sinh bình bay hơi và bình ngưng</li><li>Kiểm tra máy nén, đo điện trở động cơ</li><li>Kiểm tra van tiết lưu và các van điện từ</li><li>Hiệu chỉnh hệ thống điều khiển BMS</li></ul>',
    },
    {
      slug: 'cach-nhan-biet-he-thong-hvac-can-sua-chua',
      titleVi: '5 Dấu hiệu hệ thống HVAC cần sửa chữa ngay',
      titleEn: '5 Signs Your HVAC System Needs Immediate Repair',
      catSlug: 'ky-thuat-hvac',
      contentVi: '<h2>Nhận biết sớm để tránh thiệt hại lớn</h2><p>Hệ thống HVAC thường có những dấu hiệu cảnh báo trước khi xảy ra sự cố nghiêm trọng. Việc phát hiện sớm giúp tiết kiệm chi phí sửa chữa và tránh gián đoạn hoạt động.</p><h2>5 dấu hiệu cần chú ý</h2><ol><li><strong>Tiếng ồn bất thường:</strong> Tiếng rung, tiếng gõ hay tiếng rít từ máy nén hoặc quạt</li><li><strong>Nhiệt độ không ổn định:</strong> Hệ thống không đạt nhiệt độ cài đặt dù hoạt động bình thường</li><li><strong>Rò rỉ nước bất thường:</strong> Đọng nước ở những vị trí không bình thường</li><li><strong>Tăng đột biến hóa đơn điện:</strong> COP giảm do thiết bị xuống cấp</li><li><strong>Mùi khó chịu:</strong> Có thể do ống dẫn khí bẩn hoặc rò rỉ gas</li></ol>',
    },
    {
      slug: 'fave-viet-nam-ky-hop-dong-vincom',
      titleVi: 'FAVE Việt Nam ký hợp đồng bảo trì HVAC với Vincom',
      titleEn: 'FAVE Vietnam Signs HVAC Maintenance Contract with Vincom',
      catSlug: 'tin-cong-ty',
      contentVi: '<p>FAVE Việt Nam vừa ký kết hợp đồng bảo trì hệ thống HVAC dài hạn với Vingroup cho chuỗi trung tâm thương mại Vincom tại Hà Nội và TP.HCM.</p><p>Theo hợp đồng, FAVE sẽ cung cấp dịch vụ bảo trì định kỳ, sửa chữa sự cố 24/7 và quản lý vận hành hệ thống HVAC cho 8 tòa nhà Vincom với tổng công suất lắp đặt hơn 10.000 tấn lạnh.</p>',
    },
    {
      slug: 'tuyen-dung-ky-thuat-hvac-2025',
      titleVi: 'Tuyển dụng: Kỹ sư HVAC và Kỹ thuật viên điện lạnh (2025)',
      titleEn: 'Hiring: HVAC Engineers and Refrigeration Technicians (2025)',
      catSlug: 'tuyen-dung',
      contentVi: '<p>FAVE Việt Nam đang mở rộng quy mô hoạt động và tuyển dụng các vị trí sau:</p><ul><li>Kỹ sư HVAC (5 vị trí) - Yêu cầu có kinh nghiệm từ 2 năm trở lên</li><li>Kỹ thuật viên bảo trì điện lạnh (10 vị trí) - Ưu tiên có chứng chỉ nghề</li><li>Nhân viên kinh doanh kỹ thuật (3 vị trí)</li></ul><p>Liên hệ: Favevietnam@gmail.com hoặc gọi hotline 0981907109</p>',
    },
  ]
  for (const p of posts) {
    await prisma.newsPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug, titleVi: p.titleVi, titleEn: p.titleEn,
        contentVi: p.contentVi, contentEn: p.contentVi,
        status: 'PUBLISHED', publishedAt: new Date(),
        categoryId: newsCatMap[p.catSlug],
        metaTitle: p.titleVi, metaDescription: p.titleVi,
        viewCount: Math.floor(Math.random() * 500) + 100,
      },
    })
  }
  console.log('✅ News posts seeded:', posts.length)

  // Recruitment
  const jobs = [
    { slug: 'ky-su-hvac', titleVi: 'Kỹ sư HVAC', titleEn: 'HVAC Engineer', department: 'Kỹ thuật', location: 'Hà Nội', descriptionVi: 'Thiết kế, thi công và giám sát các dự án HVAC cho tòa nhà thương mại và công nghiệp.', requirementsVi: '- Tốt nghiệp Đại học chuyên ngành Điện lạnh, Kỹ thuật nhiệt hoặc tương đương\n- Kinh nghiệm 2+ năm trong lĩnh vực HVAC\n- Biết đọc và vẽ bản vẽ kỹ thuật AutoCAD', benefitsVi: '- Lương 15-25 triệu/tháng + thưởng dự án\n- Đào tạo nâng cao kỹ năng\n- BHXH đầy đủ theo quy định', isActive: true },
    { slug: 'ky-thuat-vien-bao-tri', titleVi: 'Kỹ thuật viên Bảo trì điện lạnh', titleEn: 'Refrigeration Maintenance Technician', department: 'Kỹ thuật', location: 'Hà Nội / TP.HCM', descriptionVi: 'Thực hiện bảo trì, bảo dưỡng định kỳ và sửa chữa hệ thống HVAC tại các công trình của khách hàng.', requirementsVi: '- Tốt nghiệp TC/CĐ chuyên ngành Kỹ thuật lạnh\n- Có chứng chỉ nghề điện lạnh\n- Sẵn sàng làm việc ngoài giờ và trực sự cố', benefitsVi: '- Lương 8-15 triệu/tháng + phụ cấp công trình\n- Trang bị đầy đủ BHLĐ\n- Cơ hội thăng tiến lên Kỹ sư', isActive: true },
    { slug: 'nhan-vien-kinh-doanh', titleVi: 'Nhân viên Kinh doanh Kỹ thuật', titleEn: 'Technical Sales Executive', department: 'Kinh doanh', location: 'Hà Nội', descriptionVi: 'Tìm kiếm và phát triển khách hàng doanh nghiệp cho dịch vụ HVAC và linh kiện thiết bị.', requirementsVi: '- Tốt nghiệp ĐH/CĐ, ưu tiên chuyên ngành kỹ thuật hoặc kinh tế\n- Có kinh nghiệm bán hàng kỹ thuật B2B là lợi thế\n- Kỹ năng giao tiếp và thương lượng tốt', benefitsVi: '- Lương cơ bản + hoa hồng hấp dẫn\n- Xe máy/phí đi lại\n- Đào tạo sản phẩm bài bản', isActive: true },
  ]
  for (const j of jobs) {
    await prisma.recruitment.upsert({
      where: { slug: j.slug },
      update: {},
      create: { ...j, titleEn: j.titleEn, descriptionEn: j.descriptionVi, requirementsEn: j.requirementsVi, benefitsEn: j.benefitsVi },
    })
  }
  console.log('✅ Jobs seeded:', jobs.length)

  // Certificates
  const certs = [
    { nameVi: 'Giấy phép Kinh doanh', nameEn: 'Business License', issuedBy: 'Sở KH&ĐT Hà Nội' },
    { nameVi: 'Chứng chỉ năng lực xây dựng', nameEn: 'Construction Capability Certificate', issuedBy: 'Bộ Xây dựng' },
    { nameVi: 'Chứng chỉ ISO 9001:2015', nameEn: 'ISO 9001:2015 Certificate', issuedBy: 'Bureau Veritas' },
    { nameVi: 'Giấy phép hoạt động điện', nameEn: 'Electrical Work Permit', issuedBy: 'Cục Điện lực và Năng lượng tái tạo' },
  ]
  await prisma.certificate.deleteMany({})
  for (const c of certs) {
    await prisma.certificate.create({ data: c })
  }
  console.log('✅ Certificates seeded:', certs.length)

  console.log('\n🎉 Seeding complete!')
  console.log('Admin login: admin@fave.com.vn / Admin@123456')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
