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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
        answer: 'Yes, we offer premium gift wrapping for an additional fee of Rs. 99. You can add gift wrapping at checkout. Each wrapped item includes a handwritten note card where you can share a personal message.',
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
        answer: 'Yes! We offer free standard shipping on all orders above Rs. 999. Orders below Rs. 999 have a flat shipping fee of Rs. 99. Express shipping charges vary by location.',
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-20">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-40" />
        <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-accent/14 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Support Atelier</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] text-white">
              Answers crafted
              <span className="block text-gradient">for every step</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Explore everything from UPI payments and delivery timelines to returns, sizing, and account help in one polished guide.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl jewel-card rounded-[2.2rem] p-5 shadow-soft sm:p-6 lg:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Need personal help?</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900">Talk to our support team directly</h2>
                <p className="mt-2 text-neutral-500">If you cannot find your answer below, we are one message away.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button variant="primary" size="lg">Contact Us</Button>
                </Link>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">Chat on WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 md:pb-24">
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title} className="jewel-card rounded-[2.4rem] p-5 shadow-soft sm:p-6 lg:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/14 text-secondary">
                  {category.icon}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Category</p>
                  <h2 className="font-display text-3xl font-bold text-neutral-900 md:text-4xl">{category.title}</h2>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {category.faqs.map((faq, index) => (
                  <details key={index} className="group overflow-hidden rounded-[1.7rem] border border-neutral-200/80 bg-white/70 shadow-soft">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
                      <span className="pr-4 text-lg font-semibold text-neutral-900">{faq.question}</span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/14 text-secondary transition-transform duration-300 group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6">
                      <p className="leading-8 text-neutral-600">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
