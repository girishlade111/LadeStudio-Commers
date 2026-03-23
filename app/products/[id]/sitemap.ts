import { MetadataRoute } from 'next'

export default function productSitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://ladestudio.com'
  
  // These would typically come from your database or API
  const productIds = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ]
  
  return productIds.map((id) => ({
    url: `${BASE_URL}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
}
