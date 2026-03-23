import { Product } from '@/types'
import {
  convertToProducts,
  fetchSheetData,
  getCategories,
  getProductById,
  getProductsByCategory,
  searchProducts,
} from '@/services/googleSheets'
import { getCachedProducts, setCachedProducts } from '@/utils/cache'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const PRODUCTS_CACHE_KEY = 'catalog_products_all'

export async function getAllProducts(): Promise<Product[]> {
  const cachedProducts = getCachedProducts<Product[]>(PRODUCTS_CACHE_KEY)
  if (cachedProducts) {
    return cachedProducts
  }

  if (!SHEET_ID) {
    return []
  }

  try {
    const rows = await fetchSheetData({ sheetId: SHEET_ID, sheetName: 'Products' })
    const products = convertToProducts(rows)
    setCachedProducts(PRODUCTS_CACHE_KEY, products, 10 * 60 * 1000)
    return products
  } catch (error) {
    console.error('Failed to load catalog products', error)
    return []
  }
}

export async function getCatalogProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts()
  return getProductById(products, id)
}

export async function getCatalogProducts(options?: {
  category?: string
  search?: string
}): Promise<Product[]> {
  let products = await getAllProducts()

  if (options?.category && options.category !== 'all') {
    products = getProductsByCategory(products, options.category)
  }

  if (options?.search) {
    products = searchProducts(products, options.search)
  }

  return products
}

export async function getCatalogCategories(): Promise<string[]> {
  const products = await getAllProducts()
  return getCategories(products)
}
