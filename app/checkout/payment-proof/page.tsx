'use client'

import { useMemo } from 'react'
import { PendingCheckout } from '@/types'
import { PaymentProofContent } from './PaymentProofContent'
import { getPendingCheckout } from '@/utils/storage'

export default function PaymentProofPage() {
  const initialPendingCheckout = useMemo(() => {
    try {
      return JSON.parse(getPendingCheckout()) as PendingCheckout | null
    } catch {
      return null
    }
  }, [])

  return (
    <div className="min-h-screen">
      <div className="page-header-bg pt-8 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
            Secure Checkout
          </p>
          <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Payment Proof
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 pb-16">
        <PaymentProofContent initialPendingCheckout={initialPendingCheckout} />
      </div>
    </div>
  )
}
