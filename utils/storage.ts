const CART_KEY = 'ladi_studio_cart'
const WISHLIST_KEY = 'ladi_studio_wishlist'
const PENDING_CHECKOUT_KEY = 'ladi_studio_pending_checkout'

function getStorageItem(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  return localStorage.getItem(key) || fallback
}

export function getCart(): string {
  return getStorageItem(CART_KEY, '[]')
}

export function setCart(cart: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, cart)
}

export function getWishlist(): string {
  return getStorageItem(WISHLIST_KEY, '[]')
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

export function getPendingCheckout(): string {
  return getStorageItem(PENDING_CHECKOUT_KEY, 'null')
}

export function setPendingCheckout(pendingCheckout: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PENDING_CHECKOUT_KEY, pendingCheckout)
}

export function clearPendingCheckout(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PENDING_CHECKOUT_KEY)
}
