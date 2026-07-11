"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Zap, Star, Gem, Leaf } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { ProductCard } from "@/components/site/product-card"
import { CategoryIcon } from "@/components/site/category-icon"
import { useLanguage } from "@/context/language-context"
import { localizeCategory, type Category, type Product } from "@/lib/types"

export function HomeClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  const { locale, t } = useLanguage()
  const [subscribed, setSubscribed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // React doesn't server-render the `muted` attribute, which makes browsers
  // block autoplay before hydration - force playback once mounted.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      // autoplay rejected (e.g. data saver)
    })
  }, [])

  const featuredProducts = [...products]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 4)

  const marqueeItems = [
    { icon: Zap, label: t.marquee.madeInGermany },
    { icon: Star, label: t.marquee.isoCertified },
    { icon: Gem, label: t.marquee.professionalGrade },
    { icon: Leaf, label: t.marquee.premiumQuality },
  ]

  return (
    <SiteShell>
      {/* Main Hero */}
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
            <Link
              href="/shop"
              className="bg-[#111] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2"
            >
              {t.hero.shopCollection}
              <ArrowRight className="w-4 h-4" />
            </Link>
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

      {/* Featured Products Strip */}
      <section className="py-14 px-4 md:px-12 max-w-[1240px] mx-auto">
        <div className="flex justify-between items-end mb-7">
          <h3 className="font-display text-2xl font-semibold">{t.home.trendingNow}</h3>
          <Link href="/shop" className="underline font-medium text-sm">
            {t.home.seeAllProducts}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-14 px-4 md:px-12 max-w-[1240px] mx-auto">
        <div className="text-center mb-10">
          <h3 className="font-display text-3xl font-semibold mb-3">
            {t.home.exploreTitle}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
              {t.home.exploreTitleAccent}
            </span>
          </h3>
          <p className="text-base text-[#666]">{t.home.exploreSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((category) => {
            const info = localizeCategory(category, locale)
            const href = category.id === "academy" ? "/academy" : `/shop?category=${category.id}`
            return (
              <Link
                key={category.id}
                href={href}
                className="group bg-white rounded-2xl p-6 border border-[#eee] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#fdf6ec] to-[#f5e6c8] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <CategoryIcon icon={category.icon} className="w-5 h-5 text-[#c9a96e]" />
                </div>
                <h4 className="font-display font-semibold text-[15px] mb-1.5">{info.name}</h4>
                <p className="text-sm text-[#666] leading-relaxed">{info.description}</p>
              </Link>
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

      {/* Testimonials Section */}
      <section className="py-14 px-4 md:px-12 max-w-[1240px] mx-auto">
        <div className="text-center mb-10">
          <h3 className="font-display text-3xl font-semibold mb-3">
            {t.home.testimonialsTitle}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
              {t.home.testimonialsTitleAccent}
            </span>
          </h3>
          <p className="text-base text-[#666]">{t.home.testimonialsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.home.testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="group bg-white rounded-2xl p-6 border border-[#eee] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="flex text-[#ffb800] text-sm mb-4" aria-label="5 stars">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p className="text-[15px] leading-relaxed text-[#444] mb-6">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${
                    ["from-[#c9a96e] to-[#e8c97a]", "from-[#e0e7ff] to-[#c7d2fe]", "from-[#fdf6ec] to-[#f5e6c8]"][i % 3]
                  }`}
                />
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-[#888]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
