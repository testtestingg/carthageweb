"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export function Hero() {
  const [visible, setVisible] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)

    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 origin-top will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/golden-bridge/image8.png"
          className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${
            visible ? "scale-100" : "scale-110"
          }`}
        >
          <source src="/golden-bridge/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-foreground/20" />
      </div>

      {/* Eyebrow under the logo */}
      <div
        className={`relative z-20 pt-32 md:pt-40 px-6 md:px-12 lg:px-20 transition-all duration-1000 delay-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-background/60">
          Industrial Packaging Solutions &middot; Berlin &amp; Luckau, Germany
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-20 md:pb-20">
        <div className="max-w-5xl">
          <div
            className={`transition-all duration-1000 delay-700 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-[clamp(2.25rem,6vw,5.5rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-background text-balance">
              Strong Packaging
              <br className="hidden md:block" />
              for Strong Products.
            </h1>
          </div>

          <div
            className={`mt-10 max-w-xl transition-all duration-1000 delay-900 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-base md:text-lg leading-[1.65] text-background/70 font-light">
              Durable, moisture-resistant stone paper bags and high-capacity
              PP woven bags, engineered in Germany for agriculture, construction,
              chemicals, and food industries.
            </p>
          </div>
        </div>

        <div
          className={`mt-14 md:mt-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 transition-all duration-1000 delay-1000 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/stone-paper/product"
            className="group inline-flex items-center gap-4 border border-background/30 hover:border-background/80 px-6 py-4 transition-colors duration-500 w-fit"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-background">
              Explore Our Solutions
            </span>

            <ArrowUpRight className="h-4 w-4 text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>

          <Link
            href="/stone-paper/contact"
            className="group inline-flex items-center gap-4 px-6 py-4 transition-colors duration-500 w-fit"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-background/60 group-hover:text-background transition-colors duration-300">
              Request a Quote
            </span>

            <ArrowUpRight className="h-4 w-4 text-background/60 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </Link>

          <div className="flex items-center gap-4">
            <ArrowDown className="h-3.5 w-3.5 text-background/40 animate-bounce" />

            <span className="text-[11px] tracking-[0.2em] uppercase text-background/40">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
