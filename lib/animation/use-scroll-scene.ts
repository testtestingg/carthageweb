"use client"

import { useLayoutEffect, useRef, type RefObject } from "react"
import { gsap, prefersReducedMotion, refreshWhenReady } from "./gsap"

export interface SceneContext {
  /** Scoped selector — never queries outside this component's subtree. */
  q: gsap.utils.SelectorFunc
  root: HTMLElement
  reduced: boolean
  /**
   * Responsive timelines. Use `mm.add("(min-width: 1024px)", () => {...})`;
   * every ScrollTrigger created inside is killed when the query stops matching.
   */
  mm: gsap.MatchMedia
}

/**
 * Runs a GSAP scene scoped to the returned ref, torn down with
 * gsap.context().revert().
 *
 * Everything created inside the builder — tweens, timelines, ScrollTriggers,
 * matchMedia branches — is owned by the context, so unmounting or a locale
 * change kills every trigger instead of leaving orphaned pin spacers behind.
 */
export function useScrollScene<T extends HTMLElement>(
  build: (ctx: SceneContext) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const reduced = prefersReducedMotion()
    const mm = gsap.matchMedia()

    const ctx = gsap.context((self) => {
      build({
        q: self.selector as gsap.utils.SelectorFunc,
        root,
        reduced,
        mm,
      })
    }, root)

    refreshWhenReady()

    return () => {
      mm.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
