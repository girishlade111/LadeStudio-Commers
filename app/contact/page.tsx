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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      {/* Page Header */}
      <div className="page-header-bg pt-8 pb-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary mb-4 animate-fade-up">
              Reach Out
            </p>
            <h1 className="text-display-sm md:text-display-lg font-display font-bold text-neutral-900 mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Get in Touch
            </h1>
            <p className="text-body-lg text-neutral-500 animate-fade-up" style={{ animationDelay: '200ms' }}>
              We&apos;d love to hear from you. Choose your preferred way to connect.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 -mt-8">
        <div className="max-w-3xl mx-auto">
          {/* Quick Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-neutral-200 hover:border-green-300 hover:shadow-card-hover transition-all duration-300 group text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900">Chat on WhatsApp</p>
                <p className="text-sm text-neutral-500 mt-0.5">Quick response during business hours</p>
              </div>
            </button>

            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-neutral-200 hover:border-secondary-200 hover:shadow-card-hover transition-all duration-300 group text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900">Call Us</p>
                <p className="text-sm text-neutral-500 mt-0.5">{PHONE_NUMBER}</p>
              </div>
            </button>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-10 shadow-soft animate-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="text-center mb-8">
              <h2 className="text-heading-xl text-neutral-900 mb-2">Send a Message</h2>
              <p className="text-sm text-neutral-500">Fill in the details below and we&apos;ll get back to you</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value, 100) })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-secondary focus:outline-none transition-colors text-sm"
                  placeholder="Your name (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: sanitizeInput(e.target.value, 100) })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-secondary focus:outline-none transition-colors text-sm"
                  placeholder="your@email.com (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: sanitizeInput(e.target.value, 500) })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-secondary focus:outline-none transition-colors resize-none text-sm"
                  placeholder="How can we help?"
                  maxLength={500}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
              >
                Send via WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </Button>
            </form>
          </div>

          {/* Business Hours */}
          <div className="mt-14 mb-8 text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">Business Hours</p>
            <p className="text-sm text-neutral-600">Monday - Saturday, 9:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-primary-800 text-white px-6 py-4 rounded-2xl shadow-elevated flex items-center gap-3 animate-slide-up z-50">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-sm font-medium">Opening WhatsApp...</span>
        </div>
      )}
    </div>
  )
}
