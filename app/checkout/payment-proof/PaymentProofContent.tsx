'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { OrderRecord, PendingCheckout } from '@/types'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { formatDate, formatPrice } from '@/utils/formatters'
import { clearPendingCheckout, getPendingCheckout } from '@/utils/storage'
import { sanitizeInput, validateName, validatePhone } from '@/utils/security'

interface PaymentProofContentProps {
  initialPendingCheckout: PendingCheckout | null
}

export function PaymentProofContent({ initialPendingCheckout }: PaymentProofContentProps) {
  const router = useRouter()
  const { clearCart } = useCart()
  const [pendingCheckout, setPendingCheckoutState] = useState<PendingCheckout | null>(initialPendingCheckout)
  const [payerName, setPayerName] = useState(initialPendingCheckout?.customer.name || '')
  const [payerPhone, setPayerPhone] = useState(initialPendingCheckout?.customer.phone || '')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ payerName?: string; payerPhone?: string; screenshot?: string; submit?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null)

  useEffect(() => {
    if (initialPendingCheckout) {
      return
    }

    try {
      const storedPendingCheckout = JSON.parse(getPendingCheckout()) as PendingCheckout | null
      setPendingCheckoutState(storedPendingCheckout)
      if (storedPendingCheckout) {
        setPayerName(storedPendingCheckout.customer.name)
        setPayerPhone(storedPendingCheckout.customer.phone)
      }
    } catch {
      setPendingCheckoutState(null)
    }
  }, [initialPendingCheckout])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const itemCount = useMemo(
    () => pendingCheckout?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [pendingCheckout]
  )

  const handleScreenshotChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }

    setScreenshot(file)
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const validate = () => {
    const nextErrors: typeof errors = {}

    if (!validateName(payerName)) {
      nextErrors.payerName = 'Enter the name used while paying.'
    }

    if (!validatePhone(payerPhone)) {
      nextErrors.payerPhone = 'Enter the 10-digit number linked to the payment.'
    }

    if (!screenshot) {
      nextErrors.screenshot = 'Upload your payment screenshot.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!pendingCheckout || !validate()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const formData = new FormData()
      formData.append('customerName', pendingCheckout.customer.name)
      formData.append('customerPhone', pendingCheckout.customer.phone)
      formData.append('shippingAddress', pendingCheckout.customer.address)
      formData.append('payerName', sanitizeInput(payerName, 100))
      formData.append('payerPhone', payerPhone.replace(/\D/g, '').slice(0, 10))
      formData.append(
        'items',
        JSON.stringify(
          pendingCheckout.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }))
        )
      )

      if (screenshot) {
        formData.append('screenshot', screenshot)
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit payment proof')
      }

      clearCart()
      clearPendingCheckout()
      setSubmittedOrder(result.data as OrderRecord)
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit payment proof',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedOrder) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-neutral-200 p-8 md:p-10 shadow-soft">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3">Payment Submitted</p>
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">Order received successfully</h2>
        <p className="text-neutral-600 mb-8">
          Your payment screenshot has been submitted. We will review it and update your order status soon.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Order ID</p>
            <p className="font-semibold text-neutral-900">{submittedOrder.orderId}</p>
          </div>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Submitted On</p>
            <p className="font-semibold text-neutral-900">{formatDate(submittedOrder.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/orders" className="flex-1">
            <Button variant="primary" size="lg" fullWidth>
              View My Orders
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => router.push('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  if (!pendingCheckout) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200 p-8 text-center shadow-soft">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">No payment to submit</h2>
        <p className="text-neutral-500 mb-6">Complete checkout first, then come back here to upload your payment screenshot.</p>
        <Link href="/checkout">
          <Button variant="primary" size="lg">Back to Checkout</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-soft">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3">Step 3</p>
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">Upload payment proof</h2>
        <p className="text-sm text-neutral-500 mb-8">
          Add the name, number, and screenshot used for the payment. Your purchased products are already attached.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Payer Name</label>
            <input
              type="text"
              value={payerName}
              onChange={(event) => setPayerName(sanitizeInput(event.target.value, 100))}
              className={`w-full px-4 py-3 rounded-xl border ${errors.payerName ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-all text-sm`}
              placeholder="Name used during payment"
              maxLength={100}
            />
            {errors.payerName && <p className="text-red-500 text-xs mt-1.5">{errors.payerName}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Payment Number</label>
            <input
              type="tel"
              value={payerPhone}
              onChange={(event) => setPayerPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`w-full px-4 py-3 rounded-xl border ${errors.payerPhone ? 'border-red-400 bg-red-50/50' : 'border-neutral-200'} focus:border-secondary focus:outline-none transition-all text-sm`}
              placeholder="10-digit payment number"
              maxLength={10}
            />
            {errors.payerPhone && <p className="text-red-500 text-xs mt-1.5">{errors.payerPhone}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Payment Screenshot</label>
          <label className={`flex flex-col items-center justify-center rounded-2xl border border-dashed ${errors.screenshot ? 'border-red-400 bg-red-50/40' : 'border-neutral-300 bg-neutral-50'} px-5 py-8 text-center cursor-pointer hover:border-secondary transition-colors`}>
            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleScreenshotChange} />
            <span className="text-sm font-medium text-neutral-700">Choose screenshot</span>
            <span className="text-xs text-neutral-500 mt-1">PNG, JPG, or WEBP up to 5 MB</span>
          </label>
          {errors.screenshot && <p className="text-red-500 text-xs mt-1.5">{errors.screenshot}</p>}
          {previewUrl && (
            <div className="mt-4 relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200">
              <Image src={previewUrl} alt="Payment screenshot preview" fill className="object-cover" unoptimized />
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="mt-6 rounded-2xl bg-red-50 text-red-600 text-sm px-4 py-3">
            {errors.submit}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
            Submit Payment Proof
          </Button>
          <Link href="/checkout">
            <Button type="button" variant="outline" size="lg">
              Back to Payment
            </Button>
          </Link>
        </div>
      </form>

      <div className="space-y-4">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-soft">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Submitted products</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {pendingCheckout.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-neutral-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-soft">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Order summary</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Items ({itemCount})</span>
              <span className="text-neutral-900">{formatPrice(pendingCheckout.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Shipping</span>
              <span className={pendingCheckout.shipping === 0 ? 'text-green-600' : 'text-neutral-900'}>
                {pendingCheckout.shipping === 0 ? 'Free' : formatPrice(pendingCheckout.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-100">
              <span>Total</span>
              <span>{formatPrice(pendingCheckout.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-soft">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Shipping details</h3>
          <p className="text-sm font-medium text-neutral-900">{pendingCheckout.customer.name}</p>
          <p className="text-sm text-neutral-600 mt-1">{pendingCheckout.customer.phone}</p>
          <p className="text-sm text-neutral-600 mt-2 whitespace-pre-line">{pendingCheckout.customer.address}</p>
        </div>
      </div>
    </div>
  )
}
