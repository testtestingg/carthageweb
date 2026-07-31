"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/animation/gsap"

/**
 * Below-the-fold video that only downloads once it is actually on screen,
 * pauses when it leaves or the tab is hidden, and falls back to its poster
 * if playback is unavailable (reduced motion, decode failure, autoplay block).
 */
export function LazyVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string
  poster: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || prefersReducedMotion()) return

    let loaded = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          if (!loaded) {
            video.preload = "auto"
            video.src = src
            loaded = true
          }
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)

    const onVisibility = () => {
      if (document.hidden) video.pause()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [src])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className={className}
    />
  )
}
