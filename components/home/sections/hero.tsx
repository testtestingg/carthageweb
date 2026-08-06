"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { HeroFilm, type FilmClip } from "@/components/home/hero-film"
import { gsap } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

/** Authentic Carthage footage — one clip per division plus a product detail. */
const CLIPS: FilmClip[] = [
  {
    src: "/video3.mp4",
    poster: "/posters/foam.jpg",
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
    src: "/stone-paper/manufacturing.mp4",
    poster: "/posters/stone-manufacturing.jpg",
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
        <h1 id="hero-title" className="hero-title">
          {c.hero.titleLines.map((line) => (
            <span className="hero-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-body hero-stagger">{c.hero.body}</p>

        <div className="hero-actions hero-stagger">
          <Link href="/carthage-care" className="btn btn-ghost">
            <ArrowLeft aria-hidden="true" />
            PMU & Cosmetics
          </Link>
          <Link href="/stone-paper" className="btn btn-ghost">
            stone paper
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
