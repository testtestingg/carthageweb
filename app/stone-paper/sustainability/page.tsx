import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { CertificationsStrip } from "@/components/golden-bridge/certifications-strip"
import { images } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Sustainability & Responsible Manufacturing",
  description:
    "Our approach to responsible packaging manufacturing. Stone paper reduces wood pulp usage. PP woven bags are reusable and recyclable. Transparent material sourcing and measurable impact.",
}

const impact = [
  {
    value: "0",
    unit: "trees",
    label: "Used in stone paper",
    description:
      "Stone paper is produced from calcium carbonate and HDPE resin. No wood pulp, no deforestation. This reduces pressure on forestry resources.",
  },
  {
    value: "~0",
    unit: "L",
    label: "Water per ton (stone paper)",
    description:
      "Stone paper production uses virtually no water. A significant reduction compared to conventional pulp-and-paper manufacturing processes.",
  },
  {
    value: "Multi",
    unit: "cycle",
    label: "PP woven bag reuse",
    description:
      "PP woven bags are designed for multiple use cycles, reducing total packaging consumption and waste generation across the supply chain.",
  },
  {
    value: "PP & SP",
    unit: "",
    label: "Recyclable materials",
    description:
      "Stone paper is recyclable through thermoplastic recycling streams. PP woven bags are made from recyclable polypropylene. Both product lines support material recovery.",
  },
]

const pillars = [
  {
    title: "Reduced wood pulp usage",
    description:
      "Stone paper replaces wood pulp with abundant limestone as its primary raw material. This reduces demand for forestry resources without claiming to eliminate environmental impact entirely.",
  },
  {
    title: "Lower water consumption",
    description:
      "Our stone paper production process uses virtually no water, compared to the significant water requirements of conventional pulp-and-paper manufacturing.",
  },
  {
    title: "Reusable packaging design",
    description:
      "PP woven bags are engineered for multiple use cycles, reducing the total volume of packaging material consumed. Extended service life means fewer bags produced and disposed of over time.",
  },
  {
    title: "Recyclable material choices",
    description:
      "Both stone paper (thermoplastic recycling) and PP woven bags (polypropylene recycling) can be recovered and reprocessed, supporting material circularity where recycling infrastructure exists.",
  },
  {
    title: "European supply chain",
    description:
      "Producing in Germany means shorter transport distances and fewer cross-border logistics requirements compared to importing packaging materials from Asia or other distant markets.",
  },
  {
    title: "Traceable sourcing",
    description:
      "We use limestone from European quarries and polypropylene from documented supply chains. Our materials are traceable and compliant with EU regulations.",
  },
]

export default function SustainabilityPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Sustainability"
        title={
          <>
            Responsible Manufacturing.
            <br className="hidden md:block" /> Honest Claims.
          </>
        }
        description="We do not claim to be perfectly sustainable. We pursue measurable improvements in material sourcing, production efficiency, and product lifecycle, and we are transparent about where we stand."
        image={images.sustainability}
        imageAlt="Raw materials and production environment for sustainable packaging manufacturing"
      />

      {/* Impact numbers */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Environmental Considerations"
          title="Measurable differences, honestly presented."
          description="These figures represent the material advantages of our products compared to conventional alternatives. We present them as improvements, not as complete solutions to environmental challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {impact.map((i) => (
            <div key={i.label} className="bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-300">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-extralight text-foreground tracking-tight">
                  {i.value}
                </span>
                {i.unit && (
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {i.unit}
                  </span>
                )}
              </div>
              <div className="w-10 h-px bg-border mt-6 mb-6 group-hover:w-14 transition-all duration-500" />
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                {i.label}
              </p>
              <p className="text-sm leading-[1.75] text-muted-foreground font-light">
                {i.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial quote */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-secondary/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7 overflow-hidden">
            <img
              src={images.sustainability}
              alt="Raw materials used in packaging production"
              className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="w-10 h-px bg-foreground/20 mb-8" />
            <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] font-extralight leading-[1.35] tracking-tight text-foreground text-balance">
              &ldquo;We believe in measurable improvement, not marketing claims. Every material choice we make is documented, traceable, and open to scrutiny.&rdquo;
            </blockquote>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-8">
              Carthage Manufacturing Statement
            </p>
          </div>
        </div>
      </section>

      {/* Six pillars */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Our Approach"
          title="How we pursue responsible manufacturing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="bg-background p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-8 text-xl md:text-2xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
                {pillar.title}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5 group-hover:w-12 transition-all duration-500" />
              <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Material lifecycle */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-6">
              Material Lifecycle
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] tracking-tight text-balance">
              End-of-life options for both product lines.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.85] text-background/65 font-light">
            <p>
              <strong className="text-background font-normal">Stone Paper:</strong> Can be 
              recycled back into stone paper through standard thermoplastic recycling streams. 
              The HDPE binder allows the material to be remelted and reformed. Under prolonged 
              UV exposure, stone paper photodegrades into calcium carbonate powder.
            </p>
            <p>
              <strong className="text-background font-normal">PP Woven Bags:</strong> Made 
              from recyclable polypropylene. After their useful service life (which spans 
              multiple use cycles), PP woven bags can be collected and recycled where 
              polypropylene recycling infrastructure is available.
            </p>
            <p>
              We are transparent that recycling outcomes depend on local infrastructure 
              and collection systems. We support our clients with material data that 
              facilitates correct waste stream classification.
            </p>
          </div>
        </div>
      </section>

      <CertificationsStrip />

      <CtaBanner
        eyebrow="Learn More"
        title="Want to understand how our products fit your sustainability requirements?"
        description="We provide material datasheets, lifecycle information, and compliance documentation to help procurement teams make informed packaging decisions."
        primaryHref="/stone-paper/contact"
        primaryLabel="Talk to our team"
        secondaryHref="/stone-paper/product"
        secondaryLabel="Our products"
      />

      <Footer />
    </main>
  )
}
