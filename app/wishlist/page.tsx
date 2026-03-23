'use client'

import { useWishlist } from '@/hooks/useWishlist'
import { WishlistContent } from './WishlistContent'

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-neutral-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] bg-neutral-200 rounded-2xl"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">My Wishlist</h1>
        <WishlistContent wishlistItems={wishlist} />
      </div>
    </div>
  )
}