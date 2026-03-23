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

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1)
  }

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(q => q + 1)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb area */}
      <div className="page-header-bg pt-6 pb-8">
        <div className="container mx-auto px-5 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-secondary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-neutral-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-up">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream">
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
                <div className="flex items-center justify-center h-full text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-neutral-900 text-sm px-6 py-3 rounded-full font-medium">Sold Out</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsImageLoaded(false)
                      setSelectedImage(index)
                    }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-secondary' : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      src={images[index]}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col animate-fade-up" style={{ animationDelay: '100ms' }}>
            {/* Category & Stock */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary">{product.category}</span>
              <span className="text-neutral-300">|</span>
              {product.inStock ? (
                <span className="text-[11px] font-medium tracking-wider uppercase text-green-600">In Stock</span>
              ) : (
                <span className="text-[11px] font-medium tracking-wider uppercase text-red-500">Out of Stock</span>
              )}
            </div>

            <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="primary">-{discount}%</Badge>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="section-divider mb-6" />

            <p className="text-body-md text-neutral-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-4">Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-cream flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-secondary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mb-6">
                <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-neutral-50 rounded-xl">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="px-4 py-3 text-neutral-500 hover:text-primary-800 transition-colors disabled:opacity-30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <span className="px-4 py-3 font-semibold text-base min-w-[48px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= 10}
                      className="px-4 py-3 text-neutral-500 hover:text-primary-800 transition-colors disabled:opacity-30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-xs text-neutral-400">Max 10 per order</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                variant="primary"
                size="xl"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                isLoading={isAddingToCart}
                fullWidth
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                }
              >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </Button>

              <Button
                variant={inWishlist ? 'secondary' : 'outline'}
                size="xl"
                onClick={handleWishlistToggle}
                className="sm:w-auto"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={inWishlist ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                }
              >
                {inWishlist ? 'Saved' : 'Save'}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="border-t border-neutral-100 pt-6 space-y-3">
              {[
                { icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12', text: 'Free shipping on orders over $100' },
                { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99', text: '30-day hassle-free returns' },
                { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', text: 'Secure checkout with SSL encryption' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-neutral-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-secondary flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3">
                  You may also like
                </p>
                <h2 className="text-display-sm font-display font-bold text-neutral-900">
                  Related Products
                </h2>
              </div>
              <Link href="/products" className="text-sm text-secondary hover:text-secondary-700 font-medium transition-colors link-underline hidden md:block">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-primary-800 text-white px-6 py-4 rounded-2xl shadow-elevated flex items-center gap-3 animate-slide-up z-50">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-medium">Added to cart!</span>
        </div>
      )}
    </div>
  )
}
