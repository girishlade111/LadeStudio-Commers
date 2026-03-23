export const websiteJsonLd = {
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

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lade Studio',
  url: 'https://ladestudio.com',
  logo: 'https://ladestudio.com/logo.png',
  description: 'Premium e-commerce store offering curated collections of quality products.',
  email: 'support@ladestudio.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9999999999',
    contactType: 'customer service',
    availableLanguage: 'English',
    areaServed: 'IN',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  },
  sameAs: [
    'https://instagram.com/ladestudio',
    'https://twitter.com/ladestudio',
    'https://pinterest.com/ladestudio',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lade Studio',
  image: 'https://ladestudio.com/og-image.jpg',
  priceRange: '₹₹',
  servesCuisine: 'Retail',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
}

export function generateProductJsonLd(products: Array<{
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}>) {
  return products.map((product) => ({
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
}

export const breadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})
