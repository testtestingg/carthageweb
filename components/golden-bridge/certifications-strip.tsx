"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"
import { certifications } from "@/components/golden-bridge/certifications-data"

/**
 * Compact teaser for the SGS test reports. Dropped onto pages where a
 * procurement reader is already thinking about compliance, so they reach the
 * full reports without hunting through the navigation.
 */
export function CertificationsStrip() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 md:py-28 bg-secondary/40">
      <div
        ref={ref}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-6">
            Third-Party Testing
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight leading-[1.2] tracking-tight text-foreground text-balance">
            Verified by SGS.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-[1.75] text-muted-foreground font-light">
            Our stone paper and PP woven composite bag has been tested for EU food
            contact compliance, REACH SVHC content and physical performance.
          </p>
          <Link
            href="/stone-paper/certifications"
            className="group mt-8 inline-flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">
              View all reports
            </span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={`/stone-paper/certifications#${cert.id}`}
              className="group bg-background p-6 md:p-8 hover:bg-secondary/30 transition-colors duration-300"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/60">
                {cert.category}
              </p>
              <div className="w-8 h-px bg-border mt-4 mb-4 group-hover:w-12 transition-all duration-500" />
              <p className="text-sm leading-[1.6] text-foreground font-light">
                {cert.title}
              </p>
              <p className="mt-4 text-[10px] tracking-[0.1em] text-muted-foreground/50 tabular-nums">
                SGS &middot; {cert.reportNumber}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
