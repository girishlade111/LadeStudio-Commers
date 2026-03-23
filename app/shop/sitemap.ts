import { MetadataRoute } from 'next'

export default function shopMetadata(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://ladestudio.com'
  const categories = ['apparel', 'accessories', 'home', 'electronics', 'footwear']
  
  return [
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categories.map((category) => ({
      url: `${BASE_URL}/shop?category=${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ]
}
