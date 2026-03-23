'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { Product } from '@/types'
import { fetchCategories, fetchProducts } from '@/services/api/products'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function loadCatalog() {
      try {
        setIsLoading(true)
        const [catalogProducts, catalogCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])

        if (ignore) {
          return
        }

        setProducts(catalogProducts)
        const resolvedCategories = ['All', ...catalogCategories]
        setCategories(resolvedCategories)
        setSelectedCategory((currentCategory) => {
          const matchedCategory = resolvedCategories.find(
            (category) => category.toLowerCase() === currentCategory.toLowerCase()
          )
          return matchedCategory || 'All'
        })
        setError(null)
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load products')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadCatalog()

    return () => {
      ignore = true
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'newest':
        result.reverse()
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [selectedCategory, sortBy, searchQuery])

  const getCategoryCount = (category: string) => {
    if (category === 'All') return products.length
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length
  }

  if (isLoading) {
    return <ShopLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-lg text-center bg-white border border-neutral-200 rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">Unable to load products</h2>
          <p className="text-neutral-500 mb-6">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Shop Collection
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Explore our curated collection of premium essentials, crafted with quality and designed for the modern lifestyle.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 md:top-20 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-5 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500 hidden md:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-secondary cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-5 md:px-8 py-8 md:py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-40">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                    {categories.map(category => (
                      <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-secondary text-white font-medium'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{category}</span>
                    <span className={`text-xs ${selectedCategory === category ? 'text-white/70' : 'text-neutral-400'}`}>
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">Price Range</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Under $100', min: 0, max: 100 },
                    { label: '$100 - $200', min: 100, max: 200 },
                    { label: '$200 - $300', min: 200, max: 300 },
                    { label: 'Over $300', min: 300, max: Infinity },
                  ].map(range => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-secondary focus:ring-secondary" />
                      <span className="text-sm text-neutral-600 group-hover:text-neutral-900">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-neutral-300 text-secondary focus:ring-secondary" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setShowFilters(false)
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            selectedCategory === category
                              ? 'bg-secondary text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                Showing <span className="font-medium text-neutral-900">{filteredProducts.length}</span> products
                {selectedCategory !== 'All' && <span> in <span className="font-medium text-secondary">{selectedCategory}</span></span>}
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 4}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-500 mb-6">Try adjusting your search or filter criteria</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function ShopLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-primary-900 py-20 animate-pulse" />
      <div className="container mx-auto px-5 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-neutral-100 rounded-2xl animate-pulse" />
              <div className="mt-4 h-4 bg-neutral-100 rounded animate-pulse w-1/2" />
              <div className="mt-2 h-4 bg-neutral-100 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  )
}
