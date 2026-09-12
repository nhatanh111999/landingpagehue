import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin', 'vietnamese'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Tiệm Chụp Ảnh Huế - Lưu Giữ Thanh Xuân Cố Đô | Top Địa Điểm Đẹp',
  description: 'Dịch vụ chụp ảnh chuyên nghiệp tại Huế. Khám phá ngay các địa điểm chụp ảnh cưới, kỷ yếu, concept áo dài đẹp nhất Cố Đô.',
  keywords: ['chụp ảnh huế', 'tiệm chụp ảnh huế', 'địa điểm chụp ảnh đẹp ở huế', 'chụp ảnh áo dài huế'],
  alternates: {
    canonical: 'https://tiemchupanhhue.com',
  },
  openGraph: {
    title: 'Tiệm Chụp Ảnh Huế - Lưu Giữ Thanh Xuân Cố Đô',
    description: 'Khám phá các góc chụp ảnh nên thơ tại Huế cùng dịch vụ chụp ảnh chuyên nghiệp.',
    url: 'https://tiemchupanhhue.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-stone-50 text-stone-800 antialiased`}>
        {children}
      </body>
    </html>
  )
}