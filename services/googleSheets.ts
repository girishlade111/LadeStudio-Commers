const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || ''

export interface SheetRow {
  [key: string]: string
}

export async function fetchProducts(): Promise<SheetRow[]> {
  if (!SHEET_API_URL) {
    console.warn('Sheet API URL not configured')
    return []
  }
  
  try {
    const response = await fetch(SHEET_API_URL)
    if (!response.ok) throw new Error('Failed to fetch products')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts()
  const categories = new Set(products.map(p => p.category).filter(Boolean))
  return Array.from(categories)
}

export async function submitOrder(orderData: unknown): Promise<boolean> {
  console.log('Submitting order:', orderData)
  return true
}

export async function submitContactForm(formData: unknown): Promise<boolean> {
  console.log('Submitting contact form:', formData)
  return true
}