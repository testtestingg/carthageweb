"use client"

import Link from "next/link"
import { ArrowRight, MoveUpRight } from "lucide-react"
import { LazyVideo } from "@/components/home/lazy-video"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { carthageCareContent } from "@/lib/carthage-care-content"

type Copy = (typeof carthageCareContent)["en"]

/**
 * Hero for the Cosmetics & PMU division page.
 *
 * Deliberately not the group homepage hero and not the previous full bleed
 * video: this is a light editorial split. Type sits on ivory in the left
 * column, the film runs in a tall portrait frame offset down the right, and a
 * product strip runs along the bottom edge as the bridge into the page.
 *
 * On scroll the frame lifts and settles while the type drifts at a different
 * rate, so the two columns separate rather than moving as one block.
 */
export function CareHero({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced, mm }) => {
    if (reduced) return

    gsap
      .timeline()
      .from(q(".care-hero-line > span"), { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09 })
      .from(q(".care-hero-eyebrow"), { opacity: 0, y: 12, duration: 0.6 }, 0.1)
      .fromTo(q(".care-hero-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out" }, 0.2)
      .from(q(".care-hero-stagger"), { opacity: 0, y: 22, duration: 0.75, stagger: 0.08, ease: "power3.out" }, 0.45)
      .fromTo(
        q(".care-hero-frame"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" },
        0.15,
      )

    mm.add("(min-width: 901px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      })
      tl.to(q(".care-hero-frame"), { yPercent: -12, ease: "none" }, 0)
        .to(q(".care-hero-frame video, .care-hero-frame img"), { scale: 1.1, ease: "none" }, 0)
        .to(q(".care-hero-copy"), { y: 56, opacity: 0.35, ease: "none" }, 0)
        .to(q(".care-hero-strip-track"), { xPercent: -12, ease: "none" }, 0)
    })
  }, [c.hero.body])

  return (
    <section ref={ref} className="care-hero" aria-labelledby="care-hero-title">
      <div className="care-hero-grid">
        <div className="care-hero-copy">
          <p className="care-hero-eyebrow eyebrow">{c.hero.eyebrow}</p>
          <span className="care-hero-rule" aria-hidden="true" />

          <h1 id="care-hero-title" className="care-hero-title">
            {c.hero.titleLines.map((line) => (
              <span className="care-hero-line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p className="care-hero-body care-hero-stagger">{c.hero.body}</p>

          <div className="care-hero-actions care-hero-stagger">
            <Link href="/shop" className="btn btn-dark">
              {c.hero.shop}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/academy" className="link-underline">
              {c.hero.academy}
              <MoveUpRight aria-hidden="true" />
            </Link>
          </div>

          <dl className="care-hero-spec care-hero-stagger">
            {c.hero.spec.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="care-hero-frame">
          <LazyVideo
            src="/carthage-pmu-application.mp4"
            poster="/posters/pmu-application.jpg"
            label={c.hero.caption}
          />
          <figcaption className="mono">{c.hero.caption}</figcaption>
        </figure>
      </div>

      {/* Full-bleed band; the track repeats so the scroll shift never
          exposes an empty edge. */}
      <div className="care-hero-strip" aria-hidden="true">
        <div className="care-hero-strip-track">
          {[0, 1, 2].map((run) => (
            <span className="care-hero-strip-run" key={run}>
              {c.hero.strip.map((item) => (
                <span key={`${run}-${item}`}>
                  {item}
                  <i />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
