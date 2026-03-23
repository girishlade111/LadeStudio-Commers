import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Shipping Information | Lade Studio',
  description: 'Learn about our shipping options, delivery times, charges, and tracking information at Lade Studio.',
}

const shippingOptions = [
  {
    name: 'Standard Shipping',
    price: '₹99',
    freeAbove: '₹999',
    duration: '5-7 Business Days',
    description: 'Reliable delivery for non-urgent orders',
    features: [
      'Free shipping on orders above ₹999',
      'Order tracking available',
      'Delivery to all serviceable pin codes',
      'SMS/WhatsApp updates',
    ],
  },
  {
    name: 'Express Shipping',
    price: '₹149',
    freeAbove: null,
    duration: '2-3 Business Days',
    description: 'Fast delivery for urgent needs',
    features: [
      'Priority processing',
      'Real-time tracking',
      'Select pin codes only',
      'SMS/WhatsApp updates',
    ],
    highlighted: true,
  },
  {
    name: 'Same Day Delivery',
    price: '₹249',
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Shipping Information
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know about delivery options, timelines, and tracking your order.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Shipping Options
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Choose the delivery option that best suits your needs. All orders include tracking and insurance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {shippingOptions.map((option) => (
              <div
                key={option.name}
                className={`relative rounded-2xl p-8 ${
                  option.highlighted
                    ? 'bg-secondary text-white shadow-elevated scale-105'
                    : 'bg-neutral-50'
                }`}
              >
                {option.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-secondary text-xs font-semibold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <p className={`text-sm ${option.highlighted ? 'text-white/70' : 'text-neutral-500'}`}>
                    {option.description}
                  </p>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{option.price}</span>
                  </div>
                  {option.freeAbove && (
                    <p className={`text-sm mt-1 ${option.highlighted ? 'text-white/70' : 'text-neutral-500'}`}>
                      Free on orders above {option.freeAbove}
                    </p>
                  )}
                </div>
                <div className={`text-center mb-8 ${option.highlighted ? 'text-white/60' : 'text-secondary'}`}>
                  <span className="text-lg font-semibold">{option.duration}</span>
                </div>
                <ul className="space-y-3">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          option.highlighted ? 'text-white' : 'text-secondary'
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${option.highlighted ? 'text-white/90' : 'text-neutral-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Timeline */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Delivery Process
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              From order placement to doorstep delivery, here is what to expect.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {deliveryTimeline.map((item, index) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    {index < deliveryTimeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-secondary/20 my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                      <span className="text-sm text-secondary font-medium">{item.time}</span>
                    </div>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serviceable Areas */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                Serviceable Areas
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                We deliver to most pin codes across India. Our delivery network covers all major cities including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, and more.
              </p>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                For remote or restricted areas, delivery times may be longer and additional charges may apply. You can check serviceability by entering your pin code at checkout.
              </p>
              <div className="bg-secondary/5 rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-900 mb-2">Cannot find your pin code?</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  We are constantly expanding our delivery network. Contact us and we will try our best to serve you.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/10 to-primary-100 flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-secondary mx-auto mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <p className="text-lg font-semibold text-neutral-900">Pan-India Delivery</p>
                  <p className="text-sm text-neutral-500">10,000+ Serviceable Pincodes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping FAQ */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Common Shipping Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Can I change my delivery address after ordering?',
                a: 'Address changes are possible only if your order has not yet shipped. Contact us within 2 hours of placing your order to request an address change.',
              },
              {
                q: 'What happens if I am not available at delivery?',
                a: 'Our delivery partner will attempt delivery 3 times. If unsuccessful, the package will be returned to us. Please ensure someone is available to receive the delivery.',
              },
              {
                q: 'Is my order insured during transit?',
                a: 'Yes, all orders are insured against loss or damage during transit. In the rare event of damage, please contact us within 24 hours with photos.',
              },
              {
                q: 'Can I pick up my order instead of home delivery?',
                a: 'Currently, we do not offer self-pickup options. All orders are delivered directly to your doorstep.',
              },
              {
                q: 'Do you deliver to PO Box addresses?',
                a: 'Most of our products can be delivered to PO Box addresses. However, some large items may require a residential or commercial address.',
              },
            ].map((item, index) => (
              <details key={index} className="group bg-white rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <span className="text-lg font-semibold text-neutral-900 pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-neutral-600 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-24 bg-primary-900">
        <div className="container mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Still have shipping questions?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Our support team is ready to help with any shipping-related queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
