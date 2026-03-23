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
  tags?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface WishlistItem extends Product {}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  email?: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
}

export interface OrderLineItem {
  productId: string
  name: string
  image: string
  category: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

export interface PendingCheckout {
  customer: CustomerInfo
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  createdAt: string
}

export type OrderStatus = 'payment_submitted' | 'verified' | 'rejected'

export interface OrderRecord {
  orderId: string
  clerkUserId: string
  clerkEmail: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  payerName: string
  payerPhone: string
  items: OrderLineItem[]
  itemSummary: string
  subtotal: number
  shipping: number
  total: number
  screenshotDriveFileId: string
  screenshotUrl: string
  status: OrderStatus
  createdAt: string
}

export interface PaymentProofPayload {
  payerName: string
  payerPhone: string
  screenshot: File
}
