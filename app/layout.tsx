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
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      {children}
    </>
  )
}
