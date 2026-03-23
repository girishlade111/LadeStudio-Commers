'use client'

import { useCart } from '@/hooks/useCart'
import { CartContent } from './CartContent'

export default function CartPage() {
  const { cart, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen">
        <div className="page-header-bg pt-8 pb-16">
          <div className="container mx-auto px-5 md:px-8">
            <div className="animate-pulse">
              <div className="h-4 w-20 bg-neutral-200 rounded mb-4"></div>
              <div className="h-10 w-48 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-5 md:px-8 -mt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-36 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
              <div className="h-36 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-80 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header-bg pt-8 pb-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
            Your Cart
          </p>
          <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 -mt-8 pb-16">
        <CartContent cartItems={cart} />
      </div>
    </div>
  )
}
