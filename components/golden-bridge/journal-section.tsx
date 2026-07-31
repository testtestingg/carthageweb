"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

const entries = [
  {
    date: "Agriculture",
    title: "Rice, grain, animal feed, and seed packaging engineered for outdoor storage and transport",
    tag: "Industry",
    href: "/stone-paper/product",
  },
  {
    date: "Construction",
    title: "Cement, sand, and building material bags rated for heavy loads and rough handling",
    tag: "Industry",
    href: "/stone-paper/products/pp-woven-bags",
  },
  {
    date: "Chemicals",
    title: "Moisture-resistant packaging for fertilizers, industrial chemicals, and mineral products",
    tag: "Industry",
    href: "/stone-paper/products/bags",
  },
  {
    date: "Food",
    title: "Food-grade compliant bags for flour, sugar, spices, and other food ingredients",
    tag: "Industry",
    href: "/stone-paper/products/bags",
  },
]

function JournalEntry({ entry, index }: { entry: typeof entries[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>(0.1)

  return (
    <Link
      ref={ref}
      href={entry.href}
      className={`group flex items-start md:items-center justify-between py-7 md:py-8 gap-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 flex-1">
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 shrink-0 w-24 tabular-nums">
          {entry.date}
        </span>
        <h3 className="text-base md:text-lg font-light tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
          {entry.title}
        </h3>
      </div>
      <div className="flex items-center gap-5 shrink-0">
        <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground/40 hidden md:block">
          {entry.tag}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </div>
    </Link>
  )
}

export function JournalSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="industries" className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
      <div
        ref={ref}
        className={`mb-16 md:mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Industries We Serve
        </p>
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
          Applications Across Sectors
        </h2>
      </div>

      <div className="divide-y divide-border">
        {entries.map((entry, index) => (
          <JournalEntry key={entry.title} entry={entry} index={index} />
        ))}
      </div>
    </section>
  )
}
