'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItem } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'

interface CartContentProps {
  cartItems: CartItem[]
}

export function CartContent({ cartItems }: CartContentProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16">
        <div className="w-24 h-24 mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-neutral-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Your cart is empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Start shopping to fill it up!</p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
          <Link href="/products" className="text-sm text-secondary hover:text-secondary-700 font-medium transition-colors">
            Continue Shopping
          </Link>
        </div>

        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-6 p-6 bg-white rounded-2xl border border-neutral-200 transition-all duration-300 ${
              removingId === item.id ? 'opacity-0 translate-x-4' : 'opacity-100'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link href={`/products/${item.id}`} className="flex-shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden bg-neutral-100 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="128px"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/products/${item.id}`} className="text-lg font-semibold text-neutral-900 hover:text-secondary transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1">{item.category}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border-2 border-neutral-200 rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-2 text-neutral-600 hover:text-secondary transition-colors hover:bg-neutral-50"
                    disabled={item.quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[40px] text-center border-x-2 border-neutral-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-2 text-neutral-600 hover:text-secondary transition-colors hover:bg-neutral-50"
                    disabled={item.quantity >= 10}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-secondary">{formatPrice(item.price * item.quantity)}</p>
                  {item.quantity > 1 && (
                    <p className="text-sm text-neutral-500">{formatPrice(item.price)} each</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
          <h3 className="text-xl font-bold text-neutral-900">Order Summary</h3>

          <div className="space-y-4 border-b border-neutral-200 pb-6">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            {subtotal < 100 && (
              <div className="flex justify-between text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
                <span>Add {formatPrice(100 - subtotal)} more for free shipping</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-neutral-900">Total</span>
            <span className="text-2xl font-bold text-secondary">{formatPrice(total)}</span>
          </div>

          <Button variant="primary" size="xl" fullWidth>
            Proceed to Checkout
          </Button>

          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}