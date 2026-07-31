"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register once. Guarded so Fast Refresh / multiple imports never double-register.
let registered = false

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger)
  // Pinned sections must not fight the browser's scroll anchoring.
  ScrollTrigger.config({ ignoreMobileResize: true })
  registered = true
}

export { gsap, ScrollTrigger }

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Refresh ScrollTrigger once fonts and above-the-fold media have settled.
 * Pinned spacers are sized from measured heights, so refreshing too early
 * leaves gaps once a webfont swaps in.
 */
export function refreshWhenReady() {
  if (typeof window === "undefined") return

  const refresh = () => ScrollTrigger.refresh()

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => undefined)
  }
  if (document.readyState === "complete") {
    requestAnimationFrame(refresh)
  } else {
    window.addEventListener("load", refresh, { once: true })
  }
}
