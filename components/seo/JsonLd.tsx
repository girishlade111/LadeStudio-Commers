'use client'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lade Studio',
    url: 'https://ladestudio.com',
    logo: 'https://ladestudio.com/logo.png',
    description: 'Discover premium quality products at Lade Studio. Shop curated collections of apparel, accessories, home goods, electronics, and footwear.',
    sameAs: [
      'https://www.facebook.com/ladestudio',
      'https://www.instagram.com/ladestudio',
      'https://twitter.com/ladestudio',
      'https://www.linkedin.com/company/ladestudio',
      'https://www.pinterest.com/ladestudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ladestudio.com/shop?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={schema} />
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lade Studio',
    url: 'https://ladestudio.com',
    description: 'Premium E-commerce Store - Quality Products Online',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ladestudio.com/shop?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={schema} />
}

// Store Schema
export function StoreSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Lade Studio',
    image: 'https://ladestudio.com/og-image.jpg',
    url: 'https://ladestudio.com',
    priceRange: '$$',
    description: 'Premium E-commerce Store offering curated collections of apparel, accessories, home goods, electronics, and footwear.',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    servesCuisine: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Products',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Apparel',
          itemListElement: [],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Accessories',
          itemListElement: [],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Home',
          itemListElement: [],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Electronics',
          itemListElement: [],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Footwear',
          itemListElement: [],
        },
      ],
    },
  }

  return <JsonLd data={schema} />
}

// FAQ Schema
export function FAQSchema() {
  const faqs = [
    {
      question: 'What is the shipping policy?',
      answer: 'We offer free shipping on orders above ₹999. Standard delivery takes 5-7 business days. Express shipping options are also available.',
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 30-day return policy for all unused items in original packaging. Simply initiate a return through your account or contact our support team.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can also track your order from your account dashboard.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major UPI apps, credit/debit cards, net banking, and digital wallets for secure payments.',
    },
    {
      question: 'Is there a warranty on products?',
      answer: 'Most of our products come with manufacturer warranty. Please check individual product pages for specific warranty information.',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return <JsonLd data={schema} />
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={schema} />
}

// Product Schema
export function ProductSchema(product: {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Lade Studio',
    },
    offers: {
      '@type': 'Offer',
      url: `https://ladestudio.com/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Lade Studio',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '256',
    },
  }

  return <JsonLd data={schema} />
}
