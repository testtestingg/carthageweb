import Image from "next/image"

/**
 * Page-specific hero for /stone-paper/certifications.
 *
 * Unlike the shared PageHero, the artwork here is a finished banner that
 * already carries the "Certifications" wordmark, so it is rendered whole at
 * its native 16:9 ratio rather than cropped into a split layout. The intro
 * copy sits beneath it, and the real <h1> is visually hidden at the sizes
 * where the banner's own title is legible.
 */
export function CertificationsHero() {
  return (
    <section className="pt-20 md:pt-24">
      <h1 className="sr-only">Certifications and test reports</h1>

      <Image
        src="/stone-paper/certifications-hero.jpg"
        alt="A Carthage stone paper bag on a marble plinth beside SGS test reports, a Tested by SGS seal and a PDF download mark"
        width={1672}
        height={941}
        priority
        sizes="100vw"
        className="w-full h-auto"
      />

      <div className="px-6 md:px-12 lg:px-20 py-14 md:py-20 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
              Certifications
            </p>
            {/* The banner's own title shrinks below legibility on phones, so
                restate it as text there only. */}
            <p
              aria-hidden="true"
              className="md:hidden mt-4 text-3xl font-extralight tracking-tight text-foreground"
            >
              Independently tested.
            </p>
            <div className="hidden lg:block w-10 h-px bg-border mt-6" />
          </div>

          <p className="lg:col-span-7 lg:col-start-6 max-w-2xl text-base md:text-lg leading-[1.75] text-muted-foreground font-light">
            Our stone paper and PP woven composite bag has been tested by SGS, one of
            the world&rsquo;s largest inspection and certification bodies. Every report
            below is summarised on this page and available as a complete PDF.
          </p>
        </div>
      </div>
    </section>
  )
}
