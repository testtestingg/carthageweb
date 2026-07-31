"use client"

import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/**
 * Shared philosophy — deliberately typographic rather than three cards.
 * Each principle is a full-width rule row whose divider draws itself as the
 * row arrives, so the section reads as one list, not a grid of tiles.
 */
export function Philosophy({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, reduced }) => {
    if (reduced) return

    q(".principle").forEach((row) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 84%" } })
        .fromTo(row.querySelector(".principle-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.out" })
        .from(row.querySelectorAll(".principle-reveal > span"), {
          yPercent: 105,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
        }, 0.08)
        .from(row.querySelector(".principle-body"), { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" }, 0.28)
    })
  }, [c.philosophy.title])

  return (
    <section ref={ref} className="philosophy" aria-labelledby="philosophy-title">
      <div className="philosophy-head">
        <p className="eyebrow">{c.philosophy.eyebrow}</p>
        <h2 id="philosophy-title">{c.philosophy.title}</h2>
      </div>

      <ol className="principles">
        {c.philosophy.items.map(([title, body], i) => (
          <li className="principle" key={title}>
            <i className="principle-rule" aria-hidden="true" />
            <span className="mono principle-n">{`0${i + 1}`}</span>
            <h3 className="principle-reveal">
              <span>{title}</span>
            </h3>
            <p className="principle-body">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
