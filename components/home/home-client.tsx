"use client"

import { SiteShell } from "@/components/site/site-shell"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { useLanguage } from "@/context/language-context"
import { homeContent } from "@/lib/home-content"
import { Hero } from "@/components/home/sections/hero"
import { Marquee } from "@/components/home/sections/marquee"
import { Statement } from "@/components/home/sections/statement"
import { Divisions } from "@/components/home/sections/divisions"
import { MaterialRail } from "@/components/home/sections/material-rail"
import { CareShowcase } from "@/components/home/sections/care-showcase"
import { Philosophy } from "@/components/home/sections/philosophy"
import { Gateway } from "@/components/home/sections/gateway"

export function HomeClient() {
  const { locale } = useLanguage()
  const c = homeContent[locale]

  return (
    <SiteShell atmosphere={false}>
      <SmoothScroll />
      {/* `key` on the locale so every GSAP context is rebuilt against the new
          copy, line counts and rail widths change between languages. */}
      <main id="main-content" className="carthage-home" key={locale}>
        <Hero c={c} />
        <Marquee items={c.marquee} />
        <Statement c={c} />
        <Divisions c={c} />
        <MaterialRail c={c} />
        <CareShowcase c={c} />
        <Philosophy c={c} />
        <Gateway c={c} />
      </main>
    </SiteShell>
  )
}
