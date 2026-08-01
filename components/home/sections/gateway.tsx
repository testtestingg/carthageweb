"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MoveUpRight } from "lucide-react"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/** One image per division, so the choice reads before the copy does. */
const BLOCK_MEDIA = [
  { src: "/stone-paper/paper-3.jpg", alt: "Carthage stone paper rolls, sheets and an open notebook" },
  { src: "/posters/pmu-application.jpg", alt: "A Carthage cartridge in use during a permanent makeup treatment" },
]

/**
 * Closing choice plus the footer transition.
 *
 * The homepage explains the group; this is where the visitor picks a side.
 * Two large media blocks, one per division, so the decision is obvious rather
 * than buried in a list. The shop sits under them as a secondary route, since
 * it is a commercial destination rather than a division.
 *
 * The block sits on the same ink as the site footer, so the seam between them
 * is invisible.
 */
export function Gateway({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced }) => {
    if (reduced) return

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 74%" } })
      .from(q(".gateway-title > span > span"), { yPercent: 108, duration: 1, ease: "expo.out", stagger: 0.08 })
      .fromTo(
        q(".gateway-block"),
        { clipPath: "inset(0% 0% 100% 0%)", y: 40 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.2, ease: "power3.out", stagger: 0.14 },
        0.2,
      )
      .from(q(".gateway-shop"), { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, 0.9)

    // Each block's media drifts as it passes, so the pair does not feel static.
    q(".gateway-block").forEach((block, i) => {
      gsap.fromTo(
        block.querySelector(".gateway-block-media img"),
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      )
      gsap.set(block, { transformOrigin: i === 0 ? "left center" : "right center" })
    })

    gsap.fromTo(
      q(".gateway-mark"),
      { yPercent: 20, scale: 1.05, opacity: 0.6 },
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

        <div className="gateway-blocks">
          {c.gateway.blocks.map((block, i) => (
            <Link href={block.href} key={block.n} className="gateway-block">
              <span className="gateway-block-media">
                <Image
                  src={BLOCK_MEDIA[i].src}
                  alt={BLOCK_MEDIA[i].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="object-cover"
                />
              </span>

              <span className="gateway-block-copy">
                <span className="gateway-block-label">
                  <span className="mono">{block.n}</span>
                  {block.label}
                </span>
                <span className="gateway-block-title">{block.title}</span>
                <span className="gateway-block-desc">{block.desc}</span>
                <span className="gateway-block-cta">
                  {block.cta}
                  <ArrowRight aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="gateway-shop">
          <span>{c.gateway.shopNote}</span>
          <Link href="/shop" className="link-underline">
            {c.gateway.shopCta}
            <MoveUpRight aria-hidden="true" />
          </Link>
        </p>
      </div>

      <div className="gateway-mark">
        <Image
          src="/product.png"
          alt="Carthage limited edition PMU lip pigment"
          width={1024}
          height={1024}
          sizes="(max-width: 900px) 62vw, 900px"
          className="gateway-mark-img"
        />
      </div>
    </section>
  )
}
