"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"
import { siteConfig } from "@/components/golden-bridge/site-config"

export function ContactSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-8">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            Ready to discuss your
            <br />
            packaging requirements?
          </h2>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/stone-paper/contact"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-background/70 hover:text-background transition-colors duration-500 w-fit"
            >
              <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500">
                Request a quote or samples
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-background/50 hover:text-background transition-colors duration-500 w-fit"
            >
              <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500">
                {siteConfig.email}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <div
          ref={bodyRef}
          className={`flex flex-col justify-end transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/35 mb-5">
                Headquarters
              </p>
              <p className="text-sm leading-[1.75] text-background/60">
                {siteConfig.headquarters.street}<br />
                {siteConfig.headquarters.city}<br />
                {siteConfig.headquarters.country}
              </p>
              <p className="text-sm text-background/60 mt-4">{siteConfig.phone}</p>
              <p className="text-sm text-background/60 mt-1">{siteConfig.fax}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/35 mb-5">
                Production Facility
              </p>
              <p className="text-sm leading-[1.75] text-background/60">
                {siteConfig.facility.street}<br />
                {siteConfig.facility.city}<br />
                {siteConfig.facility.country}
              </p>
              <p className="text-sm text-background/60 mt-4">{siteConfig.facility.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
