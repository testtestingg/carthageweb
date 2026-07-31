import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { EditorialBreak } from "@/components/golden-bridge/editorial-break"
import { images, siteConfig } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Carthage GmbH is a German manufacturing company producing stone paper bags and PP woven bags for industrial applications. Headquartered in Berlin with production in Luckau.",
}

const milestones = [
  {
    year: "2021",
    title: "Company founded in Berlin",
    description:
      "Carthage GmbH is established as a manufacturing and trading company focused on advanced packaging solutions. The founding team brings together expertise in mineral processing, polymer engineering, and European supply chain management.",
  },
  {
    year: "2022",
    title: "Facility acquired in Luckau",
    description:
      "A 24,000 m\u00B2 industrial site in Brandenburg is selected for our production operations, strategically located 70 km from Berlin with direct rail and highway connections to major European distribution hubs.",
  },
  {
    year: "2023",
    title: "German engineering partnerships",
    description:
      "Collaboration with leading German mechanical engineering firms to configure extrusion, calendering, and woven fabric production lines for high-volume industrial packaging output.",
  },
  {
    year: "2024",
    title: "First production lines commissioned",
    description:
      "Stone paper production line and PP woven bag manufacturing lines are commissioned, achieving target specifications for tear strength, moisture resistance, and load capacity across the full product range.",
  },
  {
    year: "2025",
    title: "B2B market expansion",
    description:
      "First long-term supply contracts signed with European industrial clients in agriculture, construction, and food processing. Government-supported B2B platform onboarding enables direct domestic buyer access.",
  },
  {
    year: "2026",
    title: "Scaling production capacity",
    description:
      "Expansion of manufacturing capacity to meet growing demand across DACH markets and Northern Europe. Development of specialized product configurations for sector-specific packaging requirements.",
  },
]

const values = [
  {
    title: "Engineering-led quality",
    description:
      "Every product, every production run, and every quality checkpoint is governed by German industrial standards. We invest in precision manufacturing equipment to deliver consistent, reliable packaging.",
  },
  {
    title: "Solution-oriented approach",
    description:
      "We do not sell bags. We solve packaging problems. Our technical team works with clients to match the right product configuration to their specific load, storage, and transport requirements.",
  },
  {
    title: "Transparent supply chain",
    description:
      "Raw materials are fully traceable. Our European-sourced limestone and polypropylene supply chains are documented and auditable, providing the compliance assurance B2B buyers require.",
  },
  {
    title: "Responsible manufacturing",
    description:
      "Stone paper reduces the use of wood pulp. PP woven bags are reusable and recyclable. We pursue responsible manufacturing practices while being transparent about our material choices.",
  },
]

const capabilities = [
  {
    title: "Stone Paper Production",
    description:
      "Extrusion and calendering lines producing stone paper from 80-300 gsm, with surface treatment optimization for print-ready packaging substrates.",
  },
  {
    title: "PP Woven Bag Manufacturing",
    description:
      "Full weaving, cutting, sewing, and printing lines for PP woven bags in block bottom, open mouth, valve, and bulk container configurations.",
  },
  {
    title: "Quality Assurance",
    description:
      "In-house testing for tear strength, load capacity, moisture resistance, and print quality. Batch-level traceability from raw material to finished product.",
  },
  {
    title: "Custom Engineering",
    description:
      "Technical consultation for custom bag dimensions, coating specifications, printing requirements, and filling line compatibility. Short lead times for sampling.",
  },
]

