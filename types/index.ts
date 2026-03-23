export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  features?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface WishlistItem extends Product {}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
}