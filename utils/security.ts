interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function rateLimit(
  key: string,
  maxRequests: number = 30,
  windowMs: number = 60000
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { success: true, remaining: maxRequests - 1, resetIn: windowMs }
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    }
  }

  entry.count++
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  }
}

export function sanitizeInput(input: string, maxLength: number = 100): string {
  if (!input) return ''
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeSearchQuery(query: string): string {
  if (!query) return ''
  return query
    .replace(/[<>\"'%;()&+]/g, '')
    .trim()
    .slice(0, 100)
}

export function validateProductId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length <= 50
}

export function validateCategory(category: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(category) && category.length <= 50
}

export function validatePhone(phone: string): boolean {
  return /^\d{10}$/.test(phone)
}

export function validateName(name: string): boolean {
  if (!name || name.trim().length < 2 || name.trim().length > 100) return false
  return /^[a-zA-Z\s'-]+$/.test(name.trim())
}

export function validateAddress(address: string): boolean {
  if (!address || address.trim().length < 10 || address.trim().length > 500) return false
  return true
}

setInterval(() => {
  const now = Date.now()
  const keysToDelete: string[] = []
  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetTime) {
      keysToDelete.push(key)
    }
  })
  keysToDelete.forEach(key => rateLimitStore.delete(key))
}, 60000)
