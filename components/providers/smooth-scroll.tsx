"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animation/gsap"

/**
 * Subtle smooth scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
 * share one rAF loop (two loops = jitter on pinned sections).
 *
 * Deliberately conservative:
 *  - native touch scrolling is untouched (`smoothWheel` only)
 *  - disabled entirely under prefers-reduced-motion
 *  - no scroll hijacking: wheel deltas still map 1:1 to distance
 */
let active: Lenis | null = null

/**
 * Scroll to a target through Lenis when it is running, so programmatic jumps
 * (the back-to-top button, in-page anchors) don't desync the smoothed position.
 */
export function scrollToTarget(target: number | string, offset = 0) {
  if (active) {
    active.scrollTo(target, { offset, duration: 1.1 })
    return
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Touch devices keep their native momentum — smoothing them feels laggy.
      syncTouch: false,
      touchMultiplier: 1,
    })

    active = lenis

    // Keep ScrollTrigger's cached scroll position in step with Lenis.
    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger.refresh() can change document height; tell Lenis about it.
    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener("refresh", onRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      active = null
    }
  }, [])

  return null
}
