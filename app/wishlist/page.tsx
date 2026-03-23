'use client'

import { useWishlist } from '@/hooks/useWishlist'
import { WishlistContent } from './WishlistContent'

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist()

  if (!isLoaded) {
    return (
      <div className="min-h-screen">
        <div className="page-header-bg pt-8 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="animate-pulse">
              <div className="h-4 w-20 bg-neutral-200 rounded mb-4"></div>
              <div className="h-10 w-48 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-neutral-200 rounded-2xl"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
                  <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header-bg pt-8 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
            Saved Items
          </p>
          <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 animate-fade-up" style={{ animationDelay: '100ms' }}>
            My Wishlist
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 pb-16">
        <WishlistContent wishlistItems={wishlist} />
      </div>
    </div>
  )
}
