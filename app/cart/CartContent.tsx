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
      <div className="jewel-card flex min-h-[50vh] flex-col items-center justify-center rounded-[2.2rem] py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/12 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-11 w-11">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="font-display text-4xl font-bold text-neutral-900">Your cart is empty</h2>
        <p className="mt-3 max-w-md text-neutral-500">Curate your order with a few statement pieces and the checkout journey will be waiting here.</p>
        <Link href="/shop" className="mt-8">
          <Button variant="primary" size="lg">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm uppercase tracking-[0.14em] text-neutral-500">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
          <Link href="/shop" className="link-underline text-sm font-semibold uppercase tracking-[0.14em] text-plum-700">
            Continue Shopping
          </Link>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className={`jewel-card flex gap-5 rounded-[2rem] p-5 transition-all duration-300 sm:p-6 ${
              removingId === item.id ? 'translate-x-4 opacity-0' : 'opacity-100'
            }`}
          >
            <Link href={`/products/${item.id}`} className="flex-shrink-0">
              <div className="relative h-28 w-24 overflow-hidden rounded-[1.35rem] bg-cream md:h-32 md:w-28">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="112px"
                />
              </div>
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-secondary/14 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-800">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.id}`} className="mt-3 block font-display text-2xl font-bold text-neutral-900 transition-colors hover:text-plum-700">
                    {item.name}
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="rounded-full bg-white/80 p-2.5 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/75 px-2 py-2 shadow-soft">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="rounded-full p-2.5 text-neutral-500 transition-colors hover:text-primary-800 disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <span className="min-w-[32px] px-3 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="rounded-full p-2.5 text-neutral-500 transition-colors hover:text-primary-800 disabled:opacity-30"
                    disabled={item.quantity >= 10}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary-800">{formatPrice(item.price * item.quantity)}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">{formatPrice(item.price)} each</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="jewel-dark sticky top-32 rounded-[2.2rem] p-6 shadow-elevated sm:p-7 lg:p-8">
          <h3 className="font-display text-3xl font-bold text-white">Order Summary</h3>

          <div className="mt-7 space-y-4 border-b border-white/10 pb-6">
            <div className="flex justify-between text-sm text-white/65">
              <span>Subtotal</span>
              <span className="font-medium text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/65">
              <span>Shipping</span>
              <span className="font-medium text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="rounded-[1.3rem] border border-secondary/20 bg-white/8 px-4 py-3 text-xs uppercase tracking-[0.12em] text-secondary">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-6">
            <span className="text-sm uppercase tracking-[0.14em] text-white/55">Total</span>
            <span className="text-3xl font-extrabold text-white">{formatPrice(total)}</span>
          </div>

          <Link href="/checkout" className="block">
            <Button variant="secondary" size="lg" fullWidth>
              Proceed to Checkout
            </Button>
          </Link>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
            {['UPI payment supported', 'Order proof upload flow', 'Account-safe checkout'].map((text) => (
              <div key={text} className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-white/58">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
