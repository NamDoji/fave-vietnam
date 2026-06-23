import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAVE Việt Nam - Giải Pháp HVAC Chuyên Nghiệp',
  description: 'Đơn vị hàng đầu cung cấp giải pháp HVAC tại Việt Nam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
