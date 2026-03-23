export const metadata = {
  title: 'Privacy Policy | Lade Studio',
  description: 'Lade Studio Privacy Policy - Learn how we collect, use, and protect your personal information.',
}

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you provide directly to us, such as your name, email address, phone number, shipping address, billing address, products purchased, order history, and messages sent through our support channels.',
      'Payment information like transaction references may be processed for order verification, but payment handling remains tied to the payment methods and proof you provide during checkout.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use your information to process and fulfill orders, send order confirmations and shipping updates, respond to support requests, improve our products and website, prevent fraud, and comply with legal obligations.',
      'Promotional communication is only sent when permitted or requested by you.',
    ],
  },
  {
    title: '3. Information Sharing',
    body: [
      'We do not sell, trade, or rent your personal information to third parties. We may share limited information with service providers who help us operate the business, with legal authorities when required, or as part of a legitimate business transfer.',
    ],
  },
  {
    title: '4. Data Security',
    body: [
      'We use reasonable technical and organizational safeguards to protect your information from unauthorized access, disclosure, alteration, or destruction. No online system is completely risk-free, so absolute security cannot be guaranteed.',
    ],
  },
  {
    title: '5. Cookies and Tracking',
    body: [
      'Cookies and similar technologies may be used to remember your preferences, maintain your cart, and understand how visitors use the site. You can control cookies through your browser settings, though some features may work less smoothly if disabled.',
    ],
  },
  {
    title: '6. Your Rights',
    body: [
      'You may request access to your information, ask for corrections, request deletion where permitted, opt out of marketing communication, or withdraw consent where processing is based on consent.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'We retain personal information for as long as necessary to support the purposes described in this policy, including order fulfillment, compliance, support, and record-keeping requirements.',
    ],
  },
  {
    title: '8. Third-Party Links',
    body: [
      'Our site may contain links to third-party services. We are not responsible for their privacy practices, and we encourage you to review their policies separately before sharing personal information.',
    ],
  },
  {
    title: '9. Children\'s Privacy',
    body: [
      'Our services are not intended for individuals under 18 years of age. If you believe information from a child has been submitted, please contact us so we can take appropriate action.',
    ],
  },
  {
    title: '10. Changes to This Policy',
    body: [
      'We may update this policy from time to time to reflect legal, operational, or product changes. Material updates will be reflected on this page along with a revised date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-20">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-35" />
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-plum-500/16 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Policies</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] text-white">
              Privacy with
              <span className="block text-gradient">clarity and care</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Last updated: March 2026. This page explains how we collect, use, and protect customer information across the storefront.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 md:pb-24">
        <div className="mx-auto max-w-4xl jewel-card rounded-[2.6rem] p-5 shadow-soft sm:p-6 lg:p-8 xl:p-9">
          <p className="text-lg leading-8 text-neutral-600">
            At Lade Studio, we are committed to protecting your privacy and handling your information responsibly. This Privacy Policy explains what information we collect, why we collect it, and how we use it when you browse the website, place an order, or contact us.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.8rem] border border-neutral-200/80 bg-white/70 p-5 shadow-soft sm:p-6 lg:p-7">
                <h2 className="font-display text-3xl font-bold text-neutral-900">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-8 text-neutral-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 jewel-dark rounded-[2rem] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">Privacy questions?</h2>
            <p className="mt-3 max-w-2xl leading-8 text-white/70">
              Reach out if you have questions, requests, or concerns about how your data is handled.
            </p>
            <div className="mt-5 space-y-1 text-white/86">
              <p>privacy@ladestudio.com</p>
              <p>WhatsApp: +91 99999 99999</p>
              <p>Business Hours: Mon - Sat, 9 AM - 7 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
