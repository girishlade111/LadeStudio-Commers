'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { sanitizeInput } from '@/utils/security'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 99999 99999'
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

const contactMethods = [
  {
    id: 'whatsapp',
    title: 'Chat Instantly',
    description: 'Quick response during business hours with direct order or support conversations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 'phone',
    title: 'Call Us',
    description: 'Speak directly with our team for immediate assistance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
]

const faqs = [
  {
    question: 'What are your business hours?',
    answer: 'Our team is available Monday through Saturday, from 9:00 AM to 7:00 PM IST.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via WhatsApp and email.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to select international locations. Contact us for shipping quotes.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in original packaging.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi Lade Studio, I have a question:')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:hello@ladestudio.com?subject=Contact from Website`
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    const sanitizedData = {
      name: sanitizeInput(formData.name, 100),
      email: sanitizeInput(formData.email, 100),
      message: sanitizeInput(formData.message, 500),
    }

    const message = `Name: ${sanitizedData.name || 'Not provided'}\nEmail: ${sanitizedData.email || 'Not provided'}\nMessage: ${sanitizedData.message}`
    const waMessage = encodeURIComponent(`*Contact Form Submission*\n\n${message}`)

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank')
      setIsSubmitting(false)
      setShowNotification(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setShowNotification(false), 3000)
    }, 500)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-28 md:pt-24">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,170,103,0.18),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(95,52,84,0.28),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(32,116,104,0.15),transparent_40%)]" />
        <div className="absolute inset-0 rich-grid opacity-20" />
        
        <div className="absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute -right-32 top-1/4 h-[450px] w-[450px] rounded-full bg-plum-500/12 blur-[100px]" />
        
        <div className="container relative mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-secondary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            Get In Touch
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-semibold tracking-tight text-white">
            Let&apos;s start a
            <span className="mt-2 block font-light italic text-white/75">conversation</span>
            <span className="mt-2 block bg-gradient-to-r from-secondary via-amber-100 to-secondary bg-clip-text text-transparent">
              We&apos;d love to hear from you
            </span>
          </h1>
          
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">Premium Support</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-secondary" />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-white/60">
            Choose your preferred way to connect and our team will get back to you promptly.
          </p>
        </div>
      </section>

      <div className="container mx-auto -mt-8 px-4 pb-16 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {contactMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                if (method.id === 'whatsapp') handleWhatsAppClick()
                else if (method.id === 'phone') handlePhoneClick()
                else handleEmailClick()
              }}
              className="group relative rounded-2xl border border-neutral-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/20 sm:p-7"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center text-secondary mb-5 transition-all duration-300 group-hover:scale-110 group-hover:from-secondary/30 group-hover:to-secondary/10">
                  {method.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900">{method.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{method.description}</p>
                
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary-800 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>{method.id === 'whatsapp' ? 'Start Chat' : method.id === 'phone' ? PHONE_NUMBER : 'Send Email'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-secondary">
                <span className="h-1 w-1 rounded-full bg-secondary" />
                Send a Message
              </div>
              <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-semibold tracking-tight text-neutral-900">
                We&apos;re here to help
              </h2>
              <p className="mt-3 text-neutral-500">Fill in the details below and we&apos;ll get back to you via WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: sanitizeInput(event.target.value, 100) })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition-all focus:border-secondary/50 focus:bg-white focus:ring-2 focus:ring-secondary/10"
                  placeholder="John Doe (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: sanitizeInput(event.target.value, 100) })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition-all focus:border-secondary/50 focus:bg-white focus:ring-2 focus:ring-secondary/10"
                  placeholder="you@example.com (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: sanitizeInput(event.target.value, 500) })}
                  rows={5}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition-all focus:border-secondary/50 focus:bg-white focus:ring-2 focus:ring-secondary/10 resize-none"
                  placeholder="How can we help you today?"
                  maxLength={500}
                />
                <p className="mt-2 text-right text-xs text-neutral-400">{formData.message.length}/500</p>
              </div>
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} className="h-14 text-base">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                </svg>
                Send via WhatsApp
              </Button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900">Business Hours</h3>
                  <p className="text-xs text-neutral-500">We&apos;re here when you need us</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 items-center justify-center">
                      <span className="absolute h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-sm font-medium text-neutral-700">Monday - Saturday</span>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-neutral-300" />
                    <span className="text-sm font-medium text-neutral-700">Sunday</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-400">Closed</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900">Visit Our Store</h3>
                  <p className="text-xs text-neutral-500">Come say hello</p>
                </div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm text-neutral-700 font-medium">Lade Studio</p>
                <p className="mt-1 text-sm text-neutral-500">Mumbai, Maharashtra, India</p>
                <p className="mt-3 text-xs text-neutral-400">Open for appointments and walk-ins during business hours.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-plum-100 to-plum-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-plum-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900">Follow Us</h3>
                  <p className="text-xs text-neutral-500">Stay updated</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-neutral-50/50 px-4 py-16 sm:px-6 lg:px-8 xl:px-10 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-secondary">
              <span className="h-1 w-1 rounded-full bg-secondary" />
              FAQ
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-neutral-500">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for? Reach out to us directly.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.question ? null : faq.question)}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <span className="font-display text-base font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <span className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-all duration-300 ${expandedFaq === faq.question ? 'rotate-180 bg-secondary/10 text-secondary' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === faq.question ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-sm text-neutral-500 sm:px-6 sm:pb-6">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-800 to-plum-700 px-6 py-4 text-white shadow-xl animate-slide-up">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-semibold">Opening WhatsApp...</span>
        </div>
      )}
    </div>
  )
}
