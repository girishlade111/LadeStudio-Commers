import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Lade Studio',
  description: 'Find answers to commonly asked questions about orders, shipping, returns, products, and more at Lade Studio.',
}

const faqCategories = [
  {
    title: 'Orders & Payment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    faqs: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our collection and click on any product to view details. Add items to your cart, then proceed to checkout. You will need to provide your delivery address and contact information. Once your order is confirmed, you will receive an email with order details.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major UPI payments including Google Pay, PhonePe, Paytm, and other UPI apps. You can also pay using credit/debit cards through UPI. All payments are processed securely through our trusted payment partners.',
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 2 hours of placing the order, provided it has not yet been shipped. Contact our support team via WhatsApp or email immediately with your order number to request changes.',
      },
      {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes, we offer premium gift wrapping for an additional fee of ₹99. You can add gift wrapping at checkout. Each wrapped item includes a handwritten note card where you can share a personal message.',
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you will receive a WhatsApp message with tracking details. You can also track your order by visiting the tracking link provided in your confirmation email.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    faqs: [
      {
        question: 'How long will my order take to arrive?',
        answer: 'Standard shipping takes 5-7 business days for metro cities and 7-10 business days for other locations. Express shipping (2-3 business days) is available for select pin codes at an additional cost.',
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders above ₹999. Orders below ₹999 have a flat shipping fee of ₹99. Express shipping charges vary by location.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. We are working on expanding our shipping capabilities to serve international customers soon.',
      },
      {
        question: 'What if my package is lost or damaged?',
        answer: 'In the rare event that your package is lost or arrives damaged, please contact us immediately with photos of the damaged item and packaging. We will arrange for a replacement or full refund within 5-7 business days.',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return window from the date of delivery. Products must be unused, unwashed, and in their original packaging with all tags attached. Certain items like intimate wear, earrings, and personalized products are not eligible for return due to hygiene reasons.',
      },
      {
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, contact us via WhatsApp or email with your order number and reason for return. Our team will guide you through the process and provide a return shipping label if applicable.',
      },
      {
        question: 'How long does a refund take?',
        answer: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method or as store credit per your preference.',
      },
      {
        question: 'Can I exchange an item for a different size or color?',
        answer: 'Yes, we offer free exchanges for different sizes or colors of the same product. Contact our support team within 30 days of delivery to arrange an exchange.',
      },
    ],
  },
  {
    title: 'Products & Sizing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    faqs: [
      {
        question: 'How do I find the right size?',
        answer: 'Each product page includes a detailed size guide with measurements. We recommend measuring yourself and comparing with our size chart. If you are between sizes, we suggest sizing up for a comfortable fit.',
      },
      {
        question: 'Are your products true to size?',
        answer: 'Most of our products are true to size, but fit may vary by style. Check the product description and size guide for specific fit information. When in doubt, contact our support team for personalized advice.',
      },
      {
        question: 'Do you offer product customization?',
        answer: 'Currently, we do not offer customization on our products. However, we are constantly expanding our range to include more personalized options.',
      },
      {
        question: 'How do I care for my products?',
        answer: 'Care instructions are provided on each product page and on the care label of your item. Generally, we recommend following the specific care instructions provided. For leather goods, avoid moisture and store in a cool, dry place.',
      },
    ],
  },
  {
    title: 'Account & Support',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'You can browse and shop without creating an account. However, creating an account allows you to track orders, save your wishlist, and enjoy a faster checkout experience. Sign up using your email or phone number.',
      },
      {
        question: 'I forgot my password. What do I do?',
        answer: 'Click on the "Forgot Password" link on the login page and enter your registered email. You will receive a password reset link within a few minutes. Check your spam folder if you do not see it in your inbox.',
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us via WhatsApp for instant support, email us at support@ladestudio.com, or call us during business hours (Mon-Sat, 9 AM - 7 PM). Our team is always happy to help!',
      },
      {
        question: 'Do you have a physical store?',
        answer: 'We are an online-first brand and do not have physical retail stores. This allows us to offer premium products at competitive prices. However, we occasionally participate in pop-up events - follow us on social media for updates.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Find quick answers to common questions about orders, shipping, returns, and more.
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 bg-secondary/5">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <p className="text-neutral-600">Could not find what you are looking for?</p>
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="space-y-16">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900">
                    {category.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-neutral-50 rounded-2xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                        <span className="text-lg font-semibold text-neutral-900 pr-4">
                          {faq.question}
                        </span>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-5 md:px-8 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-neutral-600 mb-8">
            Our support team is here to help. Reach out to us and we will get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Support
              </Button>
            </Link>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
