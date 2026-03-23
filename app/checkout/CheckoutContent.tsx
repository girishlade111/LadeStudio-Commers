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

    if (!validateName(customer.name)) {
      newErrors.name = 'Enter valid name (2-100 characters, letters only)'
    }

    if (!validatePhone(customer.phone)) {
      newErrors.phone = 'Enter valid 10-digit phone number'
    }

    if (!validateAddress(customer.address)) {
      newErrors.address = 'Enter valid address (10-500 characters)'
    }

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
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 mb-6 rounded-2xl bg-cream flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-secondary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-display font-bold text-neutral-900 mb-3">Your cart is empty</h2>
        <p className="text-sm text-neutral-500 mb-8">Add some products before checkout.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      {/* Progress Steps */}
      <div className="flex items-center gap-3 mb-10">
        <div className={`flex items-center gap-2 ${step === 'form' ? 'text-secondary' : 'text-green-600'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'form' ? 'bg-secondary text-white' : 'bg-green-100 text-green-600'
          }`}>
            {step === 'form' ? '1' : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium hidden sm:block">Details</span>
        </div>
        <div className="flex-1 h-[1px] bg-neutral-200">
          <div className={`h-full bg-secondary transition-all duration-500 ${step === 'payment' ? 'w-full' : 'w-0'}`} />
        </div>
        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-secondary' : 'text-neutral-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'payment' ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-400'
          }`}>
            2
          </div>
          <span className="text-sm font-medium hidden sm:block">Payment</span>
        </div>
      </div>

      {step === 'form' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Form */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-soft">
            <h2 className="text-base font-semibold text-neutral-900 mb-6">Customer Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: sanitizeInput(e.target.value, 100) })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-all text-sm`}
                  placeholder="Enter your name"
                  maxLength={100}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-all text-sm`}
                  placeholder="10-digit phone number"
                  maxLength={10}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Delivery Address</label>
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: sanitizeInput(e.target.value, 500) })}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-all resize-none text-sm`}
                  placeholder="Full delivery address"
                  maxLength={500}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1.5">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 sticky top-24 shadow-soft">
              <h2 className="text-base font-semibold text-neutral-900 mb-5">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Subtotal</span>
                  <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : 'text-neutral-900'}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-100">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={handleContinue}>
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment QR */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-soft">
            <h2 className="text-base font-semibold text-neutral-900 mb-1">Scan to Pay</h2>
            <p className="text-sm text-neutral-500 mb-6">Use any UPI app to pay, then continue to upload your payment screenshot.</p>

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-card">
                <Image
                  src={UPI_QR_URL || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${UPI_ID}&pn=Lade%20Studio&am=${total.toFixed(2)}&cu=INR`}
                  alt="UPI QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="text-center space-y-1.5 mb-6">
              <p className="text-xs text-neutral-400 uppercase tracking-wider">UPI ID</p>
              <p className="font-mono text-base font-semibold text-neutral-900">{UPI_ID}</p>
              <p className="text-2xl font-bold text-secondary mt-2">{formatPrice(total)}</p>
            </div>

            <div className="bg-cream rounded-xl p-5">
              <p className="text-xs text-neutral-500 mb-3 text-center">After completing payment, continue to upload your screenshot proof.</p>
              <Button variant="primary" size="lg" fullWidth onClick={handlePaid}>
                I Have Paid, Continue
              </Button>
            </div>

            <button
              onClick={() => setStep('form')}
              className="w-full mt-4 text-center text-sm text-neutral-400 hover:text-secondary transition-colors"
            >
              Back to Details
            </button>
          </div>

          {/* Delivery & Order Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-4">Delivery Address</h3>
              <p className="text-sm font-medium text-neutral-900">{customer.name}</p>
              <p className="text-sm text-neutral-600 mt-1">{customer.phone}</p>
              <p className="text-sm text-neutral-600 mt-1 whitespace-pre-line">{customer.address}</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-4">Order Details</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : 'text-neutral-900'}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-100">
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
