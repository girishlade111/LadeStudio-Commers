import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { getOrdersByClerkUserId } from '@/services/orders'
import { Button } from '@/components/ui/Button'
import { formatDate, formatPrice } from '@/utils/formatters'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  payment_submitted: 'border border-amber-200/70 bg-amber-50 text-amber-800',
  verified: 'border border-emerald-200/70 bg-emerald-50 text-emerald-800',
  rejected: 'border border-rose-200/70 bg-rose-50 text-rose-800',
}

export default async function OrdersPage() {
  const { userId } = await auth()
  const orders = userId ? await getOrdersByClerkUserId(userId) : []

  return (
    <div className="min-h-screen">
      <div className="page-header-bg pt-8 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
            Account
          </p>
          <h1 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 animate-fade-up" style={{ animationDelay: '100ms' }}>
            My Orders
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 pb-16">
        {orders.length === 0 ? (
          <div className="max-w-3xl mx-auto jewel-card rounded-[2.2rem] p-6 shadow-soft text-center sm:p-7 lg:p-8">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-3">No orders yet</h2>
            <p className="text-neutral-500 mb-6">Once you submit a payment proof, your purchased products will appear here.</p>
            <Link href="/shop">
              <Button variant="primary" size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {orders.map((order) => (
              <article key={order.orderId} className="jewel-card rounded-[2.4rem] p-5 shadow-soft sm:p-6 lg:p-7">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-2">Order</p>
                    <h2 className="text-2xl font-display font-bold text-neutral-900">{order.orderId}</h2>
                    <p className="text-sm text-neutral-500 mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[order.status] || STATUS_STYLES.payment_submitted}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-2xl font-extrabold text-primary-800">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1.4fr,0.6fr] gap-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={`${order.orderId}-${item.productId}`} className="flex items-center gap-4 rounded-[1.7rem] border border-neutral-200/80 bg-white/70 p-3 shadow-soft">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-cream flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-neutral-500 uppercase tracking-[0.18em]">{item.category}</p>
                          <p className="text-lg font-semibold text-neutral-900 line-clamp-1">{item.name}</p>
                          <p className="text-sm text-neutral-500">Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">{formatPrice(item.totalPrice)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.8rem] border border-neutral-200/80 bg-white/70 p-5 shadow-soft">
                      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Payment Proof</p>
                      {order.screenshotUrl ? (
                        <a href={order.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-secondary hover:text-secondary-700">
                          View uploaded screenshot
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-500">No screenshot link available</p>
                      )}
                    </div>
                    <div className="rounded-[1.8rem] border border-neutral-200/80 bg-white/70 p-5 shadow-soft">
                      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Delivery Details</p>
                      <p className="text-sm font-medium text-neutral-900">{order.customerName}</p>
                      <p className="text-sm text-neutral-600 mt-1">{order.customerPhone}</p>
                      <p className="text-sm text-neutral-600 mt-2 whitespace-pre-line">{order.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
