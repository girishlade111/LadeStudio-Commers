'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useWishlist } from '@/hooks/useWishlist'
import { fetchCategories, fetchProducts } from '@/services/api/products'
import { Product } from '@/types'
import { formatPrice } from '@/utils/formatters'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

type ShopCardVariant = 'standard' | 'feature' | 'compact'

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
  const {
    isLoaded: isWishlistLoaded,
    toggleWishlist,
    isInWishlist,
  } = useWishlist()

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

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((counts, category) => {
      if (category === 'All') {
        counts[category] = products.length
        return counts
      }

      counts[category] = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      ).length
      return counts
    }, {})
  }, [categories, products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'All') {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
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

  const collectionInsights = useMemo(() => {
    const scopedProducts = filteredProducts.length > 0 ? filteredProducts : products
    const prices = scopedProducts.map((product) => product.price).filter((price) => Number.isFinite(price))
    const totalValue = prices.reduce((sum, price) => sum + price, 0)
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
    const averagePrice = prices.length > 0 ? totalValue / prices.length : 0
    const trendingTags = Array.from(
      scopedProducts.reduce<Map<string, number>>((tagMap, product) => {
        for (const tag of product.tags || []) {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        }
        return tagMap
      }, new Map<string, number>())
    )
      .sort((first, second) => second[1] - first[1])
      .slice(0, 6)
      .map(([tag]) => tag)

    return {
      minPrice,
      maxPrice,
      averagePrice,
      totalProducts: products.length,
      visibleProducts: filteredProducts.length,
      categoryCount: categories.filter((category) => category !== 'All').length,
      trendingTags,
    }
  }, [categories, filteredProducts, products])

  const featuredProducts = useMemo(() => {
    return new Set(
      filteredProducts
        .filter((_, index) => index === 0 || (filteredProducts.length >= 9 && index === 5))
        .map((product) => product.id)
    )
  }, [filteredProducts])

  const activeCategoryLabel = selectedCategory === 'All' ? 'All collections' : selectedCategory
  const searchLabel = searchQuery.trim() ? `Results for "${searchQuery.trim()}"` : 'Curated browse'

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('featured')
  }

  if (isLoading) {
    return <ShopLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-lg rounded-[2rem] border border-neutral-100 bg-white p-10 text-center shadow-lg">
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
    <div className="min-h-screen pb-16">
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-20">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,170,103,0.18),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(95,52,84,0.28),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(32,116,104,0.15),transparent_40%)]" />
        <div className="absolute inset-0 rich-grid opacity-20" />
        
        <div className="absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-secondary/8 blur-[140px]" />
        <div className="absolute -right-32 top-1/4 h-[450px] w-[450px] rounded-full bg-plum-500/12 blur-[100px]" />
        <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[80px]" />
        
        <div className="container relative mx-auto">
          <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr] xl:items-end xl:gap-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-secondary backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                Premium Marketplace
              </div>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-semibold tracking-tight text-white">
                Discover curated
                <span className="mt-2 block font-light italic text-white/75">premium selections</span>
                <span className="mt-2 block bg-gradient-to-r from-secondary via-amber-100 to-secondary bg-clip-text text-transparent">
                  for refined tastes
                </span>
              </h1>
              
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">Curated Catalog</span>
              </div>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/60">
                Explore our meticulously curated collection of premium products, each selected for exceptional quality and timeless elegance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:justify-self-end xl:min-w-[30rem]">
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20">
                <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-secondary/20 blur-xl" />
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Products</p>
                <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{products.length}</p>
                <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-secondary to-amber-300" />
                </div>
              </div>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20">
                <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-plum-500/20 blur-xl" />
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Collections</p>
                <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{collectionInsights.categoryCount}</p>
                <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-plum-500 to-purple-400" />
                </div>
              </div>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20">
                <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-accent/20 blur-xl" />
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Avg. Price</p>
                <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{formatPrice(collectionInsights.averagePrice)}</p>
                <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-accent to-teal-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <section className="sticky top-20 z-30 -mt-4 rounded-2xl border border-neutral-200/60 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-xl sm:px-6 sm:py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-neutral-200/80 bg-neutral-50/80 py-3.5 pl-12 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition-all focus:border-secondary/50 focus:bg-white focus:ring-2 focus:ring-secondary/10"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-neutral-200 p-1 text-neutral-500 hover:bg-neutral-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 shadow-sm hover:border-secondary/40 hover:text-primary-800 md:hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75m-9.75 12h9.75m-16.5-6h16.5m-16.5 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm0-6a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm0 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
                  </svg>
                  Filters
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="appearance-none rounded-xl border border-neutral-200/80 bg-white px-5 py-2.5 pr-10 text-sm font-medium text-neutral-700 shadow-sm outline-none transition-all focus:border-secondary/50 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-neutral-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 -mx-2 px-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-medium transition-all duration-300 ${
                      isActive
                        ? 'border-transparent bg-gradient-to-r from-primary-800 to-plum-700 text-white shadow-lg shadow-primary-800/25'
                        : 'border-neutral-200/70 bg-white text-neutral-500 hover:border-secondary/40 hover:text-primary-800 hover:shadow-md'
                    }`}
                  >
                    {category}
                    <span className={`ml-2 ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                      ({categoryCounts[category] || 0})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[20rem,minmax(0,1fr)] xl:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-48 space-y-5">
              <PriceInsightCard
                minPrice={collectionInsights.minPrice}
                maxPrice={collectionInsights.maxPrice}
                averagePrice={collectionInsights.averagePrice}
              />

              <CategoryRail
                categories={categories}
                selectedCategory={selectedCategory}
                categoryCounts={categoryCounts}
                onSelect={setSelectedCategory}
              />

              <CatalogPulseCard
                totalProducts={collectionInsights.totalProducts}
                visibleProducts={collectionInsights.visibleProducts}
                activeCategory={activeCategoryLabel}
                searchLabel={searchLabel}
              />

              <TrendingTagsCard tags={collectionInsights.trendingTags} />
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white px-5 py-5 shadow-sm sm:px-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">Showing</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-neutral-900">
                    {filteredProducts.length} products
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    in <span className="font-medium text-neutral-700">{activeCategoryLabel}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-50/50 px-4 py-2.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">Sort:</span>
                  <span className="text-sm font-semibold text-neutral-800">
                    {sortOptions.find((option) => option.value === sortBy)?.label || 'Featured'}
                  </span>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
                {filteredProducts.map((product, index) => {
                  const isFeatureCard = featuredProducts.has(product.id)
                  const cardVariant: ShopCardVariant = isFeatureCard ? 'feature' : 'standard'

                  return (
                    <div
                      key={product.id}
                      className={isFeatureCard ? 'md:col-span-2 xl:col-span-8' : 'xl:col-span-4'}
                    >
                      <MarketplaceProductCard
                        product={product}
                        priority={index < 4}
                        variant={cardVariant}
                        onWishlistToggle={toggleWishlist}
                        isInWishlist={isWishlistLoaded ? isInWishlist(product.id) : false}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-[2.2rem] border border-neutral-100 bg-white px-6 py-16 text-center shadow-sm sm:px-8 sm:py-20">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">No products found</h3>
                <p className="mt-3 text-neutral-500 max-w-md mx-auto">We couldn't find any products matching your criteria. Try adjusting your filters or search terms.</p>
                <Button variant="primary" className="mt-8" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-primary-950/60 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
          <div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[2.5rem] bg-white p-6 shadow-elevated"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Browse Filters</p>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-neutral-900">Refine Results</h3>
              </div>
              <button onClick={() => setShowFilters(false)} className="rounded-full bg-neutral-100 p-3 text-neutral-600 hover:bg-neutral-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5 pb-8">
              <PriceInsightCard
                minPrice={collectionInsights.minPrice}
                maxPrice={collectionInsights.maxPrice}
                averagePrice={collectionInsights.averagePrice}
              />

              <CategoryRail
                categories={categories}
                selectedCategory={selectedCategory}
                categoryCounts={categoryCounts}
                onSelect={(category) => {
                  setSelectedCategory(category)
                  setShowFilters(false)
                }}
              />

              <CatalogPulseCard
                totalProducts={collectionInsights.totalProducts}
                visibleProducts={collectionInsights.visibleProducts}
                activeCategory={activeCategoryLabel}
                searchLabel={searchLabel}
              />

              <TrendingTagsCard tags={collectionInsights.trendingTags} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PriceInsightCard({
  minPrice,
  maxPrice,
  averagePrice,
}: {
  minPrice: number
  maxPrice: number
  averagePrice: number
}) {
  const bars = [32, 46, 28, 68, 52, 75, 41, 58, 35, 62]

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-secondary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-secondary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Price Range</p>
            <span className="mt-0.5 inline-flex rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-secondary">
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-neutral-900">{formatPrice(minPrice)}</span>
        <span className="text-sm text-neutral-400">-</span>
        <span className="text-2xl font-bold text-neutral-900">{formatPrice(maxPrice)}</span>
      </div>
      
      <p className="mt-2 text-xs text-neutral-500">
        Average: <span className="font-semibold text-neutral-700">{formatPrice(averagePrice)}</span>
      </p>

      <div className="mt-5 rounded-xl bg-neutral-50 p-4">
        <div className="flex h-20 items-end gap-1.5">
          {bars.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-full bg-gradient-to-t from-primary-300 via-primary-400 to-primary-600 transition-all duration-500 hover:from-secondary/30 hover:via-secondary/50 hover:to-secondary/70"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoryRail({
  categories,
  selectedCategory,
  categoryCounts,
  onSelect,
}: {
  categories: string[]
  selectedCategory: string
  categoryCounts: Record<string, number>
  onSelect: (category: string) => void
}) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-secondary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-primary-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Categories</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {categories.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[13px] font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-800 to-plum-700 text-white shadow-lg shadow-primary-800/25'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-800'
              }`}
            >
              <span className="flex items-center gap-2">
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
                {category}
              </span>
              <span className={`text-xs ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                {categoryCounts[category] || 0}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CatalogPulseCard({
  totalProducts,
  visibleProducts,
  activeCategory,
  searchLabel,
}: {
  totalProducts: number
  visibleProducts: number
  activeCategory: string
  searchLabel: string
}) {
  const progress = totalProducts > 0 ? (visibleProducts / totalProducts) * 100 : 0

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-secondary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-plum-100 to-plum-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-plum-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Browse Status</p>
        </div>
      </div>
      <p className="text-sm text-neutral-600">{searchLabel}</p>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500">Showing</span>
          <span className="text-sm font-bold text-neutral-900">{visibleProducts} of {totalProducts}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary-800 to-plum-600 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function TrendingTagsCard({ tags }: { tags: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-secondary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
          </svg>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Trending</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] font-medium text-neutral-600 transition-all hover:border-secondary/40 hover:bg-secondary/5 hover:text-secondary"
            >
              #{tag}
            </span>
          ))
        ) : (
          <p className="text-xs text-neutral-400">No tags available</p>
        )}
      </div>
    </div>
  )
}

