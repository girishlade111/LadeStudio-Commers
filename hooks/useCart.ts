'use client'

import { useState, useEffect, useCallback } from 'react'
import { CartItem, Product } from '@/types'
import { getCart, setCart as saveCart } from '@/utils/storage'

export function useCart() {
  const [cart, setCartState] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedCart = JSON.parse(getCart())
      setCartState(Array.isArray(storedCart) ? storedCart : [])
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
