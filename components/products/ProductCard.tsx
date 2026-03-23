'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Product } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  onWishlistToggle?: (product: Product) => void
  isInWishlist?: boolean
  priority?: boolean
}

export function ProductCard({ product, onWishlistToggle, isInWishlist, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="jewel-card card-shine h-full rounded-[1.75rem] p-3.5 sm:p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-cream to-neutral-100">
            {!imageError && product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 ease-out-expo ${isHovered ? 'scale-105' : 'scale-100'}`}
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={priority}
                quality={priority ? 80 : 75}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-16 w-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/48 via-primary-900/5 to-transparent opacity-85" />

            <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
              <div className="flex flex-col gap-2">
                {!product.inStock && <Badge variant="error">Sold Out</Badge>}
                {discount > 0 && <Badge variant="secondary">-{discount}%</Badge>}
              </div>

              {onWishlistToggle && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    onWishlistToggle(product)
                  }}
                  className={`rounded-full border p-2.5 transition-all duration-300 ${
                    isInWishlist
                      ? 'border-secondary/30 bg-secondary text-primary-900 shadow-glow'
                      : 'border-white/30 bg-white/18 text-white backdrop-blur-md hover:bg-white/30'
                  } ${isHovered || isInWishlist ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isInWishlist ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              )}
            </div>

            <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="rounded-[1.2rem] border border-white/15 bg-white/14 px-4 py-3.5 backdrop-blur-xl">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">Discover Piece</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 px-1.5 pb-2.5 pt-5 sm:px-2 sm:pt-6">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary/14 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-800">
                {product.category}
              </span>
            </div>
            <h3 className="line-clamp-1 text-xl font-display font-bold text-neutral-900 transition-colors duration-300 group-hover:text-plum-700">
              {product.name}
            </h3>
            <div className="flex items-end gap-2.5 pt-1">
              <span className="text-xl font-extrabold text-primary-800">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
