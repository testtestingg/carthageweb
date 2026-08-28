import Image from "next/image"

/**
 * Page-specific hero for /stone-paper/certifications.
 *
 * The artwork leaves its left half empty by design, so the copy sits directly
 * on top of it from md up. Below md the banner is too short to hold the copy,
 * so the same block falls back into normal flow underneath the image.
 */
export function CertificationsHero() {
  return (
    // Matches the fixed navigation's exact height (h-16 logo + py-2 + 1px
    // border), so the artwork meets the header with no seam of white between.
    <section className="pt-[81px]">
      <div className="relative">
        <Image
          src="/stone-paper/certifications-hero.jpg"
          alt="A Carthage stone paper bag on a marble plinth beside SGS test reports, a Tested by SGS seal and a PDF download mark"
          width={1672}
          height={807}
          priority
          sizes="100vw"
          className="w-full h-auto"
        />

        <div className="px-6 py-12 md:absolute md:inset-0 md:flex md:items-center md:px-12 md:py-0 lg:px-20">
          <div className="md:max-w-[44%] lg:max-w-lg">
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
              Certifications
            </h1>

            <div className="w-16 h-px bg-foreground/20 mt-6 mb-7 md:mt-5 md:mb-6" />

            <p className="text-sm lg:text-base leading-[1.75] text-muted-foreground font-light">
              Our stone paper and PP woven composite bag has been tested by SGS, one of
              the world&rsquo;s largest inspection and certification bodies. Every report
              below is summarised on this page and available as a complete PDF.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
