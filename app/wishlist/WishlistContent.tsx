'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WishlistItem } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/products/ProductCard'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'

interface WishlistContentProps {
  wishlistItems: WishlistItem[]
}

export function WishlistContent({ wishlistItems }: WishlistContentProps) {
  const { removeFromWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeFromWishlist(id)
      setRemovingId(null)
    }, 300)
  }

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item, 1)
    removeFromWishlist(item.id)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16">
        <div className="w-24 h-24 mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-neutral-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Your wishlist is empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md">Save your favorite items to your wishlist and they'll appear here for easy access later.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} in Wishlist</h2>
          <p className="text-sm text-neutral-500 mt-1">Save items for later or move them to your cart</p>
        </div>
        <Link href="/products" className="text-sm text-secondary hover:text-secondary-700 font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative group transition-all duration-300 ${
              removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <Link href={`/products/${item.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-error text-white text-sm px-4 py-2 rounded-full font-medium">Out of Stock</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemove(item.id)
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-neutral-400 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-500 mt-1 line-clamp-1">{item.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-bold text-neutral-900">{formatPrice(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-secondary text-white px-6 py-4 rounded-xl shadow-medium flex items-center gap-3 animate-slide-up z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Moved to cart!</span>
        </div>
      )}
    </div>
  )
}