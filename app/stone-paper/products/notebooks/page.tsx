import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { images } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Stone Paper Notebooks: Durable Professional Stationery",
  description:
    "Premium stone paper notebooks for corporate and professional use. Waterproof, tear-resistant, and made from sustainable materials. Custom branding available for B2B orders.",
}

const features = [
  {
    title: "Water Resistant",
    description:
      "Stone paper is naturally water-resistant, protecting notes from spills and moisture. Suitable for field use, outdoor inspections, and environments where conventional paper would fail.",
  },
  {
    title: "High Durability",
    description:
      "Tear-resistant pages withstand frequent handling, transport, and daily professional use without degradation or fraying. Built for long-term reliability.",
  },
  {
    title: "Premium Writing Surface",
    description:
      "The smooth, bright-white stone paper surface delivers clean ink lines and fast drying times. Compatible with fountain pens, ballpoints, and fine-tip markers.",
  },
  {
    title: "Reduced Environmental Footprint",
    description:
      "Made from limestone and HDPE resin. No trees are harvested. Recyclable through thermoplastic recycling streams. An alternative to traditional paper stationery.",
  },
]

const customization = [
  {
    title: "Sizes",
    description: "Available in A5, A4, and custom sizes to match corporate and professional requirements.",
  },
  {
    title: "Binding",
    description: "Thread-bound, spiral, or perfect binding options. Lay-flat designs available for comfortable writing.",
  },
  {
    title: "Pages",
    description: "Lined, blank, dotted, or grid pages. Custom page layouts available for B2B orders.",
  },
  {
    title: "Branding",
    description: "Custom embossing, foil stamping, and printing for corporate identity, promotional, and gift applications.",
  },
]

export default function NotebooksPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Stone Paper Notebooks"
        title={
          <>
            Durable Professional
            <br className="hidden md:block" />
            Stationery.
          </>
        }
        description="Stone paper notebooks built for professionals who demand quality. Water-resistant, tear-resistant pages with a premium writing surface. Custom branding available for corporate orders."
        image={images.product}
        imageAlt="Stone paper notebooks for professional and corporate use"
      />

      {/* Product Overview */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Product Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Professional notebooks built to last.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              Our stone paper notebooks combine durable, mineral-based materials
              with premium craftsmanship. The stone paper used for the pages
              is naturally water-resistant and tear-resistant, delivering a
              writing experience that matches high-end traditional paper while
              offering superior durability in demanding environments.
            </p>
            <p>
              Suitable for corporate stationery programs, promotional products,
              field use, and professional settings where notebook quality reflects
              brand standards. Available with custom branding, sizing, and
              binding options for B2B orders.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Features"
          title="Performance and quality in every detail."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {features.map((feature, index) => (
            <div key={feature.title} className="bg-background p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-6 text-xl md:text-2xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
                {feature.title}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5 group-hover:w-12 transition-all duration-500" />
              <p className="text-sm leading-[1.8] text-muted-foreground font-light max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Options */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Customization"
          title="Configured to your specifications."
          description="Every notebook can be customized to match your brand identity and functional requirements, from size and binding to page layout and finishing."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {customization.map((item, index) => (
            <div key={item.title} className="bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-4 text-lg font-extralight tracking-tight text-foreground">
                {item.title}
              </h3>
              <div className="w-6 h-px bg-border mt-3 mb-3 group-hover:w-10 transition-all duration-500" />
              <p className="text-sm leading-[1.8] text-muted-foreground font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="B2B Orders"
        title="Request samples of our stone paper notebooks."
        description="We provide sample packs and bulk order quotations for corporate and promotional stationery projects across Europe."
        primaryHref="/stone-paper/contact"
        primaryLabel="Request samples"
        secondaryHref="/stone-paper/product"
        secondaryLabel="All products"
      />

      <Footer />
    </main>
  )
}
