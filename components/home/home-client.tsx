"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Star, Gem, Leaf } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

/**
 * Corporate homepage: presents the group's areas of activity
 * (Industry & Production: Cosmetics, Stone Paper - plus the Academy)
 * and routes visitors into each division's own section.
 */

const DIVISIONS = [
  {
    href: "/shop",
    image: "/IMG_6447.JPG",
    alt: "Carthage V6 Pink cartridge needle with professional PMU products",
    production: true,
  },
  {
    href: "/stone-paper",
    image: "/stone-paper/paper-3.jpg",
    alt: "Stone paper rolls, sheets and an open notebook by Golden Bridge",
    production: true,
  },
  {
    href: "/academy",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
    alt: "PMU artist working on a client at the Carthage Academy",
    production: false,
  },
] as const

export function HomeClient() {
  const { t } = useLanguage()
  const [subscribed, setSubscribed] = useState(false)

  const marqueeItems = [
    { icon: Zap, label: t.marquee.madeInGermany },
    { icon: Star, label: t.marquee.isoCertified },
    { icon: Gem, label: t.marquee.professionalGrade },
    { icon: Leaf, label: t.marquee.premiumQuality },
  ]

  return (
    <SiteShell>
      {/* Hero */}
      <main className="relative max-w-[1240px] w-full mx-auto pt-32 md:pt-40 pb-14 md:pb-20 px-4 md:px-12 text-center">
        <div className="inline-flex items-center px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-[11px] font-semibold uppercase tracking-wider mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <span className="w-[18px] h-3 mr-2 rounded-[2px] overflow-hidden inline-flex flex-col shrink-0 border border-black/5" aria-hidden="true">
            <span className="flex-1 bg-black" />
            <span className="flex-1 bg-[#dd0000]" />
            <span className="flex-1 bg-[#ffce00]" />
          </span>
          {t.hero.madeInGermany}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.05] font-semibold tracking-[-0.03em] mb-5 text-black">
          {t.hero.titleLine1} <br />
          <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        <p className="text-base md:text-[17px] leading-relaxed text-[#555] max-w-[560px] mx-auto mb-8">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href="#divisions"
            className="bg-[#111] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2"
          >
            {t.hero.shopCollection}
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/about"
            className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white border border-[#e5e5e5] transition-all hover:border-black"
          >
            {t.hero.aboutCarthage}
          </Link>
        </div>
      </main>

      {/* Marquee Ticker */}
      <div className="w-full bg-[#111] text-white py-3.5 overflow-hidden whitespace-nowrap relative -rotate-1 scale-[1.02] z-[5] border-t border-b border-[#333]">
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
        <div className="text-center mb-10 md:mb-14">
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

        {/* Production divisions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {t.home.divisions.slice(0, 2).map((division, i) => {
            const meta = DIVISIONS[i]
            return (
              <Link
                key={division.name}
                href={meta.href}
                className="group relative flex flex-col justify-end min-h-[380px] md:min-h-[440px] rounded-[24px] overflow-hidden border border-[#eee] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              >
                <Image
                  src={meta.image}
                  alt={meta.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="relative p-7 md:p-8 text-white">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4">
                    {t.home.productionLabel}
                  </span>
                  <h3 className="font-display text-2xl md:text-[28px] font-semibold mb-2">{division.name}</h3>
                  <p className="text-sm text-white/80 leading-relaxed max-w-[400px] mb-5">
                    {division.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8c97a] group-hover:gap-3 transition-all">
                    {division.cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Academy */}
        <Link
          href={DIVISIONS[2].href}
          className="group grid md:grid-cols-[1fr_320px] items-stretch bg-white rounded-[24px] border border-[#eee] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
        >
          <div className="p-7 md:p-8 flex flex-col justify-center">
            <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-[0.2em] bg-[#fdf6ec] text-[#a4813d] border border-[#f0e3c8] rounded-full px-3 py-1 mb-4">
              {t.home.educationLabel}
            </span>
            <h3 className="font-display text-2xl md:text-[28px] font-semibold mb-2">
              {t.home.divisions[2].name}
            </h3>
            <p className="text-sm text-[#666] leading-relaxed max-w-[480px] mb-5">
              {t.home.divisions[2].description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a96e] group-hover:gap-3 transition-all">
              {t.home.divisions[2].cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <div className="relative min-h-[220px] md:min-h-0">
            <Image
              src={DIVISIONS[2].image}
              alt={DIVISIONS[2].alt}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </Link>
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
