import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Navbar, Footer, BottomNav } from '@/components/layout'

const BASE_URL = 'https://ladestudio.com'

const defaultSeo = {
  title: 'Lade Studio | Premium E-commerce Store - Quality Products Online',
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
    'buy products online',
    'best shopping site',
    'online store India',
    'fashion shopping',
    'discounted products',
  ],
  ogTitle: 'Lade Studio | Premium E-commerce Store',
  ogDescription: 'Discover premium quality products at Lade Studio. Shop curated collections with free shipping on orders above ₹999 and 30-day returns.',
  ogImage: '/og-image.jpg',
  twitterHandle: '@ladestudio',
  siteName: 'Lade Studio',
  locale: 'en_IN',
  type: 'website',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  
  // Title and Description
  title: {
    default: defaultSeo.title,
    template: '%s | Lade Studio',
  },
  description: defaultSeo.description,
  
  // Keywords (Short-form for quick parsing)
  keywords: defaultSeo.keywords,
  
  // Author and Publisher
  authors: [{ name: 'Lade Studio', url: BASE_URL }],
  creator: 'Lade Studio',
  publisher: 'Lade Studio',
  
  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Canonical URL
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'en-IN': BASE_URL,
    },
  },
  
  // Open Graph (Long-form for social sharing)
  openGraph: {
    type: 'website',
    locale: defaultSeo.locale,
    url: BASE_URL,
    siteName: defaultSeo.siteName,
    title: defaultSeo.ogTitle,
    description: defaultSeo.ogDescription,
    images: [
      {
        url: defaultSeo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Lade Studio - Premium E-commerce Store',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Lade Studio Logo',
      },
    ],
  },
  
  // Twitter Card (Optimized for Twitter)
  twitter: {
    card: 'summary_large_image',
    site: defaultSeo.twitterHandle,
    creator: defaultSeo.twitterHandle,
    title: defaultSeo.ogTitle,
    description: defaultSeo.ogDescription,
    images: [defaultSeo.ogImage],
  },
  
  // robots.txt configuration
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
  
  // Verification codes
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Category and classification
  category: 'shopping',
  classification: 'E-commerce, Fashion, Lifestyle',
  
  // Dublin Core (Long-form metadata)
  other: {
    'dc.title': defaultSeo.title,
    'dc.description': defaultSeo.description,
    'dc.publisher': 'Lade Studio',
    'dc.creator': 'Lade Studio',
    'dc.language': 'en',
    'dc.type': 'http://purl.org/dc/dcmitype/Text',
    'og:type': 'website',
    'og:locale': defaultSeo.locale,
    'og:locale:alternate': 'en_US',
    'og:site_name': defaultSeo.siteName,
    'twitter:domain': 'ladestudio.com',
    'twitter:app:name:iphone': 'Lade Studio',
    'twitter:app:name:ipad': 'Lade Studio',
    'twitter:app:name:googleplay': 'Lade Studio',
    'theme-color': '#1b1c2b',
    'msapplication-TileColor': '#1b1c2b',
    'msapplication-navbutton-color': '#1b1c2b',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  
  // App Links (Deep linking for mobile apps)
  appLinks: {
    ios: {
      url: 'https://apps.apple.com/app/ladestudio',
      app_store_id: '123456789',
    },
    android: {
      package: 'com.ladestudio.app',
      url: 'https://play.google.com/store/apps/details?id=com.ladestudio.app',
    },
    web: {
      url: BASE_URL,
      should_fallback: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1b1c2b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* RSS Feed */}
          <link rel="alternate" type="application/rss+xml" title="Lade Studio RSS Feed" href="/rss.xml" />
          
          {/* Shortlink */}
          <link rel="shortlink" href={BASE_URL} />
        </head>
        <body className="min-h-screen flex flex-col font-body antialiased text-neutral-900 overflow-x-hidden">
          <Navbar />
          <main className="flex-1 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </body>
      </html>
    </ClerkProvider>
  )
}
