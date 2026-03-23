'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { heroBanner, ctaBanner, featuredProducts, trendingProducts, categories } from '@/data'
import { Product } from '@/types'

export default function HomePage() {
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (product: Product) => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroBanner.image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
              <span className="w-12 h-0.5 bg-secondary" />
              <span className="text-secondary font-medium tracking-wider uppercase text-sm">
                New Collection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              {heroBanner.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {heroBanner.subtitle}
            </p>
            
            <p className="text-lg text-white/70 mb-8 max-w-lg animate-fade-up" style={{ animationDelay: '300ms' }}>
              {heroBanner.description}
            </p>
            
            <Link href={heroBanner.ctaLink} className="animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" variant="secondary" className="shadow-glow">
                {heroBanner.ctaText}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <Section background="default" padding="lg">
        <SectionHeader
          title="Featured Products"
          subtitle="Handpicked selections from our latest collection"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onWishlistToggle={toggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </Section>

      {/* Categories Grid */}
      <Section background="light" padding="lg">
        <SectionHeader
          title="Shop by Category"
          subtitle="Explore our curated collections"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <Badge variant="secondary" className="mb-3">
                  {category.productCount} Products
                </Badge>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80">{category.description}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Trending Products */}
      <Section background="default" padding="lg">
        <SectionHeader
          title="Trending Now"
          subtitle="Most popular items this week"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onWishlistToggle={toggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Banner */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ctaBanner.image}
            alt="CTA background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 animate-fade-up">
              {ctaBanner.title}
            </h2>
            <p className="text-lg text-white/80 mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
              {ctaBanner.description}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-secondary backdrop-blur-sm transition-all"
              />
              <Button variant="secondary" size="lg">
                {ctaBanner.ctaText}
              </Button>
            </form>
            
            <p className="text-sm text-white/60 mt-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>
      </section>

      {/* Features / Trust Badges */}
      <Section background="dark" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              ),
              title: 'Free Shipping',
              description: 'On all orders over $100',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: 'Secure Payment',
              description: '100% secure transactions',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ),
              title: 'Easy Returns',
              description: '30-day return policy',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-neutral-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}