"use client"

import Image from "next/image"
import {
  Briefcase,
  GraduationCap,
  Home,
  Landmark,
  School,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

interface Industry {
  name: string
  description: string
  icon: LucideIcon
  /**
   * Optional photograph. Without one the card falls back to the icon panel, so
   * imagery can be added per sector later without touching the layout.
   */
  image?: string
}

const industries: Industry[] = [
  {
    name: "German Police",
    description:
      "Notebooks that survive rain, handling and long shifts on duty, where a soaked or torn page is not an option.",
    icon: Shield,
  },
  {
    name: "German Army",
    description:
      "Field-grade stationery for training and deployment: water resistant, tear resistant and dependable outdoors.",
    icon: ShieldCheck,
  },
  {
    name: "Social Housing",
    description:
      "Durable record keeping for housing and tenancy staff working on site, between properties and in all weather.",
    icon: Home,
  },
  {
    name: "Schools & Education",
    description:
      "Hard-wearing notebooks for daily classroom use, built to last a full school year of bags, desks and transport.",
    icon: School,
  },
  {
    name: "Universities",
    description:
      "Lecture and laboratory notebooks with a smooth writing surface, and a tree-free material story students value.",
    icon: GraduationCap,
  },
  {
    name: "Public Institutions",
    description:
      "Supplied to public bodies and agencies that need consistent quality, documented materials and reliable resupply.",
    icon: Landmark,
  },
  {
    name: "Companies & Corporate",
    description:
      "Branded notebooks for corporate identity, employee kits, conferences and client gifts, embossed or printed to order.",
    icon: Briefcase,
  },
]

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15)
  const Icon = industry.icon

  return (
    <div
      ref={ref}
      className={`bg-background flex flex-col group transition-all duration-700 hover:bg-secondary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 3) * 110}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
        {industry.image ? (
          <Image
            src={industry.image}
            alt={industry.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              className="h-12 w-12 text-foreground/15 group-hover:text-foreground/25 transition-colors duration-500"
              strokeWidth={1}
            />
          </div>
        )}
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-1">
        <div className="flex items-center gap-3">
          <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
            ({String(index + 1).padStart(2, "0")})
          </span>
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={1.5} />
        </div>

        <h3 className="mt-5 text-lg md:text-xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
          {industry.name}
        </h3>
        <div className="w-8 h-px bg-border mt-4 mb-4 group-hover:w-12 transition-all duration-500" />
        <p className="text-sm leading-[1.8] text-muted-foreground font-light">
          {industry.description}
        </p>
      </div>
    </div>
  )
}

/**
 * Who the stone paper stationery is actually sold to. Sector-led rather than
 * product-led, so a procurement reader can find themselves on the page.
 */
export function IndustriesSection() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-secondary/40">
      <SectionHeading
        eyebrow="Who We Supply"
        title="Trusted across public service, education and industry."
        description="Our stone paper notebooks are used wherever paper has to hold up: outdoors, in the field, and through a full year of daily handling. These are the sectors we supply across Germany and Europe."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {industries.map((industry, index) => (
          <IndustryCard key={industry.name} industry={industry} index={index} />
        ))}
      </div>
    </section>
  )
}
