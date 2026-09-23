import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    const results: string[] = []

    // Admin user
    const existing = await prisma.user.findUnique({ where: { email: 'admin@fave.com.vn' } })
    if (!existing) {
      const hash = await bcrypt.hash('Admin@123456', 12)
      await prisma.user.create({ data: { email: 'admin@fave.com.vn', name: 'FAVE Admin', password: hash, role: 'ADMIN' } })
      results.push('✅ Admin user created')
    } else { results.push('ℹ️ Admin user already exists') }

    // Site settings
    const settings = [
      { key: 'company_name', value: 'FAVE Việt Nam' },
      { key: 'hotline', value: '0981907109' },
      { key: 'email', value: 'Favevietnam@gmail.com' },
      { key: 'address_vi', value: '348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội' },
    ]
    for (const s of settings) {
      await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
    }
    results.push('✅ Site settings OK')

    // Service categories
    const cat = await prisma.serviceCategory.upsert({
      where: { slug: 'hvac' }, update: {},
      create: { nameVi: 'Dịch vụ HVAC', nameEn: 'HVAC Services', slug: 'hvac', sortOrder: 0 }
    })

    // Services
    const services = [
      { slug: 'bao-tri-dieu-hoa', titleVi: 'Bảo trì hệ thống điều hòa', titleEn: 'Air Conditioning Maintenance', icon: '🔧', sortOrder: 1, descriptionVi: 'Bảo trì định kỳ hệ thống điều hòa không khí cục bộ và trung tâm.', descriptionEn: 'Periodic maintenance of local and central air conditioning systems.' },
      { slug: 'bao-duong-chiller', titleVi: 'Bảo dưỡng Chiller', titleEn: 'Chiller Maintenance', icon: '❄️', sortOrder: 2, descriptionVi: 'Bảo dưỡng toàn diện hệ thống Chiller giải nhiệt nước và không khí.', descriptionEn: 'Comprehensive maintenance of water-cooled and air-cooled Chiller systems.' },
      { slug: 'sua-chua-hvac', titleVi: 'Sửa chữa hệ thống HVAC', titleEn: 'HVAC Repair', icon: '⚙️', sortOrder: 3, descriptionVi: 'Sửa chữa, khắc phục sự cố nhanh chóng 24/7 cho mọi loại HVAC.', descriptionEn: 'Fast 24/7 repair and troubleshooting for all types of HVAC systems.' },
      { slug: 'cai-tao-nang-cap', titleVi: 'Cải tạo, nâng cấp', titleEn: 'HVAC Renovation & Upgrade', icon: '🔄', sortOrder: 4, descriptionVi: 'Cải tạo hệ thống HVAC cũ sang công nghệ mới tiết kiệm năng lượng.', descriptionEn: 'Upgrade old HVAC systems to new energy-saving technology.' },
      { slug: 've-sinh-cong-nghiep', titleVi: 'Vệ sinh công nghiệp HVAC', titleEn: 'Industrial HVAC Cleaning', icon: '🧹', sortOrder: 5, descriptionVi: 'Vệ sinh công nghiệp AHU, FCU, ống gió, dàn lạnh bằng hóa chất chuyên dụng.', descriptionEn: 'Industrial cleaning of AHU, FCU, air ducts using specialized chemicals.' },
      { slug: 'thiet-ke-hvac', titleVi: 'Thiết kế hệ thống HVAC', titleEn: 'HVAC System Design', icon: '📐', sortOrder: 6, descriptionVi: 'Thiết kế hệ thống HVAC tối ưu bằng HAP, Trace 700, AutoCAD MEP.', descriptionEn: 'Optimal HVAC system design using HAP, Trace 700, AutoCAD MEP.' },
      { slug: 'lap-dat-hvac', titleVi: 'Lắp đặt hệ thống HVAC', titleEn: 'HVAC Installation', icon: '🏗️', sortOrder: 7, descriptionVi: 'Thi công lắp đặt theo đúng thiết kế và tiêu chuẩn kỹ thuật ASHRAE.', descriptionEn: 'Installation according to design and ASHRAE technical standards.' },
      { slug: 'cung-cap-thiet-bi', titleVi: 'Cung cấp thiết bị HVAC', titleEn: 'HVAC Equipment Supply', icon: '📦', sortOrder: 8, descriptionVi: 'Cung cấp thiết bị HVAC chính hãng: Daikin, Mitsubishi, Carrier, York, Trane.', descriptionEn: 'Supply genuine HVAC equipment: Daikin, Mitsubishi, Carrier, York, Trane.' },
    ]
    let svcCount = 0
    for (const s of services) {
      await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: { ...s, contentVi: '', contentEn: '', isActive: true, categoryId: cat.id } })
      svcCount++
    }
    results.push(`✅ ${svcCount} services seeded`)

    // Projects
    const prjCat = await prisma.projectCategory.upsert({
      where: { slug: 'tieu-bieu' }, update: {},
      create: { nameVi: 'Công trình tiêu biểu', nameEn: 'Featured Projects', slug: 'tieu-bieu', sortOrder: 0 }
    })
    const projects = [
      { slug: 'vincom-center', titleVi: 'Vincom Center Hà Nội', titleEn: 'Vincom Center Hanoi', clientName: 'Vingroup', location: 'Hà Nội', sectorVi: 'Trung tâm thương mại', sectorEn: 'Shopping Mall', isFeatured: true, descriptionVi: 'Bảo trì HVAC toàn chuỗi Vincom.', descriptionEn: 'HVAC maintenance for Vincom chain.' },
      { slug: 'unilever-bac-ninh', titleVi: 'Nhà máy Unilever Bắc Ninh', titleEn: 'Unilever Bac Ninh Factory', clientName: 'Unilever', location: 'Bắc Ninh', sectorVi: 'Nhà máy', sectorEn: 'Factory', isFeatured: true, descriptionVi: 'Bảo trì Chiller Trane 1200RT.', descriptionEn: 'Maintenance of Trane 1200RT Chiller.' },
      { slug: 'vien-huyet-hoc', titleVi: 'Viện Huyết học TW', titleEn: 'National Blood Institute', clientName: 'Bộ Y tế', location: 'Hà Nội', sectorVi: 'Bệnh viện', sectorEn: 'Hospital', isFeatured: true, descriptionVi: 'Đảm bảo HVAC phòng lưu trữ máu 24/7.', descriptionEn: '24/7 HVAC for blood storage rooms.' },
      { slug: 'nhiet-dien-hai-phong', titleVi: 'Nhà máy Nhiệt điện Hải Phòng', titleEn: 'Hai Phong Power Plant', clientName: 'EVN', location: 'Hải Phòng', sectorVi: 'Nhà máy điện', sectorEn: 'Power Plant', isFeatured: false, descriptionVi: 'Nâng cấp Chiller York 800RT.', descriptionEn: 'Upgrade York 800RT Chiller.' },
    ]
    let prjCount = 0
    for (const p of projects) {
      await prisma.project.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, contentVi: '', contentEn: '', isActive: true, categoryId: prjCat.id } })
      prjCount++
    }
    results.push(`✅ ${prjCount} projects seeded`)

    // Partners
    await prisma.partner.deleteMany({})
    const partners = [
      { nameVi: 'Daikin', nameEn: 'Daikin Industries', website: 'https://daikin.com.vn', sortOrder: 1 },
      { nameVi: 'Mitsubishi Electric', nameEn: 'Mitsubishi Electric', website: 'https://www.mitsubishielectric.com', sortOrder: 2 },
      { nameVi: 'Carrier', nameEn: 'Carrier Global', website: 'https://www.carrier.com', sortOrder: 3 },
      { nameVi: 'Trane', nameEn: 'Trane Technologies', website: 'https://www.trane.com', sortOrder: 4 },
      { nameVi: 'York (JCI)', nameEn: 'York Johnson Controls', website: 'https://www.johnsoncontrols.com', sortOrder: 5 },
    ]
    for (const p of partners) await prisma.partner.create({ data: p })
    results.push(`✅ ${partners.length} partners seeded`)

    // Product categories
    const prodCat1 = await prisma.productCategory.upsert({ where: { slug: 'dieu-hoa' }, update: {}, create: { nameVi: 'Máy điều hòa', nameEn: 'Air Conditioners', slug: 'dieu-hoa', sortOrder: 1 } })
    const prodCat2 = await prisma.productCategory.upsert({ where: { slug: 'chiller' }, update: {}, create: { nameVi: 'Chiller', nameEn: 'Chiller Systems', slug: 'chiller', sortOrder: 2 } })
    results.push('✅ Product categories seeded')

    // Products
    const products = [
      { slug: 'daikin-vrv-iv', nameVi: 'Daikin VRV IV', nameEn: 'Daikin VRV IV System', descriptionVi: 'Hệ thống VRV IV tiết kiệm năng lượng, điều khiển thông minh.', descriptionEn: 'Energy-saving VRV IV system with smart control.', categoryId: prodCat1.id, isActive: true, isFeatured: true, sortOrder: 1 },
      { slug: 'mitsubishi-city-multi', nameVi: 'Mitsubishi City Multi', nameEn: 'Mitsubishi City Multi', descriptionVi: 'Hệ thống VRF chất lượng Nhật Bản, độ bền cao.', descriptionEn: 'Japanese VRF system with high durability.', categoryId: prodCat1.id, isActive: true, isFeatured: true, sortOrder: 2 },
      { slug: 'carrier-aquaforce', nameVi: 'Carrier AquaForce Chiller', nameEn: 'Carrier AquaForce Chiller', descriptionVi: 'Chiller ly tâm hiệu suất cao, COP 6.0+.', descriptionEn: 'High-efficiency centrifugal chiller, COP 6.0+.', categoryId: prodCat2.id, isActive: true, isFeatured: true, sortOrder: 3 },
      { slug: 'trane-centravac', nameVi: 'Trane CenTraVac Chiller', nameEn: 'Trane CenTraVac Chiller', descriptionVi: 'Chiller ly tâm áp thấp, không sử dụng dầu bôi trơn.', descriptionEn: 'Low-pressure centrifugal chiller, oil-free.', categoryId: prodCat2.id, isActive: true, isFeatured: false, sortOrder: 4 },
    ]
    for (const p of products) {
      await prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, contentVi: '', contentEn: '' } })
    }
    results.push(`✅ ${products.length} products seeded`)

    // News categories
    const newsCat = await prisma.newsCategory.upsert({ where: { slug: 'tin-tuc' }, update: {}, create: { nameVi: 'Tin tức', nameEn: 'News', slug: 'tin-tuc', sortOrder: 1 } })
    const newsCat2 = await prisma.newsCategory.upsert({ where: { slug: 'ky-thuat' }, update: {}, create: { nameVi: 'Kỹ thuật', nameEn: 'Technical', slug: 'ky-thuat', sortOrder: 2 } })
    results.push('✅ News categories seeded')

    // News posts
    const posts = [
      { slug: 'bao-tri-hvac-mua-he', titleVi: 'Lịch bảo trì HVAC mùa hè 2024', titleEn: 'HVAC Maintenance Schedule Summer 2024', descriptionVi: 'Hướng dẫn lịch bảo trì hệ thống HVAC chuẩn bị cho mùa hè.', descriptionEn: 'HVAC maintenance schedule guide for summer preparation.', categoryId: newsCat.id, status: 'PUBLISHED' as const, publishedAt: new Date('2024-04-01') },
      { slug: 'tiet-kiem-nang-luong-hvac', titleVi: 'Giải pháp tiết kiệm năng lượng HVAC', titleEn: 'Energy Saving Solutions for HVAC', descriptionVi: 'Các giải pháp tối ưu hóa năng lượng cho hệ thống HVAC tòa nhà.', descriptionEn: 'Energy optimization solutions for building HVAC systems.', categoryId: newsCat2.id, status: 'PUBLISHED' as const, publishedAt: new Date('2024-03-15') },
    ]
    for (const p of posts) {
      await prisma.newsPost.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, contentVi: '', contentEn: '' } })
    }
    results.push(`✅ ${posts.length} news posts seeded`)

    // Team members
    const team = [
      { nameVi: 'Nguyễn Văn Hùng', nameEn: 'Nguyen Van Hung', positionVi: 'Giám đốc điều hành', positionEn: 'CEO', bioVi: '15 năm kinh nghiệm trong ngành HVAC, chuyên gia bảo trì Chiller.', bioEn: '15 years of HVAC experience, Chiller maintenance specialist.', sortOrder: 1, isActive: true },
      { nameVi: 'Trần Thị Mai', nameEn: 'Tran Thi Mai', positionVi: 'Kỹ sư trưởng', positionEn: 'Chief Engineer', bioVi: 'Kỹ sư MEP với 10 năm thiết kế hệ thống HVAC cho tòa nhà cao tầng.', bioEn: 'MEP engineer with 10 years designing HVAC for high-rise buildings.', sortOrder: 2, isActive: true },
      { nameVi: 'Lê Minh Tuấn', nameEn: 'Le Minh Tuan', positionVi: 'Trưởng phòng kỹ thuật', positionEn: 'Technical Manager', bioVi: 'Chuyên gia bảo dưỡng VRF/VRV, được đào tạo bởi Daikin Nhật Bản.', bioEn: 'VRF/VRV maintenance specialist, trained by Daikin Japan.', sortOrder: 3, isActive: true },
    ]
    for (const m of team) {
      const existing = await prisma.teamMember.findFirst({ where: { nameVi: m.nameVi } })
      if (!existing) await prisma.teamMember.create({ data: m })
    }
    results.push(`✅ ${team.length} team members seeded`)

    // Clients
    const clients = [
      { nameVi: 'Vingroup', nameEn: 'Vingroup', industry: 'Bất động sản', projectDesc: 'Bảo trì HVAC chuỗi Vincom Center toàn quốc', isActive: true, sortOrder: 1 },
      { nameVi: 'Unilever Việt Nam', nameEn: 'Unilever Vietnam', industry: 'Sản xuất', projectDesc: 'Bảo dưỡng Chiller Trane 1200RT tại nhà máy Bắc Ninh', isActive: true, sortOrder: 2 },
      { nameVi: 'Bệnh viện Bạch Mai', nameEn: 'Bach Mai Hospital', industry: 'Y tế', projectDesc: 'Duy trì HVAC phòng phẫu thuật và ICU 24/7', isActive: true, sortOrder: 3 },
      { nameVi: 'EVN', nameEn: 'Vietnam Electricity', industry: 'Năng lượng', projectDesc: 'Nâng cấp Chiller York cho nhà máy nhiệt điện', isActive: true, sortOrder: 4 },
    ]
    for (const c of clients) {
      const existing = await prisma.featuredClient.findFirst({ where: { nameVi: c.nameVi } })
      if (!existing) await prisma.featuredClient.create({ data: c })
    }
    results.push(`✅ ${clients.length} featured clients seeded`)

    // Hero banners
    const banners = [
      { titleVi: 'Giải Pháp HVAC Toàn Diện', titleEn: 'Comprehensive HVAC Solutions', subtitleVi: 'Bảo trì · Lắp đặt · Cung cấp thiết bị', subtitleEn: 'Maintenance · Installation · Equipment Supply', imageUrl: '/images/hero-1.jpg', ctaLabelVi: 'Yêu cầu báo giá', ctaLabelEn: 'Get a Quote', ctaUrl: '/bao-gia', isActive: true, sortOrder: 1 },
      { titleVi: '100+ Kỹ Sư Chuyên Nghiệp', titleEn: '100+ Professional Engineers', subtitleVi: '15 năm kinh nghiệm thi công HVAC', subtitleEn: '15 years of HVAC experience', imageUrl: '/images/hero-2.jpg', ctaLabelVi: 'Xem dự án', ctaLabelEn: 'View Projects', ctaUrl: '/du-an', isActive: true, sortOrder: 2 },
    ]
    for (const b of banners) {
      const existing = await prisma.heroBanner.findFirst({ where: { titleVi: b.titleVi } })
      if (!existing) await prisma.heroBanner.create({ data: b })
    }
    results.push(`✅ ${banners.length} hero banners seeded`)

    // Capability profile
    const cap = await prisma.capabilityProfile.findFirst()
    if (!cap) {
      await prisma.capabilityProfile.create({
        data: {
          titleVi: 'Hồ Sơ Năng Lực FAVE Việt Nam 2024',
          titleEn: 'FAVE Vietnam Capability Profile 2024',
          contentVi: 'FAVE Việt Nam là công ty chuyên cung cấp dịch vụ HVAC chuyên nghiệp tại Việt Nam với hơn 15 năm kinh nghiệm.',
          contentEn: 'FAVE Vietnam is a professional HVAC service provider in Vietnam with over 15 years of experience.',
          version: '2024.1',
          isActive: true,
        },
      })
      results.push('✅ Capability profile seeded')
    }

    return NextResponse.json({ success: true, results })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 })
  }
}
