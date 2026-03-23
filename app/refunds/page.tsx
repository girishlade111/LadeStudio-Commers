import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Returns & Refunds Policy | Lade Studio',
  description: 'Learn about Lade Studio returns and refunds policy, including eligibility, process, and timelines.',
}

const returnProcess = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Reach out to our support team via WhatsApp or email within 30 days of delivery. Provide your order number and reason for return.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: 'Get Return Approval',
    description: 'Our team will review your request and provide a return authorization. You will receive instructions and a return shipping label (if applicable).',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: 'Package & Ship',
    description: 'Pack the item securely in original packaging with all tags attached. Ship it back using the provided label within 7 days of approval.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    step: 4,
    title: 'Refund Processed',
    description: 'Once we receive and inspect your return, we will initiate the refund within 5-7 business days to your original payment method.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const refundMethods = [
  {
    method: 'Original Payment Method',
    description: 'Refunds are credited to the original payment method used for the order.',
    timeline: '5-7 business days',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    method: 'Store Credit',
    description: 'Opt for instant store credit that can be used for future purchases.',
    timeline: 'Immediate',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
]

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Returns & Refunds
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Hassle-free returns within 30 days. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                Our Return Promise
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We want you to love what you buy. If you are not completely satisfied with your purchase, we offer a straightforward 30-day return policy. No questions asked.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">30-Day Window</h4>
                    <p className="text-sm text-neutral-600">Return items within 30 days of delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Free Return Shipping</h4>
                    <p className="text-sm text-neutral-600">We cover return shipping for defective items</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Quick Refunds</h4>
                    <p className="text-sm text-neutral-600">Refund processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/10 to-primary-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white shadow-elevated flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <p className="text-4xl font-display font-bold text-neutral-900 mb-2">30</p>
                  <p className="text-lg text-secondary font-semibold mb-2">Days</p>
                  <p className="text-neutral-600">Hassle-Free Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Unworn, unwashed items with original tags attached',
                  'Items returned within 30 days of delivery',
                  'Products in original packaging with all accessories',
                  'Proof of purchase (order confirmation email)',
                  'Footwear in original box with no marks or damage',
                  'Accessories with all original documentation',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Intimate wear and personal care items',
                  'Earrings and body jewelry (hygiene reasons)',
                  'Customized or personalized products',
                  'Items marked as "Final Sale" or "Non-Returnable"',
                  'Products returned after 30-day window',
                  'Items damaged due to misuse or improper care',
                  'Products without original tags or packaging',
                  'Used, washed, or altered items',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              How to Return an Item
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our return process is simple and straightforward. Follow these steps to return your item.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {returnProcess.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-neutral-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600">{step.description}</p>
                </div>
                {index < returnProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-secondary/30">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Methods */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Refund Methods
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Choose how you would like to receive your refund.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {refundMethods.map((method) => (
              <div key={method.method} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{method.method}</h3>
                    <p className="text-sm text-secondary font-medium">{method.timeline}</p>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defective Items */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-secondary/5 rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Damaged or Defective Items
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We take quality seriously. If you receive a damaged or defective item, please contact us immediately with photos of the product and packaging. We will arrange for a free replacement or full refund, including return shipping costs.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Please report damaged items within 48 hours of delivery for the fastest resolution.
              </p>
              <Link href="/contact">
                <Button variant="primary">
                  Report Damaged Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Can I exchange an item for a different size or color?',
                a: 'Yes, we offer free exchanges for different sizes or colors. Contact our support team within 30 days of delivery to arrange an exchange.',
              },
              {
                q: 'What if I lost my order confirmation?',
                a: 'No problem! We can locate your order using your email address or phone number. Contact us with your order details.',
              },
              {
                q: 'Can I return a gift I received?',
                a: 'Yes, gifts can be returned. The refund will be processed to the original payment method or as store credit per your preference.',
              },
              {
                q: 'How long does the whole return process take?',
                a: 'From initiating the return to receiving your refund, it typically takes 10-14 business days.',
              },
              {
                q: 'What if my refund has not arrived?',
                a: 'After refund initiation, it may take 5-7 business days to appear in your account. If you have not received it after 10 days, please contact us.',
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
            Need Help with a Return?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Our support team is here to assist you with any questions about the return process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Support
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
