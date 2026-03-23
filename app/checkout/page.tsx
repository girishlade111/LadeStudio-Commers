'use client'

import { useCart } from '@/hooks/useCart'
import { CheckoutContent } from './CheckoutContent'

export default function CheckoutPage() {
  const { cart, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 w-32 bg-neutral-200 rounded mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-neutral-200 rounded"></div>
                  <div className="h-12 bg-neutral-200 rounded"></div>
                  <div className="h-24 bg-neutral-200 rounded"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-16 bg-neutral-200 rounded"></div>
                  <div className="h-16 bg-neutral-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Checkout</h1>
        <CheckoutContent cartItems={cart} />
      </div>
    </div>
  )
}