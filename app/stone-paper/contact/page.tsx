import type { Metadata } from "next"
import { Mail, MapPin, Phone, Printer } from "lucide-react"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { ContactForm } from "@/components/golden-bridge/contact-form"
import { images, siteConfig } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Carthage GmbH for industrial packaging solutions. Request samples, technical datasheets, quotes, or schedule a facility visit.",
}

export default function ContactPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Discuss Your
            <br className="hidden md:block" />
            Packaging Requirements.
          </>
        }
        description="Samples, technical datasheets, quotes, and supply contracts. We respond to every enquiry from our Berlin office, usually within one business day."
        image={images.product}
        imageAlt="Industrial packaging products from Carthage"
      />

      {/* Contact grid */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column: info */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Direct contact
              </p>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground text-balance">
                Reach our team directly.
              </h2>
              <p className="mt-5 text-sm leading-[1.75] text-muted-foreground max-w-sm">
                Use the form for detailed enquiries about product specifications,
                sample requests, or bulk quotations. For quick questions, email or
                call us directly during German business hours.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="h-4 w-4 mt-1 text-foreground" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-foreground hover:underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="h-4 w-4 mt-1 text-foreground" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="text-sm text-foreground hover:underline underline-offset-4"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Fax */}
              <div className="flex items-start gap-4">
                <Printer className="h-4 w-4 mt-1 text-foreground" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Fax
                  </p>
                  <a
                    href="fax:+493034781222"
                    className="text-sm text-foreground hover:underline underline-offset-4"
                  >
                    +49 30 34781222
                  </a>
                </div>
              </div>

              {/* Headquarters */}
              <div className="flex items-start gap-4">
                <MapPin className="h-4 w-4 mt-1 text-foreground" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Headquarters
                  </p>
                  <p className="text-sm leading-[1.75] text-foreground">
                    {siteConfig.headquarters.street}
                    <br />
                    {siteConfig.headquarters.city}
                    <br />
                    {siteConfig.headquarters.country}
                  </p>
                </div>
              </div>

              {/* Production Facility */}
              <div className="flex items-start gap-4">
                <MapPin className="h-4 w-4 mt-1 text-foreground" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Production Facility
                  </p>
                  <p className="text-sm leading-[1.75] text-foreground">
                    {siteConfig.facility.street}
                    <br />
                    {siteConfig.facility.city}
                    <br />
                    {siteConfig.facility.country}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {siteConfig.facility.note}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right column: form */}
          <div className="lg:col-span-8">
            <div className="border border-border bg-background p-8 md:p-12 lg:p-14">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Send us a message
              </p>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground mb-10 text-balance">
                Tell us about your packaging requirements.
              </h2>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Office hours banner */}
      <section className="px-6 py-16 md:px-12 lg:px-20 md:py-20 bg-foreground text-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-4">
              Office Hours
            </p>
            <p className="text-sm leading-[1.75] text-background/70">
              Monday to Friday
              <br />
              09:00 to 18:00 CET
            </p>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-4">
              Average Response
            </p>
            <p className="text-sm leading-[1.75] text-background/70">
              Within one business day,
              <br />
              directly from our Berlin office.
            </p>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-4">
              Languages
            </p>
            <p className="text-sm leading-[1.75] text-background/70">
              English &middot; German
              <br />
              (others on request)
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
