"use client"

import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

interface Partner {
  key: keyof Copy["partners"]["meta"]
  name: string
  href?: string
  /**
   * Drop a logo file in /public/partners and reference it here; the card
   * swaps the wordmark for the mark with no other change. Without one the
   * name is set as a wordmark, so the wall stays consistent either way.
   */
  logo?: string
}

const PARTNERS: Partner[] = [
  { key: "tuBerlin", name: "TU Berlin", href: "https://www.tu.berlin/" },
  { key: "fuBerlin", name: "Freie Universität Berlin", href: "https://www.fu-berlin.de/" },
  { key: "sparkasse", name: "Berliner Sparkasse", href: "https://www.berliner-sparkasse.de/" },
  { key: "leda", name: "Qingdao Leda International Logistics" },
]

/**
 * Partner wall. Deliberately quiet: monochrome marks on ivory, one rule grid,
 * no testimonial styling. Trust here comes from the names, not the decoration.
 */
export function Partners({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced }) => {
    if (reduced) return

    gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%" } })
      .from(q(".partners-head > *"), { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.08 })
      .from(q(".partner"), { opacity: 0, y: 24, duration: 0.7, ease: "power3.out", stagger: 0.07 }, 0.2)
  }, [c.partners.title])

  return (
    <section ref={ref} className="partners" aria-labelledby="partners-title">
      <div className="partners-head">
        <p className="eyebrow">{c.partners.eyebrow}</p>
        <div>
          <h2 id="partners-title">{c.partners.title}</h2>
          <p>{c.partners.body}</p>
        </div>
      </div>

      <ul className="partner-grid">
        {PARTNERS.map((partner) => {
          const inner = (
            <>
              <span className="partner-mark">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} loading="lazy" />
                ) : (
                  <span className="partner-wordmark">{partner.name}</span>
                )}
              </span>
              <span className="partner-meta mono">{c.partners.meta[partner.key]}</span>
              {partner.href && (
                <span className="partner-link mono" aria-hidden="true">
                  {new URL(partner.href).hostname.replace(/^www\./, "")}
                  <ArrowUpRight />
                </span>
              )}
            </>
          )

          return (
            <li key={partner.key}>
              {partner.href ? (
                <a className="partner" href={partner.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div className="partner">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