export default function AboutPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="About Us"
        title={
          <>
            A German manufacturing company
            <br className="hidden md:block" /> built for industrial performance.
          </>
        }
        description="Carthage GmbH produces high-performance packaging solutions for companies that cannot afford packaging failures."
        image={images.factory}
        imageAlt="Carthage production facility"
      />

      {/* Company story */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Our Company
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              A reliable German partner for industrial packaging.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              Carthage GmbH is a German manufacturing and
              trading company headquartered in Berlin, with production operations
              in Luckau, Brandenburg. We specialize in two core product lines:
              stone paper bags and PP woven bags, both engineered for demanding
              industrial and commercial applications.
            </p>
            <p>
              Our products serve industries where traditional packaging consistently
              fails: agriculture, construction, chemicals, and food processing.
              Heavy loads tear conventional bags. Moisture destroys contents.
              Weak materials create waste and logistics problems. We address these
              challenges with packaging solutions built on measurable performance data.
            </p>
            <p>
              We work directly with procurement teams, logistics managers, and
              packaging engineers to specify the right solution for each application.
              Every project starts with understanding the product being packaged,
              the filling method, the storage conditions, and the transport requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-8">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
              Reliable industrial packaging, engineered in Germany.
            </h2>
            <p className="mt-8 text-base leading-[1.8] text-background/60 font-light max-w-lg">
              Our mission is to provide European industries with packaging solutions
              that are durable, consistent, and technically specified for their
              exact requirements. Backed by German production standards and a
              transparent supply chain.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-10">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-8">
                Our Vision
              </p>
              <p className="text-xl md:text-2xl font-extralight leading-[1.35] tracking-tight text-balance">
                A European manufacturing ecosystem where industrial packaging
                is produced locally with consistent quality, responsible material
                sourcing, and technical precision.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-background/10">
              <div>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  2021
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  Founded
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  24,000
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  m&sup2; Facility
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  2
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  Product Lines
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  8+
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  Industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialBreak />

      {/* Values */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Four principles that guide every decision."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-background p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-8 text-xl md:text-2xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
                {value.title}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5 group-hover:w-12 transition-all duration-500" />
              <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Our Capabilities"
          title="A facility built for industrial-scale production."
          description="Our Luckau facility houses integrated production lines for both stone paper and PP woven bag manufacturing, supported by in-house quality assurance and custom engineering."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {capabilities.map((item, index) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-6 text-lg font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
                {item.title}
              </h3>
              <div className="w-6 h-px bg-border mt-4 mb-4 group-hover:w-10 transition-all duration-500" />
              <p className="text-sm leading-[1.75] text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Timeline"
          title="From a Berlin start-up to a European production facility."
        />

        <div className="divide-y divide-border">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 group hover:bg-background/50 transition-colors duration-300 px-2 -mx-2"
            >
              <div className="md:col-span-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                {m.year}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg md:text-xl font-light tracking-tight text-foreground">
                  {m.title}
                </h3>
              </div>
              <p className="md:col-span-6 text-sm leading-[1.75] text-muted-foreground font-light">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Where We Are"
          title="Two locations, one integrated supply chain."
          description="Our headquarters in Berlin manages business development, partnerships, and administration. Our Luckau facility handles the full production cycle from raw material intake to finished product dispatch."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="border-l border-border pl-8 group hover:border-foreground/30 transition-colors duration-500">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
              Headquarters
            </p>
            <p className="text-sm leading-[1.85] text-foreground/75">
              {siteConfig.headquarters.street}
              <br />
              {siteConfig.headquarters.city}
              <br />
              {siteConfig.headquarters.country}
            </p>
            <p className="text-sm text-muted-foreground mt-4">{siteConfig.phone}</p>
            <p className="text-xs text-muted-foreground/60 mt-3">
              Business development, partnerships, administration
            </p>
          </div>
          <div className="border-l border-border pl-8 group hover:border-foreground/30 transition-colors duration-500">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
              Production Facility
            </p>
            <p className="text-sm leading-[1.85] text-foreground/75">
              {siteConfig.facility.street}
              <br />
              {siteConfig.facility.city}
              <br />
              {siteConfig.facility.country}
            </p>
            <p className="text-sm text-muted-foreground mt-4">{siteConfig.facility.note}</p>
            <p className="text-xs text-muted-foreground/60 mt-3">
              Production, quality control, warehousing, dispatch
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Work With Us"
        title="Ready to discuss your packaging requirements?"
        description="We support industrial clients across agriculture, construction, chemicals, and food processing with samples, technical specifications, and long-term supply contracts."
        primaryHref="/stone-paper/contact"
        primaryLabel="Contact our team"
        secondaryHref="/stone-paper/product"
        secondaryLabel="See our products"
      />

      <Footer />
    </main>
  )
}
