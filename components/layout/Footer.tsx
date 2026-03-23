'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isCheckout = pathname === '/checkout'

  if (isCheckout) return null

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { href: '/products', label: 'All Products' },
      { href: '/products?category=new', label: 'New Arrivals' },
      { href: '/products?category=bestsellers', label: 'Best Sellers' },
      { href: '/products?sale=true', label: 'Sale' },
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

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-primary-800">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Join Our Community
            </h3>
            <p className="text-neutral-400 mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-primary-800 border border-primary-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-secondary transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-secondary text-primary font-semibold rounded-xl hover:bg-secondary-hover transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-2xl font-display font-bold mb-4">
              Lade Studio
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              Curated premium products for the modern lifestyle. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-secondary transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
            <p>&copy; {currentYear} Lade Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/200px-Apple_Pay_logo.svg.png"
                alt="Apple Pay"
                className="h-6 opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}