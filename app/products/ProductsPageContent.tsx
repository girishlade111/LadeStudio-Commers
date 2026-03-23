'use client'

import { Suspense } from 'react'

function ProductsContent() {
  const { default: ProductsPage } = require('./ProductsPageContent')
  return <ProductsPage />
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 w-64 bg-neutral-200 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-neutral-200 rounded-2xl" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}