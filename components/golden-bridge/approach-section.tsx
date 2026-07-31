"use client"
 
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

const principles = [
  {
    number: "01",
    title: "High Tear Resistance",
    description:
      "Our stone paper bags deliver 2-3x the tear resistance of standard paper packaging. PP woven bags withstand heavy loads without splitting, even under rough handling during transport and stacking.",
  },
  {
    number: "02",
    title: "Moisture Resistance",
    description:
      "Stone paper is naturally waterproof, protecting contents from moisture damage without additional coatings. PP woven bags are available with laminated and coated options for enhanced barrier protection.",
  },
  {
    number: "03",
    title: "Load Capacity",
    description:
      "PP woven bags are rated for loads up to 50 kg and beyond, with reinforced seams and customizable denier weight. Stone paper bags provide reliable performance for medium-duty commercial applications.",
  },
  {
    number: "04",
    title: "Custom Printing",
    description:
      "Both product lines support high-quality custom printing. Stone paper offers a premium smooth surface for offset, UV, and digital print. PP woven bags support flexographic and rotogravure printing.",
  },
  {
    number: "05",
    title: "UV &amp; Chemical Resistant",
    description:
      "PP woven bags are available with UV-stabilized material for outdoor storage. Stone paper is resistant to oil, grease, and most chemicals, making both solutions suitable for demanding environments.",
  },
  {
    number: "06",
    title: "Recyclable Materials",
    description:
      "Stone paper is recyclable back into stone paper through standard thermoplastic recycling streams. PP woven bags are made from recyclable polypropylene and offer extended reusability across multiple cycles.",
  },
]

function PrincipleCard({ principle, index }: { principle: typeof principles[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <div
      ref={ref}
      className={`bg-background p-8 md:p-12 group transition-all duration-700 hover:bg-secondary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-10">
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
          ({principle.number})
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground mb-5 group-hover:translate-x-1 transition-transform duration-500">
        {principle.title}
      </h3>
      <div className="w-8 h-px bg-border mb-5 group-hover:w-12 transition-all duration-500" />
      <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
        {principle.description}
      </p>
    </div>
  )
}

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="benefits" className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
      <div
        ref={ref}
        className={`mb-16 md:mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Technical Advantages
        </p>
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground text-balance max-w-3xl">
          Built for Performance.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted-foreground font-light">
          Our packaging solutions are engineered to solve real industrial challenges: 
          tearing under heavy loads, moisture damage during storage, and the limitations 
          of traditional paper packaging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.number} principle={principle} index={index} />
        ))}
      </div>
    </section>
  )
}
