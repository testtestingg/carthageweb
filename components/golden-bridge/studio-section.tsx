"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

const stats = [
  { value: "2021", label: "Founded" },
  { value: "24,000", label: "m\u00B2 Facility" },
  { value: "2", label: "Product Lines" },
  { value: "8+", label: "Industries Served" },
]

export function StudioSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  return (
    <section id="about" className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-8">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            Smarter Packaging for Modern Industries.
          </h2>

          <Link
            href="/stone-paper/about"
            className="group mt-10 inline-flex items-center gap-3 text-sm tracking-wide text-background/60 hover:text-background transition-colors duration-500"
          >
            <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500">
              About our company
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div
          ref={bodyRef}
          className={`flex flex-col justify-end gap-10 transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col gap-6 max-w-lg">
            <p className="text-sm leading-[1.75] text-background/60">
              Carthage GmbH is a German manufacturing company
              headquartered in Berlin, with a production facility in Luckau,
              Brandenburg. We specialize in producing high-performance stone paper
              bags and PP woven bags for industrial and commercial applications.
            </p>
            <p className="text-sm leading-[1.75] text-background/60">
              Our packaging solutions address the real-world challenges faced by
              industries handling heavy loads, moisture-sensitive materials, and
              products requiring reliable transport and long-term storage. From
              agriculture to construction, we deliver packaging that performs.
            </p>
            <p className="text-sm leading-[1.75] text-background/60">
              With a 24,000 m&sup2; production facility just 70 km from Berlin,
              we combine German engineering precision with scalable manufacturing
              capacity to serve B2B clients across Europe.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-background/10">
            {stats.map((stat) => (
              <div key={stat.label} className="group/stat">
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight group-hover/stat:translate-y-[-2px] transition-transform duration-300">
                  {stat.value}
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-background/35 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
