import type { Metadata } from "next"
import { ArrowDownToLine, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { CertificationsHero } from "@/components/golden-bridge/certifications-hero"
import { SectionHeading } from "@/components/golden-bridge/section-heading"
import { CtaBanner } from "@/components/golden-bridge/cta-banner"
import {
  certifications,
  technicalDataSheet,
  testedSample,
} from "@/components/golden-bridge/certifications-data"

export const metadata: Metadata = {
  title: "Certifications & Test Reports",
  description:
    "SGS test reports for Carthage stone paper and PP woven composite bags: EU food contact migration under (EC) 1935/2004 and LFGB, REACH SVHC screening, and physical performance testing. Download the full PDFs.",
  alternates: { canonical: "/stone-paper/certifications" },
}

export default function CertificationsPage() {
  return (
    <main>
      <Navigation />

      <CertificationsHero />

      {/* Report cards */}
      <section className="px-6 pt-24 pb-24 md:px-12 lg:px-20 md:pt-32 md:pb-32">
        <SectionHeading
          eyebrow="SGS Test Reports"
          title="Three reports, issued August 2026."
          description="All three cover the same article: a finished bag made from stone paper and PP woven composite tube fabric, produced for Carthage GmbH and destined for the German market."
        />

        <div className="flex flex-col gap-px bg-border">
          {certifications.map((cert, index) => (
            <article
              key={cert.id}
              id={cert.id}
              className="bg-background scroll-mt-24 p-8 md:p-12 lg:p-16 group hover:bg-secondary/20 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Identity */}
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                      {cert.category}
                    </p>
                  </div>

                  <h3 className="mt-6 text-2xl md:text-3xl font-extralight tracking-tight text-foreground text-balance">
                    {cert.title}
                  </h3>

                  <div className="w-10 h-px bg-border mt-6 mb-6 group-hover:w-14 transition-all duration-500" />

                  <p className="text-sm leading-[1.75] text-muted-foreground font-light max-w-md">
                    {cert.summary}
                  </p>

                  <dl className="mt-8 flex flex-col gap-2 text-[11px] tracking-[0.1em] text-muted-foreground/70">
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 uppercase text-muted-foreground/50">Report no.</dt>
                      <dd className="text-foreground/80">{cert.reportNumber}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 uppercase text-muted-foreground/50">Issued</dt>
                      <dd>
                        <time dateTime={cert.issueDateISO}>{cert.issueDate}</time>
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 uppercase text-muted-foreground/50">Issued by</dt>
                      <dd className="max-w-xs">{cert.issuer}</dd>
                    </div>
                  </dl>

                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-between gap-6 border border-foreground/20 hover:border-foreground px-6 py-4 transition-colors duration-500 min-w-[260px]"
                  >
                    <span className="text-[11px] tracking-[0.2em] uppercase text-foreground">
                      Open full report
                    </span>
                    <span className="flex items-center gap-3 text-muted-foreground/60">
                      <span className="text-[10px] tracking-[0.1em] tabular-nums">
                        PDF &middot; {cert.pageCount} pp &middot; {cert.fileSize}
                      </span>
                      <ArrowDownToLine className="h-4 w-4 shrink-0" />
                    </span>
                  </a>
                </div>

                {/* Results */}
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
                      Key results
                    </p>
                    <span
                      className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 ${
                        cert.verdict === "Pass"
                          ? "bg-foreground text-background"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {cert.verdict === "Pass" ? "Pass" : "For reference"}
                    </span>
                  </div>

                  <dl className="divide-y divide-border">
                    {cert.results.map((r) => (
                      <div key={r.label} className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                        <dt className="text-sm text-muted-foreground font-light">{r.label}</dt>
                        <dd>
                          <span className="text-sm text-foreground">{r.value}</span>
                          {r.note && (
                            <span className="block mt-1 text-[11px] leading-[1.6] text-muted-foreground/60">
                              {r.note}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-4">
                      Standards referenced
                    </p>
                    <ul className="flex flex-col gap-2">
                      {cert.scope.map((s) => (
                        <li key={s} className="text-[13px] leading-[1.7] text-muted-foreground font-light">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tested article */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-6">
              The Tested Article
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] tracking-tight text-balance">
              {testedSample.name}.
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.85] text-background/65 font-light">
              A composite roll material: a stone paper layer laminated to a PP woven
              fabric layer. The same specification underpins all three reports.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 pb-10 mb-10 border-b border-background/15">
              {[
                { label: "Total grammage", value: testedSample.grammage },
                { label: "Tube width", value: testedSample.tubeWidth },
                { label: "Roll length", value: testedSample.rollLength },
                { label: "Paper core", value: testedSample.coreDiameter },
                { label: "Manufacturer", value: testedSample.manufacturer },
                { label: "Destination", value: testedSample.destination },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] tracking-[0.2em] uppercase text-background/40 mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-background/85 font-light">{item.value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-6">
              Material composition
            </p>
            <div className="flex flex-col gap-6">
              {testedSample.layers.map((layer) => (
                <div key={layer.name} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                  <div className="sm:col-span-4">
                    <p className="text-sm text-background">{layer.name}</p>
                    <p className="text-[11px] tracking-[0.1em] text-background/40 mt-1 tabular-nums">
                      {layer.share}
                    </p>
                  </div>
                  <p className="sm:col-span-8 text-sm leading-[1.75] text-background/60 font-light">
                    {layer.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical data sheet */}
      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <SectionHeading
          eyebrow="Technical Documentation"
          title="Specification sheet for procurement teams."
          description="Alongside the third-party reports, our own technical data sheet documents grammage, dimensions, core size and the structure diagram of the composite fabric."
        />

        <a
          href={technicalDataSheet.file}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col md:flex-row md:items-center justify-between gap-6 border border-border hover:border-foreground/40 p-8 md:p-10 transition-colors duration-500"
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-3">
              {technicalDataSheet.issuer} &middot;{" "}
              <time dateTime={technicalDataSheet.issueDateISO}>{technicalDataSheet.issueDate}</time>
            </p>
            <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-500">
              {technicalDataSheet.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-light">
              {technicalDataSheet.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] tracking-[0.1em] text-muted-foreground/60 tabular-nums">
              PDF &middot; {technicalDataSheet.pageCount} pp &middot; {technicalDataSheet.fileSize}
            </span>
            <ArrowDownToLine className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          </div>
        </a>

        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 lg:grid-cols-12 gap-6">
          <p className="lg:col-span-3 text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
            About these reports
          </p>
          <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-4 text-[13px] leading-[1.8] text-muted-foreground font-light">
            <p>
              The reports were issued by SGS-CSTC Standards Technical Services Co., Ltd.,
              Shenzhen Branch. Results relate only to the sample tested, and the sample
              information was supplied by Carthage GmbH. The physical performance report is
              published here for reference; the food contact and REACH reports carry a formal
              pass conclusion against the regulations listed.
            </p>
            <p>
              If your procurement or quality team needs a declaration of conformity, a
              specific test not covered above, or the reports under a formal document
              request, contact us and we will arrange it.
            </p>
            <a
              href="https://www.sgs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase">About SGS</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Documentation"
        title="Need compliance documentation for your own audit?"
        description="We supply material datasheets, test reports and declarations to help procurement and quality teams qualify our packaging."
        primaryHref="/stone-paper/contact"
        primaryLabel="Request documents"
        secondaryHref="/stone-paper/sustainability"
        secondaryLabel="Sustainability"
      />

      <Footer />
    </main>
  )
}
