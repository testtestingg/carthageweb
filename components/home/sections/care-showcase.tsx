"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MoveUpRight } from "lucide-react"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/**
 * Sequence 5 — Carthage Care product showcase.
 *
 * A sticky media frame holds position while the copy column scrolls past it;
 * each block of copy swaps the framed product through a clip-path wipe. Uses
 * CSS `position: sticky` rather than a ScrollTrigger pin, so there is no pin
 * spacer to mis-measure and the mobile fallback is simply "not sticky".
 */
export function CareShowcase({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, reduced }) => {
    if (reduced) return

    const frames = q(".care-frame")
    const blocks = q(".care-block")

    const show = (index: number) => {
      frames.forEach((frame, i) => {
        gsap.to(frame, {
          clipPath: i <= index ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          duration: 0.9,
          ease: "power3.inOut",
          overwrite: "auto",
        })
      })
      q(".care-tick").forEach((tick, i) => {
        gsap.to(tick, { opacity: i === index ? 1 : 0.32, duration: 0.4, overwrite: "auto" })
      })
    }

    blocks.forEach((block, i) => {
      gsap.from(block.querySelectorAll(".care-block-inner > *"), {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: block, start: "top 78%" },
      })

      // Centre of the block owns the frame.
      gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 62%",
          end: "bottom 62%",
          onEnter: () => show(i),
          onEnterBack: () => show(i),
        },
      })
    })

  }, [c.care.title])

  return (
    <section ref={ref} className="care-showcase" aria-labelledby="care-title">
      <div className="care-wash" aria-hidden="true" />

      <div className="care-inner">
        <div className="care-copy">
          <header className="care-head">
            <p className="eyebrow">{c.care.eyebrow}</p>
            <h2 id="care-title">{c.care.title}</h2>
            <p className="care-lead">{c.care.body}</p>
          </header>

          {c.care.frames.map((frame) => (
            <div className="care-block" key={frame.n}>
              <div className="care-block-inner">
                <span className="mono care-block-n">{frame.n}</span>
                <h3>{frame.title}</h3>
                <p>{frame.body}</p>
              </div>
            </div>
          ))}

          <div className="care-actions">
            <Link href="/carthage-care" className="btn btn-dark">
              {c.care.cta}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/shop" className="link-underline">
              {c.care.shopCta}
              <MoveUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="care-sticky">
          <div className="care-stack">
            {c.care.frames.map((frame, i) => (
              <figure key={frame.n} className={`care-frame care-frame-${i}`}>
                <Image
                  src={frame.image}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="object-cover"
                />
                <figcaption className="mono">{frame.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="care-ticks" aria-hidden="true">
            {c.care.frames.map((frame, i) => (
              <span key={frame.n} className={`care-tick care-tick-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
