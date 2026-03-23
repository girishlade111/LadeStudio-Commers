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

        if (ignore) return

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
      result = result.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'newest':
        result.reverse()
        break
      case 'price-low':
        result.sort((first, second) => first.price - second.price)
        break
      case 'price-high':
        result.sort((first, second) => second.price - first.price)
        break
    }

    return result
  }, [products, searchQuery, selectedCategory, sortBy])

  const getCategoryCount = (category: string) => {
    if (category === 'All') return products.length
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase()).length
  }

  if (isLoading) {
    return <ShopLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="jewel-card max-w-lg rounded-[2rem] p-10 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900">Unable to load products</h2>
          <p className="mt-3 text-neutral-500">{error}</p>
          <Button variant="primary" className="mt-6" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-45" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />
        <div className="container relative mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              The Collection
            </span>
            <h1 className="mt-6 font-display text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[0.94] text-white">
              Shop with a richer
              <span className="block text-gradient">editorial rhythm</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Discover the Google Sheets powered catalog through deeper color, stronger hierarchy, and a more premium browse experience.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-24 z-30 mx-5 -mt-8 rounded-[1.8rem] border border-white/40 bg-white/68 px-5 py-5 shadow-elevated backdrop-blur-2xl md:mx-8">
        <div className="container mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-xl">
            <input
              type="text"
              placeholder="Search products, categories, or details"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-full border border-neutral-200/80 bg-white/80 py-3 pl-12 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-soft"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white/75 px-4 py-3 text-sm font-semibold text-neutral-700 md:hidden"
            >
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-neutral-200 bg-white/75 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-soft"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-5 py-10 md:px-8 md:py-14">
        <div className="flex gap-8">
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="jewel-card sticky top-44 rounded-[2rem] p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Categories</h3>
              <div className="mt-5 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex w-full items-center justify-between rounded-[1.2rem] px-4 py-3 text-left text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white shadow-card'
                        : 'bg-white/50 text-neutral-600 hover:bg-white hover:text-primary-800'
                    }`}
                  >
                    <span>{category}</span>
                    <span className={`text-xs ${selectedCategory === category ? 'text-white/70' : 'text-neutral-400'}`}>
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-50 bg-primary-900/50 md:hidden" onClick={() => setShowFilters(false)}>
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-6 shadow-elevated"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-neutral-900">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="rounded-full bg-neutral-100 p-3 text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-800 text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <main className="flex-1">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-neutral-500">
                Showing <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> products
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-semibold text-plum-700">{selectedCategory}</span></span>
                )}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 4} />
                ))}
              </div>
            ) : (
              <div className="jewel-card rounded-[2.2rem] px-6 py-16 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">No products found</h3>
                <p className="mt-3 text-neutral-500">Try a different search phrase or clear your filters.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}>
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
    <div className="min-h-screen">
      <div className="jewel-dark px-5 pb-16 pt-32 md:px-8">
        <div className="container mx-auto">
          <div className="h-5 w-32 rounded-full bg-white/10" />
          <div className="mt-8 h-20 max-w-2xl rounded-[2rem] bg-white/10" />
          <div className="mt-6 h-8 max-w-xl rounded-full bg-white/10" />
        </div>
      </div>
      <div className="container mx-auto px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="jewel-card animate-pulse rounded-[2rem] p-3">
              <div className="aspect-[3/4] rounded-[1.5rem] bg-neutral-200" />
              <div className="mt-5 h-4 w-24 rounded-full bg-neutral-200" />
              <div className="mt-3 h-7 w-2/3 rounded-full bg-neutral-200" />
              <div className="mt-3 h-6 w-1/3 rounded-full bg-neutral-200" />
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
