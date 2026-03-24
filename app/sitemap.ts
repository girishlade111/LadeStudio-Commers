import { MetadataRoute } from 'next'
import { products, categories } from '@/data'

const BASE_URL = 'https://ladestudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/shipping`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/refunds`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // User account pages (lower priority)
  const accountPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/cart`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/wishlist`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/checkout`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/sign-in`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/sign-up`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/orders`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/shop?category=${category.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Product pages (highest priority for SEO)
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: product.inStock ? 0.8 : 0.5,
  }))

  // Checkout flow pages
  const checkoutPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/checkout/payment-proof`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
  ]

  return [
    ...staticPages,
    ...mainPages,
    ...accountPages,
    ...categoryPages,
    ...productPages,
    ...checkoutPages,
  ]
}
