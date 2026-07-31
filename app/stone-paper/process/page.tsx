import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import { ProductDemoVideo } from "@/components/golden-bridge/product-demo-video"
import { pageImages } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Manufacturing Process",
  description:
    "How our industrial packaging is manufactured. Stone paper production via extrusion and calendering, and PP woven bag manufacturing using weaving, cutting, sewing, and printing lines.",
}

const stonePaperSteps = [
  {
    number: "01",
    title: "Limestone Sourcing",
    description:
      "Raw calcium carbonate is sourced from certified European quarries. Only high-purity limestone (CaCO\u2083 \u2265 98%) is accepted into the production line, ensuring consistent material properties.",
  },
  {
    number: "02",
    title: "Grinding & Micronization",
    description:
      "The limestone is crushed and milled into ultra-fine powder, typically 1-3 microns. Uniform particle size is critical for the material\u2019s smoothness, printability, and tensile performance.",
  },
  {
    number: "03",
    title: "Compounding with HDPE",
    description:
      "The mineral powder is blended with 18-20% food-grade HDPE resin and processing aids. The HDPE acts as a binder. No bleaches, acids, solvents, or optical brighteners are used.",
  },
  {
    number: "04",
    title: "Extrusion",
    description:
      "The compound is melted and extruded under precise thermal control into a continuous film, producing uniform thickness and opacity without water consumption.",
  },
  {
    number: "05",
    title: "Calendering & Surface Treatment",
    description:
      "The film passes through heated calender rolls, setting its final thickness, density, and surface finish. Surface treatment optimizes the material for industrial printing compatibility.",
  },
  {
    number: "06",
    title: "Quality Control & Packaging",
    description:
      "Final rolls are slit, sheeted, and tested for whiteness, basis weight, tensile strength, and water resistance. Certified batches are palletized and shipped from our Luckau facility.",
  },
]

const ppWovenSteps = [
  {
    number: "01",
    title: "Polypropylene Extrusion",
    description:
      "Virgin polypropylene resin is extruded into flat yarn tapes with controlled denier weight and tenacity. UV stabilizers are added at this stage for outdoor-grade products.",
  },
  {
    number: "02",
    title: "Weaving",
    description:
      "Circular or flat looms weave the PP tapes into a fabric tube or flat sheet at specified mesh density. The woven structure distributes load stress evenly across the bag surface.",
  },
  {
    number: "03",
    title: "Coating & Lamination",
    description:
      "Optional PE inner coating for fine powder containment or BOPP lamination for enhanced moisture barrier and high-quality graphics. Uncoated options for breathable applications.",
  },
  {
    number: "04",
    title: "Printing",
    description:
      "Flexographic printing in up to 8 colors for branding, product information, and regulatory markings. Rotogravure printing available for high-detail photographic reproduction.",
  },
  {
    number: "05",
    title: "Cutting & Sewing",
    description:
      "Automated cutting to specified dimensions followed by industrial sewing for seam reinforcement. Block bottom, open mouth, and valve configurations are formed at this stage.",
  },
  {
    number: "06",
    title: "Quality Control & Dispatch",
    description:
      "Each batch is tested for load capacity, seam strength, dimensional accuracy, and print quality. Certified batches are bundled, palletized, and shipped to client specifications.",
  },
]

const facilityStats = [
  { value: "24,000", label: "m\u00B2 facility" },
  { value: "70 km", label: "from Berlin" },
  { value: "2", label: "production lines" },
  { value: "100%", label: "German engineering" },
]

export default function ProcessPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Manufacturing Process"
        title={
          <>
            Precision Manufacturing
            <br className="hidden md:block" />
            for Industrial Packaging.
          </>
        }
        description="Integrated production lines for stone paper and PP woven bags, engineered for consistency, traceability, and reliable output quality."
        image={pageImages.process.hero}
        imageAlt="Interior of a modern packaging manufacturing facility"
      />

      {/* Overview */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Two production lines, one quality standard.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              Our Luckau facility operates integrated production lines for both
              stone paper bags and PP woven bags. Each line is configured for
              high-volume industrial output with German engineering standards
              applied to every stage of the manufacturing process.
            </p>
            <p>
              Stone paper production uses a mineral-based extrusion process that
              consumes virtually no water and requires no bleaching chemicals.
              PP woven bag manufacturing follows a weaving, converting, and
              printing workflow optimized for consistency and rapid turnaround.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border">
          {facilityStats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
                {s.value}
              </p>
              <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product demo video */}
      <section className="px-6 pb-24 md:px-12 lg:px-20 md:pb-32">
        <SectionHeading
          eyebrow="Product Demonstration"
          title="See our stone paper quality firsthand."
          description="A demonstration of stone paper\u2019s surface quality, writing performance, and material properties directly from our Luckau facility."
        />

        <div className="mx-auto max-w-4xl">
          <div className="relative group overflow-hidden bg-foreground rounded-lg">
            <ProductDemoVideo />
          </div>
        </div>
      </section>

      {/* Stone Paper Steps */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <SectionHeading
          eyebrow="Stone Paper Production"
          title="From raw limestone to finished packaging material."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {stonePaperSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-background p-8 md:p-12 relative"
              style={{
                gridColumn: index % 2 === 0 ? "1" : "2",
              }}
            >
              <div className="flex items-baseline gap-6 mb-6">
                <span className="text-5xl md:text-6xl font-extralight tracking-tight text-foreground/15 tabular-nums">
                  {step.number}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Step {step.number}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground">
                {step.title}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5" />
              <p className="text-sm leading-[1.8] text-muted-foreground max-w-md font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PP Woven Steps */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="PP Woven Bag Production"
          title="From polypropylene resin to finished industrial bags."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {ppWovenSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-background p-8 md:p-12 relative"
              style={{
                gridColumn: index % 2 === 0 ? "1" : "2",
              }}
            >
              <div className="flex items-baseline gap-6 mb-6">
                <span className="text-5xl md:text-6xl font-extralight tracking-tight text-foreground/15 tabular-nums">
                  {step.number}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Step {step.number}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground">
                {step.title}
              </h3>
              <div className="w-8 h-px bg-border mt-5 mb-5" />
              <p className="text-sm leading-[1.8] text-muted-foreground max-w-md font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality guarantee */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 overflow-hidden">
            <img
              src={pageImages.process.step2}
              alt="Quality control testing of packaging products"
              className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Quality Assurance
            </p>
            <h3 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-balance">
              Every batch is tested. Every shipment is certified.
            </h3>
            <p className="mt-6 text-base leading-[1.8] text-muted-foreground font-light">
              We apply German industrial quality standards across every production
              run, measuring tear strength, load capacity, moisture resistance,
              dimensional accuracy, and print quality before release. Each
              certified batch is fully traceable from raw material supplier
              to delivered pallet.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Visit Our Facility"
        title="Want to see the production process in person?"
        description="Qualified B2B partners can arrange a guided tour of our Luckau facility. Contact us to coordinate a visit with our production team."
        primaryHref="/stone-paper/contact"
        primaryLabel="Arrange a visit"
        secondaryHref="/stone-paper/product"
        secondaryLabel="Our products"
      />

      <Footer />
    </main>
  )
}
