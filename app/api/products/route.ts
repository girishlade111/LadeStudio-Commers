import { NextResponse } from 'next/server'
import { getCatalogCategories, getCatalogProductById, getCatalogProducts } from '@/services/catalog'
import { rateLimit, sanitizeSearchQuery, validateCategory, validateProductId } from '@/utils/security'

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const rateLimitResult = rateLimit(`api_${clientIp}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', success: false },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimitResult.resetIn),
        },
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const productId = searchParams.get('id')
  const getCategoriesFlag = searchParams.get('categories') === 'true'

  if (category && !validateCategory(category)) {
    return NextResponse.json({ error: 'Invalid category', success: false }, { status: 400 })
  }

  if (productId && !validateProductId(productId)) {
    return NextResponse.json({ error: 'Invalid product ID', success: false }, { status: 400 })
  }

  try {
    if (productId) {
      const product = await getCatalogProductById(productId)

      if (!product) {
        return NextResponse.json({ error: 'Product not found', success: false }, { status: 404 })
      }

      return NextResponse.json(
        { data: product, success: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      )
    }

    if (getCategoriesFlag) {
      const categories = await getCatalogCategories()

      return NextResponse.json(
        { data: categories, success: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      )
    }

    const products = await getCatalogProducts({
      category: category || undefined,
      search: sanitizeSearchQuery(search || '') || undefined,
    })

    return NextResponse.json(
      { data: products, success: true },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products', success: false }, { status: 500 })
  }
}
