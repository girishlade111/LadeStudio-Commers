'use client'

import { useState, useEffect, useCallback } from 'react'
import { WishlistItem, Product } from '@/types'
import { getWishlist, setWishlist as saveWishlist } from '@/utils/storage'

export function useWishlist() {
  const [wishlist, setWishlistState] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedWishlist = JSON.parse(getWishlist())
    setWishlistState(storedWishlist)
    setIsLoaded(true)
  }, [])

  const setWishlist = useCallback((newWishlist: WishlistItem[] | ((prev: WishlistItem[]) => WishlistItem[])) => {
    setWishlistState(prev => {
      const updated = typeof newWishlist === 'function' ? newWishlist(prev) : newWishlist
      saveWishlist(JSON.stringify(updated))
      return updated
    })
  }, [])

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev: WishlistItem[]) => {
      if (prev.some(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }, [setWishlist])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev: WishlistItem[]) => prev.filter(item => item.id !== productId))
  }, [setWishlist])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId)
  }, [wishlist])

  const toggleWishlist = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist])

  const clearWishlist = useCallback(() => {
    setWishlist([])
  }, [setWishlist])

  return {
    wishlist,
    isLoaded,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    getItemCount: wishlist.length,
  }
}