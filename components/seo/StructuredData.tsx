'use client'

import Script from 'next/script'

interface JsonLdProps {
  data: object | object[]
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLd = Array.isArray(data) ? data : [data]
  
  return (
    <Script
      id="jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface StructuredDataProps {
  website?: boolean
  organization?: boolean
  products?: Array<{
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    inStock: boolean
  }>
}

export function StructuredData({ website, organization, products }: StructuredDataProps) {
  const data: object[] = []
  
  if (website) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Lade Studio',
      url: 'https://ladestudio.com',
      description: 'Premium e-commerce store offering quality products.',
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
    })
  }
  
  if (organization) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Lade Studio',
      url: 'https://ladestudio.com',
      logo: 'https://ladestudio.com/logo.png',
      description: 'Premium e-commerce store offering curated collections.',
      email: 'support@ladestudio.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9999999999',
        contactType: 'customer service',
        availableLanguage: 'English',
        areaServed: 'IN',
      },
      sameAs: [
        'https://instagram.com/ladestudio',
        'https://twitter.com/ladestudio',
      ],
    })
  }
  
  if (products && products.length > 0) {
    const productSchema = products.map((product) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Lade Studio',
        },
      },
      brand: {
        '@type': 'Brand',
        name: 'Lade Studio',
      },
    }))
    data.push(...productSchema)
  }
  
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
