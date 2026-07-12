"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Factory, Wheat, HardHat, Coffee, Briefcase, ShieldCheck } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

/**
 * Golden Bridge stone paper division.
 * Same Carthage shell (header, cart, footer) but its own editorial,
 * industrial design language: stone palette, hairline rules, numbered
 * sections and light typography.
 */

const PRODUCT_IMAGES = [
  { src: "/stone-paper/paper-9.jpg", alt: "Stone paper bags in an industrial warehouse" },
  { src: "/stone-paper/paper-11.jpg", alt: "White PP woven bags stacked on pallets" },
  { src: "/stone-paper/paper-1.jpg", alt: "Stone paper notebooks with limestone pen tray" },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a8378] mb-4">{children}</p>
  )
}

export function StonePaperClient() {
  const { t } = useLanguage()
  const sp = t.stonePaper

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative min-h-[82vh] flex items-end overflow-hidden">
        <Image
          src="/stone-paper/paper-3.jpg"
          alt="Stone paper rolls, sheets and an open notebook"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/85 via-[#1c1a17]/30 to-transparent" />
        <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-12 pb-14 md:pb-20 pt-40 text-white">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/70 mb-5">{sp.heroEyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-0.02em] font-medium max-w-[700px]">
            {sp.heroTitle1} <span className="italic font-light text-[#e8dcc3]">{sp.heroTitle2}</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-[540px]">{sp.heroSubtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1c1a17] px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-[#e8dcc3]"
            >
              {sp.ctaSamples}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/10 hover:border-white"
            >
              {sp.ctaProducts}
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#1c1a17] text-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-4">
          {sp.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 md:py-10 px-4 text-center md:text-left ${i > 0 ? "border-l border-white/10" : ""}`}
            >
              <p className="font-display text-2xl md:text-3xl font-medium text-[#e8dcc3]">{stat.value}</p>
              <p className="mt-1.5 text-xs text-white/60 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro editorial split */}
      <section className="bg-[#f6f4f0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <Eyebrow>{sp.introEyebrow}</Eyebrow>
            <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17] text-balance mb-6">
              {sp.introTitle}
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#5c574e] mb-4">{sp.introP1}</p>
            <p className="text-[15px] leading-[1.8] text-[#5c574e]">{sp.introP2}</p>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/stone-paper/paper-8.jpg"
                alt={sp.factoryCaption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[#8a8378]">
              {sp.factoryCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Product lines */}
      <section id="products" className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-[560px] mb-10 md:mb-14">
          <Eyebrow>{sp.productsEyebrow}</Eyebrow>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17] text-balance">
            {sp.productsTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sp.products.map((product, i) => (
            <article
              key={product.name}
              className="group flex flex-col bg-white rounded-2xl border border-[#e9e5dd] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(28,26,23,0.08)] hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f4f0]">
                <Image
                  src={PRODUCT_IMAGES[i].src}
                  alt={PRODUCT_IMAGES[i].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 md:p-7">
                <span className="text-[11px] tracking-[0.15em] text-[#b3ab9c]">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <h3 className="mt-2 font-display text-lg font-medium text-[#1c1a17]">{product.name}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-[#5c574e]">{product.description}</p>
                <ul className="mt-5 pt-5 border-t border-[#efece5] space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] text-[#5c574e]">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#a89263]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#f6f4f0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24">
          <div className="max-w-[560px] mb-10 md:mb-14">
            <Eyebrow>{sp.processEyebrow}</Eyebrow>
            <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17]">
              {sp.processTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2ddd2] border border-[#e2ddd2] rounded-2xl overflow-hidden">
            {sp.processSteps.map((step, i) => (
              <div key={step.title} className="bg-[#faf9f6] p-7 md:p-8">
                <span className="text-[11px] tracking-[0.15em] text-[#b3ab9c]">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <h3 className="mt-4 font-display text-base font-medium text-[#1c1a17]">{step.title}</h3>
                <div className="w-7 h-px bg-[#d8d2c4] my-4" />
                <p className="text-[13px] leading-[1.75] text-[#5c574e]">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Manufacturing video */}
          <div className="mt-14 md:mt-16 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <div>
              <Eyebrow>{sp.videoEyebrow}</Eyebrow>
              <h3 className="font-display text-xl md:text-2xl leading-tight tracking-[-0.02em] font-medium text-[#1c1a17]">
                {sp.videoTitle}
              </h3>
            </div>
            <video
              controls
              muted
              playsInline
              preload="none"
              poster="/stone-paper/paper-10.jpg"
              className="w-full rounded-2xl border border-[#e9e5dd] bg-black aspect-video object-cover"
            >
              <source src="/stone-paper/manufacturing.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <figure className="order-last md:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/stone-paper/paper-2.jpg"
              alt="Limestone pebbles, calcium carbonate powder and a green leaf"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </figure>
        <div>
          <Eyebrow>{sp.sustainEyebrow}</Eyebrow>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17] mb-6">
            {sp.sustainTitle}
          </h2>
          <p className="text-[15px] leading-[1.8] text-[#5c574e] mb-4">{sp.sustainP1}</p>
          <p className="text-[15px] leading-[1.8] text-[#5c574e] mb-7">{sp.sustainP2}</p>
          <ul className="space-y-3">
            {sp.sustainPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium text-[#1c1a17]">
                <span className="w-8 h-8 rounded-full bg-[#f0ece2] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#a89263]" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical specs */}
      <section className="bg-[#f6f4f0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24">
          <div className="max-w-[560px] mb-10 md:mb-14">
            <Eyebrow>{sp.specsEyebrow}</Eyebrow>
            <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17]">
              {sp.specsTitle}
            </h2>
          </div>
          <dl className="grid md:grid-cols-2 gap-px bg-[#e2ddd2] border border-[#e2ddd2] rounded-2xl overflow-hidden">
            {sp.specs.map((spec) => (
              <div
                key={spec.label}
                className="bg-[#faf9f6] flex items-center justify-between gap-4 px-6 md:px-8 py-5"
              >
                <dt className="text-[11px] tracking-[0.2em] uppercase text-[#8a8378]">{spec.label}</dt>
                <dd className="text-sm font-medium text-[#1c1a17] text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Applications */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="max-w-[560px] mb-10 md:mb-14">
          <Eyebrow>{sp.applicationsEyebrow}</Eyebrow>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17]">
            {sp.applicationsTitle}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {sp.applications.map((app, i) => {
            const icons = [Wheat, HardHat, Coffee, Briefcase]
            const Icon = icons[i] || Factory
            return (
              <article
                key={app.name}
                className="group flex gap-5 p-6 md:p-7 bg-white rounded-2xl border border-[#e9e5dd] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(28,26,23,0.06)] hover:-translate-y-0.5"
              >
                <span className="w-12 h-12 shrink-0 rounded-xl bg-[#f6f4f0] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#a89263]" />
                </span>
                <div>
                  <h3 className="font-display text-base font-medium text-[#1c1a17] mb-2">{app.name}</h3>
                  <p className="text-sm leading-[1.7] text-[#5c574e]">{app.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-[#f6f4f0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24">
          <div className="max-w-[560px] mb-10 md:mb-14">
            <Eyebrow>{sp.certEyebrow}</Eyebrow>
            <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] font-medium text-[#1c1a17]">
              {sp.certTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sp.certs.map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-4 p-5 bg-[#faf9f6] rounded-xl border border-[#e9e5dd]"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-[#edeae2] flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#a89263]" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#a89263]">{cert.label}</p>
                  <p className="text-sm text-[#5c574e]">{cert.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="relative bg-[#1c1a17] text-white rounded-[28px] px-6 py-14 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full opacity-15 blur-[80px] bg-[radial-gradient(circle,rgb(232,220,195)_0%,transparent_70%)]" />
          <div className="relative max-w-[560px] mx-auto">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-5">{sp.ctaEyebrow}</p>
            <h2 className="font-display text-2xl md:text-4xl leading-[1.1] tracking-[-0.02em] font-medium mb-4">
              {sp.ctaTitle}
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">{sp.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#e8dcc3] text-[#1c1a17] px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white"
              >
                {sp.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/10 hover:border-white"
              >
                {sp.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
