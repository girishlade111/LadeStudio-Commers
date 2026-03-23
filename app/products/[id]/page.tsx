import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ProductDetailsContent } from './ProductDetailsContent'
import { fetchProductById, fetchProducts } from '@/services/api/products'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const product = await fetchProductById(id)
    return {
      title: `${product.name} | Lade Studio`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Lade Studio`,
        description: product.description,
        images: [product.image],
      },
    }
  } catch {
    return {
      title: 'Product Not Found | Lade Studio',
    }
  }
}

async function ProductDetails({ params }: ProductPageProps) {
  const { id } = await params
  
  try {
    const [product, allProducts] = await Promise.all([
      fetchProductById(id),
      fetchProducts()
    ])
    
    const relatedProducts = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
    
    return (
      <ProductDetailsContent 
        product={product} 
        relatedProducts={relatedProducts}
      />
    )
  } catch (error) {
    notFound()
  }
}

function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-neutral-200 rounded mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl bg-neutral-200"></div>
            </div>
            <div className="space-y-6">
              <div className="h-4 w-24 bg-neutral-200 rounded"></div>
              <div className="h-12 w-3/4 bg-neutral-200 rounded"></div>
              <div className="h-8 w-32 bg-neutral-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-neutral-200 rounded"></div>
                <div className="h-4 w-full bg-neutral-200 rounded"></div>
                <div className="h-4 w-2/3 bg-neutral-200 rounded"></div>
              </div>
              <div className="h-14 w-full bg-neutral-200 rounded-xl"></div>
              <div className="h-14 w-full bg-neutral-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  )
}
