'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { Section, SectionHeader } from '@/components/ui/Section'
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
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0">
          <Image
            src={heroBanner.image}
            alt="Hero background"
            fill
            className="object-cover scale-105"
            priority
          />
          {/* Refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* Decorative grain */}
        <div className="absolute inset-0 opacity-[0.03] bg-noise mix-blend-overlay pointer-events-none" />

        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8 animate-fade-up">
              <span className="w-10 h-[1px] bg-secondary" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-secondary">
                New Collection 2026
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-display font-bold text-white mb-8 animate-fade-up leading-[1.05]"
              style={{ animationDelay: '100ms', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heroBanner.title}
              <span className="text-gradient block mt-2">{heroBanner.subtitle}</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '250ms' }}
            >
              {heroBanner.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link href={heroBanner.ctaLink}>
                <Button size="lg" variant="secondary" className="shadow-glow group">
                  {heroBanner.ctaText}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== MARQUEE BAND ===== */}
      <div className="bg-primary-800 py-4 overflow-hidden marquee-container">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {['Free Shipping Over $100', 'Handcrafted Quality', '30-Day Returns', 'Sustainable Materials', 'Premium Essentials', 'Curated Collections'].map((text) => (
                <span key={text} className="flex items-center gap-3 text-[11px] font-medium tracking-[0.15em] uppercase text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <Section background="default" padding="xl">
        <SectionHeader
          label="Curated for you"
          title="Featured Products"
          subtitle="Handpicked selections from our latest collection, designed for the modern lifestyle"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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

        <div className="text-center mt-14">
          <Link href="/products">
            <Button variant="outline" size="lg" className="group">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===== CATEGORIES - CREATIVE ASYMMETRIC GRID ===== */}
      <Section background="cream" padding="xl">
        <SectionHeader
          label="Explore"
          title="Shop by Category"
          subtitle="Discover our curated collections across every facet of modern living"
        />

        {/* Asymmetric grid - first row: 1 large + 1 small stacked, second row: 3 equal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Large featured card */}
          <Link
            href={`/products?category=${categories[0]?.id}`}
            className="md:col-span-7 group relative aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden rounded-2xl animate-fade-up"
          >
            <Image
              src={categories[0]?.image || ''}
              alt={categories[0]?.name || ''}
              fill
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3 block">
                {categories[0]?.productCount} Products
              </span>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                {categories[0]?.name}
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-sm">{categories[0]?.description}</p>
            </div>
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </Link>

          {/* Two stacked cards on the right */}
          {categories.slice(1, 3).map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="md:col-span-5 group relative aspect-[16/9] overflow-hidden rounded-2xl animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary mb-2 block">
                  {category.productCount} Products
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </Link>
          ))}

          {/* Bottom row: remaining categories */}
          {categories.slice(3).map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="md:col-span-6 group relative aspect-[16/9] overflow-hidden rounded-2xl animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary mb-2 block">
                  {category.productCount} Products
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== TRENDING PRODUCTS ===== */}
      <Section background="default" padding="xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4">
              What&apos;s hot
            </p>
            <h2 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 text-balance">
              Trending Now
            </h2>
            <p className="mt-4 text-body-lg text-neutral-500 max-w-lg">
              The most coveted items this season, chosen by our community
            </p>
          </div>
          <Link href="/products" className="mt-6 md:mt-0">
            <Button variant="outline" size="md" className="group">
              See All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ===== EDITORIAL CTA SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          {/* Left: Image */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <Image
              src={ctaBanner.image}
              alt="CTA background"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Right: Content */}
          <div className="relative bg-primary-800 flex items-center">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 px-8 md:px-14 lg:px-20 py-16 md:py-0 w-full">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-secondary mb-6 block">
                Stay Connected
              </span>
              <h2 className="text-display-sm md:text-display-md font-display font-bold text-white mb-6 text-balance">
                {ctaBanner.title}
              </h2>
              <p className="text-body-lg text-neutral-400 mb-10 max-w-md">
                {ctaBanner.description}
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-secondary/50 transition-all duration-300 text-sm"
                />
                <Button variant="secondary" size="lg" className="whitespace-nowrap">
                  {ctaBanner.ctaText}
                </Button>
              </form>

              <p className="text-[11px] text-neutral-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST / FEATURES SECTION ===== */}
      <Section background="default" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-neutral-200">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              ),
              title: 'Complimentary Shipping',
              description: 'Free delivery on all orders above $100',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: 'Secure Transactions',
              description: 'Every payment is encrypted and protected',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ),
              title: 'Hassle-Free Returns',
              description: '30-day return policy, no questions asked',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="text-center px-8 md:px-12 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cream text-secondary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
