'use client'

import { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

export interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'light' | 'dark' | 'primary' | 'secondary' | 'cream'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({
  children,
  className = '',
  background = 'default',
  padding = 'md',
}: SectionProps) {
  const backgrounds = {
    default: 'bg-white',
    light: 'bg-surface-light',
    dark: 'bg-neutral-50',
    primary: 'bg-primary-800 text-white',
    secondary: 'bg-secondary text-primary',
    cream: 'bg-cream',
  }

  const paddings = {
    none: '',
    sm: 'py-10 md:py-14',
    md: 'py-14 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36',
  }

  return (
    <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  label?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  dark?: boolean
}

export function SectionHeader({ title, subtitle, label, align = 'center', className = '', dark = false }: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-12 md:mb-16 ${alignments[align]} ${className}`}>
      {label && (
        <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 ${
          dark ? 'text-secondary' : 'text-secondary'
        }`}>
          {label}
        </p>
      )}
      <h2 className={`text-display-sm md:text-display-md font-display font-bold text-balance ${
        dark ? 'text-white' : 'text-neutral-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-body-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
          dark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
