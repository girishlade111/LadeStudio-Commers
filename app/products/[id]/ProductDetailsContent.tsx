'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/products/ProductCard'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

interface ProductDetailsContentProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailsContent({ product, relatedProducts }: ProductDetailsContentProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const images = [product.image]
  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addToCart(product, quantity)

    setTimeout(() => {
      setIsAddingToCart(false)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }, 500)
  }

  const handleWishlistToggle = () => {
    toggleWishlist(product)
  }

  return (
    <div className="min-h-screen">
      <div className="page-header-bg pt-8 pb-10">
        <div className="container mx-auto px-5 md:px-8">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
            <Link href="/" className="hover:text-plum-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-plum-700 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-neutral-700">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-5 pb-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr,0.95fr] lg:gap-16">
          <div className="space-y-5 animate-fade-up">
            <div className="jewel-card overflow-hidden rounded-[2.4rem] p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream to-neutral-100">
                <div className={`absolute inset-0 bg-neutral-200 transition-opacity duration-500 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                {images[selectedImage] ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-500 ${isImageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-24 w-24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/45 via-transparent to-transparent" />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900">Sold Out</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="jewel-card rounded-[2.4rem] p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-secondary/14 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-800">
                  {product.category}
                </span>
                <Badge variant={product.inStock ? 'success' : 'error'} size="md">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>

              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.94] text-neutral-900 md:text-6xl">
                {product.name}
              </h1>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-3xl font-extrabold text-primary-800">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <Badge variant="secondary">-{discount}%</Badge>
                  </>
                )}
              </div>

              <div className="my-7 section-divider" />

              <p className="text-body-md leading-8 text-neutral-600">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Features</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="rounded-[1.1rem] border border-neutral-200/80 bg-white/70 px-4 py-3 text-sm text-neutral-600 shadow-soft">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.inStock && (
                <div className="mt-8">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Quantity</label>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/75 px-2 py-2 shadow-soft">
                      <button
                        onClick={() => quantity > 1 && setQuantity((value) => value - 1)}
                        disabled={quantity <= 1}
                        className="rounded-full p-3 text-neutral-500 transition-colors hover:text-primary-800 disabled:opacity-30"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <span className="min-w-[48px] px-3 text-center text-base font-semibold text-neutral-900">{quantity}</span>
                      <button
                        onClick={() => quantity < 10 && setQuantity((value) => value + 1)}
                        disabled={quantity >= 10}
                        className="rounded-full p-3 text-neutral-500 transition-colors hover:text-primary-800 disabled:opacity-30"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-neutral-400">Max 10 per order</span>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="xl"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  isLoading={isAddingToCart}
                  fullWidth
                >
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </Button>

                <Button
                  variant={inWishlist ? 'secondary' : 'outline'}
                  size="xl"
                  onClick={handleWishlistToggle}
                  className="sm:w-auto"
                >
                  {inWishlist ? 'Saved' : 'Save'}
                </Button>
              </div>

              <div className="mt-8 space-y-3 border-t border-neutral-100 pt-6">
                {[
                  'Free shipping on orders above Rs. 999',
                  'Payment proof upload after UPI payment',
                  'Protected checkout with account access',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">You may also like</p>
                <h2 className="mt-3 font-display text-display-sm font-bold text-neutral-900">Related Products</h2>
              </div>
              <Link href="/shop" className="link-underline hidden text-sm font-semibold uppercase tracking-[0.14em] text-plum-700 md:block">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={relatedProduct.id} className="animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
                  <ProductCard
                    product={relatedProduct}
                    isInWishlist={isInWishlist(relatedProduct.id)}
                    onWishlistToggle={toggleWishlist}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[1.4rem] bg-primary-800 px-6 py-4 text-white shadow-elevated animate-slide-up">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-semibold">Added to cart!</span>
        </div>
      )}
    </div>
  )
}
