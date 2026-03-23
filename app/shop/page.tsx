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

type ShopCardVariant = 'standard' | 'feature'

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
    <div className="min-h-screen pb-16">
      <section className="relative overflow-hidden px-4 pb-8 pt-10 sm:px-6 lg:px-8 xl:px-10 md:pb-10 md:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,193,72,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(87,46,168,0.22),transparent_28%),linear-gradient(135deg,#0f1123,#18152f_55%,#25163d)]" />
        <div className="absolute inset-0 rich-grid opacity-30" />
        <div className="container relative mx-auto">
          <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr] xl:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
                Marketplace Edit
              </span>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] font-bold leading-[0.95] text-white">
                Shop the catalog through a
                <span className="block text-gradient">sharper studio lens</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
                A cleaner browse experience inspired by modern marketplaces, rebuilt in Ladi Studio&apos;s richer jewel palette.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:justify-self-end xl:min-w-[32rem]">
              <HeroMetric label="Products Live" value={String(products.length).padStart(2, '0')} />
              <HeroMetric label="Collections" value={String(collectionInsights.categoryCount).padStart(2, '0')} />
              <HeroMetric label="Average Ticket" value={formatPrice(collectionInsights.averagePrice)} />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <section className="sticky top-24 z-30 -mt-2 rounded-[2rem] border border-white/45 bg-white/72 px-4 py-4 shadow-elevated backdrop-blur-2xl sm:px-5 sm:py-5 lg:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products, categories, or design notes"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/88 py-3.5 pl-12 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-soft outline-none transition-all focus:border-secondary/60"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white/88 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-soft md:hidden"
                >
                  <FilterIcon />
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-full border border-neutral-200 bg-white/88 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-soft outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'border-transparent bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white shadow-card'
                        : 'border-white/70 bg-white/78 text-neutral-600 shadow-soft hover:border-secondary/40 hover:text-primary-800'
                    }`}
                  >
                    {category}
                    <span className={`ml-2 text-xs ${isActive ? 'text-white/72' : 'text-neutral-400'}`}>
                      {categoryCounts[category] || 0}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[18.5rem,minmax(0,1fr)] xl:gap-7">
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
            <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/55 bg-white/78 px-5 py-5 shadow-soft backdrop-blur-xl sm:px-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Browse Status</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                    {searchLabel}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-neutral-500">
                    Showing <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> products in{' '}
                    <span className="font-semibold text-plum-700">{activeCategoryLabel}</span>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatPill label="Visible" value={String(filteredProducts.length)} />
                  <StatPill label="Range" value={`${formatPrice(collectionInsights.minPrice)} - ${formatPrice(collectionInsights.maxPrice)}`} />
                  <StatPill label="Sort" value={sortOptions.find((option) => option.value === sortBy)?.label || 'Featured'} />
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
              <div className="jewel-card rounded-[2.2rem] px-5 py-14 text-center shadow-soft sm:px-6 sm:py-16">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">No products found</h3>
                <p className="mt-3 text-neutral-500">Try a different search phrase or reset the browse controls.</p>
                <Button variant="outline" className="mt-6" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-primary-950/55 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
          <div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] bg-[linear-gradient(180deg,#fff7ec,#ffffff)] p-5 shadow-elevated sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Filters</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-neutral-900">Browse controls</h3>
              </div>
              <button onClick={() => setShowFilters(false)} className="rounded-full bg-neutral-100 p-3 text-neutral-600 shadow-soft">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5 pb-4">
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

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 shadow-soft backdrop-blur-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">{label}</p>
      <p className="mt-2 text-lg font-bold text-white sm:text-xl">{value}</p>
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/55 bg-white/88 px-4 py-2 shadow-soft">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{label}</span>
      <span className="ml-2 text-sm font-semibold text-neutral-900">{value}</span>
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
    <div className="jewel-card rounded-[2rem] p-5 shadow-soft sm:p-6 lg:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Price Lens</p>
          <h3 className="mt-2 text-2xl font-bold text-neutral-900">Collection range</h3>
        </div>
        <span className="rounded-full bg-primary-900/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-800">
          Live
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-neutral-500">
        Average ticket currently sits at <span className="font-semibold text-neutral-900">{formatPrice(averagePrice)}</span>.
      </p>

      <div className="mt-6 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,238,255,0.9))] p-4 shadow-inner">
        <div className="flex h-24 items-end gap-2">
          {bars.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-full bg-[linear-gradient(180deg,rgba(138,104,255,0.25),rgba(138,104,255,0.78))]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-neutral-500">
          <span className="rounded-full bg-neutral-950 px-3 py-1.5 text-white">{formatPrice(minPrice)}</span>
          <span className="rounded-full bg-primary-800 px-3 py-1.5 text-white">{formatPrice(maxPrice)}</span>
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
    <div className="jewel-card rounded-[2rem] p-5 shadow-soft sm:p-6 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Collections</p>
          <h3 className="mt-2 text-2xl font-bold text-neutral-900">Browse by category</h3>
        </div>
        <FilterIcon />
      </div>

      <div className="mt-5 space-y-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`flex w-full items-center justify-between rounded-[1.25rem] px-4 py-3 text-left text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white shadow-card'
                  : 'bg-white/60 text-neutral-600 hover:bg-white hover:text-primary-800'
              }`}
            >
              <span>{category}</span>
              <span className={`text-xs ${isActive ? 'text-white/72' : 'text-neutral-400'}`}>
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
  return (
    <div className="jewel-dark rounded-[2rem] p-5 shadow-elevated sm:p-6 lg:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Catalog Pulse</p>
      <h3 className="mt-2 font-display text-3xl font-bold text-white">Focused discovery</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">
        {searchLabel} across <span className="font-semibold text-white">{activeCategory}</span>.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">Visible</p>
          <p className="mt-2 text-2xl font-bold text-white">{visibleProducts}</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">Catalog</p>
          <p className="mt-2 text-2xl font-bold text-white">{totalProducts}</p>
        </div>
      </div>
    </div>
  )
}

function TrendingTagsCard({ tags }: { tags: string[] }) {
  return (
    <div className="jewel-card rounded-[2rem] p-5 shadow-soft sm:p-6 lg:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Studio Notes</p>
      <h3 className="mt-2 text-2xl font-bold text-neutral-900">Trending descriptors</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-800"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-sm text-neutral-500">Tags will surface here as your catalog metadata grows.</p>
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
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
        isInWishlist
          ? 'border-secondary/35 bg-secondary text-primary-900 shadow-glow'
          : 'border-white/70 bg-white/82 text-primary-800 backdrop-blur-xl hover:border-secondary/40 hover:text-primary-900'
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
          <article className="relative h-full min-h-[28rem] overflow-hidden rounded-[2.15rem] border border-white/55 bg-[linear-gradient(135deg,#1c1534,#271646_55%,#3f1d6e)] p-5 shadow-elevated sm:p-6">
            <div className="absolute inset-0 opacity-70">
              {!imageError && product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover object-center transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
                  priority={priority}
                  quality={priority ? 85 : 75}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_48%)]" />
              )}
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,18,0.06),rgba(12,12,22,0.5)_55%,rgba(10,10,20,0.92))]" />
            <div className="absolute right-5 top-5 z-10">{wishlistButton}</div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" size="md">Featured Pick</Badge>
                <Badge variant="default" size="md" className="bg-white/12 text-white border-white/10">
                  {product.category}
                </Badge>
              </div>

              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-white/50">Curated spotlight</p>
                <h3 className="mt-3 max-w-lg font-display text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-lg line-clamp-3 text-sm leading-7 text-white/72 sm:text-base">
                  {product.description || 'A studio-picked piece highlighted for its standout shape, tone, and premium finish.'}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-900 shadow-soft">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-semibold text-white/52 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && <Badge variant="secondary">Save {discount}%</Badge>}
                </div>
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
        <article className="flex h-full flex-col rounded-[2rem] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(252,249,255,0.98))] p-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover sm:p-5">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(241,236,250,0.92))]">
            <div className="absolute right-4 top-4 z-10">{wishlistButton}</div>
            <div className="aspect-[1/1]">
              {!imageError && product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={priority}
                  quality={priority ? 80 : 70}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="h-16 w-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-900/10 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col pt-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="bg-neutral-900/4 text-neutral-700 border-neutral-200/90">
                  {product.category}
                </Badge>
                {discount > 0 && <Badge variant="secondary">-{discount}%</Badge>}
              </div>
              {!product.inStock && <Badge variant="error">Sold Out</Badge>}
            </div>

            <h3 className="mt-4 line-clamp-2 font-display text-[1.55rem] font-bold leading-tight text-neutral-900 transition-colors group-hover:text-plum-700">
              {product.name}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-neutral-500">
              {product.description || 'A refined studio piece with premium detailing and a more elevated presence.'}
            </p>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Price</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-primary-800">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>

              <div className="rounded-full border border-primary-800/15 bg-primary-800/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-800">
                View Piece
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}

function FilterIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/5 text-primary-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75m-9.75 12h9.75m-16.5-6h16.5m-16.5 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm0-6a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm0 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
      </svg>
    </span>
  )
}

function ShopLoading() {
  return (
    <div className="min-h-screen pb-16">
      <div className="px-4 pb-8 pt-10 sm:px-6 lg:px-8 xl:px-10 md:pb-10 md:pt-12">
        <div className="container mx-auto">
          <div className="rounded-[2.3rem] jewel-dark p-6 sm:p-7 lg:p-8">
            <div className="h-5 w-32 rounded-full bg-white/10" />
            <div className="mt-6 h-16 max-w-2xl rounded-[1.5rem] bg-white/10" />
            <div className="mt-4 h-7 max-w-xl rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="rounded-[2rem] border border-white/45 bg-white/72 px-5 py-5 shadow-elevated backdrop-blur-2xl">
          <div className="h-12 rounded-full bg-neutral-200/80" />
          <div className="mt-4 flex gap-3 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-10 w-28 shrink-0 rounded-full bg-neutral-200/80" />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[18.5rem,minmax(0,1fr)] xl:gap-7">
          <div className="hidden space-y-5 lg:block">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="jewel-card animate-pulse rounded-[2rem] p-6">
                <div className="h-4 w-24 rounded-full bg-neutral-200" />
                <div className="mt-4 h-8 w-2/3 rounded-full bg-neutral-200" />
                <div className="mt-6 h-28 rounded-[1.5rem] bg-neutral-200" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={index === 0 ? 'md:col-span-2 xl:col-span-8' : 'xl:col-span-4'}>
                <div className="jewel-card animate-pulse rounded-[2rem] p-4">
                  <div className={`rounded-[1.6rem] bg-neutral-200 ${index === 0 ? 'aspect-[16/10]' : 'aspect-square'}`} />
                  <div className="mt-5 h-4 w-24 rounded-full bg-neutral-200" />
                  <div className="mt-4 h-8 w-3/4 rounded-full bg-neutral-200" />
                  <div className="mt-3 h-6 w-2/3 rounded-full bg-neutral-200" />
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
