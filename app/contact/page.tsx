'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { sanitizeInput } from '@/utils/security'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 99999 99999'
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi Lade Studio, I have a question:')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`
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
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-22 md:pt-36">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-45" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />

        <div className="container relative mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Reach Out</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[0.94] text-white">
            Let&apos;s make the
            <span className="block text-gradient">conversation elegant</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
            We&apos;d love to hear from you. Choose your preferred way to connect and the studio team will take it from there.
          </p>
        </div>
      </section>

      <div className="container mx-auto -mt-10 px-5 pb-16 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-5">
            <button
              onClick={handleWhatsAppClick}
              className="jewel-card w-full rounded-[2rem] p-6 text-left transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">WhatsApp</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">Chat instantly</h2>
              <p className="mt-3 text-neutral-600 leading-7">Quick response during business hours with direct order or support conversations.</p>
            </button>

            <button
              onClick={handlePhoneClick}
              className="jewel-card w-full rounded-[2rem] p-6 text-left transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Call Us</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">Speak to the team</h2>
              <p className="mt-3 text-neutral-600 leading-7">{PHONE_NUMBER}</p>
            </button>

            <div className="jewel-dark rounded-[2rem] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Business Hours</p>
              <p className="mt-4 text-lg text-white">Monday - Saturday</p>
              <p className="text-white/65">9:00 AM - 7:00 PM</p>
            </div>
          </div>

          <div className="jewel-card rounded-[2.4rem] p-8 shadow-soft md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Send a Message</p>
            <h2 className="mt-3 font-display text-5xl font-bold text-neutral-900">Start with a note</h2>
            <p className="mt-3 text-neutral-500">Fill in the details below and we&apos;ll route your message to WhatsApp.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: sanitizeInput(event.target.value, 100) })}
                  className="w-full rounded-[1.2rem] border border-neutral-200 bg-white/75 px-4 py-3 text-sm shadow-soft"
                  placeholder="Your name (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: sanitizeInput(event.target.value, 100) })}
                  className="w-full rounded-[1.2rem] border border-neutral-200 bg-white/75 px-4 py-3 text-sm shadow-soft"
                  placeholder="your@email.com (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: sanitizeInput(event.target.value, 500) })}
                  rows={6}
                  className="w-full rounded-[1.2rem] border border-neutral-200 bg-white/75 px-4 py-3 text-sm shadow-soft resize-none"
                  placeholder="How can we help?"
                  maxLength={500}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                Send via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[1.4rem] bg-primary-800 px-6 py-4 text-white shadow-elevated animate-slide-up">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20">
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
