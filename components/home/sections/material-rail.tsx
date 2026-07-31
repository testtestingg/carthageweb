"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"
import { LazyVideo } from "@/components/home/lazy-video"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/**
 * Sequence 4 — the Stone Paper material showcase.
 *
 * Desktop: the section pins and vertical scroll drives a horizontal rail from
 * raw limestone through to finished goods — the actual production sequence,
 * so the movement carries meaning rather than decoration. Distance is measured
 * from the real track width, so it never over- or under-shoots.
 *
 * Mobile: the rail becomes a native scroll-snap carousel — same content and
 * order, no pinning, normal touch scrolling.
 */
export function MaterialRail({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced, mm }) => {
    if (reduced) return

    mm.add("(min-width: 901px)", () => {
      const viewport = q(".rail-viewport")[0] as HTMLElement
      const track = q(".rail-track")[0] as HTMLElement
      if (!viewport || !track) return

      const distance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0)
      const counter = q(".rail-counter-current")[0]
      const fill = q(".rail-progress-fill")[0]
      const total = q(".rail-step").length

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          // Scroll length matches the horizontal distance for a 1:1 feel.
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          scrub: 0.6,
          pin: q(".rail-pin")[0],
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(total, Math.floor(self.progress * total) + 1)
            if (counter) counter.textContent = String(i).padStart(2, "0")
            if (fill) gsap.set(fill, { scaleX: self.progress })
          },
        },
      })
    })

    // The water-resistance proof reveals through a mask on both layouts.
    gsap.fromTo(
      q(".proof-media"),
      { clipPath: "inset(12% 0% 12% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power2.out",
        scrollTrigger: { trigger: q(".proof")[0], start: "top 85%", end: "top 35%", scrub: 0.8 },
      },
    )
    gsap.from(q(".proof-copy > *"), {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: { trigger: q(".proof")[0], start: "top 72%" },
    })
  }, [c.material.title])

  return (
    <section ref={ref} className="rail-section" aria-labelledby="rail-title">
      <div className="rail-pin">
        <div className="rail-head">
          <div>
            <p className="eyebrow">{c.material.eyebrow}</p>
            <h2 id="rail-title">{c.material.title}</h2>
            <p className="rail-intro">{c.material.body}</p>
            <Link href="/stone-paper/process" className="link-underline">
              {c.material.cta}
              <MoveUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="rail-counter" aria-hidden="true">
            <span className="mono rail-counter-current">01</span>
            <span className="rail-progress">
              <i className="rail-progress-fill" />
            </span>
            <span className="mono">{String(c.material.steps.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="rail-viewport">
          <ol className="rail-track">
            {c.material.steps.map((step) => (
              <li className="rail-step" key={step.n}>
                <figure>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 900px) 78vw, 30vw"
                    className="object-cover"
                  />
                </figure>
                <div className="rail-step-copy">
                  <span className="mono">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Material proof, the notebook actually submerged. */}
      <div className="proof">
        <div className="proof-media">
          <LazyVideo
            src="/golden-bridge/video2.mp4"
            poster="/posters/stone-demo.jpg"
            label={c.material.proof.caption}
          />
        </div>
        <div className="proof-copy">
          <p className="eyebrow">{c.material.proof.caption}</p>
          <h3>{c.material.proof.title}</h3>
          <p className="proof-body">{c.material.proof.body}</p>
        </div>
      </div>
    </section>
  )
}
