"use client"

import Image from "next/image"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/**
 * Sequence 2 — group statement.
 *
 * The lead sentence gains opacity word by word against scroll progress, so the
 * reader's eye is pulled through the sentence at their own scrolling pace.
 * Words only ever move between 22% and 100% opacity — never below legibility,
 * and never per-letter.
 */
export function Statement({ c }: { c: Copy }) {
  const words = c.statement.lead.split(" ")

  const ref = useScrollScene<HTMLElement>(({ q, root, reduced }) => {
    if (reduced) {
      gsap.set(q(".statement-word"), { opacity: 1 })
      return
    }

    gsap.fromTo(
      q(".statement-word"),
      { opacity: 0.22 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: q(".statement-lead")[0],
          start: "top 82%",
          end: "bottom 58%",
          scrub: 0.5,
        },
      },
    )

    // Supporting media travels at its own rate against the text column.
    gsap.to(q(".statement-media-a"), {
      yPercent: -14,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
    })
    gsap.to(q(".statement-media-b"), {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
    })

    gsap.from(q(".statement-meta li"), {
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: q(".statement-meta")[0], start: "top 88%" },
    })
  }, [c.statement.lead])

  return (
    <section ref={ref} className="statement" id="statement" aria-labelledby="statement-title">
      <div className="statement-inner">
        <div className="statement-body">
          <p className="eyebrow">{c.statement.eyebrow}</p>

          <h2 id="statement-title" className="statement-lead">
            {words.map((word, i) => (
              <span className="statement-word" key={`${word}-${i}`}>
                {word}{" "}
              </span>
            ))}
          </h2>

          <p className="statement-support">{c.statement.body}</p>

          {/* Spec strip, runs across the column rather than sitting in a
              half-empty side rail. */}
          <ul className="statement-meta">
            {c.statement.meta.map(([label, value]) => (
              <li key={label}>
                <span className="mono">{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="statement-media">
          <figure className="statement-media-a">
            <Image
              src="/stone-paper/paper-7.jpg"
              alt="Stacked Carthage stone paper sheets in raking light"
              width={720}
              height={900}
              sizes="(max-width: 800px) 44vw, 22vw"
            />
          </figure>
          <figure className="statement-media-b">
            <Image
              src="/stock/cosmetic-formulation.jpg"
              alt="Cosmetic formulation bench with bottles and measuring tools"
              width={720}
              height={900}
              sizes="(max-width: 800px) 44vw, 22vw"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
