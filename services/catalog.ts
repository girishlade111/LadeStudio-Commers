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
import { getGoogleSheetId } from '@/utils/env'
import { products as localProducts } from '@/data'

const PRODUCTS_CACHE_KEY = 'catalog_products_all'

export async function getAllProducts(): Promise<Product[]> {
  const cachedProducts = getCachedProducts<Product[]>(PRODUCTS_CACHE_KEY)
  if (cachedProducts) {
    return cachedProducts
  }

  const sheetId = getGoogleSheetId()

  if (!sheetId) {
    return localProducts
  }

  try {
    const rows = await fetchSheetData({ sheetId, sheetName: 'Products' })
    if (rows.length > 0) {
      const products = convertToProducts(rows)
      setCachedProducts(PRODUCTS_CACHE_KEY, products, 10 * 60 * 1000)
      return products
    }
    return localProducts
  } catch (error) {
    console.warn('Failed to load catalog products from Google Sheets, using local data')
    return localProducts
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
