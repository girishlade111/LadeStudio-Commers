import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Ladi Studio
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:text-primary-600">
            Products
          </Link>
          <Link href="/cart" className="hover:text-primary-600">
            Cart
          </Link>
          <Link href="/wishlist" className="hover:text-primary-600">
            Wishlist
          </Link>
          <Link href="/contact" className="hover:text-primary-600">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}