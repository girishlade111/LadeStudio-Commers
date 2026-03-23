'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold tracking-[0.01em] transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] relative overflow-hidden'

    const variants = {
      primary:
        'bg-gradient-to-r from-primary-800 via-plum-700 to-primary-800 text-white hover:shadow-elevated focus-visible:ring-primary-500 shadow-card border border-white/10',
      secondary:
        'bg-gradient-to-r from-secondary-400 via-secondary to-secondary-600 text-primary-900 hover:shadow-glow-lg focus-visible:ring-secondary-500 shadow-card border border-secondary-100/60',
      outline:
        'border border-neutral-300/80 bg-white/75 text-neutral-800 hover:border-accent hover:bg-accent hover:text-white focus-visible:ring-primary-500 shadow-soft',
      ghost:
        'text-neutral-700 hover:bg-white/70 hover:text-primary-800 focus-visible:ring-neutral-300',
      danger:
        'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-medium focus-visible:ring-red-500',
    }

    const sizes = {
      sm: 'px-4 py-2.5 text-sm rounded-full gap-2',
      md: 'px-5 py-3 text-sm rounded-full gap-2',
      lg: 'px-6 py-3.5 text-base rounded-full gap-2.5',
      xl: 'px-7 py-4 text-base rounded-full gap-3',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
