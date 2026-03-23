import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const BASE_URL = 'https://ladestudio.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Lade Studio | Premium E-commerce Store - Quality Products Online',
    template: '%s | Lade Studio',
  },
  description: 'Discover premium quality products at Lade Studio. Shop curated collections of apparel, accessories, home goods, electronics, and footwear. Free shipping on orders above ₹999. 30-day returns.',
  keywords: [
    'Lade Studio',
    'online shopping',
    'premium products',
    'e-commerce store',
    'quality goods',
    'apparel online',
    'accessories shop',
    'home decor',
    'electronics store',
    'footwear online',
    'Indian online store',
    'shopping India',
    'premium clothing',
    'handcrafted products',
    'modern essentials',
  ],
  authors: [{ name: 'Lade Studio' }],
  creator: 'Lade Studio',
  publisher: 'Lade Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Lade Studio',
    title: 'Lade Studio | Premium E-commerce Store',
    description: 'Discover premium quality products at Lade Studio. Shop curated collections with free shipping on orders above ₹999 and 30-day returns.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lade Studio - Premium E-commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lade Studio | Premium E-commerce Store',
    description: 'Discover premium quality products at Lade Studio. Shop curated collections with free shipping and 30-day returns.',
    images: ['/og-image.jpg'],
    creator: '@ladestudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-screen flex flex-col font-body antialiased text-neutral-900">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
