'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useAuth } from '@clerk/nextjs'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'pt-2 sm:pt-3' : 'pt-3 sm:pt-5'}`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
            isScrolled
              ? 'border-neutral-200/60 bg-white/95 shadow-xl backdrop-blur-xl'
              : 'border-white/10 bg-primary-900/40 backdrop-blur-2xl shadow-lg'
          }`}>
            <div className="absolute inset-0">
              {!isScrolled && (
                <>
                  <div className="absolute -left-16 top-0 h-32 w-32 rounded-full bg-secondary/15 blur-3xl" />
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-plum-500/15 blur-3xl" />
                  <div className="absolute bottom-0 left-1/3 h-20 w-40 rounded-full bg-accent/10 blur-3xl" />
                </>
              )}
            </div>

            <nav className="relative z-10 flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3 lg:px-6">
              <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary via-secondary-300 to-amber-200 text-primary-900 shadow-lg shadow-secondary/25 transition-transform duration-300 group-hover:scale-105">
                  <span className="font-display text-lg sm:text-xl font-bold">L</span>
                </span>
                <span className="flex flex-col">
                  <span className={`font-display text-xl sm:text-2xl font-bold tracking-[0.03em] transition-colors ${isScrolled ? 'text-neutral-900' : 'text-white'}`}>
                    Lade
                  </span>
                  <span className={`-mt-0.5 text-[9px] uppercase tracking-[0.45em] ${isScrolled ? 'text-neutral-400' : 'text-white/50'}`}>
                    Studio
                  </span>
                </span>
              </Link>

              <div className={`hidden lg:flex items-center gap-1 rounded-2xl px-1.5 py-1.5 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-neutral-100/80 border border-neutral-200/50' 
                  : 'bg-white/5 border border-white/10'
              }`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-xl px-4 py-2.5 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-white'
                        : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50' : 'text-white/70 hover:text-white hover:bg-white/10'}`
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-800 to-plum-700 shadow-lg shadow-primary-800/25" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ))}
                {isSignedIn && (
                  <Link
                    href="/orders"
                    className={`relative rounded-xl px-4 py-2.5 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                      isActive('/orders')
                        ? 'text-white'
                        : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50' : 'text-white/70 hover:text-white hover:bg-white/10'}`
                    }`}
                  >
                    {isActive('/orders') && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-800 to-plum-700 shadow-lg shadow-primary-800/25" />
                    )}
                    <span className="relative z-10">Orders</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isScrolled 
                      ? 'border-neutral-200 bg-white text-neutral-600 hover:border-secondary hover:text-secondary' 
                      : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                <Link
                  href="/wishlist"
                  className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isScrolled 
                      ? 'border-neutral-200 bg-white text-neutral-600 hover:border-secondary hover:text-secondary' 
                      : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                  aria-label="Wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {savedCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-secondary to-amber-300 px-1 text-[9px] font-bold text-primary-900 shadow-sm">
                      {savedCount > 9 ? '9+' : savedCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isScrolled 
                      ? 'border-neutral-200 bg-white text-neutral-600 hover:border-secondary hover:text-secondary' 
                      : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-secondary to-amber-300 px-1 text-[9px] font-bold text-primary-900 shadow-sm">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>

                {!isSignedIn && (
                  <Link
                    href="/sign-in"
                    className={`hidden md:inline-flex rounded-xl px-4 py-2 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-primary-800 to-plum-700 text-white shadow-lg shadow-primary-800/20 hover:shadow-xl'
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
                  className={`lg:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isScrolled 
                      ? 'border-neutral-200 bg-white text-neutral-700' 
                      : 'border-white/15 bg-white/5 text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="relative flex h-4 w-5 flex-col justify-between">
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className={`absolute left-0 right-0 top-full pt-2 transition-all duration-300 lg:hidden ${isSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="container mx-auto px-3 sm:px-4">
            <div className="rounded-xl border border-neutral-200/60 bg-white shadow-xl p-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                autoFocus
              />
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-primary-950/60 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm transform transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full bg-primary-900 overflow-y-auto">
            <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="absolute -left-16 top-0 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary via-secondary-300 to-amber-200 text-primary-900">
                    <span className="font-display text-lg font-bold">L</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-xl font-bold text-white">Lade</span>
                    <span className="-mt-0.5 text-[9px] uppercase tracking-[0.45em] text-white/50">Studio</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-6">
              <nav className="space-y-1.5">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-secondary/20 to-amber-500/10 text-white border border-secondary/30'
                        : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
                {isSignedIn && (
                  <Link
                    href="/orders"
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                      isActive('/orders')
                        ? 'bg-gradient-to-r from-secondary/20 to-amber-500/10 text-white border border-secondary/30'
                        : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    Orders
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                )}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link 
                  href="/wishlist" 
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  Wishlist
                  {savedCount > 0 && (
                    <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-primary-900">
                      {savedCount}
                    </span>
                  )}
                </Link>
                <Link 
                  href="/cart" 
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-primary-900">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="mt-8 space-y-4">
                {!isSignedIn && (
                  <Link 
                    href="/sign-in" 
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-amber-300 px-5 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-900 shadow-lg shadow-secondary/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign In
                  </Link>
                )}
                {isSignedIn && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <UserButton />
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/40">Account</p>
                      <p className="text-sm font-medium text-white/80">Manage profile</p>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
