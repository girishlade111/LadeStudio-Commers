import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Shipping Information | Lade Studio',
  description: 'Learn about our shipping options, delivery times, charges, and tracking information at Lade Studio.',
}

const shippingOptions = [
  {
    name: 'Standard Shipping',
    price: 'Rs. 99',
    freeAbove: 'Rs. 999',
    duration: '5-7 Business Days',
    description: 'Reliable delivery for non-urgent orders',
    features: [
      'Free shipping on orders above Rs. 999',
      'Order tracking available',
      'Delivery to all serviceable pin codes',
      'SMS and WhatsApp updates',
    ],
  },
  {
    name: 'Express Shipping',
    price: 'Rs. 149',
    freeAbove: null,
    duration: '2-3 Business Days',
    description: 'Fast delivery for urgent needs',
    features: [
      'Priority processing',
      'Real-time tracking',
      'Select pin codes only',
      'SMS and WhatsApp updates',
    ],
    highlighted: true,
  },
  {
    name: 'Same Day Delivery',
    price: 'Rs. 249',
    freeAbove: null,
    duration: 'Same Day',
    description: 'Order by 12 PM for same day delivery',
    features: [
      'Available in select cities',
      'Order before 12 PM',
      'Limited to serviceable areas',
      'Direct delivery confirmation',
    ],
  },
]

const deliveryTimeline = [
  {
    step: 1,
    title: 'Order Confirmation',
    description: 'You will receive an email and WhatsApp confirmation immediately after placing your order.',
    time: 'Within minutes',
  },
  {
    step: 2,
    title: 'Order Processing',
    description: 'Your order is picked, packed, and prepared for shipment by our warehouse team.',
    time: '1-2 business days',
  },
  {
    step: 3,
    title: 'Shipment Dispatch',
    description: 'Your package is handed over to our delivery partner and a tracking number is shared.',
    time: 'Within 24 hours of processing',
  },
  {
    step: 4,
    title: 'In Transit',
    description: 'Track your package journey with real-time updates via WhatsApp and email.',
    time: 'Varies by location',
  },
  {
    step: 5,
    title: 'Delivery',
    description: 'Your package arrives at your doorstep. Our delivery partner may call before delivery.',
    time: 'As per chosen option',
  },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-36">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-35" />
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/16 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Delivery Guide</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] text-white">
              Shipping designed
              <span className="block text-gradient">to feel seamless</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Explore delivery options, timing expectations, and what happens between checkout and doorstep arrival.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 md:pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {shippingOptions.map((option) => (
            <div
              key={option.name}
              className={option.highlighted ? 'jewel-dark rounded-[2.2rem] p-5 shadow-elevated sm:p-6 lg:p-7' : 'jewel-card rounded-[2.2rem] p-5 shadow-soft sm:p-6 lg:p-7'}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={option.highlighted ? 'text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary' : 'text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500'}>
                    {option.highlighted ? 'Most Popular' : 'Shipping Option'}
                  </p>
                  <h2 className={option.highlighted ? 'mt-3 font-display text-3xl font-bold text-white' : 'mt-3 font-display text-3xl font-bold text-neutral-900'}>
                    {option.name}
                  </h2>
                </div>
                <span className={option.highlighted ? 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/85' : 'rounded-full bg-secondary/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-800'}>
                  {option.duration}
                </span>
              </div>

              <p className={option.highlighted ? 'mt-4 text-white/68' : 'mt-4 text-neutral-600'}>{option.description}</p>

              <div className="mt-6">
                <p className={option.highlighted ? 'text-4xl font-extrabold text-white' : 'text-4xl font-extrabold text-primary-800'}>
                  {option.price}
                </p>
                {option.freeAbove && (
                  <p className={option.highlighted ? 'mt-2 text-sm text-white/62' : 'mt-2 text-sm text-neutral-500'}>
                    Free on orders above {option.freeAbove}
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {option.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className={option.highlighted ? 'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white' : 'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary/14 text-secondary'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className={option.highlighted ? 'text-sm text-white/82' : 'text-sm text-neutral-600'}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="jewel-card rounded-[2.3rem] p-5 shadow-soft sm:p-6 lg:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Delivery Process</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">From order to arrival</h2>
            <div className="mt-8 space-y-6">
              {deliveryTimeline.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                      {item.step}
                    </div>
                    {index < deliveryTimeline.length - 1 && <div className="mt-2 h-full w-px bg-neutral-200" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                      <span className="rounded-full bg-secondary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-800">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2 leading-7 text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="jewel-dark rounded-[2.3rem] p-5 shadow-elevated sm:p-6 lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Coverage</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white">Pan-India delivery</h2>
              <p className="mt-4 leading-8 text-white/68">
                We deliver to most pin codes across India, including major metros and a wide range of regional locations. Service speed may vary by destination.
              </p>
              <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/8 p-5">
                <p className="text-sm font-semibold text-white">10,000+ serviceable pincodes</p>
                <p className="mt-2 text-sm text-white/65">Remote or restricted areas may require extra time or additional charges.</p>
              </div>
            </div>

            <div className="jewel-card rounded-[2.3rem] p-5 shadow-soft sm:p-6 lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Need Help?</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900">Questions about your delivery area?</h2>
              <p className="mt-3 leading-8 text-neutral-600">
                Contact support if you want to confirm serviceability, speed, or delivery conditions before placing an order.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button variant="primary">Contact Support</Button>
                </Link>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Chat on WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
