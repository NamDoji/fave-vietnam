import nodemailer from 'nodemailer'

const SMTP_ENABLED = !!(process.env.SMTP_USER && process.env.SMTP_PASS)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM || '"FAVE Việt Nam" <no-reply@fave.com.vn>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'Favevietnam@gmail.com'

interface QuoteEmailData {
  name: string
  phone: string
  email?: string
  company?: string
  service?: string
  message: string
}

interface ContactEmailData {
  name: string
  phone: string
  email?: string
  company?: string
  message: string
}

interface ApplyEmailData {
  name: string
  phone: string
  email: string
  jobTitle: string
  coverLetter?: string
  cvUrl?: string
}

export async function sendQuoteEmail(data: QuoteEmailData): Promise<void> {
  if (!SMTP_ENABLED) { console.warn('[email] SMTP not configured — skipping sendQuoteEmail'); return }
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a5c; border-bottom: 2px solid #00a0e9; padding-bottom: 10px;">
        Yêu Cầu Báo Giá Mới - FAVE Việt Nam
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold; width: 140px;">Họ và tên:</td>
          <td style="padding: 10px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Điện thoại:</td>
          <td style="padding: 10px;">${data.phone}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;">${data.email || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Công ty:</td>
          <td style="padding: 10px;">${data.company || '—'}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">Dịch vụ:</td>
          <td style="padding: 10px;">${data.service || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Nội dung:</td>
          <td style="padding: 10px;">${data.message}</td>
        </tr>
      </table>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Email này được gửi tự động từ hệ thống website FAVE Việt Nam.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Báo Giá] ${data.name} - ${data.phone}`,
    html,
  })

  if (data.email) {
    const confirmHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3a5c;">Xác nhận yêu cầu báo giá</h2>
        <p>Kính gửi <strong>${data.name}</strong>,</p>
        <p>Chúng tôi đã nhận được yêu cầu báo giá của bạn. Đội ngũ kỹ thuật FAVE Việt Nam sẽ liên hệ lại trong vòng 24 giờ làm việc.</p>
        <p><strong>Hotline:</strong> <a href="tel:0981907109">0981907109</a></p>
        <p>Trân trọng,<br><strong>FAVE Việt Nam</strong></p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px;">348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội</p>
      </div>
    `
    await transporter.sendMail({
      from: FROM,
      to: data.email,
      subject: 'FAVE Việt Nam - Xác nhận yêu cầu báo giá',
      html: confirmHtml,
    })
  }
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  if (!SMTP_ENABLED) { console.warn('[email] SMTP not configured — skipping sendContactEmail'); return }
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a5c; border-bottom: 2px solid #00a0e9; padding-bottom: 10px;">
        Liên Hệ Mới - FAVE Việt Nam
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold; width: 140px;">Họ và tên:</td>
          <td style="padding: 10px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Điện thoại:</td>
          <td style="padding: 10px;">${data.phone}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;">${data.email || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Công ty:</td>
          <td style="padding: 10px;">${data.company || '—'}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">Nội dung:</td>
          <td style="padding: 10px;">${data.message}</td>
        </tr>
      </table>
    </div>
  `

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Liên Hệ] ${data.name} - ${data.phone}`,
    html,
  })
}

export async function sendApplyEmail(data: ApplyEmailData): Promise<void> {
  if (!SMTP_ENABLED) { console.warn('[email] SMTP not configured — skipping sendApplyEmail'); return }
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a5c; border-bottom: 2px solid #00a0e9; padding-bottom: 10px;">
        Ứng Viên Mới - FAVE Việt Nam
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold; width: 140px;">Vị trí:</td>
          <td style="padding: 10px;">${data.jobTitle}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Họ và tên:</td>
          <td style="padding: 10px;">${data.name}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">Điện thoại:</td>
          <td style="padding: 10px;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;">${data.email}</td>
        </tr>
        <tr style="background: #f5f8fa;">
          <td style="padding: 10px; font-weight: bold;">CV:</td>
          <td style="padding: 10px;">${data.cvUrl ? `<a href="${data.cvUrl}">Tải CV</a>` : '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Thư xin việc:</td>
          <td style="padding: 10px;">${data.coverLetter || '—'}</td>
        </tr>
      </table>
    </div>
  `

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Ứng Tuyển] ${data.jobTitle} - ${data.name}`,
    html,
  })
}
