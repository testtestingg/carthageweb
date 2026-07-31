import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { siteConfig } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Carthage privacy policy and data protection information.",
}

export default function PrivacyPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Information about how we collect, process, and protect your personal data."
        image="/golden-bridge/image3.png"
        imageAlt="Privacy and data protection"
      />

      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground mb-6">
              Data Protection and Privacy
            </h2>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              Carthage GmbH ("we," "us," "our," or "Company") takes the protection of your personal data very seriously. This Privacy Policy explains how we collect, use, process, and protect your personal information in compliance with the General Data Protection Regulation (GDPR), the German Federal Data Protection Act (Bundesdatenschutzgesetz – BDSG), and other applicable German and European data protection laws.
            </p>
          </div>

          {/* 1. Responsible Party */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              1. Responsible Party (Verantwortlicher)
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              The responsible party for data processing under the GDPR is:
            </p>
            <div className="bg-secondary/20 p-6 rounded-lg">
              <p className="font-semibold text-foreground">Carthage GmbH</p>
              <p className="text-muted-foreground">{siteConfig.headquarters.street}</p>
              <p className="text-muted-foreground">{siteConfig.headquarters.city}, {siteConfig.headquarters.country}</p>
              <p className="text-muted-foreground mt-2">Email: {siteConfig.email}</p>
              <p className="text-muted-foreground">Phone: {siteConfig.phone}</p>
            </div>
          </div>

          {/* 2. Data Protection Officer */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              2. Data Protection Officer (Datenschutzbeauftragter)
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              We have appointed a Data Protection Officer as required by the GDPR. You can reach our DPO for any data protection concerns at: {siteConfig.email}
            </p>
          </div>

          {/* 3. Collection and Processing of Data */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              3. Collection and Processing of Personal Data
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">3.1 Data from Contact Forms</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mb-2">
                  When you submit a contact form on our website, we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base leading-[1.8] text-muted-foreground font-light">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Company name (if applicable)</li>
                  <li>Message content</li>
                </ul>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mt-2">
                  <strong>Legal basis:</strong> Article 6(1)(a) GDPR (consent) and Article 6(1)(b) GDPR (contract preparation).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">3.2 Automatically Collected Data</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mb-2">
                  We automatically collect certain information about your device and browsing behavior:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base leading-[1.8] text-muted-foreground font-light">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referrer URL</li>
                  <li>Device type</li>
                </ul>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mt-2">
                  <strong>Legal basis:</strong> Article 6(1)(f) GDPR (legitimate interest) for website optimization and security.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">3.3 Cookies and Tracking Technologies</h4>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  We use cookies for website functionality, analytics, and user preferences. You can control cookie settings in your browser. Persistent cookies are only used with your explicit consent.
                </p>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mt-2">
                  <strong>Legal basis:</strong> Article 6(1)(a) GDPR (consent) and Article 6(1)(f) GDPR (legitimate interest).
                </p>
              </div>
            </div>
          </div>

          {/* 4. Purpose of Data Processing */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              4. Purpose of Data Processing
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              We process your personal data only for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li>Responding to your inquiries and requests</li>
              <li>Providing customer support and services</li>
              <li>Processing business transactions</li>
              <li>Improving our website and services</li>
              <li>Compliance with legal obligations</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Marketing communications (only with consent)</li>
            </ul>
          </div>

          {/* 5. Data Retention */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              5. Data Retention (Speicherdauer)
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              We retain your personal data only as long as necessary for the purposes listed above:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li><strong>Contact form data:</strong> Up to 3 years for legal and business purposes</li>
              <li><strong>Website logs:</strong> Maximum 30 days for security analysis</li>
              <li><strong>Marketing communications:</strong> Until you unsubscribe</li>
              <li><strong>Business transactions:</strong> 7 years as required by German tax law (HGB, AStG)</li>
            </ul>
          </div>

          {/* 6. Recipients of Data */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              6. Recipients of Personal Data
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              Your personal data may be shared with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li>Our employees and contractors bound by confidentiality</li>
              <li>Service providers (hosting, email, analytics)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners for contract fulfillment</li>
            </ul>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mt-4">
              We do not sell or share your data for commercial purposes.
            </p>
          </div>

          {/* 7. Your Rights */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              7. Your Rights Under GDPR
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
              <li><strong>Right of Access (Art. 15 GDPR):</strong> Request a copy of your data</li>
              <li><strong>Right to Rectification (Art. 16 GDPR):</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure (Art. 17 GDPR):</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to Restrict Processing (Art. 18 GDPR):</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability (Art. 20 GDPR):</strong> Receive your data in a structured format</li>
              <li><strong>Right to Object (Art. 21 GDPR):</strong> Oppose certain processing activities</li>
              <li><strong>Right to Withdraw Consent (Art. 7 GDPR):</strong> Withdraw consent at any time</li>
            </ul>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mt-4">
              To exercise these rights, please contact us at {siteConfig.email}.
            </p>
          </div>

          {/* 8. Data Security */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              8. Data Security (Datensicherheit)
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include SSL/TLS encryption, firewalls, regular security audits, and limited access controls. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          {/* 9. International Data Transfers */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              9. International Data Transfers
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              Your data is primarily processed within the EU/EEA. If we transfer data outside the EU/EEA, we ensure appropriate safeguards such as Standard Contractual Clauses (SCCs) are in place, as required by GDPR Article 46.
            </p>
          </div>

          {/* 10. Third-Party Links */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              10. Third-Party Links
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          {/* 11. Contact & Complaints */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              11. Contact & Complaints (Beschwerderecht)
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at {siteConfig.email}.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              You also have the right to lodge a complaint with the relevant data protection authority (Datenschutzbeauftragte) in your jurisdiction.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h3 className="text-xl font-extralight tracking-tight text-foreground mb-4">
              12. Changes to This Privacy Policy
            </h3>
            <p className="text-base leading-[1.8] text-muted-foreground font-light">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of our website constitutes acceptance of these changes.
            </p>
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
