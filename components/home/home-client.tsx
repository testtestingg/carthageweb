"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Star, Gem, Leaf, Shield, Users, FlaskConical, Recycle, Quote } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

/**
 * Homepage: classic Carthage hero (video visual) followed by product samples,
 * reviews, why-us, areas-of-activity and newsletter.
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
    image: "/image5.jpg",
    alt: "PMU artist working on a client at the Carthage GmbH Academy",
  },
] as const

const PRODUCT_SAMPLES = [
  { image: "/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG", name: "Limited Edition Lips Pigment", category: "PMU Pigments", href: "/product/limited-edition-lips-pigment" },
  { image: "/IMG_6444.JPG", name: "V6 Pink Silicone Needle", category: "Cartridge Needles", href: "/product/v6-pink-silicone-tattoo-needle" },
  { image: "/IMG_6447.JPG", name: "V6 Pink Pro Edition", category: "Cartridge Needles", href: "/product/v6-pink-needle-pro" },
  { image: "/minimalist-rose-pink-toner-bottle-on-white-backgro.jpg", name: "Glow Tonic", category: "Skincare", href: "/product/glow-tonic-exfoliator" },
  { image: "/stone-paper/paper-1.jpg", name: "Stone Paper Notebook A5", category: "Stone Paper", href: "/product/stone-paper-notebook-a5" },
  { image: "/stone-paper/paper-9.jpg", name: "Stone Paper Bags", category: "Stone Paper", href: "/product/stone-paper-bags-sample-pack" },
]

// Real high-quality portrait photos from Unsplash
const REVIEWER_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
]

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  const marqueeItems = [
    { icon: Zap, label: t.marquee.madeInGermany },
    { icon: Star, label: t.marquee.isoCertified },
    { icon: Gem, label: t.marquee.professionalGrade },
    { icon: Leaf, label: t.marquee.premiumQuality },
  ]

  const whyIcons = [Shield, FlaskConical, Users, Recycle]

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

      {/* Product Samples */}
      <section className="py-16 md:py-24 px-4 md:px-12 max-w-[1240px] mx-auto">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">
              {t.home.samplesEyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-3">
              {t.home.samplesTitle}{" "}
              <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                {t.home.samplesTitleAccent}
              </span>
            </h2>
            <p className="text-[15px] md:text-base text-[#666] max-w-[560px] mx-auto">
              {t.home.samplesSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {PRODUCT_SAMPLES.map((sample, i) => (
            <Reveal key={sample.name} delay={i * 80}>
              <Link
                href={sample.href}
                className="group relative bg-white rounded-2xl border border-[#eee] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#e4d9c2]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f8f7f5]">
                  <Image
                    src={sample.image}
                    alt={sample.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-[0.15em] bg-white/90 backdrop-blur-sm text-[#6b5c3e] rounded-full px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    {sample.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#111] truncate group-hover:text-[#8a713f] transition-colors">{sample.name}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#111] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]"
            >
              {t.hero.shopCollection}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-20 bg-[#faf9f7]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-12">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">
                {t.home.testimonialsSubtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                {t.home.testimonialsTitle}{" "}
                <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                  {t.home.testimonialsTitleAccent}
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {t.home.testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 150}>
                <div className="group relative bg-white rounded-3xl p-7 md:p-8 border border-[#eee] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-[#e8c97a] opacity-40 mb-5" />
                  
                  <blockquote className="text-[15px] leading-[1.8] text-[#444] mb-7 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {/* Reviewer photo with modern glassmorphism ring effect */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#e8c97a]/30 ring-offset-2 ring-offset-white transition-all duration-500 group-hover:ring-[#c9a96e]/60 group-hover:ring-offset-4">
                        <Image
                          src={REVIEWER_IMAGES[i]}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#c9a96e]/20 to-[#e8c97a]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold text-[#111]">{testimonial.name}</p>
                      <p className="text-xs text-[#888]">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="absolute top-7 right-7 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#e8c97a] text-[#e8c97a]" />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Carthage */}
      <section className="py-16 md:py-24 px-4 md:px-12 max-w-[1240px] mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-3">
              {t.home.whyTitle}{" "}
              <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                {t.home.whyTitleAccent}
              </span>
            </h2>
            <p className="text-[15px] md:text-base text-[#666] max-w-[520px] mx-auto">
              {t.home.whySubtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {t.home.whyPoints.map((point, i) => {
            const Icon = whyIcons[i]
            return (
              <Reveal key={point.title} delay={i * 100}>
                <div className="group flex gap-5 p-6 md:p-7 bg-white rounded-2xl border border-[#eee] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-[#e4d9c2]">
                  <span className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#fdf6ec] to-[#f5e6c8] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#a4813d]" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#111] mb-1.5">{point.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

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
