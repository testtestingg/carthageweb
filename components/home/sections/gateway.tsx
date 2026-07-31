"use client"

import Link from "next/link"
import Image from "next/image"
import { MoveUpRight } from "lucide-react"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/**
 * Closing navigation + footer transition (sequence 6).
 *
 * The three destinations reveal as masked rows, then the oversized Carthage
 * mark rises into place and settles as the footer is exposed beneath it. The
 * whole block sits on the same ink as the site footer, so the seam between
 * them is invisible — no white gap.
 */
export function Gateway({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced }) => {
    if (reduced) return

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 72%" } })
      .from(q(".gateway-title > span > span"), { yPercent: 108, duration: 1, ease: "expo.out", stagger: 0.08 })
      .from(q(".gateway-row"), { opacity: 0, y: 26, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 0.25)

    // Wordmark settles into place as the footer comes up behind it.
    gsap.fromTo(
      q(".gateway-mark"),
      { yPercent: 26, scale: 1.06, opacity: 0.55 },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: q(".gateway-mark")[0], start: "top 95%", end: "bottom bottom", scrub: 0.7 },
      },
    )
  }, [c.gateway.title])

  return (
    <section ref={ref} className="gateway" aria-labelledby="gateway-title">
      <div className="gateway-inner">
        <p className="eyebrow">{c.gateway.eyebrow}</p>
        <h2 id="gateway-title" className="gateway-title">
          <span>
            <span>{c.gateway.title}</span>
          </span>
        </h2>

        <nav className="gateway-rows" aria-label={c.gateway.title}>
          {c.gateway.links.map((link) => (
            <Link href={link.href} className="gateway-row" key={link.n}>
              <span className="mono gateway-n">{link.n}</span>
              <span className="gateway-label">{link.label}</span>
              <span className="gateway-desc">{link.desc}</span>
              <MoveUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>

      <div className="gateway-mark">
        <Image
          src="/logo-carthage.png"
          alt="Carthage"
          width={900}
          height={900}
          sizes="(max-width: 900px) 70vw, 460px"
          className="gateway-mark-img"
        />
      </div>
    </section>
  )
}
