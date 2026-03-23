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

const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024
const ALLOWED_SCREENSHOT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

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
    if (initialPendingCheckout) return

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
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const itemCount = useMemo(
    () => pendingCheckout?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [pendingCheckout]
  )

  const handleWhatsAppSupport = () => {
    if (!submittedOrder) return

    const message = encodeURIComponent(
      `Hi Ladi Studio, I submitted payment proof for order ${submittedOrder.orderId}. Please help me with the next update.`
    )

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const handleScreenshotChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }

    if (!file) {
      setScreenshot(null)
      setErrors((current) => ({ ...current, screenshot: 'Upload your payment screenshot.' }))
      return
    }

    if (!ALLOWED_SCREENSHOT_TYPES.has(file.type)) {
      setScreenshot(null)
      setErrors((current) => ({ ...current, screenshot: 'Only JPG, PNG, or WEBP screenshots are allowed.' }))
      return
    }

    if (file.size > MAX_SCREENSHOT_SIZE) {
      setScreenshot(null)
      setErrors((current) => ({ ...current, screenshot: 'Screenshot must be 5 MB or smaller.' }))
      return
    }

    setScreenshot(file)
    setErrors((current) => ({ ...current, screenshot: undefined, submit: undefined }))
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const validate = () => {
    const nextErrors: typeof errors = {}

    if (!validateName(payerName)) nextErrors.payerName = 'Enter the name used while paying.'
    if (!validatePhone(payerPhone)) nextErrors.payerPhone = 'Enter the 10-digit number linked to the payment.'
    if (!screenshot) nextErrors.screenshot = 'Upload your payment screenshot.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!pendingCheckout || !validate()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const formData = new FormData()
      formData.append('customerName', pendingCheckout.customer.name)
      formData.append('customerPhone', pendingCheckout.customer.phone)
      formData.append('shippingAddress', pendingCheckout.customer.address)
      formData.append('payerName', sanitizeInput(payerName, 100))
      formData.append('payerPhone', payerPhone.replace(/\D/g, '').slice(0, 10))
      formData.append('pendingCheckout', JSON.stringify(pendingCheckout))
      formData.append(
        'items',
        JSON.stringify(
          pendingCheckout.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }))
        )
      )

      if (screenshot) formData.append('screenshot', screenshot)

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
      <div className="mx-auto max-w-3xl jewel-dark rounded-[2.4rem] p-6 shadow-elevated sm:p-7 lg:p-8 xl:p-9">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-white mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Payment Submitted</p>
        <h2 className="mt-3 font-display text-5xl font-bold text-white">Order received successfully</h2>
        <p className="mt-4 text-white/68">
          Your payment screenshot has been submitted. We will review it and update your order status soon.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-white/45">Order ID</p>
            <p className="mt-2 font-semibold text-white">{submittedOrder.orderId}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-white/45">Submitted On</p>
            <p className="mt-2 font-semibold text-white">{formatDate(submittedOrder.createdAt)}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/orders" className="flex-1">
            <Button variant="secondary" size="lg" fullWidth>View My Orders</Button>
          </Link>
          <Button variant="outline" size="lg" onClick={handleWhatsAppSupport}>
            Contact on WhatsApp
          </Button>
          <Button variant="ghost" size="lg" className="border border-white/15 bg-white/6 text-white hover:bg-white/10" onClick={() => router.push('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  if (!pendingCheckout) {
    return (
      <div className="mx-auto max-w-2xl jewel-card rounded-[2.2rem] p-6 text-center shadow-soft sm:p-7 lg:p-8">
        <h2 className="font-display text-4xl font-bold text-neutral-900">No payment to submit</h2>
        <p className="mt-3 text-neutral-500">Complete checkout first, then come back here to upload your payment screenshot.</p>
        <Link href="/checkout" className="mt-8 inline-block">
          <Button variant="primary" size="lg">Back to Checkout</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
      <form onSubmit={handleSubmit} className="jewel-card rounded-[2.2rem] p-5 shadow-soft sm:p-6 lg:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Step 3</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">Upload payment proof</h2>
        <p className="mt-3 text-sm leading-7 text-neutral-500">
          Add the name, number, and screenshot used for the payment. Your purchased products are already attached.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Payer Name</label>
            <input
              type="text"
              value={payerName}
              onChange={(event) => setPayerName(sanitizeInput(event.target.value, 100))}
              className={`w-full rounded-[1.2rem] border px-4 py-3 text-sm shadow-soft ${errors.payerName ? 'border-red-400 bg-red-50/50' : 'border-neutral-200 bg-white/75'}`}
              placeholder="Name used during payment"
              maxLength={100}
            />
            {errors.payerName && <p className="mt-1.5 text-xs text-red-500">{errors.payerName}</p>}
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Payment Number</label>
            <input
              type="tel"
              value={payerPhone}
              onChange={(event) => setPayerPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`w-full rounded-[1.2rem] border px-4 py-3 text-sm shadow-soft ${errors.payerPhone ? 'border-red-400 bg-red-50/50' : 'border-neutral-200 bg-white/75'}`}
              placeholder="10-digit payment number"
              maxLength={10}
            />
            {errors.payerPhone && <p className="mt-1.5 text-xs text-red-500">{errors.payerPhone}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Payment Screenshot</label>
          <label className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.6rem] border border-dashed px-5 py-8 text-center transition-colors sm:px-6 sm:py-10 ${
            errors.screenshot ? 'border-red-400 bg-red-50/40' : 'border-neutral-300 bg-white/55 hover:border-secondary'
          }`}>
            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleScreenshotChange} />
            <span className="text-sm font-semibold text-neutral-700">Choose screenshot</span>
            <span className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">PNG, JPG, or WEBP up to 5 MB</span>
          </label>
          {errors.screenshot && <p className="mt-1.5 text-xs text-red-500">{errors.screenshot}</p>}
          {previewUrl && (
            <div className="relative mt-4 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.6rem] border border-neutral-200">
              <Image src={previewUrl} alt="Payment screenshot preview" fill className="object-cover" unoptimized />
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="mt-6 rounded-[1.3rem] bg-red-50 px-4 py-3 text-sm text-red-600">
            {errors.submit}
            <p className="mt-1 text-xs text-red-500/90">Your cart and checkout snapshot are still saved, so you can retry safely.</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      <div className="space-y-5">
        <div className="jewel-dark rounded-[2.2rem] p-5 shadow-elevated sm:p-6 lg:p-7">
          <h3 className="font-display text-3xl font-bold text-white">Submitted products</h3>
          <div className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
            {pendingCheckout.items.map((item) => (
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
        </div>

        <div className="jewel-card rounded-[2.2rem] p-5 shadow-soft sm:p-6 lg:p-7">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Order summary</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Items ({itemCount})</span>
              <span className="text-neutral-900">{formatPrice(pendingCheckout.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Shipping</span>
              <span className="text-neutral-900">{pendingCheckout.shipping === 0 ? 'Free' : formatPrice(pendingCheckout.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-4 text-base font-bold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(pendingCheckout.total)}</span>
            </div>
          </div>
        </div>

        <div className="jewel-card rounded-[2.2rem] p-5 shadow-soft sm:p-6 lg:p-7">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Shipping details</h3>
          <p className="mt-4 text-lg font-semibold text-neutral-900">{pendingCheckout.customer.name}</p>
          <p className="mt-1 text-neutral-600">{pendingCheckout.customer.phone}</p>
          <p className="mt-3 whitespace-pre-line text-neutral-600">{pendingCheckout.customer.address}</p>
        </div>
      </div>
    </div>
  )
}
