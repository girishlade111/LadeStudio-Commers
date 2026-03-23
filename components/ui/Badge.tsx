export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full transition-colors duration-200'

  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}