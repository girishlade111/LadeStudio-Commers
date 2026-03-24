'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  name: string
  slug: string
  image?: string
  productCount?: number
}

interface CategoryDropdownProps {
  categories: Category[]
  label: string
  href: string
  isActive: boolean
  isScrolled: boolean
}

export function CategoryDropdown({ categories, label, href, isActive, isScrolled }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 group ${
          isActive
            ? 'text-white'
            : `${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/65 hover:text-white'}`
        }`}
      >
        {label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        {isActive && (
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 shadow-lg shadow-primary-800/20" />
        )}
        {!isActive && (
          <span className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-secondary transition-all duration-300 w-0 group-hover:w-3 opacity-0 group-hover:opacity-100`} />
        )}
      </Link>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px] animate-fade-up">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="grid grid-cols-4 gap-1 p-2">
              {categories.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="group relative flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:bg-neutral-50"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {category.image ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10">
                      <span className="text-2xl font-display font-bold text-secondary">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] font-semibold text-neutral-700 text-center group-hover:text-primary-800">
                    {category.name}
                  </span>
                  {category.productCount !== undefined && (
                    <span className="text-[9px] text-neutral-400">
                      {category.productCount} items
                    </span>
                  )}
                </Link>
              ))}
            </div>
            
            <div className="border-t border-neutral-100 px-4 py-3 bg-neutral-50/50">
              <Link 
                href="/shop" 
                className="flex items-center justify-between text-[11px] font-semibold text-neutral-600 hover:text-primary-800 transition-colors"
              >
                <span>View All Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
