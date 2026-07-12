"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Star, Gem, Leaf } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

/**
 * Homepage: classic Carthage hero (video visual) followed by the
 * areas-of-activity section that routes visitors into each division.
 */

const DIVISIONS = [
  {
    href: "/shop",
    image: "/IMG_6447.JPG",
    alt: "Carthage GmbH V6 Pink cartridge needle with professional PMU products",
  },
  {
    href: "/stone-paper/shop",
    image: "/stone-paper/paper-3.jpg",
    alt: "Stone paper rolls, sheets and an open notebook by Golden Bridge",
  },
  {
    href: "/academy",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
    alt: "PMU artist working on a client at the Carthage GmbH Academy",
  },
] as const

/** Staggered fade-up reveal once the element scrolls into view. */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function HomeClient() {
  const { t } = useLanguage()
  const [subscribed, setSubscribed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // React doesn't server-render the `muted` attribute, which makes browsers
  // block autoplay before hydration - force playback once mounted.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      // autoplay rejected (e.g. data saver) - the poster keeps the design intact
    })
  }, [])

  const marqueeItems = [
    { icon: Zap, label: t.marquee.madeInGermany },
    { icon: Star, label: t.marquee.isoCertified },
    { icon: Gem, label: t.marquee.professionalGrade },
    { icon: Leaf, label: t.marquee.premiumQuality },
  ]

  return (
    <SiteShell>
      {/* Hero */}
      <main className="relative max-w-[1240px] w-full mx-auto pt-28 md:pt-36 pb-14 px-4 md:px-12 grid md:grid-cols-2 items-center gap-10 md:gap-14">
        <div className="z-[2]">
          <div className="inline-flex items-center px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-[11px] font-semibold uppercase tracking-wider mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <span className="w-[18px] h-3 mr-2 rounded-[2px] overflow-hidden inline-flex flex-col shrink-0 border border-black/5" aria-hidden="true">
              <span className="flex-1 bg-black" />
              <span className="flex-1 bg-[#dd0000]" />
              <span className="flex-1 bg-[#ffce00]" />
            </span>
            {t.hero.madeInGermany}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.02] font-semibold tracking-[-0.03em] mb-5 text-black">
            {t.hero.titleLine1} <br />
            <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-base md:text-[17px] leading-relaxed text-[#555] max-w-[440px] mb-8">{t.hero.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href="#divisions"
              className="bg-[#111] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2"
            >
              {t.hero.shopCollection}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about"
              className="px-7 py-3.5 rounded-full font-semibold text-sm bg-[rgba(255,255,255,0.5)] border border-[#e5e5e5] transition-all hover:bg-white hover:border-black"
            >
              {t.hero.aboutCarthage}
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[540px] w-full">
          <div className="group w-full h-full rounded-[40px] overflow-hidden relative -rotate-2 transition-transform duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:rotate-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/IMG_6447.JPG"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              aria-label="Carthage professional PMU products"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* Badge */}
            <div className="absolute top-5 left-5 z-[4] w-20 h-20 flex items-center justify-center bg-[#dbff00] rounded-full text-black font-extrabold font-display text-center rotate-[15deg] shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-xs leading-tight whitespace-pre-line">
              {t.hero.bestSellerBadge}
            </div>
          </div>
        </div>
      </main>

      {/* Marquee Ticker */}
      <div className="w-full bg-[#111] text-white py-3.5 overflow-hidden whitespace-nowrap relative -rotate-1 scale-[1.02] -mt-10 z-[5] border-t border-b border-[#333]">
        <div className="inline-block animate-[marquee_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <span key={i}>
              {marqueeItems.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="font-display text-base font-medium uppercase px-10 tracking-wider inline-flex items-center gap-2.5"
                >
                  <Icon className="w-4 h-4 text-[#dbff00]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Areas of activity */}
      <section id="divisions" className="py-16 md:py-20 px-4 md:px-12 max-w-[1240px] mx-auto scroll-mt-24">
        <Reveal>
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">
              {t.home.divisionsEyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-3">
              {t.home.divisionsTitle}{" "}
              <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                {t.home.divisionsTitleAccent}
              </span>
            </h2>
            <p className="text-[15px] md:text-base text-[#666] max-w-[520px] mx-auto">
              {t.home.divisionsSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.home.divisions.map((division, i) => {
            const meta = DIVISIONS[i]
            const label = i === 2 ? t.home.educationLabel : t.home.productionLabel
            return (
              <Reveal key={division.name} delay={i * 120} className="h-full">
                <Link
                  href={meta.href}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-[#eee] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e4d9c2] hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative h-40 md:h-44 overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={meta.image}
                      alt={meta.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em] bg-white/90 backdrop-blur-sm text-[#6b5c3e] rounded-full px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                      {label}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h3 className="font-display text-lg font-semibold mb-1.5 group-hover:text-[#8a713f] transition-colors">
                      {division.name}
                    </h3>
                    <p className="text-sm text-[#666] leading-relaxed mb-4">{division.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#c9a96e]">
                      {division.cta}
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-16 px-4 md:px-12 max-w-[1240px] mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,rgb(255,200,160)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative bg-gradient-to-br from-white to-[#fef9f3] rounded-[28px] p-8 md:p-12 border border-[rgba(201,169,110,0.1)] shadow-[0_40px_80px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[60px] bg-[radial-gradient(circle,rgb(232,201,122)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-20 blur-[60px] bg-[radial-gradient(circle,rgb(224,231,255)_0%,rgba(255,255,255,0)_70%)]" />

          <div className="relative max-w-[700px] mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] font-semibold tracking-[-0.03em] mb-5 text-black">
              {t.home.newsletterTitle1}
              <br />
              <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                {t.home.newsletterTitle2}
              </span>
            </h2>

            <p className="text-base leading-relaxed text-[#555] mb-8 max-w-[520px] mx-auto">
              {t.home.newsletterSubtitle}
            </p>

            {subscribed ? (
              <p className="text-base font-semibold text-[#10b981] mb-6">{t.home.newsletterThanks}</p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto mb-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  placeholder={t.home.newsletterPlaceholder}
                  className="flex-1 px-5 py-3 rounded-full border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)] transition-all"
                  required
                  aria-label={t.home.newsletterPlaceholder}
                />
                <button
                  type="submit"
                  className="bg-[#111] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {t.home.subscribe}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-[#888]">{t.home.newsletterDisclaimer}</p>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
