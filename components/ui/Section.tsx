'use client'

import { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

export interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'light' | 'dark' | 'primary' | 'secondary'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({
  children,
  className = '',
  background = 'default',
  padding = 'md',
}: SectionProps) {
  const backgrounds = {
    default: 'bg-surface',
    light: 'bg-surface-light',
    dark: 'bg-neutral-100',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
  }

  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
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
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeader({ title, subtitle, align = 'center', className = '' }: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-10 md:mb-14 ${alignments[align]} ${className}`}>
      <h2 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-500 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}