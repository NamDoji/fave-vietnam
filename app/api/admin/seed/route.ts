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

    return NextResponse.json({ success: true, results })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 })
  }
}
