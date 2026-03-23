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
      <div className="jewel-card flex min-h-[50vh] flex-col items-center justify-center rounded-[2.2rem] py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/12 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-10 w-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="font-display text-4xl font-bold text-neutral-900">Your wishlist is empty</h2>
        <p className="mt-3 max-w-md text-neutral-500">Save your favorite pieces here and bring them back into your cart when you are ready.</p>
        <Link href="/shop" className="mt-8">
          <Button variant="primary" size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.14em] text-neutral-500">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
        <Link href="/shop" className="link-underline text-sm font-semibold uppercase tracking-[0.14em] text-plum-700">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className={`jewel-card group rounded-[2rem] p-3 transition-all duration-300 ${
              removingId === item.id ? 'scale-95 opacity-0' : 'opacity-100'
            }`}
          >
            <Link href={`/products/${item.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-cream">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />

                <button
                  onClick={(event) => {
                    event.preventDefault()
                    handleRemove(item.id)
                  }}
                  className="absolute right-3 top-3 rounded-full bg-white/85 p-2.5 text-red-400 shadow-soft transition-all hover:bg-white hover:text-red-600"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </Link>

            <div className="px-2 pb-3 pt-5">
              <span className="rounded-full bg-secondary/14 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-800">{item.category}</span>
              <Link href={`/products/${item.id}`}>
                <h3 className="mt-3 font-display text-2xl font-bold text-neutral-900 transition-colors group-hover:text-plum-700">
                  {item.name}
                </h3>
              </Link>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-extrabold text-primary-800">{formatPrice(item.price)}</span>
                {item.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">{formatPrice(item.originalPrice)}</span>
                )}
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                className="mt-5"
                onClick={() => handleAddToCart(item)}
                disabled={!item.inStock}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[1.4rem] bg-primary-800 px-6 py-4 text-white shadow-elevated animate-slide-up">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-semibold">Moved to cart!</span>
        </div>
      )}
    </div>
  )
}
