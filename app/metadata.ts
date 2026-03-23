import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'Lade Studio | Premium E-commerce Store - Shop Quality Products Online',
  description: 'Discover premium quality products at Lade Studio. Shop curated collections of apparel, accessories, home goods, electronics, and footwear. Free shipping on orders above ₹999. 30-day hassle-free returns.',
  keywords: [
    'Lade Studio',
    'online shopping India',
    'premium products',
    'quality e-commerce',
    'apparel online',
    'accessories shop',
    'home decor store',
    'electronics online',
    'footwear shopping',
    'online store',
    'shopping website',
    'Indian e-commerce',
    'curated products',
    'modern essentials',
    'premium shopping',
  ],
  openGraph: {
    title: 'Lade Studio | Premium E-commerce Store',
    description: 'Discover premium quality products. Shop curated collections with free shipping above ₹999 and 30-day returns.',
    url: 'https://ladestudio.com',
    type: 'website',
    siteName: 'Lade Studio',
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
    description: 'Discover premium quality products. Free shipping above ₹999. 30-day returns.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://ladestudio.com',
  },
}

export const shopMetadata: Metadata = {
  title: 'Shop All Products | Lade Studio - Premium Collection',
  description: 'Browse our complete collection of premium products. Shop apparel, accessories, home goods, electronics, and footwear. Filter by category, price, and more. Free shipping on orders above ₹999.',
  keywords: [
    'shop products',
    'online shopping',
    'buy online',
    'premium collection',
    'all products',
    'product catalog',
    'shopping categories',
    'apparel collection',
    'accessories range',
    'electronics shop',
  ],
  openGraph: {
    title: 'Shop All Products | Lade Studio',
    description: 'Browse our complete collection of premium products with free shipping above ₹999.',
    url: 'https://ladestudio.com/shop',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lade Studio Shop',
      },
    ],
  },
  alternates: {
    canonical: 'https://ladestudio.com/shop',
  },
}

export const aboutMetadata: Metadata = {
  title: 'About Us | Lade Studio - Our Story & Mission',
  description: 'Learn about Lade Studio - our mission to provide premium quality products, sustainable practices, and timeless design. Discover our story, values, and the team behind the brand.',
  keywords: [
    'about Lade Studio',
    'our story',
    'company history',
    'brand mission',
    'sustainability',
    'craftsmanship',
    'team',
    'values',
    'premium quality',
  ],
  openGraph: {
    title: 'About Us | Lade Studio',
    description: 'Learn about our mission to provide premium quality products with sustainable practices.',
    url: 'https://ladestudio.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/about',
  },
}

export const contactMetadata: Metadata = {
  title: 'Contact Us | Lade Studio - Get in Touch',
  description: 'Contact Lade Studio for any queries about orders, products, or support. WhatsApp, phone, or email - we are here to help. Business hours: Mon-Sat, 9 AM - 7 PM.',
  keywords: [
    'contact Lade Studio',
    'customer support',
    'get in touch',
    'help',
    'inquiry',
    'contact information',
    'support',
    'WhatsApp support',
  ],
  openGraph: {
    title: 'Contact Us | Lade Studio',
    description: 'Get in touch with us for any queries. WhatsApp, phone, or email support available.',
    url: 'https://ladestudio.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/contact',
  },
}

export const cartMetadata: Metadata = {
  title: 'Shopping Cart | Lade Studio',
  description: 'View and manage items in your shopping cart. Review your selections, update quantities, or proceed to checkout. Free shipping on orders above ₹999.',
  robots: {
    index: false,
    follow: true,
  },
}

export const checkoutMetadata: Metadata = {
  title: 'Checkout | Lade Studio - Complete Your Order',
  description: 'Complete your purchase securely. Enter delivery details and pay via UPI. Fast and safe checkout process.',
  robots: {
    index: false,
    follow: false,
  },
}

export const wishlistMetadata: Metadata = {
  title: 'My Wishlist | Lade Studio - Saved Products',
  description: 'View your saved products. Move items to cart or continue browsing for more premium products.',
  robots: {
    index: false,
    follow: true,
  },
}

export const faqMetadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Lade Studio',
  description: 'Find answers to commonly asked questions about orders, shipping, returns, products, and account. Comprehensive guide to shopping at Lade Studio.',
  keywords: [
    'FAQ',
    'frequently asked questions',
    'help',
    'support',
    'questions',
    'answers',
    'shipping questions',
    'return questions',
    'order help',
  ],
  openGraph: {
    title: 'FAQ | Lade Studio',
    description: 'Find answers to frequently asked questions about orders, shipping, returns, and more.',
    url: 'https://ladestudio.com/faq',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/faq',
  },
}

export const shippingMetadata: Metadata = {
  title: 'Shipping Information | Lade Studio - Delivery Options & Tracking',
  description: 'Learn about our shipping options, delivery times, and tracking. Standard, express, and same-day delivery available. Free shipping on orders above ₹999 across India.',
  keywords: [
    'shipping',
    'delivery',
    'delivery options',
    'shipping charges',
    'tracking',
    'delivery time',
    'express shipping',
    'standard shipping',
    'same day delivery',
  ],
  openGraph: {
    title: 'Shipping Information | Lade Studio',
    description: 'Learn about shipping options, delivery times, and tracking across India.',
    url: 'https://ladestudio.com/shipping',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/shipping',
  },
}

export const privacyMetadata: Metadata = {
  title: 'Privacy Policy | Lade Studio - How We Protect Your Data',
  description: 'Read Lade Studio Privacy Policy. Learn how we collect, use, and protect your personal information. Data security and your rights regarding your data.',
  keywords: [
    'privacy policy',
    'data protection',
    'privacy',
    'data security',
    'personal information',
    'data usage',
    'cookies',
  ],
  openGraph: {
    title: 'Privacy Policy | Lade Studio',
    description: 'Learn how we collect, use, and protect your personal information.',
    url: 'https://ladestudio.com/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/privacy',
  },
}

export const termsMetadata: Metadata = {
  title: 'Terms of Service | Lade Studio - Conditions & Agreement',
  description: 'Read Lade Studio Terms of Service. Understand the terms and conditions governing your use of our website and services.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'usage terms',
    'legal',
    'agreement',
    'conditions',
  ],
  openGraph: {
    title: 'Terms of Service | Lade Studio',
    description: 'Read our terms and conditions governing your use of Lade Studio.',
    url: 'https://ladestudio.com/terms',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/terms',
  },
}

export const refundsMetadata: Metadata = {
  title: 'Returns & Refunds Policy | Lade Studio - 30-Day Returns',
  description: 'Lade Studio offers hassle-free 30-day returns. Learn about our return policy, process, eligibility, and refund timelines. Free return shipping for defective items.',
  keywords: [
    'returns',
    'refunds',
    'return policy',
    'money back',
    'exchange',
    'return process',
    'refund timeline',
    '30 day returns',
  ],
  openGraph: {
    title: 'Returns & Refunds | Lade Studio',
    description: 'Hassle-free 30-day returns. Learn about our return policy and process.',
    url: 'https://ladestudio.com/refunds',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ladestudio.com/refunds',
  },
}
