import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { CertificationsStrip } from "@/components/golden-bridge/certifications-strip"
import { images } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Stone Paper Bags: Industrial Packaging",
  description:
    "Durable, moisture-resistant stone paper bags for industrial and commercial applications. Stronger than traditional paper, with a premium smooth surface and custom printing options.",
}

const features = [
  {
    title: "Durable Performance",
    description:
      "Stone paper delivers 2-3x the tear resistance of conventional paper bags. Engineered to withstand the demands of industrial handling, transport, and stacking without compromising structural integrity.",
  },
  {
    title: "Moisture Resistant",
    description:
      "Naturally waterproof without additional coatings or lamination. Contents remain protected from humidity, rain exposure during loading, and moisture damage during long-term warehouse storage.",
  },
  {
    title: "Premium Smooth Surface",
    description:
      "The calcium carbonate composition produces an exceptionally smooth, bright white surface that delivers superior printing results across offset, UV, digital, and inkjet printing methods.",
  },
  {
    title: "Reduced Environmental Impact",
    description:
      "Stone paper reduces the use of wood pulp by replacing it with abundant limestone. Recyclable through standard thermoplastic recycling streams. An alternative to traditional paper packaging.",
  },
]

const specs = [
  { label: "Material Composition", value: "~80% CaCO\u2083 + ~20% HDPE" },
  { label: "Basis Weight Range", value: "80 to 300 gsm" },
  { label: "Thickness Range", value: "95 to 350 \u00B5m" },
  { label: "Tear Resistance", value: "2-3x standard paper" },
  { label: "Water Resistance", value: "Naturally waterproof" },
  { label: "Oil / Grease Resistance", value: "Naturally resistant" },
  { label: "Print Compatibility", value: "Offset, UV, Digital, Inkjet" },
  { label: "Food Contact", value: "FDA compliant" },
  { label: "Recyclability", value: "Recyclable (thermoplastic stream)" },
  { label: "Custom Sizes", value: "Available on request" },
]

const applications = [
  {
    title: "Industrial Packaging",
    description:
      "Durable bags for packaging chemicals, minerals, and industrial materials where moisture resistance and tear strength are critical requirements.",
  },
  {
    title: "Food & Ingredient Packaging",
    description:
      "FDA-compliant stone paper bags for flour, sugar, spices, and food additives. Moisture barrier protects product quality throughout the supply chain.",
  },
  {
    title: "Agricultural Products",
    description:
      "Seed packaging, fertilizer bags, and specialty agricultural products that require protection from environmental exposure during storage and transport.",
  },
  {
    title: "Commercial & Retail",
    description:
      "Premium-feel bags with high-quality custom printing for brands that value both product protection and visual presentation at point of sale.",
  },
]

const customization = [
  { title: "Dimensions", description: "Custom widths, heights, and gusset sizes to match your product specifications and palletizing requirements." },
  { title: "Printing", description: "Full-color offset, UV, or digital printing. Up to 8-color flexographic printing for high-volume production runs." },
  { title: "Closures", description: "Heat-sealed, adhesive strip, fold-over, or sewn closures depending on application and automation requirements." },
  { title: "Finishes", description: "Embossing, foil stamping, matte/gloss treatments, and custom surface effects for branded packaging." },
]

export default function BagsPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Stone Paper Bags"
        title={
          <>
            Durable, Water-Resistant
            <br className="hidden md:block" />
            Packaging Solutions.
          </>
        }
        description="Stone paper bags offer high tear resistance and a premium surface suitable for industrial and commercial applications. An alternative to traditional paper packaging that reduces the use of wood pulp."
        image={images.image9}
        imageAlt="Stone paper bags for industrial and commercial packaging"
      />

      {/* Product Overview */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Product Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Stronger than traditional paper. Designed for modern packaging needs.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              Our stone paper bags are manufactured from approximately 80% calcium
              carbonate (limestone) and 20% non-toxic HDPE resin. This mineral-based
              composition produces a material that is inherently water-resistant,
              tear-resistant, and chemically stable, addressing the common failure
              points of traditional paper bags in industrial environments.
            </p>
            <p>
              The smooth, bright-white surface delivers exceptional print quality,
              making stone paper bags suitable for applications where both functional
              performance and visual presentation matter. From industrial bulk
              packaging to branded commercial packaging, these bags perform
              reliably across a wide range of conditions.
            </p>
            <div className="bg-secondary/40 p-6 mt-2">
              <p className="text-[11px] tracking-[0.2em] uppercase text-foreground mb-3 font-medium">
                Key Benefits
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Durable performance under heavy handling</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Custom printing available</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Alternative to traditional paper packaging</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Suitable for industrial and commercial applications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Performance Characteristics"
          title="Engineered for reliability and durability."
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

      {/* Technical Specifications */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Technical Specifications"
          title="Material and performance data."
          description="Standard specification ranges for our stone paper bag product line. Custom configurations available for qualified B2B partners."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-background flex items-center justify-between px-6 md:px-8 py-6 group hover:bg-secondary/30 transition-colors duration-300"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                {spec.label}
              </span>
              <span className="text-sm md:text-base font-light text-foreground text-right">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Applications"
          title="Designed for companies that value quality and innovation."
          description="Stone paper bags serve a wide range of industrial and commercial applications where traditional paper packaging falls short."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {applications.map((item, index) => (
            <div key={item.title} className="bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-4 text-lg font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
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

      {/* Customization */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Customization"
          title="Configured to your specifications."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {customization.map((item, index) => (
            <div key={item.title} className="bg-background p-8 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-4 text-base font-extralight tracking-tight text-foreground">
                {item.title}
              </h3>
              <div className="w-6 h-px bg-border mt-3 mb-3 group-hover:w-10 transition-all duration-500" />
              <p className="text-sm text-muted-foreground font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CertificationsStrip />

      <CtaBanner
        eyebrow="Request Information"
        title="Discuss your stone paper bag requirements with our team."
        description="We provide samples, technical datasheets, and custom quotations for industrial and commercial packaging projects across Europe."
        primaryHref="/stone-paper/contact"
        primaryLabel="Request a quote"
        secondaryHref="/stone-paper/products/pp-woven-bags"
        secondaryLabel="PP woven bags"
      />

      <Footer />
    </main>
  )
}
