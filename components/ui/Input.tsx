import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const inputStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
const errorStyles = 'border-red-500'
const labelStyles = 'block text-sm font-medium text-gray-700 mb-1'

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && <label className={labelStyles}>{label}</label>}
      <input
        className={`${inputStyles} ${error ? errorStyles : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className={labelStyles}>{label}</label>}
      <textarea
        className={`${inputStyles} ${error ? errorStyles : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}