export const metadata = {
  title: 'Terms of Service | Lade Studio',
  description: 'Terms and Conditions for using Lade Studio website and purchasing products.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-neutral-600 leading-relaxed text-lg mb-12">
              Welcome to Lade Studio. These Terms of Service ("Terms") govern your use of our website, mobile application, and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              By accessing and using this website, you accept and agree to be bound by these Terms and our Privacy Policy. If you are using the website on behalf of an organization, you are agreeing to these Terms for that organization and representing that you have the authority to bind that organization to these Terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              2. Products and Orders
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              <strong>Product Information:</strong> We strive to display accurate product information including descriptions, pricing, images, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              <strong>Order Acceptance:</strong> Your receipt of an order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right to accept or decline your order for any reason.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              <strong>Pricing:</strong> All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Prices are subject to change without notice. In case of pricing errors, we reserve the right to cancel orders placed at the incorrect price.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              3. Payment Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We accept payments through UPI (Google Pay, PhonePe, Paytm, and other UPI apps). All payments are processed securely through authorized payment gateways. By providing payment details, you represent that you are authorized to use the payment method.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              <strong>Payment Security:</strong> We do not store your complete payment card details. All transactions are processed through secure payment gateways that comply with PCI-DSS requirements.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              <strong>Failed Payments:</strong> If your payment fails, the order will not be processed. You will need to retry payment or contact your bank/payment provider.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              4. Shipping and Delivery
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Shipping times are estimates and not guaranteed. We are not responsible for delays caused by circumstances beyond our control including weather, carrier delays, or customs (for international orders). Risk of loss and title for products pass to you upon delivery to the shipping carrier.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              For detailed shipping information, please refer to our <a href="/shipping" className="text-secondary underline">Shipping Policy</a>.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              5. Returns and Refunds
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We want you to be satisfied with your purchase. If you are not completely satisfied, you may return eligible products within 30 days of delivery. Please review our Returns and Refunds Policy for complete details on eligibility, process, and timelines.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Certain products are not eligible for return including intimate wear, earrings (for hygiene reasons), and personalized items. For more information, please refer to our <a href="/refunds" className="text-secondary underline">Returns & Refunds Policy</a>.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              6. User Accounts
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Some features of our website may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-8">
              <li>Provide accurate and complete information</li>
              <li>Update your information promptly to keep it current</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not share your account credentials with others</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              7. Intellectual Property
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              All content on this website including text, graphics, logos, images, audio clips, digital downloads, data compilations, and software is the property of Lade Studio or its content suppliers and is protected by Indian and international copyright laws.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from our website without our prior written consent.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              8. Prohibited Conduct
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-8">
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Interfere with or disrupt our website or servers</li>
              <li>Use automated systems to access our website without permission</li>
              <li>Collect user information without consent</li>
              <li>Engage in any activity that could damage or impair our services</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We do not warrant that the website will be uninterrupted, secure, or error-free. We make no guarantee regarding the accuracy, reliability, or completeness of any content on the website.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              10. Limitation of Liability
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LADESTUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF THE WEBSITE SHALL NOT EXCEED THE AMOUNT YOU PAID US FOR THE PRODUCTS GIVING RISE TO SUCH LIABILITY.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              11. Indemnification
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              You agree to indemnify, defend, and hold harmless Lade Studio, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, and expenses (including legal fees) arising out of or relating to your use of our website or violation of these Terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              12. Governing Law
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              13. Changes to Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a revised "Last updated" date. Your continued use of our website after such changes constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              14. Severability
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mt-12 mb-6">
              15. Contact Information
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="text-neutral-900 font-medium mb-2">Lade Studio</p>
              <p className="text-neutral-600 mb-1">Email: legal@ladestudio.com</p>
              <p className="text-neutral-600 mb-1">WhatsApp: +91 99999 99999</p>
              <p className="text-neutral-600">Business Hours: Mon - Sat, 9 AM - 7 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
