"use client"

import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/animation/gsap"

/** Authentic Carthage Care footage, with poster frames pulled from each clip. */
const CARE_MEDIA = [
  { src: "/video1.mp4", poster: "/posters/pigments.jpg", label: "Carthage PMU pigment range" },
  { src: "/carthage-care-01.m4v", poster: "/posters/care-01.jpg", label: "Carthage Academy training in Berlin" },
] as const

const SEGMENT_MS = 6500

export function MediaRotator({ className = "" }: { className?: string }) {
  const [current, setCurrent] = useState(0)
  const [armed, setArmed] = useState<number[]>([0])
  const [stillsOnly, setStillsOnly] = useState(false)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  useEffect(() => {
    if (prefersReducedMotion()) setStillsOnly(true)
  }, [])

  // Only fetch the next clip once the current one is playing.
  useEffect(() => {
    if (stillsOnly) return
    const next = (current + 1) % CARE_MEDIA.length
    const id = window.setTimeout(() => {
      setArmed((a) => (a.includes(next) ? a : [...a, next]))
    }, 1800)
    return () => window.clearTimeout(id)
  }, [current, stillsOnly])

  useEffect(() => {
    if (stillsOnly) return
    const id = window.setInterval(() => setCurrent((i) => (i + 1) % CARE_MEDIA.length), SEGMENT_MS)
    return () => window.clearInterval(id)
  }, [stillsOnly])

  useEffect(() => {
    if (stillsOnly) return
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      video.muted = true
      if (index === current) void video.play().catch(() => undefined)
      else video.pause()
    })
  }, [current, armed, stillsOnly])

  // Don't keep decoding while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => {
      const video = videoRefs.current[current]
      if (!video) return
      if (document.hidden) video.pause()
      else void video.play().catch(() => undefined)
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [current])

  return (
    <div className={`media-rotator ${className}`} aria-label="Cosmetics and PMU films">
      {CARE_MEDIA.map((item, index) => (
        <div
          key={item.src}
          className={`media-rotator-layer ${index === current ? "is-active" : ""}`}
          style={{ backgroundImage: `url(${item.poster})` }}
          aria-hidden={index !== current}
        >
          {!stillsOnly && armed.includes(index) && (
            <video
              ref={(node) => {
                videoRefs.current[index] = node
              }}
              muted
              loop
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              poster={item.poster}
              aria-label={item.label}
              tabIndex={-1}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
      <div className="media-rotator-shade" />
      <div className="media-rotator-controls" aria-label="Choose hero film">
        {CARE_MEDIA.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setCurrent(index)}
            className={index === current ? "is-active" : ""}
            aria-label={item.label}
            aria-current={index === current ? "true" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </button>
        ))}
      </div>
    </div>
  )
}
