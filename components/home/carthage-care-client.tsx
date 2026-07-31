"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MoveUpRight } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { CareHero } from "@/components/home/sections/care-hero"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { useLanguage } from "@/context/language-context"
import { carthageCareContent } from "@/lib/carthage-care-content"

const PRODUCT_MEDIA = ["/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG", "/IMG_6447.JPG", "/minimalist-rose-pink-toner-bottle-on-white-backgro.jpg"]

function CareReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { node.classList.add("is-visible"); return }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add("is-visible"); observer.disconnect() } }, { threshold: .14 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`care-reveal ${className}`}>{children}</div>
}

export function CarthageCareClient() {
  const { locale } = useLanguage()
  const c = carthageCareContent[locale]

  return (
    <SiteShell atmosphere={false}>
      <SmoothScroll />
      {/* keyed on locale so the hero timeline rebuilds against new line counts */}
      <main className="care-page carthage-home" key={locale}>
        <CareHero c={c} />

        <section id="care-intro" className="care-intro">
          <CareReveal><p className="group-eyebrow">{c.intro.eyebrow}</p><h2>{c.intro.title}</h2><p>{c.intro.body}</p></CareReveal>
        </section>

        <section className="care-products">
          <CareReveal className="care-heading"><p className="group-eyebrow">{c.products.eyebrow}</p><h2>{c.products.title}</h2></CareReveal>
          <div className="care-product-grid">{c.products.items.map(([title, body], index) => <article key={title}><div className="care-product-image"><Image src={PRODUCT_MEDIA[index]} alt={title} fill sizes="(max-width: 760px) 100vw, 33vw" className="object-cover" /></div><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="care-process">
          <div className="care-process-media"><video autoPlay muted loop playsInline preload="metadata" poster="/IMG_6444.JPG"><source src="/video1.mp4" type="video/mp4" /></video></div>
          <CareReveal className="care-process-copy"><p className="group-eyebrow">{c.making.eyebrow}</p><h2>{c.making.title}</h2><p>{c.making.body}</p><Link href="/shop" className="group-text-link">{c.making.cta}<MoveUpRight /></Link></CareReveal>
        </section>

        <section className="care-academy">
          <div className="care-academy-media"><Image src="/image15.jpg" alt="Carthage Academy professional PMU training" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" /></div>
          <CareReveal><p className="group-eyebrow">{c.academy.eyebrow}</p><h2>{c.academy.title}</h2><p>{c.academy.body}</p><Link href="/academy" className="group-text-link">{c.academy.cta}<MoveUpRight /></Link></CareReveal>
        </section>

        <section className="care-final"><CareReveal><p className="group-eyebrow">{c.final.eyebrow}</p><h2>{c.final.title}</h2><div><Link href="/shop">{c.final.shop}<ArrowRight /></Link><Link href="/">{c.final.group}<ArrowRight /></Link></div></CareReveal></section>
      </main>
    </SiteShell>
  )
}
