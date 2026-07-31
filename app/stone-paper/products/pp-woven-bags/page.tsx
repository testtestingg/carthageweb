import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { images } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "PP Woven Bags: Heavy-Duty Industrial Packaging",
  description:
    "High-capacity PP woven bags for agriculture, construction, and chemicals. Durable, reusable packaging rated for 25-50 kg loads with laminated and unlaminated options.",
}

const features = [
  {
    title: "High Load Capacity",
    description:
      "PP woven bags are engineered to safely contain and transport products weighing 25-50 kg without tearing or deforming. Reinforced seams and block-bottom designs distribute weight evenly, making them ideal for heavy-duty industrial applications.",
  },
  {
    title: "Durable & Reusable",
    description:
      "Unlike single-use paper bags, PP woven bags are designed for multiple handling cycles and storage conditions. The woven polypropylene fabric maintains structural integrity through repeated use, stacking, and transport without degradation.",
  },
  {
    title: "Moisture & Chemical Resistant",
    description:
      "Polypropylene provides inherent resistance to moisture, oils, and many industrial chemicals. Laminated options offer additional barrier protection for sensitive products, while unlaminated versions work well for dry applications.",
  },
  {
    title: "Cost-Effective at Scale",
    description:
      "The durable, reusable nature of PP woven bags reduces cost per use over the product lifecycle. Lower material costs combined with extended service life make PP woven bags an economical choice for high-volume packaging operations.",
  },
]

const specs = [
  { label: "Material", value: "Woven Polypropylene (PP)" },
  { label: "Denier Range", value: "600D to 1200D" },
  { label: "Load Capacity", value: "25-50 kg+" },
  { label: "Tear Resistance", value: "High tensile strength" },
  { label: "Moisture Resistance", value: "Inherently resistant" },
  { label: "UV Stabilization", value: "Available on request" },
  { label: "Coating Options", value: "Laminated / Unlaminated" },
  { label: "Closure Types", value: "Heat-sealed, stitched, adhesive" },
  { label: "Reusable Cycles", value: "100+ uses (depending on application)" },
  { label: "Custom Sizes", value: "Available on request" },
]

const applications = [
  {
    title: "Agricultural Products",
    description:
      "Rice, grain, seeds, fertilizers, and animal feed. PP woven bags with UV stabilization protect products from environmental exposure during outdoor storage and extended transport.",
  },
  {
    title: "Construction Materials",
    description:
      "Cement, sand, dry mortar, gypsum plaster, and aggregates. Heavy-duty construction designed to withstand 25-50 kg loads with reinforced seams and block-bottom configurations.",
  },
  {
    title: "Chemical Products",
    description:
      "Industrial chemicals, minerals, and specialized additives. Laminated PP woven bags provide additional barrier protection against moisture and chemical interaction with packaging materials.",
  },
  {
    title: "Food & Ingredient Packaging",
    description:
      "Flour, sugar, spices, cocoa, and food additives. Food-grade compliant PP woven bags maintain product integrity with moisture and contamination resistance throughout the supply chain.",
  },
]

const customization = [
  { title: "Dimensions", description: "Custom widths, heights, and gusset sizes. Block-bottom designs for improved stability and stacking. Configurations optimized for your palletizing equipment." },
  { title: "Printing", description: "Flexographic printing with up to 8 colors. Full-coverage branding options for agricultural, construction, and industrial applications. Custom inks available." },
  { title: "Closures", description: "Heat-sealed seams, stitched closures, or adhesive strip options. Custom closure configurations matched to application requirements and handling procedures." },
  { title: "Lamination", description: "Laminated or unlaminated finishes. PE (polyethylene) lamination for additional moisture barrier. Kraft-laminated options for premium applications." },
]

export default function PPWovenBagsPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="PP Woven Bags"
        title={
          <>
            Heavy-Duty, Reusable
            <br className="hidden md:block" />
            Industrial Packaging.
          </>
        }
        description="PP woven bags deliver high load capacity and long service life for agriculture, construction, chemicals, and food industries. Durable, moisture-resistant, and engineered for demanding industrial applications."
        image={images.image11}
        imageAlt="PP woven bags for heavy-duty industrial and agricultural packaging"
      />

      {/* Product Overview */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Product Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Engineered for weight, durability, and reuse.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              PP woven bags are constructed from tightly woven polypropylene fabric,
              creating a material capable of safely containing and transporting loads
              of 25-50 kg or more. Unlike paper-based packaging that deteriorates
              with each use, polypropylene maintains structural integrity through
              repeated handling cycles, making PP woven bags a long-term, cost-effective
              packaging solution.
            </p>
            <p>
              Available with laminated or unlaminated finishes, PP woven bags provide
              flexible barrier properties suited to different product types. The robust
              construction, combined with customizable sizes, closures, and printing
              options, makes PP woven bags ideal for bulk commodity packaging across
              agriculture, construction, chemicals, and food industries.
            </p>
            <div className="bg-secondary/40 p-6 mt-2">
              <p className="text-[11px] tracking-[0.2em] uppercase text-foreground mb-3 font-medium">
                Key Benefits
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Rated for 25-50 kg loads</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Reusable for 100+ cycles</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Laminated and unlaminated options</li>
                <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">&#10003;</span> Custom printing available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Performance Characteristics"
          title="Built for heavy-duty industrial use."
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
          description="Standard specification ranges for our PP woven bag product line. Custom configurations available for qualified B2B partners."
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
          title="Trusted across industries for demanding applications."
          description="PP woven bags are the preferred choice for high-volume, heavy-duty packaging where durability and reusability provide measurable cost benefits."
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

      <CtaBanner
        eyebrow="Request Information"
        title="Discuss your PP woven bag requirements with our team."
        description="We provide samples, technical datasheets, and custom quotations for industrial and agricultural packaging projects across Europe."
        primaryHref="/stone-paper/contact"
        primaryLabel="Request a quote"
        secondaryHref="/stone-paper/products/bags"
        secondaryLabel="Stone paper bags"
      />

      <Footer />
    </main>
  )
}
