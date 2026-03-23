'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  cartCount?: number
  wishlistCount?: number
}

export function Navbar({ cartCount = 0, wishlistCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold font-display text-primary tracking-tight hover:text-secondary transition-colors duration-300"
          >
            Lade Studio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-secondary'
                    : 'text-neutral-600 hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button
              className="p-2 text-neutral-600 hover:text-primary transition-colors duration-200"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-neutral-600 hover:text-primary transition-colors duration-200"
              aria-label="Wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-neutral-600 hover:text-primary transition-colors duration-200"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-neutral-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-secondary'
                    : 'text-neutral-600 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}