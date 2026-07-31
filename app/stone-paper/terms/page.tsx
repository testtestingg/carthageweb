import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { siteConfig } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Carthage terms of service and general conditions.",
}

export default function TermsPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="General terms and conditions for using our website and services."
        image="/golden-bridge/image5.png"
        imageAlt="Terms and conditions"
      />

      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground mb-6">
              Terms of Service
            </h2>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              Welcome to Carthage GmbH ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our services.
            </p>
          </div>

          {/* 1. General Terms */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              1. General Terms
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1.1 Scope</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  These Terms apply to all users of our website and any services we provide, whether you are a B2B customer, retailer, or general visitor.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">1.2 Company Information</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mb-2">
                  Carthage GmbH<br/>
                  {siteConfig.headquarters.street}<br/>
                  {siteConfig.headquarters.city}, {siteConfig.headquarters.country}<br/>
                  Email: {siteConfig.email}<br/>
                  Phone: {siteConfig.phone}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">1.3 Changes to Terms</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  We reserve the right to modify these Terms at any time. Continued use of our website after changes constitutes acceptance of the updated Terms. We recommend reviewing these Terms regularly.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Use License */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              2. Use License
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our website for legitimate business or informational purposes. You agree not to:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li>Reproduce, duplicate, copy, sell, or resell materials without permission</li>
              <li>Use automated tools (scraping, bots) without written consent</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit viruses, malware, or harmful content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, threaten, or defame others</li>
              <li>Infringe on intellectual property rights</li>
            </ul>
          </div>

          {/* 3. Intellectual Property Rights */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              3. Intellectual Property Rights
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              All content on our website, including text, images, videos, logos, and designs, is the property of Carthage GmbH or our licensors. Protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or transmit any content without our explicit written permission.
            </p>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              Stone Paper® and related marks are trademarks of Carthage. Unauthorized use is prohibited.
            </p>
          </div>

          {/* 4. Product Information & Availability */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              4. Product Information & Availability
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">4.1 Accuracy</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  We strive to provide accurate product descriptions, specifications, and pricing. However, we do not warrant that all information is error-free or complete.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">4.2 Availability</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Products and services are subject to availability. We reserve the right to limit quantities or discontinue products at any time.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">4.3 Right of Refusal</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  We reserve the right to refuse or cancel any order at our discretion.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Ordering & Delivery */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              5. Ordering & Delivery
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">5.1 Order Process</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  By submitting an order, you make an offer to purchase. Our acceptance of your order creates a binding contract. Prices are subject to change without notice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">5.2 Pricing & Taxes</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  All prices are in EUR unless otherwise stated. German VAT (MwSt.) is included in the displayed price. Business customers may be eligible for VAT exemption under reverse-charge rules.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">5.3 Delivery Terms</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Delivery times are estimates and not guaranteed unless explicitly confirmed in writing. We are not liable for delays caused by force majeure, carrier issues, or customs procedures.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">5.4 Risk of Loss</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Risk of loss transfers to you upon delivery to the carrier. We recommend purchasing shipping insurance for high-value orders.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Payment Terms */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              6. Payment Terms
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              Payment is due according to the invoice terms (typically net 30 for B2B customers). We accept bank transfers, credit cards, and other methods as specified during checkout. Late payments may incur interest charges of 5% per annum above the base interest rate (gemäß § 288 BGB).
            </p>
          </div>

          {/* 7. Warranties & Disclaimers */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              7. Warranties & Disclaimers
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">7.1 Product Warranty</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Our stone paper products come with a 24-month warranty against defects in material and workmanship from the date of delivery. This does not cover damage from misuse, neglect, or normal wear and tear.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">7.2 Website Disclaimer</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Our website is provided "as is" without warranties of any kind. We do not warrant that:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base leading-[1.8] text-muted-foreground font-light mt-2">
                  <li>The website will be uninterrupted or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The site is free from viruses or malicious code</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">7.3 Limitation of Liability</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  To the fullest extent permitted by law, Carthage is not liable for indirect, incidental, special, or consequential damages arising from your use of our website or products.
                </p>
              </div>
            </div>
          </div>

          {/* 8. Return & Refund Policy */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              8. Return & Refund Policy (Widerrufsrecht)
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              Consumers have the right to withdraw from their purchase within 14 days from receipt of the product (gemäß § 312g BGB, § 355 BGB). To exercise this right:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light mb-4">
              <li>Notify us in writing at {siteConfig.email}</li>
              <li>Return the product in its original condition</li>
              <li>Include proof of purchase and return shipping costs (consumer bears costs)</li>
            </ul>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              Refunds will be processed within 30 days of receiving the returned product. Goods that show signs of use may be subject to depreciation. B2B customers: Different return terms apply per individual agreements.
            </p>
          </div>

          {/* 9. Liability for Defects */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              9. Liability for Defects (Mängelgewährleistung)
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              We guarantee our products are free from defects in material and workmanship for 24 months from delivery (gemäß § 437 BGB). If a defect is discovered:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li>Notify us immediately with photos and documentation</li>
              <li>We will offer repair or replacement at our discretion</li>
              <li>If repair/replacement is not possible, you may request a refund</li>
            </ol>
          </div>

          {/* 10. Governing Law & Jurisdiction */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              10. Governing Law & Jurisdiction
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              These Terms are governed by the laws of the Federal Republic of Germany (Bundesrepublik Deutschland), excluding conflict of law provisions. All disputes shall be governed by German law and adjudicated in the courts of Berlin, Germany.
            </p>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              For EU consumers: You also have the option to use the Online Dispute Resolution (ODR) platform: https://ec.europa.eu/consumers/odr
            </p>
          </div>

          {/* 11. Severability */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              11. Severability (Salvatorische Klausel)
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              If any provision of these Terms is invalid or unenforceable under German or EU law, the remaining provisions shall continue in full effect. The invalid provision shall be replaced with a valid provision that achieves the original economic purpose.
            </p>
          </div>

          {/* 12. Contact Information */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              12. Contact Information
            </h3>
            
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              For questions about these Terms or to exercise your rights, please contact us:
            </p>
            
            <div className="bg-secondary/20 p-6 rounded-lg">
              <p className="font-semibold text-foreground">Carthage GmbH</p>
              <p className="text-muted-foreground">{siteConfig.headquarters.street}</p>
              <p className="text-muted-foreground">{siteConfig.headquarters.city}, {siteConfig.headquarters.country}</p>
              <p className="text-muted-foreground mt-2">Email: {siteConfig.email}</p>
              <p className="text-muted-foreground">Phone: {siteConfig.phone}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last updated: April 2026
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
