'use client'

import { useState, useEffect, useCallback } from 'react'
import { CartItem, Product } from '@/types'
import { getCart, setCart as saveCart } from '@/utils/storage'

function normalizeCartItem(value: unknown): CartItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const item = value as Partial<CartItem> & { productId?: string }
  const id = typeof item.id === 'string' && item.id.trim()
    ? item.id.trim()
    : typeof item.productId === 'string' && item.productId.trim()
      ? item.productId.trim()
      : ''

  const name = typeof item.name === 'string' ? item.name.trim() : ''
  const image = typeof item.image === 'string' ? item.image.trim() : ''
  const price = typeof item.price === 'number' ? item.price : Number(item.price)
  const quantity = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity)

  if (!id || !name || !image || !Number.isFinite(price) || !Number.isInteger(quantity) || quantity <= 0) {
    return null
  }

  return {
    id,
    name,
    description: typeof item.description === 'string' ? item.description : '',
    price,
    originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : undefined,
    image,
    category: typeof item.category === 'string' && item.category.trim() ? item.category : 'Uncategorized',
    inStock: typeof item.inStock === 'boolean' ? item.inStock : true,
    features: Array.isArray(item.features) ? item.features.filter((feature): feature is string => typeof feature === 'string') : [],
    tags: Array.isArray(item.tags) ? item.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    quantity,
  }
}

export function useCart() {
  const [cart, setCartState] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedCart = JSON.parse(getCart())
      const normalizedCart = Array.isArray(storedCart)
        ? storedCart
            .map(normalizeCartItem)
            .filter((item): item is CartItem => Boolean(item))
        : []
      setCartState(normalizedCart)
      saveCart(JSON.stringify(normalizedCart))
    } catch {
      setCartState([])
    }
    setIsLoaded(true)
  }, [])

  const setCart = useCallback((newCart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setCartState(prev => {
      const updated = typeof newCart === 'function' ? newCart(prev) : newCart
      saveCart(JSON.stringify(updated))
      return updated
    })
  }, [])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev: CartItem[]) => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }, [setCart])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev: CartItem[]) => prev.filter(item => item.id !== productId))
  }, [setCart])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev: CartItem[]) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [setCart, removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [setCart])

  const getTotal = useCallback(() => {
    return cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  }, [cart])

  const getItemCount = useCallback(() => {
    return cart.reduce((count: number, item: CartItem) => count + item.quantity, 0)
  }, [cart])

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  }
}
