'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 bg-white border rounded-xl
              text-neutral-900 placeholder:text-neutral-400
              focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary
              transition-all duration-200
              disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
              ${error ? 'border-error' : 'border-neutral-200'}
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-2 text-sm text-neutral-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white border rounded-xl
            text-neutral-900 placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary
            transition-all duration-200
            disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
            resize-none
            ${error ? 'border-error' : 'border-neutral-200'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-2 text-sm text-neutral-500">{helperText}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'