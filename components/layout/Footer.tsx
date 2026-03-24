'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Footer() {
  const pathname = usePathname()
  const isCheckout = pathname.startsWith('/checkout')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  if (isCheckout) return null

  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    shop: [
      { href: '/shop', label: 'All Products' },
      { href: '/shop?category=new', label: 'New Arrivals' },
      { href: '/shop?category=bestsellers', label: 'Best Sellers' },
      { href: '/shop?sale=true', label: 'Sale' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping Info' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/refunds', label: 'Returns & Refunds' },
    ],
  }

  return (
    <footer className="relative overflow-hidden bg-primary-900 mt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,170,103,0.12),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(95,52,84,0.18),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(32,116,104,0.1),transparent_40%)]" />
        <div className="absolute inset-0 rich-grid opacity-15" />
      </div>
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-plum-500/10 blur-[80px]" />

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr,0.9fr,0.9fr,1.1fr]">
          <div className="max-w-sm">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary via-secondary-300 to-amber-200 text-primary-900 shadow-lg shadow-secondary/25">
                <span className="font-display text-2xl font-bold">L</span>
              </span>
              <div>
                <p className="font-display text-2xl font-bold tracking-[0.06em] text-white">Lade Studio</p>
                <p className="-mt-0.5 text-[9px] uppercase tracking-[0.45em] text-white/45">Premium Essentials</p>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-white/60">
              Curating premium daily objects with timeless elegance. Each piece thoughtfully designed to elevate your everyday rituals.
            </p>
            
            <div className="mt-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/40">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-secondary/30 hover:bg-white/15 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-secondary/30 hover:bg-white/15 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-secondary/30 hover:bg-white/15 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-secondary/30 hover:bg-white/15 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">Shop</h4>
            <ul className="space-y-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-[14px] text-white/55 transition-all duration-300 hover:text-white">
                    <span className="h-0.5 w-0 bg-secondary rounded-full transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-[14px] text-white/55 transition-all duration-300 hover:text-white">
                    <span className="h-0.5 w-0 bg-secondary rounded-full transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">Stay Updated</h4>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <p className="mb-4 text-[14px] leading-relaxed text-white/55">
                Subscribe for early access to new arrivals, exclusive offers, and studio updates.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-secondary/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full rounded-xl bg-gradient-to-r from-secondary via-amber-300 to-secondary bg-size-200 bg-pos-0 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-900 shadow-lg shadow-secondary/20 transition-all duration-300 hover:bg-pos-100 hover:shadow-xl"
                >
                  {isSubscribed ? 'Thank You!' : 'Subscribe'}
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-3 text-center text-xs text-secondary">Thanks for subscribing!</p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure Payments
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10" />

        <div className="flex flex-col gap-5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
            &copy; {currentYear} Lade Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map((link, index) => (
              <div key={link.href} className="flex items-center gap-6">
                <Link
                  href={link.href}
                  className="text-[12px] uppercase tracking-[0.14em] text-white/40 transition-colors duration-300 hover:text-white/70"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
