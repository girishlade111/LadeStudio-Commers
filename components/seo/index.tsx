'use client'

import Script from 'next/script'

export function HomeSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lade Studio',
    url: 'https://ladestudio.com',
    description: 'Premium e-commerce store offering quality products in apparel, accessories, home goods, electronics, and footwear.',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ladestudio.com/logo.png',
      },
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

  const organizationJsonLd = {
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
      'https://pinterest.com/ladestudio',
    ],
  }

  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  )
}

export function ShopSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop All Products | Lade Studio',
    description: 'Browse our complete collection of premium products. Shop apparel, accessories, home goods, electronics, and footwear.',
    url: 'https://ladestudio.com/shop',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
    },
  }

  return (
    <Script
      id="shop-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function AboutSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Us | Lade Studio',
    description: 'Learn about Lade Studio - our mission, values, and the team behind the brand.',
    url: 'https://ladestudio.com/about',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
    },
  }

  return (
    <Script
      id="about-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ContactSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us | Lade Studio',
    description: 'Contact Lade Studio for any queries about orders, products, or support.',
    url: 'https://ladestudio.com/contact',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
    },
  }

  return (
    <Script
      id="contact-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function FAQSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'FAQ - Frequently Asked Questions | Lade Studio',
    description: 'Find answers to commonly asked questions about orders, shipping, returns, products, and account.',
    url: 'https://ladestudio.com/faq',
    publisher: {
      '@type': 'Organization',
      name: 'Lade Studio',
    },
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
