export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-semibold rounded-full transition-colors duration-200 uppercase tracking-[0.16em]'

  const variants = {
    default: 'bg-neutral-100/90 text-neutral-700 border border-neutral-200',
    primary: 'bg-primary/90 text-white border border-white/10',
    secondary: 'bg-secondary/20 text-secondary-800 border border-secondary/30',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-blue-100 text-blue-700 border border-blue-200',
  }

  const sizes = {
    sm: 'px-3 py-1 text-[10px]',
    md: 'px-3.5 py-1.5 text-xs',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}
