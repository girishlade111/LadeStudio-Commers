import { MetadataRoute } from 'next'

const BASE_URL = 'https://ladestudio.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all web crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/wishlist/',
          '/orders/',
          '/account/',
          '/sign-in/',
          '/sign-up/',
          '/api/*',
        ],
      },
      {
        // Google-specific rules
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/orders/',
          '/account/',
        ],
      },
      {
        // Google Image bot
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [],
      },
      {
        // Google Video bot
        userAgent: 'Googlebot-Video',
        allow: '/',
        disallow: [],
      },
      {
        // Bing bot
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/orders/',
          '/account/',
        ],
      },
      {
        // Yahoo Slurp
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
        ],
      },
      {
        // DuckDuckBot
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [],
      },
      {
        // Yandex Bot
        userAgent: 'YandexBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
        ],
      },
      {
        // Apple bot
        userAgent: 'Applebot',
        allow: '/',
        disallow: [],
      },
      {
        // Facebook External Hit
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [],
      },
      {
        // Twitter bot
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
