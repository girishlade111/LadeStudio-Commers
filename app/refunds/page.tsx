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
  },
  {
    step: 2,
    title: 'Get Return Approval',
    description: 'Our team reviews your request and shares approval steps plus return instructions where applicable.',
  },
  {
    step: 3,
    title: 'Package and Ship',
    description: 'Pack the item securely in its original condition and send it back within the approved return window.',
  },
  {
    step: 4,
    title: 'Refund Processed',
    description: 'Once the return is received and verified, your refund is initiated to the selected method.',
  },
]

const eligibility = {
  yes: [
    'Unworn, unwashed items with original tags attached',
    'Items returned within 30 days of delivery',
    'Products in original packaging with all accessories',
    'Proof of purchase or order reference',
  ],
  no: [
    'Intimate wear and personal care items',
    'Earrings and similar hygiene-sensitive products',
    'Customized or personalized products',
    'Used, washed, altered, or damaged items',
    'Products marked as final sale or non-returnable',
  ],
}

export default function RefundsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-36">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-35" />
        <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-plum-500/16 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Returns Guide</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] text-white">
              Returns that feel
              <span className="block text-gradient">clear and reassuring</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              We aim to make eligible returns straightforward, transparent, and supportive from the first message to the refund confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="jewel-dark rounded-[2.3rem] p-5 shadow-elevated sm:p-6 lg:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Return Promise</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">30 days to request a return</h2>
            <p className="mt-4 leading-8 text-white/70">
              If your item is eligible and not the right fit, contact us within 30 days of delivery and we will guide you through the next steps.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                'Quick review and approval guidance',
                'Clear instructions before you ship',
                'Refund processing after inspection',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/82">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="jewel-card rounded-[2.3rem] p-5 shadow-soft sm:p-6 lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Eligibility</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-emerald-200/70 bg-emerald-50/70 p-5">
                  <h3 className="text-lg font-semibold text-neutral-900">Eligible for return</h3>
                  <div className="mt-4 space-y-3">
                    {eligibility.yes.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-rose-200/70 bg-rose-50/70 p-5">
                  <h3 className="text-lg font-semibold text-neutral-900">Not eligible for return</h3>
                  <div className="mt-4 space-y-3">
                    {eligibility.no.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/12 text-rose-700">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="jewel-card rounded-[2.3rem] p-5 shadow-soft sm:p-6 lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Return Process</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {returnProcess.map((step) => (
                  <div key={step.step} className="rounded-[1.7rem] border border-neutral-200/80 bg-white/70 p-5 shadow-soft">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-neutral-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 jewel-card rounded-[2.3rem] p-5 shadow-soft sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Support</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-neutral-900">Need help with a return?</h2>
              <p className="mt-3 max-w-2xl leading-8 text-neutral-600">
                If your item arrived damaged, defective, or simply is not right for you, our team can guide you through the correct next step.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button variant="primary" size="lg">Contact Support</Button>
              </Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">Chat on WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
