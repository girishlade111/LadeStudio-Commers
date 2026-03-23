'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isCheckout = pathname.startsWith('/checkout')

  if (isCheckout) return null

  const currentYear = new Date().getFullYear()

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
    <footer className="relative overflow-hidden jewel-dark mt-24">
      <div className="absolute inset-0 opacity-90 rich-grid" />
      <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr,0.8fr,0.8fr,1fr]">
          <div className="max-w-sm">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary via-secondary-300 to-accent text-primary-900 shadow-glow">
                <span className="font-display text-2xl font-bold">L</span>
              </span>
              <div>
                <p className="font-display text-3xl font-bold tracking-[0.08em] text-white">Lade</p>
                <p className="-mt-1 text-[10px] uppercase tracking-[0.38em] text-white/45">Jewel Luxe Store</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/68">
              Premium daily objects, elevated with richer materials, timeless silhouettes, and a little bit of theatre.
            </p>
            <div className="mt-8 flex gap-3">
              {['Instagram', 'Pinterest', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/68 transition-all hover:border-secondary/30 hover:bg-white/10 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/68 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/68 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Insider List</h4>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 sm:p-6 backdrop-blur-sm">
              <p className="mb-4 text-sm leading-relaxed text-white/65">
                Early access drops, limited edits, and studio notes delivered first.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-secondary/40"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-secondary to-accent px-5 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-primary-900 transition-transform hover:-translate-y-0.5"
                >
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 section-divider" />

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-white/42">
            &copy; {currentYear} Lade Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.14em] text-white/48 transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
