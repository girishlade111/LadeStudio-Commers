import { Product } from '@/types'

const API_BASE_URL = '/api/products'

export interface ProductsResponse {
  data: Product[] | Product | string[]
  success: boolean
  cached?: boolean
  error?: string
  message?: string
}

export async function fetchProducts(options?: {
  category?: string
  search?: string
}): Promise<Product[]> {
  const params = new URLSearchParams()
  
  if (options?.category) {
    params.set('category', options.category)
  }
  
  if (options?.search) {
    params.set('search', options.search)
  }
  
  const url = `${API_BASE_URL}?${params.toString()}`
  
  const response: ProductsResponse = await fetch(url).then(res => res.json())
  
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch products')
  }
  
  return response.data as Product[]
}

export async function fetchProductById(id: string): Promise<Product> {
  const url = `${API_BASE_URL}?id=${encodeURIComponent(id)}`
  
  const response: ProductsResponse = await fetch(url).then(res => res.json())
  
  if (!response.success) {
    throw new Error(response.error || 'Product not found')
  }
  
  return response.data as Product
}

export async function fetchCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}?categories=true`
  
  const response: ProductsResponse = await fetch(url).then(res => res.json())
  
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch categories')
  }
  
  return response.data as string[]
}

export async function searchProducts(query: string): Promise<Product[]> {
  return fetchProducts({ search: query })
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchProducts({ category })
}