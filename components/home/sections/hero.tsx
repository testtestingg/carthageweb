"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, MoveUpRight } from "lucide-react"
import { HeroFilm, type FilmClip } from "@/components/home/hero-film"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import { scrollToTarget } from "@/components/providers/smooth-scroll"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/** Authentic Carthage footage — one clip per division plus a product detail. */
const CLIPS: FilmClip[] = [
  {
    src: "/stone-paper/manufacturing.mp4",
    poster: "/posters/stone-manufacturing.jpg",
    position: "50% 45%",
    positionMobile: "58% 45%",
  },
  {
    src: "/carthage-pmu-application.mp4",
    poster: "/posters/pmu-application.jpg",
    position: "50% 40%",
    positionMobile: "45% 40%",
  },
  {
    src: "/video1.mp4",
    poster: "/posters/pigments.jpg",
    position: "50% 42%",
    positionMobile: "52% 42%",
  },
]

export function Hero({ c }: { c: Copy }) {
  const ref = useScrollScene<HTMLElement>(({ q, root, reduced, mm }) => {
    if (reduced) return

    // --- Entrance: clipped typography reveal, then a controlled stagger ---
    const intro = gsap.timeline()
    intro
      .from(q(".hero-line > span"), {
        yPercent: 108,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.11,
      })
      .from(q(".hero-eyebrow"), { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" }, 0.15)
      .from(q(".hero-stagger"), { opacity: 0, y: 26, duration: 0.85, ease: "power3.out", stagger: 0.09 }, 0.5)
      .from(q(".hero-film-index, .hero-film-caption"), { opacity: 0, duration: 0.9, ease: "power2.out" }, 0.85)

    // --- Scrubbed: the media frame closes as the hero hands over ---
    // The frame insets rather than fading, so the ink page colour behind it
    // becomes the marquee's background: one continuous surface.
    mm.add("(min-width: 801px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
      tl.to(q(".hero-media"), { scale: 1.12, ease: "none" }, 0)
        .to(q(".hero-frame"), { clipPath: "inset(0% 7vw 10vh 7vw)", ease: "power1.in" }, 0)
        .to(q(".hero-copy"), { y: -90, opacity: 0.08, ease: "power1.in" }, 0)
        .to(q(".hero-cue"), { opacity: 0, duration: 0.25 }, 0)
    })

    mm.add("(max-width: 800px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      })
      tl.to(q(".hero-media"), { scale: 1.08, ease: "none" }, 0)
        .to(q(".hero-frame"), { clipPath: "inset(0% 0% 6vh 0%)", ease: "power1.in" }, 0)
        .to(q(".hero-copy"), { y: -50, opacity: 0.1, ease: "power1.in" }, 0)
    })
  }, [])

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-frame">
        <div className="hero-media">
          <HeroFilm clips={CLIPS} captions={c.hero.clips} />
        </div>
      </div>

      <div className="hero-copy">
        <p className="hero-eyebrow eyebrow">{c.hero.eyebrow}</p>

        <h1 id="hero-title" className="hero-title">
          {c.hero.titleLines.map((line) => (
            <span className="hero-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-body hero-stagger">{c.hero.body}</p>

        {/* Company plate: where the group is based and where it produces. */}
        <dl className="hero-facts hero-stagger">
          {c.hero.facts.map(([label, value]) => (
            <div key={label}>
              <dt className="mono">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="hero-divisions hero-stagger">
          <Link href={c.divisions.stone.href}>
            <span className="mono">{c.divisions.stone.index}</span>
            {c.divisions.stone.label}
            <MoveUpRight aria-hidden="true" />
          </Link>
          <Link href={c.divisions.care.href}>
            <span className="mono">{c.divisions.care.index}</span>
            {c.divisions.care.label}
            <MoveUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-actions hero-stagger">
          <button type="button" className="btn btn-light" onClick={() => scrollToTarget("#statement", -40)}>
            {c.hero.primary}
            <ArrowDown aria-hidden="true" />
          </button>
          <Link href="/shop" className="btn btn-ghost">
            {c.hero.secondary}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <button type="button" className="hero-cue" onClick={() => scrollToTarget("#statement", -40)}>
        <span>{c.hero.scroll}</span>
        <i aria-hidden="true" />
      </button>
    </section>
  )
}
