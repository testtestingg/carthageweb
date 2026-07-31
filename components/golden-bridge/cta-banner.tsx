"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

interface CtaBannerProps {
  eyebrow?: string
  title: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function CtaBanner({
  eyebrow = "Next Step",
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Start a partnership",
  secondaryHref,
  secondaryLabel,
}: CtaBannerProps) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
      <div
        ref={ref}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-6">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-6 max-w-xl text-sm md:text-base leading-[1.75] text-background/55 font-light">
              {description}
            </p>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col gap-4 lg:items-end">
          <Link
            href={primaryHref}
            className="group inline-flex items-center justify-between gap-6 border border-background/30 hover:border-background px-6 py-4 transition-colors duration-500 min-w-[240px]"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-background">
              {primaryLabel}
            </span>
            <ArrowUpRight className="h-4 w-4 text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>

          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="group inline-flex items-center justify-between gap-6 px-6 py-4 transition-colors duration-500 min-w-[240px]"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-background/60 group-hover:text-background transition-colors duration-300">
                {secondaryLabel}
              </span>
              <ArrowUpRight className="h-4 w-4 text-background/60 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
