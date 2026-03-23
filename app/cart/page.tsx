'use client'

import { useCart } from '@/hooks/useCart'
import { CartContent } from './CartContent'

export default function CartPage() {
  const { cart, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-neutral-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-neutral-200 rounded-2xl"></div>
                <div className="h-40 bg-neutral-200 rounded-2xl"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-neutral-200 rounded-2xl"></div>
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
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>
        <CartContent cartItems={cart} />
      </div>
    </div>
  )
}