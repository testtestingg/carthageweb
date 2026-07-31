"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

const MEDIA = [
  { src: "/stone-paper/paper-4.jpg", alt: "A stack of Carthage stone paper sheets on a concrete surface" },
  { src: "/posters/pmu-application.jpg", alt: "A Carthage cartridge in use during a permanent-makeup treatment" },
]

/**
 * Sequence 3 — the pinned two-division story.
 *
 * Desktop pins a full-height stage for two viewport-lengths of scroll. Scroll
 * progress moves the page from Stone Paper to Carthage Care: the ink panel
 * fades up beneath, the media wipes through a clip-path, the copy columns
 * exchange, and a two-segment rail reports exactly where the reader is.
 *
 * Mobile drops the pin entirely (pinning a tall stage on a phone fights the
 * address-bar resize) and plays the same story as two stacked panels.
 */
export function Divisions({ c }: { c: Copy }) {
  const panels = [c.divisions.stone, c.divisions.care]

  const ref = useScrollScene<HTMLElement>(({ q, root, reduced, mm }) => {
    if (reduced) return

    mm.add("(min-width: 901px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          pin: q(".divisions-pin")[0],
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // Hold on Stone Paper, hand over in the middle third, hold on Care.
      tl.to(q(".divisions-ink"), { opacity: 1, ease: "none" }, 0.34)
        // The section heading and rail labels sit on both backgrounds, so they
        // travel from ink to ivory with the panel behind them.
        .to(q(".divisions-title"), { color: "#f4f1ea", ease: "none" }, 0.34)
        .to(q(".divisions-step"), { color: "rgba(255,255,255,0.62)", ease: "none" }, 0.34)
        .to(q(".divisions-rail-track"), { backgroundColor: "rgba(255,255,255,0.22)", ease: "none" }, 0.34)
        .to(q(".divisions-media-1"), { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" }, 0.34)
        .to(q(".divisions-media-0 img"), { scale: 1.06, ease: "none" }, 0)
        .to(q(".divisions-panel-0"), { opacity: 0, y: -34, ease: "power2.in" }, 0.34)
        .fromTo(q(".divisions-panel-1"), { opacity: 0, y: 34 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.46)
        .to(q(".divisions-rail-fill-0"), { scaleX: 1, ease: "none" }, 0)
        .to(q(".divisions-rail-fill-1"), { scaleX: 1, ease: "none" }, 0.5)
        .to(q(".divisions-step-0"), { opacity: 0.45, ease: "none" }, 0.42)
        .to(q(".divisions-step-1"), { opacity: 1, ease: "none" }, 0.42)

      // Duration is set by the section height; the timeline above is 0→1.
      tl.duration(1)
    })

    mm.add("(max-width: 900px)", () => {
      // No pin: reveal each panel's media through the same mask language.
      q(".divisions-mobile-panel").forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".divisions-mobile-media"),
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: 1.1,
            scrollTrigger: { trigger: panel, start: "top 80%" },
          },
        )
        gsap.from(panel.querySelectorAll(".divisions-mobile-copy > *"), {
          opacity: 0,
          y: 22,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, start: "top 76%" },
        })
      })
    })
  }, [c.divisions.stone.title, c.divisions.care.title])

  return (
    <section ref={ref} className="divisions" aria-label={c.divisions.eyebrow}>
      {/* ---------- Desktop: pinned stage ---------- */}
      <div className="divisions-pin">
        <div className="divisions-ivory" aria-hidden="true" />
        <div className="divisions-ink" aria-hidden="true" />

        <div className="divisions-grid">
          <div className="divisions-content">
            <p className="eyebrow divisions-eyebrow">{c.divisions.eyebrow}</p>
            <h2 className="divisions-title">
              {c.divisions.title}
            </h2>

            <div className="divisions-panels">
              {panels.map((panel, i) => (
                <article key={panel.label} className={`divisions-panel divisions-panel-${i}`}>
                  <p className="divisions-label">
                    <span className="mono">{panel.index}</span>
                    {panel.label}
                  </p>
                  <h3>{panel.title}</h3>
                  <p className="divisions-body">{panel.body}</p>
                  <dl className="divisions-facts">
                    {panel.facts.map(([k, v]) => (
                      <div key={k}>
                        <dt className="mono">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={panel.href} className="link-underline">
                    {panel.cta}
                    <MoveUpRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="divisions-rail" aria-hidden="true">
              {panels.map((panel, i) => (
                <div key={panel.label} className={`divisions-step divisions-step-${i}`}>
                  <span className="mono">{panel.index}</span>
                  <span className="divisions-rail-track">
                    <i className={`divisions-rail-fill divisions-rail-fill-${i}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="divisions-stage">
            {MEDIA.map((m, i) => (
              <figure key={m.src} className={`divisions-media divisions-media-${i}`}>
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical sequence ---------- */}
      <div className="divisions-mobile">
        <div className="divisions-mobile-head">
          <p className="eyebrow">{c.divisions.eyebrow}</p>
          <h2>{c.divisions.title}</h2>
        </div>

        {panels.map((panel, i) => (
          <article key={panel.label} className={`divisions-mobile-panel dmp-${i}`}>
            <figure className="divisions-mobile-media">
              <Image
                src={MEDIA[i].src}
                alt={MEDIA[i].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </figure>
            <div className="divisions-mobile-copy">
              <p className="divisions-label">
                <span className="mono">{panel.index}</span>
                {panel.label}
              </p>
              <h3>{panel.title}</h3>
              <p className="divisions-body">{panel.body}</p>
              <dl className="divisions-facts">
                {panel.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={panel.href} className="link-underline">
                {panel.cta}
                <MoveUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
