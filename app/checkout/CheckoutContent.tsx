'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'

interface CheckoutContentProps {
  cartItems: CartItem[]
}

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

const UPI_ID = 'ladestudio@upi'
const WHATSAPP_NUMBER = '919999999999'

export function CheckoutContent({ cartItems }: CheckoutContentProps) {
  const router = useRouter()
  const { clearCart } = useCart()
  const [step, setStep] = useState<'form' | 'payment'>('form')
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {}
    if (!customer.name.trim()) newErrors.name = 'Name is required'
    if (!customer.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(customer.phone)) newErrors.phone = 'Enter valid 10-digit phone'
    if (!customer.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      setStep('payment')
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `*New Order - Lade Studio*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${customer.name}\n`
    message += `Phone: ${customer.phone}\n`
    message += `Address: ${customer.address}\n\n`
    message += `*Order Items:*\n`
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })
    message += `\n*Subtotal:* ${formatPrice(subtotal)}\n`
    message += `*Shipping:* ${shipping === 0 ? 'Free' : formatPrice(shipping)}\n`
    message += `*Total:* ${formatPrice(total)}\n\n`
    message += `*Payment Status:* Paid via UPI`
    return encodeURIComponent(message)
  }

  const handlePaid = () => {
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`
    clearCart()
    window.open(waUrl, '_blank')
    router.push('/')
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
        <p className="text-neutral-500 mb-8">Add some products to your cart before checkout.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'form' ? 'bg-secondary text-white' : 'bg-green-500 text-white'}`}>
          {step === 'form' ? '1' : '✓'}
        </div>
        <div className="flex-1 h-1 bg-neutral-200 rounded">
          <div className={`h-full bg-secondary rounded transition-all duration-300 ${step === 'payment' ? 'w-full' : 'w-0'}`} />
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-secondary text-white' : 'bg-neutral-200 text-neutral-400'}`}>
          2
        </div>
      </div>

      {step === 'form' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-colors`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-colors`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Delivery Address</label>
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.address ? 'border-red-500' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-colors resize-none`}
                  placeholder="Full delivery address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 line-clamp-1">{item.name}</p>
                      <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(total)}</span>
                </div>
              </div>
              <Button variant="primary" size="xl" fullWidth className="mt-6" onClick={handleContinue}>
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Scan to Pay</h2>
            <p className="text-neutral-500 mb-6">Scan the QR code using any UPI app</p>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl border-2 border-neutral-200 shadow-soft">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${UPI_ID}&pn=Lade%20Studio&am=${total.toFixed(2)}&cu=INR`}
                  alt="UPI QR Code"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-neutral-600">Pay to UPI ID:</p>
              <p className="font-mono text-lg font-semibold text-neutral-900">{UPI_ID}</p>
              <p className="text-2xl font-bold text-secondary">{formatPrice(total)}</p>
            </div>

            <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
              <p className="text-sm text-neutral-600 mb-2">After payment, click below:</p>
              <Button variant="primary" size="xl" fullWidth onClick={handlePaid}>
                I Have Paid
              </Button>
            </div>

            <button
              onClick={() => setStep('form')}
              className="w-full mt-4 text-center text-neutral-500 hover:text-secondary transition-colors"
            >
              ← Back to Details
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-bold text-neutral-900 mb-4">Delivery Address</h3>
              <p className="text-neutral-600">{customer.name}</p>
              <p className="text-neutral-600">{customer.phone}</p>
              <p className="text-neutral-600 whitespace-pre-line">{customer.address}</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-bold text-neutral-900 mb-4">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}