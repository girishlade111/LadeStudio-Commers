'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItem } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { FREE_SHIPPING_THRESHOLD, calculateOrderTotals } from '@/utils/orders'

interface CartContentProps {
  cartItems: CartItem[]
}

export function CartContent({ cartItems }: CartContentProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const { subtotal, shipping, total } = calculateOrderTotals(cartItems)

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeFromCart(id)
      setRemovingId(null)
    }, 300)
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 mb-6 rounded-2xl bg-cream flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-secondary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-display font-bold text-neutral-900 mb-3">Your cart is empty</h2>
        <p className="text-sm text-neutral-500 mb-8 max-w-sm">Looks like you haven&apos;t added anything yet. Explore our collection to find something you love.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Start Shopping
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between pb-4 mb-2">
          <p className="text-sm text-neutral-500">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
          <Link href="/products" className="text-sm text-secondary hover:text-secondary-700 font-medium transition-colors link-underline">
            Continue Shopping
          </Link>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className={`flex gap-5 p-5 bg-white rounded-2xl border border-neutral-200 transition-all duration-300 hover:shadow-card ${
              removingId === item.id ? 'opacity-0 translate-x-4' : 'opacity-100'
            }`}
          >
            <Link href={`/products/${item.id}`} className="flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-cream relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="112px"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400">{item.category}</span>
                  <Link href={`/products/${item.id}`} className="block text-base font-semibold text-neutral-900 hover:text-secondary transition-colors line-clamp-1 mt-0.5">
                    {item.name}
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center bg-neutral-50 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-neutral-500 hover:text-primary-800 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <span className="px-3 py-1.5 text-sm font-semibold min-w-[32px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-neutral-500 hover:text-primary-800 transition-colors"
                    disabled={item.quantity >= 10}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-neutral-400">{formatPrice(item.price)} each</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
          <h3 className="text-base font-semibold text-neutral-900 mb-6">Order Summary</h3>

            <div className="space-y-4 border-b border-neutral-100 pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="text-xs text-neutral-400 bg-cream p-3 rounded-lg">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
              </div>
            )}
          </div>

          <div className="flex justify-between items-center py-6">
            <span className="text-sm font-medium text-neutral-900">Total</span>
            <span className="text-xl font-bold text-neutral-900">{formatPrice(total)}</span>
          </div>

          <Link href="/checkout" className="block">
            <Button variant="primary" size="lg" fullWidth>
              Proceed to Checkout
            </Button>
          </Link>

          <div className="space-y-3 pt-6 mt-6 border-t border-neutral-100">
            {['Free shipping over Rs. 999', '30-day return policy', 'Secure checkout'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-xs text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-green-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
