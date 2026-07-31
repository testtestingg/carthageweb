"use client"

import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  tone?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal(0.1)

  const textBase = tone === "dark" ? "text-background" : "text-foreground"
  const textMuted = tone === "dark" ? "text-background/55" : "text-muted-foreground"
  const textEyebrow = tone === "dark" ? "text-background/40" : "text-muted-foreground"
  const borderTone = tone === "dark" ? "border-background/15" : "border-border"

  return (
    <div
      ref={ref}
      className={`pb-6 mb-14 md:mb-20 border-b ${borderTone} transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className={`text-[11px] tracking-[0.3em] uppercase ${textEyebrow} mb-3`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-[2.75rem] font-extralight tracking-tight ${textBase} text-balance max-w-3xl ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-[1.75] ${textMuted} font-light ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
