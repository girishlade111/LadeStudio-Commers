const CART_KEY = 'ladi_studio_cart'
const WISHLIST_KEY = 'ladi_studio_wishlist'

export function getCart(): string {
  if (typeof window === 'undefined') return '[]'
  return localStorage.getItem(CART_KEY) || '[]'
}

export function setCart(cart: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, cart)
}

export function getWishlist(): string {
  if (typeof window === 'undefined') return '[]'
  return localStorage.getItem(WISHLIST_KEY) || '[]'
}

export function setWishlist(wishlist: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(WISHLIST_KEY, wishlist)
}

export function clearCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_KEY)
}

export function clearWishlist(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(WISHLIST_KEY)
}