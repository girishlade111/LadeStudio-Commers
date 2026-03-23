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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        {/* Background layer */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]'
              : 'bg-transparent'
          }`}
        />

        <nav className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative group"
            >
              <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-primary-800 transition-colors duration-300">
                Lade
              </span>
              <span className="text-xl md:text-2xl font-display font-light tracking-tight text-secondary transition-colors duration-300">
                Studio
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-secondary transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation - Pill style */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
                isScrolled ? 'bg-neutral-100/80' : 'bg-white/10 backdrop-blur-sm'
              }`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-primary-800 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-primary-800 hover:bg-white/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                className="p-2.5 rounded-full text-neutral-500 hover:text-primary-800 hover:bg-neutral-100 transition-all duration-200"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-neutral-500 hover:text-primary-800 hover:bg-neutral-100 transition-all duration-200"
                aria-label="Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full text-neutral-500 hover:text-primary-800 hover:bg-neutral-100 transition-all duration-200"
                aria-label="Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2.5 rounded-full text-neutral-500 hover:text-primary-800 hover:bg-neutral-100 transition-all duration-200 ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-elevated transition-transform duration-500 ease-out-expo ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-4 text-lg font-medium border-b border-neutral-100 transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-secondary'
                      : 'text-neutral-800 hover:text-secondary hover:pl-2'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <div className="section-divider" />
              <p className="text-xs text-neutral-400 uppercase tracking-widest">Follow us</p>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
                  <span key={social} className="text-sm text-neutral-500 hover:text-secondary transition-colors cursor-pointer">
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
