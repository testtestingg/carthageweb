"use client"

import { useEffect, useMemo, useState } from "react"
import type { homeContent } from "@/lib/home-content"

type Copy = (typeof homeContent)["en"]

interface Partner {
  key: keyof Copy["partners"]["meta"]
  name: string
  logo?: string
  href?: string
}

const PARTNERS: Partner[] = [
  { key: "tuBerlin", name: "Technische Universität Berlin", logo: "/partners/tu-berlin.svg", href: "https://www.tu.berlin/" },
  { key: "fuBerlin", name: "Freie Universität Berlin", logo: "/partners/fu-berlin.png", href: "https://www.fu-berlin.de/" },
  { key: "naturalWorld", name: "Natural World Industrial Group Germany GmbH", logo: "/partners/natural-world.jpg" },
  { key: "leda", name: "Qingdao Leda International Logistics", logo: "/partners/qingdao-leda.jpg" },
  { key: "sparkasse", name: "Berliner Sparkasse", href: "https://www.berliner-sparkasse.de/" },
]

const CYCLE_MS = 2600
const COLUMN_STAGGER_MS = 260

/** Round-robin the partners into columns, padding so every column cycles. */
function toColumns(partners: Partner[], columnCount: number): Partner[][] {
  const columns: Partner[][] = Array.from({ length: columnCount }, () => [])
  partners.forEach((p, i) => columns[i % columnCount].push(p))

  const longest = Math.max(...columns.map((c) => c.length))
  columns.forEach((col, i) => {
    let n = 0
    while (col.length < longest) col.push(partners[(i + n++) % partners.length])
  })
  return columns
}

function PartnerMark({ partner, meta }: { partner: Partner; meta: string }) {
  const body = (
    <>
      <span className="partner-mark">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} loading="lazy" />
        ) : (
          <span className="partner-wordmark">{partner.name}</span>
        )}
      </span>
      <span className="partner-meta mono">{meta}</span>
    </>
  )

  return partner.href ? (
    <a className="partner-slide" href={partner.href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <span className="partner-slide">{body}</span>
  )
}

function PartnerColumn({ column, index, tick }: { column: Partner[]; index: number; tick: number }) {
  // Each column runs the same clock, offset, so they never flip in unison.
  const step = Math.floor((tick + index * COLUMN_STAGGER_MS) / CYCLE_MS) % column.length
  const partner = column[step]

  return (
    <div className="partner-col">
      <div key={`${partner.key}-${step}`} className="partner-col-item">
        <PartnerMark partner={partner} meta="" />
      </div>
    </div>
  )
}

/**
 * Partner wall as a cycling logo carousel: a few columns, each rotating
 * through its share of the partners on a staggered clock, so the row keeps
 * moving without ever scrolling the page.
 */
export function Partners({ c }: { c: Copy }) {
  const [tick, setTick] = useState(0)
  const [columnCount, setColumnCount] = useState(3)

  useEffect(() => {
    const sync = () => setColumnCount(window.innerWidth < 720 ? 2 : 3)
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const id = setInterval(() => setTick((t) => t + 100), 100)
    return () => clearInterval(id)
  }, [])

  const columns = useMemo(() => toColumns(PARTNERS, columnCount), [columnCount])

  return (
    <section className="partners" aria-labelledby="partners-title">
      <div className="partners-head">
        <p className="eyebrow">{c.partners.eyebrow}</p>
        <div>
          <h2 id="partners-title">{c.partners.title}</h2>
          <p>{c.partners.body}</p>
        </div>
      </div>

      <div className="partner-carousel">
        {columns.map((column, i) => (
          <PartnerColumn key={i} column={column} index={i} tick={tick} />
        ))}
      </div>

      {/* The carousel only ever shows a few partners at a time, so the full
          list stays in the DOM for readers and for search engines. */}
      <ul className="partner-list">
        {PARTNERS.map((p) => (
          <li key={p.key}>
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
            ) : (
              p.name
            )}
            <span className="mono">{c.partners.meta[p.key]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
