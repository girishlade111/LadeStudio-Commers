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
  const pathname = usePathname()
  const { isLoaded: isAuthLoaded, userId } = useAuth()
  const { getItemCount: getCartItemCount, isLoaded: isCartLoaded } = useCart()
  const { getItemCount: wishlistCount, isLoaded: isWishlistLoaded } = useWishlist()
  const cartCount = isCartLoaded ? getCartItemCount() : 0
  const savedCount = isWishlistLoaded ? wishlistCount : 0
  const isSignedIn = isAuthLoaded && Boolean(userId)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'pt-3' : 'pt-4 sm:pt-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className={`relative overflow-hidden rounded-[1.75rem] border transition-all duration-500 ${
            isScrolled
              ? 'border-white/35 bg-white/68 shadow-elevated backdrop-blur-2xl'
              : 'border-white/15 bg-primary-900/30 backdrop-blur-xl shadow-soft'
          }`}>
            <div className="absolute inset-0 opacity-80">
              <div className="absolute -left-12 top-0 h-28 w-28 rounded-full bg-secondary/20 blur-3xl" />
              <div className="absolute right-0 top-0 h-24 w-28 rounded-full bg-accent/20 blur-3xl" />
            </div>

            <nav className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-7">
              <Link href="/" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary via-secondary-300 to-accent text-primary-900 shadow-glow">
                  <span className="font-display text-xl font-bold">L</span>
                </span>
                <span className="flex flex-col">
                  <span className={`font-display text-2xl font-bold tracking-[0.04em] transition-colors ${isScrolled ? 'text-primary-800' : 'text-white'}`}>
                    Lade
                  </span>
                  <span className={`-mt-1 text-[10px] uppercase tracking-[0.42em] ${isScrolled ? 'text-neutral-500' : 'text-white/60'}`}>
                    Jewel Store
                  </span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-2 backdrop-blur-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-4 py-2.5 lg:px-5 lg:py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white shadow-card'
                        : `${isScrolled ? 'text-neutral-600 hover:bg-neutral-100/90 hover:text-primary-800' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isSignedIn && (
                  <Link
                    href="/orders"
                    className={`rounded-full px-4 py-2.5 lg:px-5 lg:py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                      isActive('/orders')
                        ? 'bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white shadow-card'
                        : `${isScrolled ? 'text-neutral-600 hover:bg-neutral-100/90 hover:text-primary-800' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
                    }`}
                  >
                    Orders
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all lg:h-11 lg:w-11 ${
                    isScrolled ? 'border-neutral-200 bg-white/60 text-neutral-600 hover:text-primary-800' : 'border-white/15 bg-white/10 text-white/75 hover:text-white'
                  }`}
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                <Link
                  href="/wishlist"
                  className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all lg:h-11 lg:w-11 ${
                    isScrolled ? 'border-neutral-200 bg-white/60 text-neutral-600 hover:text-primary-800' : 'border-white/15 bg-white/10 text-white/80 hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {savedCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent px-1 text-[10px] font-bold text-primary-900">
                      {savedCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all lg:h-11 lg:w-11 ${
                    isScrolled ? 'border-neutral-200 bg-white/60 text-neutral-600 hover:text-primary-800' : 'border-white/15 bg-white/10 text-white/80 hover:text-white'
                  }`}
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[18px] w-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent px-1 text-[10px] font-bold text-primary-900">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {!isSignedIn && (
                  <Link
                    href="/sign-in"
                    className={`hidden md:inline-flex rounded-full px-4 py-2.5 lg:px-5 lg:py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-all ${
                      isScrolled
                        ? 'bg-primary-800 text-white shadow-card hover:shadow-medium'
                        : 'border border-white/20 bg-white/10 text-white hover:bg-white/16'
                    }`}
                  >
                    Sign In
                  </Link>
                )}

                {isSignedIn && (
                  <div className="hidden md:flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5">
                    <UserButton />
                  </div>
                )}

                <button
                  className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                    isScrolled ? 'border-neutral-200 bg-white/60 text-neutral-700' : 'border-white/15 bg-white/10 text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="relative flex h-[14px] w-[18px] flex-col justify-between">
                    <span className={`block h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                    <span className={`block h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
                    <span className={`block h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-primary-900/55 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className={`absolute right-0 top-0 h-full w-[88%] max-w-sm transform border-l border-white/10 jewel-dark rich-grid transition-transform duration-500 ease-out-expo ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex h-full flex-col px-6 pb-6 pt-20 sm:px-7 sm:pb-8 sm:pt-24">
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                    isActive(link.href)
                      ? 'border-secondary/30 bg-white/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms' }}
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 opacity-60">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
              {isSignedIn && (
                <Link
                  href="/orders"
                  className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
                    isActive('/orders')
                      ? 'border-secondary/30 bg-white/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Orders
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 opacity-60">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              )}
            </nav>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <Link href="/wishlist" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white/78">
                Wishlist
              </Link>
              <Link href="/cart" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white/78">
                Cart
              </Link>
            </div>

            <div className="mt-auto space-y-4">
              {!isSignedIn && (
                <Link href="/sign-in" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-900 shadow-glow">
                  Sign In
                </Link>
              )}
              {isSignedIn && (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <UserButton />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">Account</p>
                    <p className="text-sm text-white/80">Manage your profile</p>
                  </div>
                </div>
              )}
              <div className="section-divider" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Follow the Studio</p>
              <div className="flex gap-4 text-sm text-white/70">
                {['Instagram', 'Pinterest', 'WhatsApp'].map((social) => (
                  <span key={social} className="cursor-pointer transition-colors hover:text-secondary">
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
