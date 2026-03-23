export interface CacheOptions {
  ttl?: number
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class MemoryCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map()
  private defaultTtl: number

  constructor(defaultTtl: number = 5 * 60 * 1000) {
    this.defaultTtl = defaultTtl
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) return null
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }

  set(key: string, data: T, options?: CacheOptions): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: options?.ttl || this.defaultTtl,
    })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }
}

export const productCache = new MemoryCache<unknown>(5 * 60 * 1000)

export function getCachedProducts<T>(key: string): T | null {
  return productCache.get(key) as T | null
}

export function setCachedProducts<T>(key: string, data: T, ttl?: number): void {
  productCache.set(key, data, { ttl })
}

export function invalidateCache(key?: string): void {
  if (key) {
    productCache.delete(key)
  } else {
    productCache.clear()
  }
}