function MarketplaceProductCard({
  product,
  onWishlistToggle,
  isInWishlist,
  priority,
  variant,
}: {
  product: Product
  onWishlistToggle: (product: Product) => void
  isInWishlist: boolean
  priority?: boolean
  variant: ShopCardVariant
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const wishlistButton = (
    <button
      onClick={(event) => {
        event.preventDefault()
        onWishlistToggle(product)
      }}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
        isInWishlist
          ? 'border-secondary bg-secondary text-primary-900 shadow-lg shadow-secondary/30 scale-110'
          : 'border-white/60 bg-white/90 text-neutral-400 backdrop-blur-sm hover:border-secondary hover:text-secondary hover:scale-110'
      }`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>
  )

  if (variant === 'feature') {
    return (
      <div
        className="group relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/products/${product.id}`} className="block h-full">
          <article className="relative h-full min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-primary-900 p-5 shadow-xl transition-all duration-500 sm:p-6">
            <div className="absolute inset-0 opacity-50">
              {!imageError && product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
                  priority={priority}
                  quality={priority ? 85 : 75}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_50%)]" />
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/50 to-transparent" />
            
            <div className="absolute top-5 right-5 z-10 flex gap-2">
              {discount > 0 && (
                <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary-900 shadow-lg">
                  -{discount}% OFF
                </span>
              )}
              {wishlistButton}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-full bg-white/15 backdrop-blur-md px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white border border-white/10">
                  Featured
                </span>
                <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 border border-white/10">
                  {product.category}
                </span>
              </div>

              <h3 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {product.name}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">
                {product.description || 'Premium quality piece with exceptional craftsmanship and timeless elegance.'}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="rounded-2xl bg-white px-5 py-3 text-lg font-bold text-primary-900 shadow-xl">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base font-medium text-white/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </article>
        </Link>
      </div>
    )
  }

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <article className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/20 sm:p-5">
          <div className="relative overflow-hidden rounded-xl bg-neutral-50">
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
              {wishlistButton}
            </div>
            <div className="aspect-[1/1]">
              {!imageError && product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={priority}
                  quality={priority ? 80 : 70}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-16 w-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}
            </div>
            
            {discount > 0 && (
              <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary-800 to-plum-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col pt-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{product.category}</span>
              {!product.inStock && <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-red-500">Sold Out</span>}
            </div>

            <h3 className="mt-2.5 line-clamp-2 font-display text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary-800">
              {product.name}
            </h3>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-800 to-plum-700 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <span className="rounded-full bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-amber-300 group-hover:text-primary-900">
                View
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}

function ShopLoading() {
  return (
    <div className="min-h-screen pb-16">
      <div className="px-4 pb-12 pt-14 sm:px-6 lg:px-8 xl:px-10 md:pb-20 md:pt-20">
        <div className="container mx-auto">
          <div className="rounded-[2.5rem] bg-primary-900 p-7 sm:p-8 lg:p-10">
            <div className="h-4 w-28 rounded-full bg-white/10" />
            <div className="mt-7 h-20 max-w-2xl rounded-2xl bg-white/10" />
            <div className="mt-5 h-10 max-w-xl rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="rounded-2xl border border-neutral-200/60 bg-white/95 px-6 py-5 shadow-lg backdrop-blur-xl">
          <div className="h-12 rounded-xl bg-neutral-200/80" />
          <div className="mt-5 flex gap-3 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-11 w-28 shrink-0 rounded-full bg-neutral-200/80" />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[20rem,minmax(0,1fr)] xl:gap-8">
          <div className="hidden space-y-5 lg:block">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-neutral-100 bg-white p-5">
                <div className="h-4 w-24 rounded-full bg-neutral-200" />
                <div className="mt-5 h-10 w-2/3 rounded-full bg-neutral-200" />
                <div className="mt-6 h-32 rounded-xl bg-neutral-200" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={index === 0 ? 'md:col-span-2 xl:col-span-8' : 'xl:col-span-4'}>
                <div className="animate-pulse rounded-2xl border border-neutral-100 bg-white p-4 sm:p-5">
                  <div className={`rounded-xl bg-neutral-200 ${index === 0 ? 'aspect-[16/10]' : 'aspect-square'}`} />
                  <div className="mt-5 h-4 w-20 rounded-full bg-neutral-200" />
                  <div className="mt-4 h-7 w-3/4 rounded-full bg-neutral-200" />
                  <div className="mt-4 h-6 w-1/3 rounded-full bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
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
