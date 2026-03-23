'use client'

import { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  const variants = {
    default: 'bg-white shadow-soft',
    bordered: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-medium',
    ghost: 'bg-transparent',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`
        rounded-2xl
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}