import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Lade Studio',
  description: 'Terms and Conditions for using Lade Studio website and purchasing products.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    text: 'By accessing and using this website, you agree to these Terms and our Privacy Policy. If you use the website on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.',
  },
  {
    title: '2. Products and Orders',
    text: 'We strive to present accurate product information including descriptions, prices, images, and availability. Even so, errors can happen, and we reserve the right to correct them, refuse orders, or cancel orders where needed.',
  },
  {
    title: '3. Payment Terms',
    text: 'We currently accept UPI-based payments and related payment proof submissions. You are responsible for using payment credentials you are authorized to use, and orders may remain pending until payment proof is reviewed.',
  },
  {
    title: '4. Shipping and Delivery',
    text: 'Shipping timelines are estimates and may vary based on location, serviceability, and carrier performance. Risk of loss transfers according to applicable delivery arrangements.',
  },
  {
    title: '5. Returns and Refunds',
    text: 'Eligible returns and refunds are handled according to our refund policy. Some product categories may be non-returnable due to hygiene, customization, or sale conditions.',
  },
  {
    title: '6. User Accounts',
    text: 'You are responsible for maintaining the confidentiality of your account credentials and for activity that occurs through your account. Please notify us immediately if you suspect unauthorized access.',
  },
  {
    title: '7. Intellectual Property',
    text: 'All website content, including product imagery, copy, branding, logos, design assets, and software, belongs to Lade Studio or its licensors and may not be used without permission.',
  },
  {
    title: '8. Prohibited Conduct',
    text: 'You agree not to misuse the website, interfere with its operation, submit fraudulent information, violate laws, or attempt to access protected systems or data without authorization.',
  },
  {
    title: '9. Disclaimer of Warranties',
    text: 'The website and services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law.',
  },
  {
    title: '10. Limitation of Liability',
    text: 'To the fullest extent permitted by law, Lade Studio is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or products.',
  },
  {
    title: '11. Governing Law',
    text: 'These Terms are governed by the laws of India, and disputes shall be subject to the appropriate courts in Mumbai, Maharashtra, unless otherwise required by applicable law.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-35" />
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/14 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">Policies</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] text-white">
              Terms that keep
              <span className="block text-gradient">the experience clear</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Last updated: March 2026. These terms govern how you use the storefront and place orders through Lade Studio.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-4xl jewel-card rounded-[2.6rem] p-6 shadow-soft md:p-10">
          <p className="text-lg leading-8 text-neutral-600">
            Welcome to Lade Studio. By browsing, purchasing, or using our services, you agree to the terms below. These terms are intended to keep the shopping experience transparent, reliable, and safe for everyone using the platform.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.8rem] border border-neutral-200/80 bg-white/70 p-6 shadow-soft">
                <h2 className="font-display text-3xl font-bold text-neutral-900">{section.title}</h2>
                <p className="mt-4 leading-8 text-neutral-600">{section.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-neutral-200/80 bg-white/70 p-6 shadow-soft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">Helpful Links</p>
              <div className="mt-4 space-y-3">
                <Link href="/shipping" className="block text-sm font-semibold text-plum-700 transition-colors hover:text-plum-900">
                  Shipping Policy
                </Link>
                <Link href="/refunds" className="block text-sm font-semibold text-plum-700 transition-colors hover:text-plum-900">
                  Returns and Refunds
                </Link>
                <Link href="/privacy" className="block text-sm font-semibold text-plum-700 transition-colors hover:text-plum-900">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="jewel-dark rounded-[1.8rem] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">Contact</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white">Need clarification?</h2>
              <p className="mt-3 leading-8 text-white/70">
                Reach out to our team if you have legal, order, or policy-related questions before placing an order.
              </p>
              <div className="mt-5 space-y-1 text-white/86">
                <p>legal@ladestudio.com</p>
                <p>WhatsApp: +91 99999 99999</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
