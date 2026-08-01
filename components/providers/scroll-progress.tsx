"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animation/gsap"

/**
 * A hairline brass rail across the top of the viewport that fills with page
 * scroll progress. Sits above the header so it reads on the transparent hero
 * as well as the solid bar.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fill = ref.current?.firstElementChild
    if (!fill || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(fill, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
        },
      })
    }, ref)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="scroll-rail" aria-hidden="true">
      <i />
    </div>
  )
}
