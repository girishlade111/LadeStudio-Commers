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

export interface ProductFromSheet {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  tags: string[]
  features: string[]
  inStock: boolean
}

export async function fetchSheetData(config: SheetConfig): Promise<string[][]> {
  const { sheetId, sheetName = 'Products' } = config
  
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`)
    }
    
    const csvText = await response.text()
    return parseCSV(csvText)
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    throw error
  }
}

function parseCSV(csvText: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentCell = ''
  let inQuotes = false
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i]
    const nextChar = csvText[i + 1]
    
    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        currentCell += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        currentRow.push(currentCell.trim())
        currentCell = ''
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentCell.trim())
        if (currentRow.some(cell => cell)) {
          rows.push(currentRow)
        }
        currentRow = []
        currentCell = ''
        if (char === '\r') i++
      } else if (char !== '\r') {
        currentCell += char
      }
    }
  }
  
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim())
    if (currentRow.some(cell => cell)) {
      rows.push(currentRow)
    }
  }
  
  return rows
}

export function convertToProducts(rows: string[][]): ProductFromSheet[] {
  if (rows.length < 2) return []
  
  const headers = rows[0].map(h => h.toLowerCase().trim())
  const products: ProductFromSheet[] = []
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row.length) continue
    
    const getValue = (col: string): string => {
      const index = headers.indexOf(col)
      return index >= 0 && index < row.length ? row[index] : ''
    }
    
    const id = getValue('id')
    const name = getValue('name')
    
    if (!id || !name) continue
    
    const price = parseFloat(getValue('price')) || 0
    const tags = getValue('tags') ? getValue('tags').split(',').map(t => t.trim()) : []
    const features = getValue('features') ? getValue('features').split(',').map(f => f.trim()) : []
    
    products.push({
      id: id.trim(),
      name: name.trim(),
      description: getValue('description').trim(),
      price,
      originalPrice: price > 0 ? Math.round(price * 1.2 * 100) / 100 : undefined,
      image: getValue('image_url').trim(),
      category: getValue('category').trim() || 'Uncategorized',
      tags,
      features,
      inStock: true,
    })
  }
  
  return products
}

export function getProductsByCategory(products: ProductFromSheet[], category: string): ProductFromSheet[] {
  if (!category || category === 'all') return products
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getProductById(products: ProductFromSheet[], id: string): ProductFromSheet | undefined {
  return products.find(p => p.id === id)
}

export function searchProducts(products: ProductFromSheet[], query: string): ProductFromSheet[] {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return products
  
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm))
  )
}

export function getCategories(products: ProductFromSheet[]): string[] {
  const categories = new Set(products.map(p => p.category))
  return Array.from(categories).sort()
}