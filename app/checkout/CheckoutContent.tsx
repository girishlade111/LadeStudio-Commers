'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartItem, CustomerInfo, PendingCheckout } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { validateName, validatePhone, validateAddress, sanitizeInput } from '@/utils/security'
import { calculateOrderTotals } from '@/utils/orders'
import { setPendingCheckout } from '@/utils/storage'

interface CheckoutContentProps {
  cartItems: CartItem[]
}

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || 'default@upi'
const UPI_QR_URL = process.env.NEXT_PUBLIC_UPI_QR_URL

export function CheckoutContent({ cartItems }: CheckoutContentProps) {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'payment'>('form')
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const { subtotal, shipping, total } = calculateOrderTotals(cartItems)

  const persistPendingCheckout = () => {
    const pendingCheckout: PendingCheckout = {
      customer,
      items: cartItems,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    }

    setPendingCheckout(JSON.stringify(pendingCheckout))
  }

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {}

    if (!validateName(customer.name)) newErrors.name = 'Enter valid name (2-100 characters, letters only)'
    if (!validatePhone(customer.phone)) newErrors.phone = 'Enter valid 10-digit phone number'
    if (!validateAddress(customer.address)) newErrors.address = 'Enter valid address (10-500 characters)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      persistPendingCheckout()
      setStep('payment')
    }
  }

  const handlePaid = () => {
    persistPendingCheckout()
    router.push('/checkout/payment-proof')
  }

  if (cartItems.length === 0) {
    return (
      <div className="jewel-card flex min-h-[50vh] flex-col items-center justify-center rounded-[2.2rem] py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/12 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-10 w-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="font-display text-4xl font-bold text-neutral-900">Your cart is empty</h2>
        <p className="mt-3 text-neutral-500">Add some products before checkout.</p>
        <Link href="/shop" className="mt-8">
          <Button variant="primary" size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl animate-fade-up">
      <div className="mb-10 rounded-[2rem] jewel-dark px-6 py-6 shadow-elevated md:px-8">
        <div className="flex items-center gap-4">
          {[
            { id: '1', label: 'Details', active: step === 'form', done: step === 'payment' },
            { id: '2', label: 'UPI Payment', active: step === 'payment', done: false },
          ].map((item, index) => (
            <div key={item.id} className="flex flex-1 items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
                item.active ? 'bg-secondary text-primary-900' : item.done ? 'bg-accent text-white' : 'bg-white/10 text-white/65'
              }`}>
                {item.done ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : item.id}
              </div>
              <span className={`text-sm font-semibold uppercase tracking-[0.14em] ${item.active ? 'text-white' : 'text-white/56'}`}>{item.label}</span>
              {index === 0 && <div className="h-px flex-1 bg-white/12" />}
            </div>
          ))}
        </div>
      </div>

      {step === 'form' && (
        <div className="grid gap-6 md:grid-cols-[1fr,0.88fr]">
          <div className="jewel-card rounded-[2.2rem] p-7 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Customer Information</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">Delivery details</h2>
            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Full Name</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(event) => setCustomer({ ...customer, name: sanitizeInput(event.target.value, 100) })}
                  className={`w-full rounded-[1.2rem] border px-4 py-3 text-sm shadow-soft ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-neutral-200 bg-white/75'}`}
                  placeholder="Enter your name"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(event) => setCustomer({ ...customer, phone: event.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={`w-full rounded-[1.2rem] border px-4 py-3 text-sm shadow-soft ${errors.phone ? 'border-red-400 bg-red-50/50' : 'border-neutral-200 bg-white/75'}`}
                  placeholder="10-digit phone number"
                  maxLength={10}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Delivery Address</label>
                <textarea
                  value={customer.address}
                  onChange={(event) => setCustomer({ ...customer, address: sanitizeInput(event.target.value, 500) })}
                  rows={5}
                  className={`w-full rounded-[1.2rem] border px-4 py-3 text-sm shadow-soft resize-none ${errors.address ? 'border-red-400 bg-red-50/50' : 'border-neutral-200 bg-white/75'}`}
                  placeholder="Full delivery address"
                  maxLength={500}
                />
                {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
              </div>
            </div>
          </div>

          <div className="jewel-dark rounded-[2.2rem] p-7 shadow-elevated md:p-8">
            <h2 className="font-display text-4xl font-bold text-white">Order Summary</h2>
            <div className="mt-6 space-y-4 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-[1.4rem] border border-white/10 bg-white/6 p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-[1rem] bg-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-white">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 space-y-3">
              <div className="flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button variant="secondary" size="lg" fullWidth className="mt-7" onClick={handleContinue}>
              Continue to Payment
            </Button>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="grid gap-6 md:grid-cols-[0.9fr,1.1fr]">
          <div className="jewel-dark rounded-[2.2rem] p-7 shadow-elevated md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">UPI Payment</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Scan to pay</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">Pay with any UPI app and continue to upload your payment screenshot.</p>

            <div className="mt-8 flex justify-center">
              <div className="rounded-[2rem] bg-white p-4 shadow-elevated">
                <Image
                  src={UPI_QR_URL || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${UPI_ID}&pn=Lade%20Studio&am=${total.toFixed(2)}&cu=INR`}
                  alt="UPI QR Code"
                  width={220}
                  height={220}
                  className="rounded-[1.4rem]"
                />
              </div>
            </div>

            <div className="mt-7 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">UPI ID</p>
              <p className="mt-2 font-mono text-lg font-semibold text-white">{UPI_ID}</p>
              <p className="mt-4 text-3xl font-extrabold text-secondary">{formatPrice(total)}</p>
            </div>

            <Button variant="secondary" size="lg" fullWidth className="mt-8" onClick={handlePaid}>
              I Have Paid, Continue
            </Button>

            <button
              onClick={() => setStep('form')}
              className="mt-4 w-full text-center text-sm uppercase tracking-[0.14em] text-white/48 transition-colors hover:text-white/75"
            >
              Back to Details
            </button>
          </div>

          <div className="space-y-5">
            <div className="jewel-card rounded-[2.2rem] p-6 shadow-soft">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Delivery Address</h3>
              <p className="mt-4 text-lg font-semibold text-neutral-900">{customer.name}</p>
              <p className="mt-1 text-neutral-600">{customer.phone}</p>
              <p className="mt-3 whitespace-pre-line text-neutral-600">{customer.address}</p>
            </div>

            <div className="jewel-card rounded-[2.2rem] p-6 shadow-soft">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Order Details</h3>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-neutral-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-100 pt-4 text-base font-bold text-neutral-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
