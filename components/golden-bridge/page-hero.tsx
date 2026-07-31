"use client"

import { useEffect, useState } from "react"

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  image: string
  imageAlt: string
}

/**
 * Shared hero used by every inner page. Uses a split layout so the
 * image is always fully visible alongside the text content.
 */
export function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Desktop: side-by-side layout | Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* Text content */}
        <div className="flex flex-col justify-center bg-foreground text-background px-6 py-20 md:px-12 lg:px-20 lg:py-28 order-2 lg:order-1">
          <div className="max-w-xl">
            <div
              className={`mb-5 transition-all duration-1000 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50">
                {eyebrow}
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-[clamp(2rem,4vw,3.75rem)] font-extralight leading-[1.08] tracking-[-0.02em] text-background text-balance">
                {title}
              </h1>
            </div>

            {description && (
              <div
                className={`mt-8 transition-all duration-1000 delay-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-base md:text-lg leading-[1.7] text-background/65 font-light">
                  {description}
                </p>
              </div>
            )}

            {/* Decorative line */}
            <div
              className={`mt-10 h-px bg-background/15 transition-all duration-1000 delay-900 ${
                visible ? "w-16 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Image - fully visible, not cropped */}
        <div
          className={`relative overflow-hidden order-1 lg:order-2 transition-opacity duration-1000 delay-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={imageAlt}
            className={`w-full h-full object-cover min-h-[300px] md:min-h-[400px] lg:min-h-full transition-transform duration-[2s] ease-out ${
              visible ? "scale-100" : "scale-105"
            }`}
          />
          {/* Subtle gradient overlay on mobile for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-foreground/10 lg:via-transparent lg:to-transparent" />
        </div>
      </div>
    </section>
  )
}
