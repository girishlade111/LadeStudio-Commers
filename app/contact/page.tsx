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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Get in Touch</h1>
          <p className="text-neutral-500 text-center mb-12">We'd love to hear from you. Choose your preferred way to reach us.</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <button
              onClick={handleWhatsAppClick}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-neutral-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600 group-hover:text-white">
                  <path d="M12.001 2.001c-5.523 0-10.001 4.478-10.001 10.001 0 4.248 2.667 7.851 6.421 9.306.469.088.644-.203.644-.452 0-.224-.008-.816-.012-1.602-.259.604-.526 1.128-.891 1.554-.309.36-.695.617-1.125.744-.354.105-.618.057-.854-.174-.184-.179-.458-.628-.623-.756-.214-.166-.441-.192-.638-.132-.249.075-.482.276-.612.5-.131.226-.458.792-.507.901-.05.115-.203.15-.467.09l-.852-.053c-.722-.057-1.397-.346-1.613-1.011-.172-.529-.172-1.106 0-1.635 1.015-1.044 2.514-1.675 4.039-1.675 5.523 0 10.001 4.478 10.001 10.001s-4.478 10.001-10.001 10.001c-5.523 0-10.001-4.478-10.001-10.001zM8.201 17.201c-.234 0-.467-.063-.672-.188l-1.098-.634c-.375-.217-.583-.626-.529-1.045.053-.418.329-.787.706-.944l2.21-.921c.375-.156.816-.074 1.119.21.302.283.403.696.256 1.058-.147.363-.467.696-.867.921l-.125.052zm6.599-3.598c-.147 0-.293-.024-.432-.071l-1.467-.493c-.447-.15-.943-.045-1.294.275-.35.32-.445.81-.247 1.28l.449 1.068c.157.373.473.628.861.696l1.395.244c.375.066.752-.059.983-.326.231-.267.321-.63.234-.945l-.208-1.699h-.074zm3.201-3.598c-.234 0-.467-.064-.672-.189l-1.098-.634c-.375-.217-.583-.626-.529-1.045.053-.418.329-.787.706-.944l2.21-.921c.375-.156.816-.074 1.119.21.302.283.403.696.256 1.058-.147.363-.467.696-.867.921l-.125.052z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-neutral-900">Chat on WhatsApp</p>
                <p className="text-sm text-neutral-500 mt-1">Quick response during business hours</p>
              </div>
            </button>

            <button
              onClick={handlePhoneClick}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-neutral-200 hover:border-secondary hover:bg-secondary-50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary group-hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-neutral-900">Call Us</p>
                <p className="text-sm text-neutral-500 mt-1">{PHONE_NUMBER}</p>
              </div>
            </button>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-2 text-center">Or Send a Message</h2>
            <p className="text-neutral-500 text-center mb-6 text-sm">Optional - Fill to send us a detailed message</p>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value, 100) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary focus:outline-none transition-colors"
                  placeholder="Your Name (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: sanitizeInput(e.target.value, 100) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary focus:outline-none transition-colors"
                  placeholder="Email Address (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: sanitizeInput(e.target.value, 500) })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
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
              </Button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-500">Business Hours: Mon - Sat, 9 AM - 7 PM</p>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-medium flex items-center gap-3 animate-slide-up z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Opening WhatsApp...</span>
        </div>
      )}
    </div>
  )
}