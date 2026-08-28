"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/animation/gsap"

export interface FilmClip {
  src: string
  poster: string
  /** object-position for desktop / mobile crops. */
  position?: string
  positionMobile?: string
}

const SEGMENT_MS = 6800
const FADE_MS = 1200

/**
 * Cinematic hero film: the Carthage clips shown one at a time.
 *
 * - only the active clip (plus the one about to play) is ever given a `src`,
 *   so a phone never downloads all three at once
 * - each layer sits on its own poster image, so a crossfade never reveals
 *   a black gap while the next clip buffers
 * - playback stops when the tab is hidden or the hero leaves the viewport
 * - if playback fails outright the poster stays as the visible fallback
 */
export function HeroFilm({
  clips,
  captions,
  className = "",
}: {
  clips: FilmClip[]
  captions: { caption: string; division: string }[]
  className?: string
}) {
  const [current, setCurrent] = useState(0)
  const [armed, setArmed] = useState<number[]>([0])
  const [stillsOnly, setStillsOnly] = useState(false)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const rootRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const inViewRef = useRef(true)

  // Reduced motion, or a metered/slow connection: posters only, no downloads.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData === true || /^(slow-)?2g$/.test(conn?.effectiveType ?? "")
    if (prefersReducedMotion() || slow) setStillsOnly(true)
  }, [])

  const advance = useCallback(() => {
    setCurrent((i) => (i + 1) % clips.length)
  }, [clips.length])

  // Arm the *next* clip shortly after the current one starts, so it is
  // buffered by the time we crossfade to it.
  useEffect(() => {
    if (stillsOnly) return
    const next = (current + 1) % clips.length
    const id = window.setTimeout(() => {
      setArmed((a) => (a.includes(next) ? a : [...a, next]))
    }, 1800)
    return () => window.clearTimeout(id)
  }, [current, clips.length, stillsOnly])

  // Drive the sequence.
  useEffect(() => {
    if (stillsOnly) return
    const schedule = () => {
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(advance, SEGMENT_MS)
    }
    schedule()
    return () => window.clearTimeout(timerRef.current)
  }, [current, advance, stillsOnly])

  // Play only the active clip; keep the outgoing one running through the fade.
  useEffect(() => {
    if (stillsOnly) return
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === current) {
        v.currentTime = 0
        void v.play().catch(() => undefined)
      } else {
        window.setTimeout(() => {
          if (videoRefs.current[i] && i !== current) videoRefs.current[i]?.pause()
        }, FADE_MS)
      }
    })
  }, [current, armed, stillsOnly])

  // Pause entirely when the tab is hidden or the hero scrolls away.
  useEffect(() => {
    if (stillsOnly) return
    const sync = () => {
      const active = inViewRef.current && !document.hidden
      const v = videoRefs.current[current]
      if (!v) return
      if (active) void v.play().catch(() => undefined)
      else v.pause()
      if (active) {
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(advance, SEGMENT_MS)
      } else {
        window.clearTimeout(timerRef.current)
      }
    }

    document.addEventListener("visibilitychange", sync)
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting
        sync()
      },
      { threshold: 0.05 },
    )
    if (rootRef.current) io.observe(rootRef.current)

    return () => {
      document.removeEventListener("visibilitychange", sync)
      io.disconnect()
    }
  }, [current, advance, stillsOnly])

  return (
    <div ref={rootRef} className={`hero-film ${className}`}>
      {clips.map((clip, i) => (
        <div
          key={clip.src}
          className={`hero-film-layer ${i === current ? "is-active" : ""}`}
          style={{
            backgroundImage: `url(${clip.poster})`,
            ["--pos" as string]: clip.position ?? "center",
            ["--pos-mobile" as string]: clip.positionMobile ?? clip.position ?? "center",
          }}
          aria-hidden={i !== current}
        >
          {!stillsOnly && armed.includes(i) && (
            <video
              ref={(node) => {
                videoRefs.current[i] = node
              }}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              poster={clip.poster}
              tabIndex={-1}
              onError={() => setArmed((a) => a.filter((x) => x !== i))}
            >
              <source src={clip.src} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      {/* Legibility scrim, two axes so the headline holds on any frame. */}
      <div className="hero-film-scrim" aria-hidden="true" />

      {/* The clip index and caption were removed from the design. The current
          clip is still announced for screen readers, since the films are the
          only thing distinguishing one hero state from the next. */}
      <p className="sr-only" aria-live="polite">
        {captions[current]?.division}: {captions[current]?.caption}
      </p>

    </div>
  )
}
