import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { ApproachSection } from "@/components/golden-bridge/approach-section"
import { ProjectsSection } from "@/components/golden-bridge/projects-section"
import { ManufacturingVideo } from "@/components/golden-bridge/manufacturing-video"
import { images } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Industrial Packaging Solutions",
  description:
    "Stone paper bags and PP woven bags for agriculture, construction, chemicals, and food industries. Durable, moisture-resistant packaging engineered in Germany.",
}

const specs = [
  { label: "Stone Paper Basis Weight", value: "80 to 300 gsm" },
  { label: "Stone Paper Thickness", value: "95 to 350 \u00B5m" },
  { label: "Stone Paper Tear Resistance", value: "2-3x standard paper" },
  { label: "Stone Paper Water Resistance", value: "Naturally waterproof" },
  { label: "PP Woven Load Capacity", value: "Up to 50 kg+" },
  { label: "PP Woven Denier Range", value: "600D to 1200D" },
  { label: "PP Woven UV Stabilization", value: "Available" },
  { label: "PP Woven Coating Options", value: "Laminated / Unlaminated" },
]

const applications = [
  {
    industry: "Agriculture",
    products: "Rice, grain, animal feed, seeds, fertilizer",
    solution: "PP woven bags with UV stabilization for outdoor storage; stone paper bags for premium grain packaging",
  },
  {
    industry: "Construction",
    products: "Cement, sand, dry mortar, plaster",
    solution: "Heavy-duty PP woven bags rated for 25-50 kg loads with reinforced seams and block-bottom design",
  },
  {
    industry: "Chemicals",
    products: "Fertilizers, industrial chemicals, minerals",
    solution: "Laminated PP woven bags and moisture-resistant stone paper bags for sensitive chemical products",
  },
  {
    industry: "Food & Ingredients",
    products: "Flour, sugar, spices, food additives",
    solution: "Food-grade compliant packaging with custom printing and barrier protection options",
  },
]

export default function ProductPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Our Products"
        title={
          <>
            Reliable Industrial
            <br className="hidden md:block" />
            Packaging Solutions.
          </>
        }
        description="Two product lines engineered for performance: stone paper bags offering durability and moisture resistance, and PP woven bags built for high-capacity industrial applications."
        image={images.product}
        imageAlt="Industrial packaging products including stone paper and PP woven bags"
      />

      {/* Product overview */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Product Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Packaging that solves real industrial challenges.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              Traditional paper packaging fails under heavy loads, absorbs moisture,
              and tears easily during transport and handling. Our product lines are
              engineered to address these specific problems with measurable performance
              improvements.
            </p>
            <p>
              <strong className="text-foreground font-normal">Stone Paper Bags</strong> are
              made from calcium carbonate and HDPE resin, resulting in a durable,
              moisture-resistant material that is stronger than traditional paper.
              The premium smooth surface supports high-quality printing and is suitable
              for both industrial and commercial applications.
            </p>
            <p>
              <strong className="text-foreground font-normal">PP Woven Bags</strong> are
              constructed from woven polypropylene fabric, providing high load capacity,
              reusable design, and long service life. Available with laminated or
              unlaminated finishes, customizable sizes, and flexographic printing.
            </p>
          </div>
        </div>
      </section>

      {/* Manufacturing Video */}
      <ManufacturingVideo />

      {/* Benefits */}
      <ApproachSection />

      {/* Specs table */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Technical Specifications"
          title="Performance data across product lines."
          description="Indicative ranges across our standard product catalog. Custom specifications, sizes, and configurations are available for qualified B2B partners."
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

      {/* Industry applications */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Industry Applications"
          title="Solutions designed for your sector."
          description="Our packaging is used across agriculture, construction, chemicals, and food industries. Each application is matched with the right product configuration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {applications.map((app, index) => (
            <div key={app.industry} className="bg-background p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-6 text-xl md:text-2xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
                {app.industry}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5 group-hover:w-12 transition-all duration-500" />
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">
                Products: {app.products}
              </p>
              <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
                {app.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product categories */}
      <ProjectsSection />

      <CtaBanner
        eyebrow="Samples &amp; Technical Data"
        title="Request product samples and technical datasheets."
        description="We provide sample packs, specification sheets, and detailed product data to qualified B2B partners across Europe. Tell us about your application requirements."
        primaryHref="/stone-paper/contact"
        primaryLabel="Request samples"
        secondaryHref="/stone-paper/process"
        secondaryLabel="Our manufacturing process"
      />

      <Footer />
    </main>
  )
}
