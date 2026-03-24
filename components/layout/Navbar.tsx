'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useAuth } from '@clerk/nextjs'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { CategoryDropdown } from './CategoryDropdown'

const defaultCategories = [
  { name: 'Clothing', slug: 'clothing', productCount: 12 },
  { name: 'Accessories', slug: 'accessories', productCount: 8 },
  { name: 'Home', slug: 'home', productCount: 15 },
  { name: 'Electronics', slug: 'electronics', productCount: 6 },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { isLoaded: isAuthLoaded, userId } = useAuth()
  const { getItemCount: getCartItemCount, isLoaded: isCartLoaded } = useCart()
  const { getItemCount: wishlistCount, isLoaded: isWishlistLoaded } = useWishlist()
  const cartCount = isCartLoaded ? getCartItemCount() : 0
  const savedCount = isWishlistLoaded ? wishlistCount : 0
  const isSignedIn = isAuthLoaded && Boolean(userId)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-1' : 'pt-2'}`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'border-neutral-200/60 bg-white/98 shadow-lg backdrop-blur-xl'
              : 'border-white/20 bg-primary-900/80 backdrop-blur-2xl shadow-xl'
          }`}>
            {!isScrolled && (
              <div className="absolute inset-0">
                <div className="absolute -left-20 top-0 h-40 w-40 rounded-full bg-secondary/10 blur-[80px]" />
                <div className="absolute right-0 top-0 h-32 w-36 rounded-full bg-plum-500/10 blur-[60px]" />
              </div>
            )}

            <nav className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-6">
              <Link href="/" className="group flex items-center gap-2.5">
                <span className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-secondary via-secondary-300 to-amber-200 shadow-lg shadow-secondary/20' 
                    : 'bg-gradient-to-br from-secondary via-secondary-300 to-amber-200 shadow-lg shadow-secondary/25'
                }`}>
                  <span className="font-display text-base sm:text-lg font-bold text-primary-900">L</span>
                </span>
                <span className="flex flex-col">
                  <span className={`font-display text-lg sm:text-xl font-bold tracking-[0.04em] transition-colors ${isScrolled ? 'text-neutral-900' : 'text-white'}`}>
                    Lade
                  </span>
                  <span className={`-mt-0.5 text-[8px] uppercase tracking-[0.5em] ${isScrolled ? 'text-neutral-400' : 'text-white/45'}`}>
                    Studio
                  </span>
                </span>
              </Link>

              <div className={`hidden lg:flex items-center gap-1`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 group ${
                      isActive(link.href)
                        ? 'text-primary-900'
                        : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/65 hover:text-white'}`
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="absolute inset-0 rounded-xl bg-secondary/20 -z-10" />
                    )}
                    <span className="flex items-center gap-1.5">
                      {link.label}
                      {isActive(link.href) && (
                        <span className="h-1 w-1 rounded-full bg-secondary" />
                      )}
                    </span>
                    {!isActive(link.href) && (
                      <span className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-secondary transition-all duration-300 ${isScrolled ? 'w-0 group-hover:w-3' : 'w-0 group-hover:w-3'} opacity-0 group-hover:opacity-100`} />
                    )}
                  </Link>
                ))}
                
                <CategoryDropdown 
                  categories={defaultCategories}
                  label="Categories"
                  href="/shop"
                  isActive={isActive('/shop')}
                  isScrolled={isScrolled}
                />

                <Link
                  href="/about"
                  className={`relative rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 group ${
                    isActive('/about')
                      ? 'text-primary-900'
                      : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/65 hover:text-white'}`
                  }`}
                >
                  {isActive('/about') && (
                    <span className="absolute inset-0 rounded-xl bg-secondary/20 -z-10" />
                  )}
                  About
                </Link>

                <Link
                  href="/contact"
                  className={`relative rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 group ${
                    isActive('/contact')
                      ? 'text-primary-900'
                      : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/65 hover:text-white'}`
                  }`}
                >
                  {isActive('/contact') && (
                    <span className="absolute inset-0 rounded-xl bg-secondary/20 -z-10" />
                  )}
                  Contact
                </Link>

                {isSignedIn && (
                  <Link
                    href="/orders"
                    className={`relative rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 group ${
                      isActive('/orders')
                        ? 'text-primary-900'
                        : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/65 hover:text-white'}`
                    }`}
                  >
                    {isActive('/orders') && (
                      <span className="absolute inset-0 rounded-xl bg-secondary/20 -z-10" />
                    )}
                    Orders
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`hidden sm:flex h-10 w-10 lg:h-9 lg:w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-neutral-500 hover:text-secondary hover:bg-secondary/5' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 lg:h-4 lg:w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                <Link
                  href="/wishlist"
                  className={`relative flex h-10 w-10 lg:h-9 lg:w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-neutral-500 hover:text-secondary hover:bg-secondary/5' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 lg:h-4 lg:w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {savedCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-amber-300 text-[9px] font-bold text-primary-900 shadow-sm">
                      {savedCount > 9 ? '9+' : savedCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className={`relative flex h-10 w-10 lg:h-9 lg:w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-neutral-500 hover:text-secondary hover:bg-secondary/5' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 lg:h-4 lg:w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-amber-300 text-[9px] font-bold text-primary-900 shadow-sm">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>

                {!isSignedIn && (
                  <Link
                    href="/sign-in"
                    className={`hidden md:inline-flex rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-secondary to-amber-300 text-primary-900 shadow-lg shadow-secondary/20 hover:shadow-xl hover:-translate-y-0.5'
                        : 'border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    Sign In
                  </Link>
                )}

                {isSignedIn && (
                  <div className={`hidden md:flex items-center rounded-xl border transition-all duration-300 ${
                    isScrolled 
                      ? 'border-neutral-200 bg-white' 
                      : 'border-white/15 bg-white/5'
                  }`}>
                    <UserButton />
                  </div>
                )}

                <button
                  className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-neutral-600 hover:bg-neutral-100' 
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className={`absolute left-0 right-0 top-full pt-2 transition-all duration-300 ${isSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="container mx-auto px-3 sm:px-4">
            <form onSubmit={handleSearch} className="rounded-2xl border border-neutral-200/60 bg-white shadow-xl p-2">
              <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 h-5 w-5 text-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-0 bg-neutral-50 px-12 py-3.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-secondary/20"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </>
  )
}
