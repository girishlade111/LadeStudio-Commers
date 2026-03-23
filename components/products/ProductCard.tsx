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
}

export function ProductCard({ product, onWishlistToggle, isInWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
          {!imageError && product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!product.inStock && (
              <Badge variant="error">Out of Stock</Badge>
            )}
            {product.category && (
              <Badge variant="secondary">{product.category}</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {onWishlistToggle && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onWishlistToggle(product)
              }}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                isInWishlist
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-white/90 text-neutral-400 hover:text-secondary hover:bg-white'
              } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isInWishlist ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          )}

          {/* Quick Add Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button className="w-full py-3 px-4 bg-white text-primary font-semibold rounded-xl hover:bg-secondary hover:text-white transition-colors duration-300">
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-secondary transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-neutral-900">
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
  )
}