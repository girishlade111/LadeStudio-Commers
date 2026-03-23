import { NextResponse } from 'next/server'
import { fetchSheetData, convertToProducts, getProductsByCategory, searchProducts, getProductById, getCategories } from '@/services/googleSheets'
import { getCachedProducts, setCachedProducts } from '@/utils/cache'

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1示例ID'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const productId = searchParams.get('id')
  const getCategoriesFlag = searchParams.get('categories') === 'true'
  
  const cacheKey = `products_${category || 'all'}_${search || 'none'}`
  
  try {
    if (productId) {
      const products = await getAllProducts()
      const product = getProductById(products, productId)
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found', success: false },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ data: product, success: true })
    }
    
    if (getCategoriesFlag) {
      const products = await getAllProducts()
      const categories = getCategories(products)
      
      return NextResponse.json({ data: categories, success: true })
    }
    
    const cachedData = getCachedProducts(cacheKey)
    if (cachedData) {
      return NextResponse.json({ data: cachedData, success: true, cached: true })
    }
    
    const products = await getAllProducts()
    
    let filteredProducts = products
    
    if (category && category !== 'all') {
      filteredProducts = getProductsByCategory(filteredProducts, category)
    }
    
    if (search) {
      filteredProducts = searchProducts(filteredProducts, search)
    }
    
    setCachedProducts(cacheKey, filteredProducts, 5 * 60 * 1000)
    
    return NextResponse.json({ data: filteredProducts, success: true })
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error' 
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