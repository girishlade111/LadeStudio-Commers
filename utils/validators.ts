export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}

export function isValidRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validateCustomerInfo(data: {
  name: string
  email: string
  phone: string
  address: string
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!isValidRequired(data.name)) {
    errors.name = 'Name is required'
  }

  if (!isValidRequired(data.email)) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format'
  }

  if (!isValidRequired(data.phone)) {
    errors.phone = 'Phone is required'
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone format'
  }

  if (!isValidRequired(data.address)) {
    errors.address = 'Address is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}