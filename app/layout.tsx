import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ladi Studio - Modern E-commerce',
  description: 'Discover premium products at Ladi Studio - Your one-stop shop for quality goods',
  keywords: 'e-commerce, shopping, products, online store',
  openGraph: {
    title: 'Ladi Studio',
    description: 'Modern E-commerce Platform',
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
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}