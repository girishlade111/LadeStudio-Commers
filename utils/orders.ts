import { CartItem, OrderLineItem } from '@/types'

export const FREE_SHIPPING_THRESHOLD = 999
export const STANDARD_SHIPPING_FEE = 99

export interface OrderTotals {
  subtotal: number
  shipping: number
  total: number
}

export function calculateOrderTotals(items: Array<{ price: number; quantity: number }>): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  }
}

export function buildOrderLineItems(items: CartItem[]): OrderLineItem[] {
  return items.map((item) => ({
    productId: item.id,
    name: item.name,
    image: item.image,
    category: item.category,
    unitPrice: item.price,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }))
}

export function summarizeOrderItems(items: OrderLineItem[]): string {
  return items.map((item) => `${item.name} x${item.quantity}`).join(', ')
}
