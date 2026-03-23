import { NextResponse } from 'next/server'
import { fetchSheetData, convertToProducts, getProductsByCategory, searchProducts, getProductById, getCategories } from '@/services/googleSheets'
import { getCachedProducts, setCachedProducts } from '@/utils/cache'
import { rateLimit, sanitizeSearchQuery, validateProductId, validateCategory } from '@/utils/security'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

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
    return NextResponse.json(
      { error: 'Invalid category', success: false },
      { status: 400 }
    )
  }
  
  if (productId && !validateProductId(productId)) {
    return NextResponse.json(
      { error: 'Invalid product ID', success: false },
      { status: 400 }
    )
  }
  
  const sanitizedSearch = sanitizeSearchQuery(search || '')
  const cacheKey = `products_${category || 'all'}_${sanitizedSearch || 'none'}`
  
  try {
    if (!SHEET_ID) {
      throw new Error('Google Sheet ID not configured')
    }

    if (productId) {
      const products = await getAllProducts()
      const product = getProductById(products, productId)
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found', success: false },
          { status: 404 }
        )
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
      const products = await getAllProducts()
      const categories = getCategories(products)
      
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
    
    const cachedData = getCachedProducts(cacheKey)
    if (cachedData) {
      return NextResponse.json(
        { data: cachedData, success: true, cached: true }, 
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      )
    }
    
    const products = await getAllProducts()
    
    let filteredProducts = products
    
    if (category && category !== 'all') {
      filteredProducts = getProductsByCategory(filteredProducts, category)
    }
    
    if (sanitizedSearch) {
      filteredProducts = searchProducts(filteredProducts, sanitizedSearch)
    }
    
    setCachedProducts(cacheKey, filteredProducts, 5 * 60 * 1000)
    
    return NextResponse.json(
      { data: filteredProducts, success: true }, 
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    )
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        success: false,
      },
      { status: 500 }
    )
  }
}

async function getAllProducts() {
  const cacheKey = 'products_all'
  
  const cachedProducts = getCachedProducts(cacheKey)
  if (cachedProducts) {
    return cachedProducts as ReturnType<typeof convertToProducts>
  }
  
  try {
    if (!SHEET_ID) {
      throw new Error('Google Sheet ID not configured')
    }
    const rows = await fetchSheetData({ sheetId: SHEET_ID })
    const products = convertToProducts(rows)
    
    setCachedProducts(cacheKey, products, 10 * 60 * 1000)
    
    return products
  } catch (error) {
    console.error('Error fetching all products:', error)
    
    const fallbackProducts = convertToProducts([])
    return fallbackProducts
  }
}