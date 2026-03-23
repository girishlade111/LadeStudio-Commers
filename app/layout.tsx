import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Lade Studio - Premium E-commerce',
  description: 'Discover premium products at Lade Studio - Your destination for quality goods',
  keywords: 'e-commerce, shopping, products, online store, premium',
  openGraph: {
    title: 'Lade Studio',
    description: 'Premium E-commerce Platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar cartCount={0} wishlistCount={0} />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}