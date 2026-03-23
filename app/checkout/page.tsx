'use client'

import { useCart } from '@/hooks/useCart'
import { CheckoutContent } from './CheckoutContent'

export default function CheckoutPage() {
  const { cart, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen">
        <div className="page-header-bg pt-8 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-4 w-20 bg-neutral-200 rounded mb-4"></div>
                <div className="h-10 w-32 bg-neutral-200 rounded mb-8"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-5 bg-neutral-200 rounded mb-6 w-1/2"></div>
              <div className="space-y-4">
                <div className="h-12 bg-neutral-200 rounded-xl"></div>
                <div className="h-12 bg-neutral-200 rounded-xl"></div>
                <div className="h-24 bg-neutral-200 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-5 bg-neutral-200 rounded mb-4 w-1/3"></div>
              <div className="space-y-3">
                <div className="h-16 bg-neutral-200 rounded-xl"></div>
                <div className="h-16 bg-neutral-200 rounded-xl"></div>
              </div>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
            Secure Checkout
          </p>
          <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Checkout
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 pb-16">
        <CheckoutContent cartItems={cart} />
      </div>
    </div>
  )
}
