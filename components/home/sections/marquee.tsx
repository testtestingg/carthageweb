"use client"

import { useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/animation/gsap"
import { useScrollScene } from "@/lib/animation/use-scroll-scene"

/**
 * The homepage marquee, kept as a concept and rebuilt for a seamless loop.
 *
 * Identical runs are rendered and the track travels exactly one run width,
 * so the reset lands on a pixel-identical frame — no jump. The run count is
 * measured against the viewport so a wide screen never outruns the track.
 * GSAP drives it (not a CSS keyframe) so reduced motion can stop it and the
 * loop shares the same ticker as every other timeline on the page.
 */
export function Marquee({ items }: { items: string[] }) {
  // Rendered runs. Starts at 3 (correct for every common viewport) and grows
  // after measuring, so an ultra-wide screen never sees a gap at the reset.
  const [runCount, setRunCount] = useState(3)

  const ref = useScrollScene<HTMLDivElement>(({ q, root, reduced }) => {
    const track = q(".marquee-track")[0] as HTMLElement
    const run = q(".marquee-run")[0] as HTMLElement
    if (!track || !run) return

    const runWidth = run.getBoundingClientRect().width
    if (runWidth > 0) {
      // Need one run to travel plus a full viewport still covered behind it.
      const needed = Math.ceil(window.innerWidth / runWidth) + 2
      if (needed > runCount) {
        setRunCount(needed)
        return
      }
    }

    if (reduced) return

    const loop = gsap.to(track, {
      // Travel exactly one run width, so the loop restarts on an identical frame.
      xPercent: -100 / runCount,
      ease: "none",
      duration: 11 * runCount,
      repeat: -1,
    })

    /*
     * Scroll velocity drives the belt: fast scrolling speeds it up and leans
     * the type slightly, then it eases back to its resting pace. Clamped so it
     * never becomes a blur, and it never reverses.
     */
    let idle: number | undefined
    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 1400, 3)
        gsap.to(loop, { timeScale: 1 + v, duration: 0.25, overwrite: true })
        gsap.to(track, {
          skewX: gsap.utils.clamp(-6, 6, self.getVelocity() / -420),
          duration: 0.3,
          overwrite: "auto",
        })
        window.clearTimeout(idle)
        idle = window.setTimeout(() => {
          gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true })
          gsap.to(track, { skewX: 0, duration: 0.5, overwrite: "auto" })
        }, 140)
      },
    })
  }, [items.join("|"), runCount])

  const runs = Array.from({ length: runCount }, (_, i) => i)

  return (
    <div ref={ref} className="marquee" role="presentation">
      <div className="marquee-track">
        {runs.map((run) => (
          <div className="marquee-run" key={run} aria-hidden={run > 0 ? "true" : undefined}>
            {items.map((item) => (
              <span className="marquee-item" key={`${run}-${item}`}>
                {item}
                <i aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
