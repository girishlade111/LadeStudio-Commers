'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WishlistItem } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'

interface WishlistContentProps {
  wishlistItems: WishlistItem[]
}

export function WishlistContent({ wishlistItems }: WishlistContentProps) {
  const { removeFromWishlist } = useWishlist()
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
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 mb-6 rounded-2xl bg-cream flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-secondary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-xl font-display font-bold text-neutral-900 mb-3">Your wishlist is empty</h2>
        <p className="text-sm text-neutral-500 mb-8 max-w-sm">Save your favorite items and they&apos;ll appear here for easy access later.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Browse Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4 mb-6">
        <p className="text-sm text-neutral-500">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
        <Link href="/products" className="text-sm text-secondary hover:text-secondary-700 font-medium transition-colors link-underline">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className={`relative group transition-all duration-300 ${
              removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'
            }`}
          >
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-card-hover transition-all duration-300">
              <Link href={`/products/${item.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-neutral-900 text-xs px-4 py-2 rounded-full font-medium">Sold Out</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemove(item.id)
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-400 hover:text-red-600 hover:bg-white shadow-soft transition-all duration-300"
                    aria-label="Remove from wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400">{item.category}</span>
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-secondary transition-colors duration-300 line-clamp-1 mt-1">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-bold text-neutral-900">{formatPrice(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>

                <div className="mt-4">
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
        <div className="fixed bottom-6 right-6 bg-primary-800 text-white px-6 py-4 rounded-2xl shadow-elevated flex items-center gap-3 animate-slide-up z-50">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-medium">Moved to cart!</span>
        </div>
      )}
    </div>
  )
}
