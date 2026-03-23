import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/utils/formatters'
import { Card } from '@/components/ui/Card'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full">
        <div className="relative h-48 bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {!product.inStock && (
              <span className="text-sm text-red-500">Out of Stock</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}