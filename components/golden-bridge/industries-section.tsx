"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Industry {
  name: string
  description: string
  image: string
}

/**
 * Sector photography is still placeholder (Unsplash) until Carthage's own
 * imagery is available. Swap the `image` values for local paths and the
 * carousel needs no other change.
 */
const industries: Industry[] = [
  {
    name: "German Police",
    description:
      "Notebooks that survive rain, handling and long shifts on duty, where a soaked or torn page is not an option.",
    image: "https://images.unsplash.com/photo-1554190798-fb1f4ae5ff6b?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "German Army",
    description:
      "Field-grade stationery for training and deployment: water resistant, tear resistant and dependable outdoors.",
    image: "https://images.unsplash.com/photo-1598858117468-f5c77292bfa6?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "Social Housing",
    description:
      "Durable record keeping for housing and tenancy staff working on site, between properties and in all weather.",
    image: "https://images.unsplash.com/photo-1681751864665-f07e8a462c49?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "Schools & Education",
    description:
      "Hard-wearing notebooks for daily classroom use, built to last a full school year of bags, desks and transport.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "Universities",
    description:
      "Lecture and laboratory notebooks with a smooth writing surface, and a tree-free material story students value.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "Public Institutions",
    description:
      "Supplied to public bodies and agencies that need consistent quality, documented materials and reliable resupply.",
    image: "https://images.unsplash.com/photo-1552035496-08efc7baf40e?auto=format&fit=crop&w=1000&q=75",
  },
  {
    name: "Companies & Corporate",
    description:
      "Branded notebooks for corporate identity, employee kits, conferences and client gifts, embossed or printed to order.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=75",
  },
]

const AUTOPLAY_MS = 5000

/**
 * Where each card sits relative to the active one. `spread` shrinks the
 * horizontal offsets on narrow screens so neighbours stay on stage.
 */
function stageStyle(offset: number, total: number, spread: number) {
  const x = (n: number) => `${n * spread}px`
  if (offset === 0)
    return { transform: "translateX(0) scale(1) rotateY(0deg)", opacity: 1, zIndex: 30, filter: "brightness(1)" }
  if (offset === 1)
    return { transform: "translateX(${x(285)}) scale(0.84) rotateY(-24deg)", opacity: 0.65, zIndex: 20, filter: "brightness(0.75)" }
  if (offset === 2)
    return { transform: `translateX(${x(510)}) scale(0.68) rotateY(-38deg)`, opacity: 0.38, zIndex: 10, filter: "brightness(0.55) blur(1px)" }
  if (offset === total - 1)
    return { transform: `translateX(${x(-285)}) scale(0.84) rotateY(24deg)`, opacity: 0.65, zIndex: 20, filter: "brightness(0.75)" }
  if (offset === total - 2)
    return { transform: `translateX(${x(-510)}) scale(0.68) rotateY(38deg)`, opacity: 0.38, zIndex: 10, filter: "brightness(0.55) blur(1px)" }
  return { transform: "translateX(0) scale(0.4) rotateY(0deg)", opacity: 0, zIndex: 0, filter: "brightness(0.4) blur(2px)" }
}

/**
 * Who the stone paper stationery is sold to, as a coverflow stage: one sector
 * held in focus with its neighbours angled away, rather than a flat grid.
 */
export function IndustriesSection() {
  const total = industries.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [spread, setSpread] = useState(1)
  const touchStartX = useRef(0)

  useEffect(() => {
    const sync = () => setSpread(window.innerWidth < 640 ? 0.62 : window.innerWidth < 900 ? 0.8 : 1)
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      className="gb-coverflow relative overflow-hidden select-none px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background"
      aria-roledescription="carousel"
      aria-label="Sectors we supply"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchStart(e, touchStartX)}
      onTouchEnd={(e) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(diff) > 45) (diff < 0 ? next : prev)()
      }}
    >
      {/* The active photograph, blurred back to an ambience wash. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          key={industries[current].image}
          src={industries[current].image}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.22) blur(32px)", transform: "scale(1.15)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,12,10,0.3)_0%,rgba(12,12,10,0.94)_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-9 bg-gradient-to-r from-transparent to-[color:var(--gb-brass)]" />
          <p className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--gb-brass)]">
            Who We Supply
          </p>
          <span className="h-px w-9 bg-gradient-to-r from-[color:var(--gb-brass)] to-transparent" />
        </div>

        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-balance max-w-3xl">
          Trusted across public service, education and industry.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-[1.75] text-background/60 font-light">
          Our stone paper notebooks are used wherever paper has to hold up: outdoors, in the
          field, and through a full year of daily handling.
        </p>

        {/* Stage */}
        <div className="gb-coverflow-stage relative mt-14 md:mt-20" style={{ perspective: "1400px" }}>
          {industries.map((item, idx) => {
            const offset = (idx - current + total) % total
            const isCenter = offset === 0
            const s = stageStyle(offset, total, spread)

            return (
              <button
                key={item.name}
                type="button"
                tabIndex={isCenter ? 0 : -1}
                aria-hidden={!isCenter}
                onClick={() => !isCenter && setCurrent(idx)}
                className="gb-coverflow-card absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden text-left"
                style={{
                  ...s,
                  transformOrigin: "center center",
                  transition: "transform 800ms cubic-bezier(0.25,1,0.5,1), opacity 800ms, filter 800ms",
                  cursor: isCenter ? "default" : "pointer",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(201,169,110,0.22)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                }}
              >
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/95" />

                <span
                  className="relative z-10 flex h-full flex-col justify-end p-7 text-center transition-all duration-500"
                  style={{ opacity: isCenter ? 1 : 0, transform: isCenter ? "none" : "translateY(16px)" }}
                >
                  <span className="block text-xl md:text-2xl font-extralight tracking-tight text-white [text-shadow:0_3px_12px_rgba(0,0,0,0.95)]">
                    {item.name}
                  </span>
                  <span className="mx-auto my-4 block h-px w-9 bg-[color:var(--gb-brass)]" />
                  <span className="block text-[13px] leading-[1.65] text-white/85 font-light [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                    {item.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Controls */}
        <div className="relative mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous sector"
            className="gb-coverflow-nav"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {industries.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={item.name}
                aria-current={idx === current}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: idx === current ? 28 : 8,
                  background: idx === current ? "var(--gb-brass)" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>

          <button type="button" onClick={next} aria-label="Next sector" className="gb-coverflow-nav">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

function setTouchStart(e: React.TouchEvent, ref: React.MutableRefObject<number>) {
  ref.current = e.touches[0].clientX
}
