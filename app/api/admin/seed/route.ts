import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    const results: string[] = []

    // ============================================================
    // 1. ADMIN USER
    // ============================================================
    const existing = await prisma.user.findUnique({ where: { email: 'admin@fave.com.vn' } })
    if (!existing) {
      const hash = await bcrypt.hash('Admin@123456', 12)
      await prisma.user.create({ data: { email: 'admin@fave.com.vn', name: 'FAVE Admin', password: hash, role: 'ADMIN' } })
      results.push('✅ Admin user created')
    } else { results.push('ℹ️ Admin user already exists') }

    // ============================================================
    // 2. SITE SETTINGS — thông tin công ty + số liệu thống kê
    // ============================================================
    const settings = [
      { key: 'company_name', value: 'FAVE Việt Nam' },
      { key: 'company_name_en', value: 'FAVE Vietnam' },
      { key: 'tagline_vi', value: 'Giải Pháp HVAC Toàn Diện — Chuyên Nghiệp · Tin Cậy · Đúng Hạn' },
      { key: 'tagline_en', value: 'Comprehensive HVAC Solutions — Professional · Reliable · On Time' },
      { key: 'hotline', value: '0981907109' },
      { key: 'email', value: 'Favevietnam@gmail.com' },
      { key: 'address_vi', value: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội' },
      { key: 'address_en', value: '348 Buoi Street, Nghia Do Ward, Ba Dinh District, Hanoi' },
      // Stats — hiển thị trên trang chủ & giới thiệu
      { key: 'stat_years', value: '10+' },
      { key: 'stat_projects', value: '500+' },
      { key: 'stat_engineers', value: '100+' },
      { key: 'stat_clients', value: '50+' },
      // About
      { key: 'about_intro_vi', value: 'Với hơn 10 năm kinh nghiệm trong lĩnh vực HVAC (thành lập 2016), FAVE Vietnam đã trở thành đối tác tin cậy của hàng trăm doanh nghiệp, bệnh viện và nhà máy hàng đầu Việt Nam. Chúng tôi không chỉ cung cấp thiết bị — chúng tôi mang lại giải pháp toàn diện.' },
      { key: 'about_strengths', value: 'Đại lý ủy quyền chính thức Daikin & Carrier Vietnam\nChứng chỉ ISO 9001:2015 và các tiêu chuẩn ASHRAE\nĐội kỹ sư thiết kế HVAC kinh nghiệm 10+ năm\nDịch vụ bảo trì 24/7, phản hồi trong 2-4 giờ\nPhần mềm tính toán chuyên nghiệp: HAP, Trace 700\nBảo hành công trình 12 tháng sau bàn giao' },
      // Social
      { key: 'facebook_url', value: 'https://facebook.com/favevietnam' },
      { key: 'zalo_url', value: 'https://zalo.me/0981907109' },
      // SEO
      { key: 'meta_title', value: 'FAVE Việt Nam - Dịch vụ HVAC Chuyên Nghiệp' },
      { key: 'meta_description', value: 'FAVE Việt Nam cung cấp dịch vụ bảo trì, sửa chữa, lắp đặt hệ thống HVAC chuyên nghiệp. 10 năm kinh nghiệm (từ 2016), 500+ dự án, đội ngũ 100+ kỹ sư.' },
    ]
    for (const s of settings) {
      await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
    }
    results.push(`✅ ${settings.length} site settings upserted`)

    // ============================================================
    // 3. SERVICE CATEGORIES
    // ============================================================
    const svcCatMap: Record<string, string> = {}
    const svcCats = [
      { slug: 'bao-tri-bao-duong', nameVi: 'Bảo trì & Bảo dưỡng', nameEn: 'Maintenance & Servicing', sortOrder: 1 },
      { slug: 'sua-chua-nang-cap', nameVi: 'Sửa chữa & Nâng cấp', nameEn: 'Repair & Upgrade', sortOrder: 2 },
      { slug: 'tu-van-thiet-ke', nameVi: 'Tư vấn & Thiết kế', nameEn: 'Consulting & Design', sortOrder: 3 },
      { slug: 'lap-dat-thi-cong', nameVi: 'Lắp đặt & Thi công', nameEn: 'Installation & Construction', sortOrder: 4 },
      { slug: 'cung-cap-thiet-bi', nameVi: 'Cung cấp thiết bị', nameEn: 'Equipment Supply', sortOrder: 5 },
      { slug: 'cung-cap-linh-kien', nameVi: 'Cung cấp linh kiện', nameEn: 'Spare Parts Supply', sortOrder: 6 },
    ]
    for (const c of svcCats) {
      const cat = await prisma.serviceCategory.upsert({ where: { slug: c.slug }, update: {}, create: c })
      svcCatMap[c.slug] = cat.id
    }
    results.push(`✅ ${svcCats.length} service categories seeded`)

    // ============================================================
    // 4. SERVICES — khớp slug với ServicesSection fallback
    // ============================================================
    const services = [
      // === BẢO DƯỠNG (nội dung thật từ fave.com.vn) ===
      {
        slug: 'bao-tri-dieu-hoa', titleVi: 'Bảo Dưỡng Điều Hòa', titleEn: 'Air Conditioning Maintenance',
        icon: '❄️', sortOrder: 1, catSlug: 'bao-tri-bao-duong',
        descVi: 'Dịch vụ bảo dưỡng toàn diện hệ thống điều hòa không khí: cục bộ, thương mại (Cassette, tủ đứng, áp trần), bán trung tâm (VRV, SMMS, MultiV), FCU/AHU/PAU, Chiller trung tâm, tháp giải nhiệt và quạt cấp gió tươi.',
        descEn: 'Comprehensive air conditioning maintenance: split units, commercial (cassette, floor-standing, ceiling), semi-central (VRV, SMMS, MultiV), FCU/AHU/PAU, central chiller, cooling towers and fresh air fans.',
      },
      {
        slug: 'bao-duong-chiller', titleVi: 'Bảo Dưỡng Chiller', titleEn: 'Chiller Maintenance',
        icon: '🌀', sortOrder: 2, catSlug: 'bao-tri-bao-duong',
        descVi: 'Bảo dưỡng định kỳ Chiller giải nhiệt nước và giải nhiệt gió: vệ sinh dàn trao đổi nhiệt, kiểm tra môi chất lạnh, dầu bôi trơn, hệ thống điều khiển và bơm tuần hoàn. An toàn — Chính xác — Đúng hạn.',
        descEn: 'Periodic maintenance of water-cooled and air-cooled chillers: heat exchanger cleaning, refrigerant inspection, lubrication oil, control systems and circulation pumps. Safe — Accurate — On time.',
      },
      {
        slug: 've-sinh-cong-nghiep', titleVi: 'Vệ Sinh & Bảo Dưỡng AHU/FCU', titleEn: 'AHU/FCU Cleaning & Maintenance',
        icon: '🧪', sortOrder: 3, catSlug: 'bao-tri-bao-duong',
        descVi: 'Vệ sinh chuyên sâu FCU, AHU, PAU — làm sạch cuộn ống trao đổi nhiệt, thay phin lọc, kiểm tra đường ống nước lạnh và van điều tiết. Bảo dưỡng quạt cấp gió tươi, hút khói hành lang.',
        descEn: 'Deep cleaning FCU, AHU, PAU — heat exchanger coil cleaning, filter replacement, chilled water pipe and valve inspection. Maintenance of fresh air supply fans and corridor smoke extraction fans.',
      },
      // === SỬA CHỮA (nội dung thật từ fave.com.vn) ===
      {
        slug: 'sua-chua-hvac', titleVi: 'Sửa Chữa Điều Hòa', titleEn: 'Air Conditioning Repair',
        icon: '🏭', sortOrder: 4, catSlug: 'sua-chua-nang-cap',
        descVi: 'Dịch vụ sửa chữa chuyên nghiệp: kiểm tra tình trạng thiết bị, tẩy rửa dàn trao đổi nhiệt, thay máy nén Chiller, bọc bảo ôn bình cooler/condenser, kiểm tra thử xì & khắc phục, sửa chữa bơm nước, thay lò xo giảm chấn.',
        descEn: 'Professional repair services: equipment inspection, heat exchanger descaling, chiller compressor replacement, cooler/condenser insulation, leak testing & remediation, pump repair, vibration isolator replacement.',
      },
      {
        slug: 'cai-tao-nang-cap', titleVi: 'Cải Tạo & Nâng Cấp HVAC', titleEn: 'HVAC Renovation & Upgrade',
        icon: '⚡', sortOrder: 5, catSlug: 'sua-chua-nang-cap',
        descVi: 'Nâng cấp và sửa chữa lớn hệ thống HVAC: thay thế dàn trao đổi nhiệt, nâng cấp lên inverter tiết kiệm điện, cải tạo đường ống cách nhiệt, tối ưu hệ thống điều khiển BMS/BACnet.',
        descEn: 'Major HVAC overhaul: heat exchanger replacement, inverter upgrade for energy savings, pipe insulation renovation, BMS/BACnet control system optimization.',
      },
      // === THIẾT KẾ & LẮP ĐẶT ===
      {
        slug: 'thiet-ke-hvac', titleVi: 'Thiết Kế HVAC', titleEn: 'HVAC System Design',
        icon: '📐', sortOrder: 6, catSlug: 'tu-van-thiet-ke',
        descVi: 'Tư vấn kỹ thuật và thiết kế HVAC tối ưu bằng phần mềm HAP, Trace 700, AutoCAD MEP. Phân tích tải nhiệt, tính toán công suất, lập dự toán và hồ sơ hoàn công.',
        descEn: 'Technical consulting and optimal HVAC design using HAP, Trace 700, AutoCAD MEP. Heat load analysis, capacity calculation, cost estimation and as-built documentation.',
      },
      {
        slug: 'lap-dat-hvac', titleVi: 'Lắp Đặt & Thi Công HVAC', titleEn: 'HVAC Installation & Construction',
        icon: '🔧', sortOrder: 7, catSlug: 'lap-dat-thi-cong',
        descVi: 'Thi công lắp đặt hệ thống điều hòa trung tâm, VRV/VRF, Chiller và các hệ thống phụ trợ theo đúng thiết kế và tiêu chuẩn kỹ thuật ASHRAE. Đội ngũ 100+ kỹ sư chuyên nghiệp, bảo hành công trình 12 tháng.',
        descEn: 'Installation of central air conditioning, VRV/VRF, Chiller and auxiliary systems per design and ASHRAE standards. Team of 100+ professional engineers, 12-month project warranty.',
      },
      // === CUNG CẤP ===
      {
        slug: 'cung-cap-thiet-bi-hvac', titleVi: 'Cung Cấp Thiết Bị HVAC', titleEn: 'HVAC Equipment Supply',
        icon: '💧', sortOrder: 8, catSlug: 'cung-cap-thiet-bi',
        descVi: 'Cung cấp thiết bị HVAC chính hãng: Chiller, AHU, FCU, tháp giải nhiệt, bơm nước, van điều tiết. Đại lý ủy quyền Daikin, Carrier, Trane, York, Mitsubishi Electric. Cam kết bảo hành nhà sản xuất.',
        descEn: 'Genuine HVAC equipment supply: Chiller, AHU, FCU, cooling towers, pumps, control valves. Authorized dealer for Daikin, Carrier, Trane, York, Mitsubishi Electric. Manufacturer warranty guaranteed.',
      },
      {
        slug: 'cung-cap-linh-kien', titleVi: 'Cung Cấp Linh Kiện Điện Lạnh', titleEn: 'HVAC Spare Parts Supply',
        icon: '🔩', sortOrder: 9, catSlug: 'cung-cap-linh-kien',
        descVi: 'Cung cấp đầy đủ linh kiện điện lạnh chính hãng: máy nén lạnh, quạt & motor quạt, cánh quạt, board điều khiển, bơm nước ngưng dàn lạnh, phin lọc dầu/gas và vật tư ngành điện lạnh khác. Giao hàng nhanh, đúng chủng loại.',
        descEn: 'Full range of genuine HVAC spare parts: compressors, fans & fan motors, fan blades, control boards, condensate pumps, oil/gas filters and other HVAC consumables. Fast delivery, correct specifications.',
      },
    ]
    let svcCount = 0
    for (const s of services) {
      const catId = svcCatMap[s.catSlug]
      await prisma.service.upsert({
        where: { slug: s.slug }, update: {},
        create: { slug: s.slug, titleVi: s.titleVi, titleEn: s.titleEn, icon: s.icon, sortOrder: s.sortOrder, categoryId: catId, descriptionVi: s.descVi, descriptionEn: s.descEn, contentVi: s.descVi, contentEn: s.descEn, isActive: true }
      })
      svcCount++
    }
    results.push(`✅ ${svcCount} services seeded`)

    // ============================================================
    // 5. PRODUCT CATEGORIES
    // ============================================================
    const prodCatMap: Record<string, string> = {}
    const prodCats = [
      { slug: 'may-dieu-hoa-trung-tam', nameVi: 'Máy điều hòa trung tâm', nameEn: 'Central Air Conditioning', sortOrder: 1 },
      { slug: 'chiller', nameVi: 'Chiller', nameEn: 'Chiller Systems', sortOrder: 2 },
      { slug: 'vrv-vrf', nameVi: 'VRV / VRF', nameEn: 'VRV / VRF Systems', sortOrder: 3 },
      { slug: 'thiet-bi-phu-tro', nameVi: 'Thiết bị phụ trợ', nameEn: 'Auxiliary Equipment', sortOrder: 4 },
      { slug: 'xu-ly-khong-khi', nameVi: 'Xử lý không khí', nameEn: 'Air Treatment', sortOrder: 5 },
    ]
    for (const c of prodCats) {
      const cat = await prisma.productCategory.upsert({ where: { slug: c.slug }, update: {}, create: c })
      prodCatMap[c.slug] = cat.id
    }
    results.push(`✅ ${prodCats.length} product categories seeded`)

    // ============================================================
    // 6. PRODUCTS — khớp slug với ProductsSection fallback + thêm
    // ============================================================
    const products = [
      // From ProductsSection fallback
      { slug: 'may-nen-truc-vit-carrier', nameVi: 'Máy Nén Trục Vít Carrier', nameEn: 'Carrier Screw Compressor', cat: 'chiller', descVi: 'Máy nén trục vít 100-400TR, COP vượt trội, phù hợp hệ thống làm lạnh công nghiệp lớn.', descEn: 'Screw compressor 100-400TR, superior COP for large industrial refrigeration.', featured: true },
      { slug: 'bo-xu-ly-khong-khi-ahu', nameVi: 'Dàn Xử Lý Không Khí AHU', nameEn: 'Air Handling Unit (AHU)', cat: 'xu-ly-khong-khi', descVi: 'AHU 5.000-100.000 m³/h, lọc HEPA, làm ẩm/hút ẩm, tối ưu cho nhà máy dược và phòng sạch.', descEn: 'AHU 5,000-100,000 m³/h with HEPA filtration, humidification for pharmaceutical and cleanroom.', featured: true },
      { slug: 'thap-giai-nhiet-cooling-tower', nameVi: 'Tháp Giải Nhiệt', nameEn: 'Cooling Tower', cat: 'thiet-bi-phu-tro', descVi: 'Tháp giải nhiệt ngược chiều/chéo dòng 50-3000TR, điện năng thấp, tuổi thọ cao.', descEn: 'Counter/cross-flow cooling tower 50-3000TR, low energy consumption, long lifespan.', featured: true },
      { slug: 'he-thong-vrv-daikin', nameVi: 'Hệ Thống VRV Daikin', nameEn: 'Daikin VRV System', cat: 'vrv-vrf', descVi: 'VRV IV thế hệ mới, inverter tiết kiệm 40% điện, điều khiển thông minh từng vùng.', descEn: 'New generation VRV IV, inverter saves 40% electricity, smart zone control.', featured: true },
      // Additional products
      { slug: 'carrier-aquaforce-chiller', nameVi: 'Carrier AquaForce Chiller', nameEn: 'Carrier AquaForce Chiller', cat: 'chiller', descVi: 'Chiller ly tâm hiệu suất cao, COP 6.0+, tuổi thọ 25+ năm.', descEn: 'High-efficiency centrifugal chiller, COP 6.0+, lifespan 25+ years.', featured: true },
      { slug: 'trane-centravac', nameVi: 'Trane CenTraVac Chiller', nameEn: 'Trane CenTraVac Chiller', cat: 'chiller', descVi: 'Chiller ly tâm áp thấp, không dầu bôi trơn, tiết kiệm điện vượt trội.', descEn: 'Low-pressure centrifugal chiller, oil-free, outstanding energy savings.', featured: false },
      { slug: 'daikin-vrv-iv', nameVi: 'Daikin VRV IV Plus', nameEn: 'Daikin VRV IV Plus', cat: 'vrv-vrf', descVi: 'Dòng VRV cao cấp nhất của Daikin, SEER lên đến 8.5, phù hợp tòa nhà thương mại.', descEn: 'Daikin\'s top VRV line, SEER up to 8.5, ideal for commercial buildings.', featured: false },
      { slug: 'mitsubishi-city-multi', nameVi: 'Mitsubishi City Multi', nameEn: 'Mitsubishi City Multi', cat: 'vrv-vrf', descVi: 'Hệ thống VRF chất lượng Nhật Bản, kết nối tới 50 dàn lạnh, inverter tần số cao.', descEn: 'Japanese VRF system, connects up to 50 indoor units, high-frequency inverter.', featured: false },
      { slug: 'ahu-wolf-phong-sach', nameVi: 'AHU Wolf Phòng Sạch', nameEn: 'Wolf Cleanroom AHU', cat: 'xu-ly-khong-khi', descVi: 'Cụm xử lý không khí chuyên dụng cho phòng sạch ISO 5-8, lọc ULPA 99.9995%.', descEn: 'Air handling unit for ISO 5-8 cleanrooms, ULPA 99.9995% filtration.', featured: false },
    ]
    let prodCount = 0
    for (const p of products) {
      const catId = prodCatMap[p.cat]
      await prisma.product.upsert({
        where: { slug: p.slug }, update: {},
        create: { slug: p.slug, nameVi: p.nameVi, nameEn: p.nameEn, categoryId: catId, descriptionVi: p.descVi, descriptionEn: p.descEn, contentVi: p.descVi, contentEn: p.descEn, isActive: true, isFeatured: p.featured, sortOrder: prodCount + 1 }
      })
      prodCount++
    }
    results.push(`✅ ${prodCount} products seeded`)

    // ============================================================
    // 7. PROJECT CATEGORIES
    // ============================================================
    const prjCatMap: Record<string, string> = {}
    const prjCats = [
      { slug: 'cong-nghiep', nameVi: 'Công nghiệp', nameEn: 'Industrial', sortOrder: 1 },
      { slug: 'y-te', nameVi: 'Y tế & Bệnh viện', nameEn: 'Healthcare', sortOrder: 2 },
      { slug: 'thuong-mai', nameVi: 'Thương mại & Văn phòng', nameEn: 'Commercial & Office', sortOrder: 3 },
      { slug: 'nang-luong', nameVi: 'Năng lượng', nameEn: 'Energy', sortOrder: 4 },
      { slug: 'khach-san', nameVi: 'Khách sạn & Nghỉ dưỡng', nameEn: 'Hotel & Resort', sortOrder: 5 },
      { slug: 'hanh-chinh', nameVi: 'Hành chính & Nhà nước', nameEn: 'Government', sortOrder: 6 },
    ]
    for (const c of prjCats) {
      const cat = await prisma.projectCategory.upsert({ where: { slug: c.slug }, update: {}, create: c })
      prjCatMap[c.slug] = cat.id
    }
    results.push(`✅ ${prjCats.length} project categories seeded`)

    // ============================================================
    // 8. PROJECTS — đầy đủ 8 dự án từ ProjectsSection fallback
    // ============================================================
    const projects = [
      // Công trình thật từ fave.com.vn
      { slug: 'unilever-bac-ninh', titleVi: 'Nhà Máy Unilever Bắc Ninh', titleEn: 'Unilever Bac Ninh Factory', client: 'Unilever Vietnam', loc: 'Bắc Ninh', sector: 'Công nghiệp', sectorEn: 'Industrial', scale: '500TR', cat: 'cong-nghiep', featured: true },
      { slug: 'vien-huyet-hoc', titleVi: 'Viện Huyết Học Truyền Máu TW', titleEn: 'National Institute of Hematology & Blood Transfusion', client: 'Bộ Y tế', loc: 'Hà Nội', sector: 'Y tế', sectorEn: 'Healthcare', scale: '200TR', cat: 'y-te', featured: true },
      { slug: 'nhiet-dien-hai-phong', titleVi: 'Nhà Máy Nhiệt Điện Hải Phòng', titleEn: 'Hai Phong Thermal Power Plant', client: 'EVN', loc: 'Hải Phòng', sector: 'Năng lượng', sectorEn: 'Energy', scale: '1000TR', cat: 'nang-luong', featured: true },
      { slug: 'vien-nckhkt-bhld', titleVi: 'Viện NCKHKT Bảo Hộ Lao Động', titleEn: 'Institute of Labor Science & Occupational Safety', client: 'Bộ Lao động', loc: 'Hà Nội', sector: 'Hành chính', sectorEn: 'Government', scale: '150TR', cat: 'hanh-chinh', featured: true },
      { slug: 'bo-cong-an', titleVi: 'Trụ Sở Bộ Công An', titleEn: 'Ministry of Public Security HQ', client: 'Bộ Công An', loc: 'Hà Nội', sector: 'Hành chính', sectorEn: 'Government', scale: '300TR', cat: 'hanh-chinh', featured: true },
      { slug: 'tong-lien-doan-ld', titleVi: 'Tổng Liên Đoàn Lao Động Việt Nam', titleEn: 'Vietnam General Confederation of Labour', client: 'Tổng LĐLĐ VN', loc: 'Hà Nội', sector: 'Hành chính', sectorEn: 'Government', scale: '250TR', cat: 'hanh-chinh', featured: true },
      // Dự án mở rộng
      { slug: 'samsung-thai-nguyen', titleVi: 'Samsung Electronics Thái Nguyên', titleEn: 'Samsung Electronics Thai Nguyen', client: 'Samsung', loc: 'Thái Nguyên', sector: 'Công nghiệp', sectorEn: 'Industrial', scale: '2000TR', cat: 'cong-nghiep', featured: true },
      { slug: 'jw-marriott-hanoi', titleVi: 'JW Marriott Hà Nội', titleEn: 'JW Marriott Hanoi', client: 'JW Marriott', loc: 'Hà Nội', sector: 'Khách sạn', sectorEn: 'Hotel', scale: '800TR', cat: 'khach-san', featured: false },
      { slug: 'vinmec-times-city', titleVi: 'Bệnh Viện Vinmec Times City', titleEn: 'Vinmec Times City Hospital', client: 'Vinmec', loc: 'Hà Nội', sector: 'Y tế', sectorEn: 'Healthcare', scale: '400TR', cat: 'y-te', featured: false },
      { slug: 'khu-cong-nghiep-vsip', titleVi: 'KCN VSIP Bắc Ninh', titleEn: 'VSIP Bac Ninh Industrial Zone', client: 'VSIP Group', loc: 'Bắc Ninh', sector: 'Công nghiệp', sectorEn: 'Industrial', scale: '800TR', cat: 'cong-nghiep', featured: false },
      { slug: 'vincom-center-ha-noi', titleVi: 'Vincom Center Hà Nội', titleEn: 'Vincom Center Hanoi', client: 'Vingroup', loc: 'Hà Nội', sector: 'Thương mại', sectorEn: 'Commercial', scale: '600TR', cat: 'thuong-mai', featured: false },
    ]
    let prjCount = 0
    for (const p of projects) {
      const catId = prjCatMap[p.cat]
      const desc = `Dự án ${p.titleVi} tại ${p.loc}. Khách hàng: ${p.client}. Quy mô: ${p.scale}.`
      await prisma.project.upsert({
        where: { slug: p.slug }, update: { isFeatured: p.featured },
        create: { slug: p.slug, titleVi: p.titleVi, titleEn: p.titleEn, clientName: p.client, location: p.loc, sectorVi: p.sector, sectorEn: p.sectorEn, scale: p.scale, categoryId: catId, descriptionVi: desc, descriptionEn: desc, contentVi: desc, contentEn: desc, isActive: true, isFeatured: p.featured }
      })
      prjCount++
    }
    results.push(`✅ ${prjCount} projects seeded`)

    // ============================================================
    // 9. PARTNERS — đầy đủ 12 đối tác từ PartnersSection
    // ============================================================
    await prisma.partner.deleteMany({})
    const partners = [
      { nameVi: 'Daikin', nameEn: 'Daikin Industries', website: 'https://daikin.com.vn', sortOrder: 1 },
      { nameVi: 'Carrier', nameEn: 'Carrier Global Corporation', website: 'https://www.carrier.com', sortOrder: 2 },
      { nameVi: 'Trane', nameEn: 'Trane Technologies', website: 'https://www.trane.com', sortOrder: 3 },
      { nameVi: 'York', nameEn: 'York Johnson Controls', website: 'https://www.johnsoncontrols.com', sortOrder: 4 },
      { nameVi: 'Mitsubishi Electric', nameEn: 'Mitsubishi Electric', website: 'https://www.mitsubishielectric.com.vn', sortOrder: 5 },
      { nameVi: 'LG HVAC', nameEn: 'LG Electronics HVAC', website: 'https://www.lg.com', sortOrder: 6 },
      { nameVi: 'Gree', nameEn: 'Gree Electric Appliances', website: 'https://www.gree.com', sortOrder: 7 },
      { nameVi: 'Hitachi', nameEn: 'Hitachi Johnson Controls', website: 'https://www.hitachiaircon.com', sortOrder: 8 },
      { nameVi: 'Samsung HVAC', nameEn: 'Samsung HVAC', website: 'https://www.samsung.com', sortOrder: 9 },
      { nameVi: 'Panasonic', nameEn: 'Panasonic Corporation', website: 'https://www.panasonic.com', sortOrder: 10 },
      { nameVi: 'Emerson', nameEn: 'Emerson Climate Technologies', website: 'https://www.emerson.com', sortOrder: 11 },
      { nameVi: 'Danfoss', nameEn: 'Danfoss Group', website: 'https://www.danfoss.com', sortOrder: 12 },
    ]
    for (const p of partners) await prisma.partner.create({ data: { ...p, isActive: true } })
    results.push(`✅ ${partners.length} partners seeded`)

    // ============================================================
    // 10. FEATURED CLIENTS — đầy đủ 9 khách hàng từ PartnersSection
    // ============================================================
    await prisma.featuredClient.deleteMany({})
    const clients = [
      // Khách hàng thật từ fave.com.vn
      { nameVi: 'Unilever Vietnam', nameEn: 'Unilever Vietnam', industry: 'FMCG', projectDesc: 'Bảo dưỡng Chiller Trane 1200RT tại nhà máy Bắc Ninh', sortOrder: 1 },
      { nameVi: 'EVN', nameEn: 'Vietnam Electricity', industry: 'Năng lượng', projectDesc: 'Bảo dưỡng, nâng cấp hệ thống HVAC nhà máy Nhiệt Điện Hải Phòng', sortOrder: 2 },
      { nameVi: 'Bộ Công An', nameEn: 'Ministry of Public Security', industry: 'Hành chính', projectDesc: 'Lắp đặt & bảo trì HVAC trụ sở Bộ Công An, Hà Nội', sortOrder: 3 },
      { nameVi: 'Viện Huyết Học TW', nameEn: 'National Institute of Hematology', industry: 'Y tế', projectDesc: 'HVAC phòng sạch, phòng xét nghiệm Viện Huyết Học Truyền Máu TW', sortOrder: 4 },
      { nameVi: 'Tổng LĐLĐ Việt Nam', nameEn: 'Vietnam General Confederation of Labour', industry: 'Hành chính', projectDesc: 'Bảo trì hệ thống HVAC trụ sở Tổng Liên Đoàn Lao Động VN', sortOrder: 5 },
      { nameVi: 'Viện NCKHKT BHLĐ', nameEn: 'Institute of Labor Science & Occupational Safety', industry: 'Nghiên cứu', projectDesc: 'Lắp đặt hệ thống HVAC phòng thí nghiệm và văn phòng', sortOrder: 6 },
      // Khách hàng mở rộng
      { nameVi: 'Samsung Electronics', nameEn: 'Samsung Electronics', industry: 'Công nghiệp', projectDesc: 'HVAC tổng thể nhà máy Samsung Thái Nguyên 2000TR', sortOrder: 7 },
      { nameVi: 'JW Marriott Hanoi', nameEn: 'JW Marriott Hanoi', industry: 'Khách sạn', projectDesc: 'Hệ thống làm lạnh trung tâm 800TR khách sạn JW Marriott Hà Nội', sortOrder: 8 },
      { nameVi: 'Vinmec', nameEn: 'Vinmec Healthcare', industry: 'Y tế', projectDesc: 'HVAC phòng phẫu thuật và ICU bệnh viện Vinmec Times City', sortOrder: 9 },
      { nameVi: 'VSIP Group', nameEn: 'VSIP Group', industry: 'Bất động sản KCN', projectDesc: 'HVAC hạ tầng khu công nghiệp VSIP Bắc Ninh', sortOrder: 10 },
      { nameVi: 'Vingroup', nameEn: 'Vingroup JSC', industry: 'Đa ngành', projectDesc: 'Bảo trì HVAC chuỗi Vincom Center toàn quốc', sortOrder: 11 },
    ]
    for (const c of clients) await prisma.featuredClient.create({ data: { ...c, isActive: true } })
    results.push(`✅ ${clients.length} featured clients seeded`)

    // ============================================================
    // 11. TEAM MEMBERS
    // ============================================================
    const team = [
      { nameVi: 'Nguyễn Văn Hùng', nameEn: 'Nguyen Van Hung', positionVi: 'Giám đốc điều hành (CEO)', positionEn: 'Chief Executive Officer', bioVi: '10+ năm kinh nghiệm trong ngành HVAC, người sáng lập FAVE Vietnam năm 2016, chuyên gia bảo trì Chiller và hệ thống làm lạnh công nghiệp.', sortOrder: 1 },
      { nameVi: 'Trần Thị Mai', nameEn: 'Tran Thi Mai', positionVi: 'Kỹ sư trưởng', positionEn: 'Chief Engineer', bioVi: 'Kỹ sư MEP với 10 năm kinh nghiệm thiết kế hệ thống HVAC cho tòa nhà cao tầng và công trình y tế.', sortOrder: 2 },
      { nameVi: 'Lê Minh Tuấn', nameEn: 'Le Minh Tuan', positionVi: 'Trưởng phòng kỹ thuật', positionEn: 'Technical Manager', bioVi: 'Chuyên gia bảo dưỡng VRF/VRV, được đào tạo chuyên sâu bởi Daikin Nhật Bản và Carrier Mỹ.', sortOrder: 3 },
      { nameVi: 'Phạm Thị Hoa', nameEn: 'Pham Thi Hoa', positionVi: 'Giám đốc kinh doanh', positionEn: 'Sales Director', bioVi: '8 năm phát triển thị trường B2B HVAC, xây dựng quan hệ với 200+ khách hàng doanh nghiệp.', sortOrder: 4 },
    ]
    for (const m of team) {
      const existing = await prisma.teamMember.findFirst({ where: { nameVi: m.nameVi } })
      if (!existing) await prisma.teamMember.create({ data: { ...m, isActive: true } })
    }
    results.push(`✅ ${team.length} team members seeded`)

    // ============================================================
    // 12. CERTIFICATES
    // ============================================================
    const certs = [
      { nameVi: 'ISO 9001:2015', nameEn: 'ISO 9001:2015 Quality Management', descriptionVi: 'Chứng chỉ hệ thống quản lý chất lượng quốc tế, cấp bởi Bureau Veritas năm 2021.', issuedBy: 'Bureau Veritas', sortOrder: 1 },
      { nameVi: 'Đại lý ủy quyền Daikin', nameEn: 'Daikin Authorized Dealer', descriptionVi: 'Chứng nhận đại lý ủy quyền chính thức của Daikin Vietnam cho khu vực Hà Nội và miền Bắc.', issuedBy: 'Daikin Vietnam', sortOrder: 2 },
      { nameVi: 'Đại lý ủy quyền Carrier', nameEn: 'Carrier Authorized Partner', descriptionVi: 'Chứng nhận đối tác ủy quyền của Carrier Vietnam, phân phối và bảo hành toàn quốc.', issuedBy: 'Carrier Vietnam', sortOrder: 3 },
      { nameVi: 'ASHRAE Membership', nameEn: 'ASHRAE Membership', descriptionVi: 'Thành viên chính thức của Hiệp hội Kỹ sư Nhiệt lạnh, Điều hòa không khí và Thông gió Mỹ.', issuedBy: 'ASHRAE International', sortOrder: 4 },
    ]
    for (const c of certs) {
      const existing = await prisma.certificate.findFirst({ where: { nameVi: c.nameVi } })
      if (!existing) await prisma.certificate.create({ data: { ...c, nameEn: c.nameEn, isActive: true } })
    }
    results.push(`✅ ${certs.length} certificates seeded`)

    // ============================================================
    // 13. NEWS CATEGORIES + NEWS POSTS
    // ============================================================
    const newsCat1 = await prisma.newsCategory.upsert({ where: { slug: 'tin-tuc-hvac' }, update: {}, create: { nameVi: 'Tin tức HVAC', nameEn: 'HVAC News', slug: 'tin-tuc-hvac', sortOrder: 1 } })
    const newsCat2 = await prisma.newsCategory.upsert({ where: { slug: 'kien-thuc-ky-thuat' }, update: {}, create: { nameVi: 'Kiến thức kỹ thuật', nameEn: 'Technical Knowledge', slug: 'kien-thuc-ky-thuat', sortOrder: 2 } })
    const newsCat3 = await prisma.newsCategory.upsert({ where: { slug: 'du-an-tieu-bieu' }, update: {}, create: { nameVi: 'Dự án tiêu biểu', nameEn: 'Featured Projects', slug: 'du-an-tieu-bieu', sortOrder: 3 } })
    results.push('✅ News categories seeded')

    const posts = [
      { slug: 'bao-tri-hvac-mua-he-2024', titleVi: 'Lịch bảo trì HVAC mùa hè 2024', titleEn: 'HVAC Maintenance Schedule Summer 2024', catId: newsCat1.id, descVi: 'Hướng dẫn lịch bảo trì hệ thống HVAC chuẩn bị cho mùa hè — những việc cần làm ngay bây giờ để tránh sự cố mùa nóng. Bao gồm: vệ sinh dàn nóng, kiểm tra gas, bảo dưỡng quạt dàn nóng & dàn lạnh.', date: '2024-04-01' },
      { slug: 'tiet-kiem-nang-luong-hvac', titleVi: 'Giải pháp tiết kiệm năng lượng HVAC', titleEn: 'Energy Saving Solutions for HVAC', catId: newsCat2.id, descVi: 'Các giải pháp tối ưu hóa năng lượng cho hệ thống HVAC tòa nhà: nâng cấp lên inverter, lắp BMS giám sát tiêu thụ điện, phục hồi nhiệt thải, lập lịch bảo trì định kỳ. Tiết kiệm 20-35% chi phí điện.', date: '2024-03-15' },
      { slug: 'fave-hoan-thanh-nhiet-dien-hai-phong', titleVi: 'FAVE hoàn thành bảo dưỡng HVAC Nhà Máy Nhiệt Điện Hải Phòng', titleEn: 'FAVE Completes HVAC Maintenance at Hai Phong Thermal Power Plant', catId: newsCat3.id, descVi: 'FAVE Vietnam vừa hoàn thành đợt đại tu định kỳ hệ thống HVAC tại Nhà Máy Nhiệt Điện Hải Phòng — bao gồm toàn bộ Chiller, AHU phòng điều khiển và hệ thống làm mát thiết bị điện.', date: '2024-02-20' },
      { slug: 'cach-chon-chiller-phu-hop', titleVi: 'Cách chọn Chiller phù hợp cho tòa nhà', titleEn: 'How to Choose the Right Chiller for Your Building', catId: newsCat2.id, descVi: 'Hướng dẫn lựa chọn Chiller water-cooled hay air-cooled: so sánh COP, chi phí đầu tư, chi phí vận hành, phù hợp từng loại công trình (bệnh viện, nhà máy, tòa nhà văn phòng).', date: '2024-01-10' },
      { slug: 'tam-quan-trong-bao-duong-vrv', titleVi: 'Tầm quan trọng của bảo dưỡng định kỳ VRV/VRF', titleEn: 'Importance of Regular VRV/VRF Maintenance', catId: newsCat2.id, descVi: 'VRV/VRF không được bảo dưỡng đúng chu kỳ dẫn đến giảm 30-40% hiệu suất và tuổi thọ. FAVE khuyến nghị lịch bảo dưỡng 6 tháng/lần và hướng dẫn kiểm tra giữa kỳ người dùng có thể tự thực hiện.', date: '2023-11-20' },
      { slug: 'fave-unilever-bac-ninh', titleVi: 'Hoàn thành bảo dưỡng Chiller Unilever Bắc Ninh', titleEn: 'Unilever Bac Ninh Chiller Maintenance Completed', catId: newsCat3.id, descVi: 'FAVE Vietnam hoàn thành đợt bảo dưỡng định kỳ hệ thống Chiller Trane tại nhà máy Unilever Bắc Ninh — vệ sinh toàn bộ ống nước ngưng, kiểm tra môi chất, hiệu chỉnh hệ thống điều khiển.', date: '2023-09-05' },
    ]
    for (const p of posts) {
      await prisma.newsPost.upsert({
        where: { slug: p.slug }, update: {},
        create: { slug: p.slug, titleVi: p.titleVi, titleEn: p.titleEn, categoryId: p.catId, descriptionVi: p.descVi, descriptionEn: p.descVi, contentVi: p.descVi, contentEn: p.descVi, status: 'PUBLISHED', publishedAt: new Date(p.date) }
      })
    }
    results.push(`✅ ${posts.length} news posts seeded`)

    // ============================================================
    // 14. HERO BANNERS
    // ============================================================
    const banners = [
      { titleVi: 'Giải Pháp HVAC Toàn Diện', titleEn: 'Comprehensive HVAC Solutions', subtitleVi: 'Bảo trì · Lắp đặt · Cung cấp thiết bị HVAC chính hãng', subtitleEn: 'Maintenance · Installation · Genuine Equipment Supply', imageUrl: '/images/hero-hvac.jpg', ctaLabelVi: 'Yêu cầu báo giá', ctaLabelEn: 'Get a Quote', ctaUrl: '/lien-he', isActive: true, sortOrder: 1 },
      { titleVi: '10 Năm Kinh Nghiệm HVAC', titleEn: '10 Years of HVAC Experience', subtitleVi: '500+ dự án · 100+ kỹ sư · Đại lý Daikin & Carrier ủy quyền', subtitleEn: '500+ projects · 100+ engineers · Authorized Daikin & Carrier dealer', imageUrl: '/images/hero-team.jpg', ctaLabelVi: 'Xem năng lực', ctaLabelEn: 'View Profile', ctaUrl: '/nang-luc', isActive: true, sortOrder: 2 },
    ]
    for (const b of banners) {
      const existing = await prisma.heroBanner.findFirst({ where: { titleVi: b.titleVi } })
      if (!existing) await prisma.heroBanner.create({ data: b })
    }
    results.push(`✅ ${banners.length} hero banners seeded`)

    // ============================================================
    // 15. CAPABILITY PROFILE
    // ============================================================
    const cap = await prisma.capabilityProfile.findFirst()
    if (!cap) {
      await prisma.capabilityProfile.create({
        data: {
          titleVi: 'Hồ Sơ Năng Lực FAVE Việt Nam 2024',
          titleEn: 'FAVE Vietnam Capability Profile 2024',
          contentVi: 'FAVE Việt Nam là công ty chuyên cung cấp dịch vụ HVAC chuyên nghiệp, thành lập năm 2016 với hơn 10 năm kinh nghiệm. Chúng tôi tự hào là đối tác tin cậy của Daikin, Carrier, Trane và các thương hiệu HVAC hàng đầu thế giới.',
          contentEn: 'FAVE Vietnam is a professional HVAC service provider founded in 2016 with over 10 years of experience, proud partner of Daikin, Carrier, Trane and world-leading HVAC brands.',
          version: '2024.1',
          fileUrl: '/files/ho-so-nang-luc-fave.pdf',
          isActive: true,
        },
      })
      results.push('✅ Capability profile seeded')
    }

    // ============================================================
    // 16. RECRUITMENT SAMPLES
    // ============================================================
    const jobs = [
      { slug: 'ky-su-hvac', titleVi: 'Kỹ Sư HVAC', titleEn: 'HVAC Engineer', descVi: 'Thiết kế và giám sát thi công hệ thống HVAC cho các dự án tòa nhà thương mại và công nghiệp.', loc: 'Hà Nội', salary: '20-35 triệu/tháng', exp: '3+ năm kinh nghiệm' },
      { slug: 'ky-thuat-vien-bao-tri', titleVi: 'Kỹ Thuật Viên Bảo Trì', titleEn: 'Maintenance Technician', descVi: 'Thực hiện bảo trì, bảo dưỡng định kỳ hệ thống HVAC tại các tòa nhà và nhà máy của khách hàng.', loc: 'Hà Nội, HCM, Bắc Ninh', salary: '12-20 triệu/tháng', exp: '1+ năm kinh nghiệm' },
      { slug: 'nhan-vien-kinh-doanh-hvac', titleVi: 'Nhân Viên Kinh Doanh HVAC', titleEn: 'HVAC Sales Executive', descVi: 'Phát triển thị trường, tìm kiếm và chăm sóc khách hàng B2B trong lĩnh vực HVAC.', loc: 'Hà Nội', salary: '15-30 triệu + hoa hồng', exp: '2+ năm kinh nghiệm bán hàng B2B' },
    ]
    for (const j of jobs) {
      await prisma.recruitment.upsert({
        where: { slug: j.slug }, update: {},
        create: { slug: j.slug, titleVi: j.titleVi, titleEn: j.titleEn, descriptionVi: j.descVi, descriptionEn: j.descVi, contentVi: j.descVi, contentEn: j.descVi, location: j.loc, salary: j.salary, experience: j.exp, isActive: true }
      })
    }
    results.push(`✅ ${jobs.length} recruitment posts seeded`)

    // ============================================================
    // 17. PAGE CONTENT — các trang tĩnh
    // ============================================================
    const pages = [
      { pageKey: 'home', titleVi: 'Trang chủ', titleEn: 'Home', contentVi: 'FAVE Việt Nam — Giải pháp HVAC toàn diện', contentEn: 'FAVE Vietnam — Comprehensive HVAC Solutions' },
      { pageKey: 'about', titleVi: 'Giới thiệu', titleEn: 'About Us', contentVi: 'FAVE Việt Nam thành lập năm 2016, chuyên cung cấp dịch vụ bảo trì, lắp đặt và cung cấp thiết bị HVAC — hơn 10 năm kinh nghiệm, 500+ dự án.', contentEn: 'FAVE Vietnam founded in 2016, specializing in HVAC maintenance, installation and equipment supply — 10+ years experience, 500+ projects.' },
      { pageKey: 'contact', titleVi: 'Liên hệ', titleEn: 'Contact', contentVi: 'Liên hệ với chúng tôi để được tư vấn miễn phí về giải pháp HVAC.', contentEn: 'Contact us for a free consultation on HVAC solutions.' },
      { pageKey: 'capability', titleVi: 'Năng lực', titleEn: 'Capabilities', contentVi: 'Hồ sơ năng lực FAVE Việt Nam — chứng chỉ, kinh nghiệm và đội ngũ chuyên gia.', contentEn: 'FAVE Vietnam capability profile — certifications, experience and expert team.' },
    ]
    for (const p of pages) {
      await prisma.pageContent.upsert({ where: { pageKey: p.pageKey }, update: {}, create: p })
    }
    results.push(`✅ ${pages.length} page contents seeded`)

    // ============================================================
    // 18. MENUS — cấu trúc điều hướng website
    // ============================================================
    await prisma.menu.deleteMany({})
    const menuItems = [
      { labelVi: 'Trang chủ', labelEn: 'Home', href: '/', sortOrder: 1 },
      { labelVi: 'Dịch vụ', labelEn: 'Services', href: '/dich-vu', sortOrder: 2 },
      { labelVi: 'Sản phẩm', labelEn: 'Products', href: '/san-pham', sortOrder: 3 },
      { labelVi: 'Dự án', labelEn: 'Projects', href: '/du-an', sortOrder: 4 },
      { labelVi: 'Tin tức', labelEn: 'News', href: '/tin-tuc', sortOrder: 5 },
      { labelVi: 'Giới thiệu', labelEn: 'About Us', href: '/gioi-thieu', sortOrder: 6 },
      { labelVi: 'Năng lực', labelEn: 'Capabilities', href: '/nang-luc', sortOrder: 7 },
      { labelVi: 'Tuyển dụng', labelEn: 'Careers', href: '/tuyen-dung', sortOrder: 8 },
      { labelVi: 'Liên hệ', labelEn: 'Contact', href: '/lien-he', sortOrder: 9 },
    ]
    for (const m of menuItems) {
      await prisma.menu.create({ data: { ...m, isActive: true } })
    }
    results.push(`✅ ${menuItems.length} menu items seeded`)

    return NextResponse.json({ success: true, total: results.length, results })
  } catch (e: unknown) {
    console.error('Seed error:', e)
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error', stack: e instanceof Error ? e.stack : undefined }, { status: 500 })
  }
}
