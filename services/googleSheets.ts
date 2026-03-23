import { Product } from '@/types'
import { getSheetValues } from '@/services/googleWorkspace'

export interface SheetConfig {
  sheetId: string
  apiKey?: string
  sheetName?: string
}

export interface ProductRow {
  id: string
  name: string
  price: string
  description: string
  image_url: string
  category: string
  tags: string
  features: string
}

export type ProductFromSheet = Product

export async function fetchSheetData(config: SheetConfig): Promise<string[][]> {
  const { sheetId, sheetName = 'Products' } = config
  const canUsePrivateApi = Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  )

  if (canUsePrivateApi) {
    return getSheetValues(sheetId, `${sheetName}!A:Z`)
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`
  const response = await fetch(url, {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.status}`)
  }

  const csvText = await response.text()
  return parseCSV(csvText)
}

function parseCSV(csvText: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentCell = ''
  let inQuotes = false

  for (let index = 0; index < csvText.length; index++) {
    const char = csvText[index]
    const nextChar = csvText[index + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"'
        index++
      } else if (char === '"') {
        inQuotes = false
      } else {
        currentCell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ',') {
      currentRow.push(currentCell.trim())
      currentCell = ''
      continue
    }

    if (char === '\n' || (char === '\r' && nextChar === '\n')) {
      currentRow.push(currentCell.trim())
      if (currentRow.some((cell) => cell)) {
        rows.push(currentRow)
      }
      currentRow = []
      currentCell = ''
      if (char === '\r') {
        index++
      }
      continue
    }

    if (char !== '\r') {
      currentCell += char
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim())
    if (currentRow.some((cell) => cell)) {
      rows.push(currentRow)
    }
  }

  return rows
}

export function convertToProducts(rows: string[][]): ProductFromSheet[] {
  if (rows.length < 2) {
    return []
  }

  const headers = rows[0].map((header) => header.toLowerCase().trim())

  return rows.slice(1).flatMap((row) => {
    const getValue = (column: string): string => {
      const index = headers.indexOf(column)
      return index >= 0 && index < row.length ? row[index] : ''
    }

    const id = getValue('id').trim()
    const name = getValue('name').trim()

    if (!id || !name) {
      return []
    }

    const price = parseFloat(getValue('price')) || 0
    const tags = getValue('tags')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    const features = getValue('features')
      .split(',')
      .map((feature) => feature.trim())
      .filter(Boolean)

    return [{
      id,
      name,
      description: getValue('description').trim(),
      price,
      originalPrice: price > 0 ? Math.round(price * 1.2 * 100) / 100 : undefined,
      image: getValue('image_url').trim(),
      category: getValue('category').trim() || 'Uncategorized',
      tags,
      features,
      inStock: true,
    }]
  })
}

export function getProductsByCategory(products: ProductFromSheet[], category: string): ProductFromSheet[] {
  if (!category || category === 'all') {
    return products
  }

  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function getProductById(products: ProductFromSheet[], id: string): ProductFromSheet | undefined {
  return products.find((product) => product.id === id)
}

export function searchProducts(products: ProductFromSheet[], query: string): ProductFromSheet[] {
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) {
    return products
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
  )
}

export function getCategories(products: ProductFromSheet[]): string[] {
  return Array.from(new Set(products.map((product) => product.category))).sort()
}
