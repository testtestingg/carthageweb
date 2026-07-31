import type { Metadata } from "next"
import { Navigation } from "@/components/golden-bridge/navigation"
import { Footer } from "@/components/golden-bridge/footer"
import { PageHero } from "@/components/golden-bridge/page-hero"
import { siteConfig } from "@/components/golden-bridge/site-config"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice and imprint information for Carthage.",
}

export default function ImpressumPage() {
  return (
    <main>
      <Navigation />

      <PageHero
        eyebrow="Legal"
        title="Impressum"
        description="Legal notice and imprint (Impressum) as required by German law (TMG)."
        image="/golden-bridge/image6.png"
        imageAlt="Legal imprint"
      />

      <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Provider/Anbieter */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground mb-6">
              Impressum
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Angaben gemäß § 5 TMG (Telemediengesetz) und § 7 Abs. 1 ECG (eCommerce-Richtlinie)
            </p>

            <div className="space-y-8">
              {/* Provider Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Anbieter (Provider)
                </h3>
                <div className="bg-secondary/20 p-6 rounded-lg space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p className="font-semibold text-foreground">Carthage GmbH</p>
                  <p>{siteConfig.headquarters.street}</p>
                  <p>{siteConfig.headquarters.city}</p>
                  <p>{siteConfig.headquarters.country}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Kontaktinformation (Contact Information)
                </h3>
                <div className="space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    <strong>Telefon (Phone):</strong> {siteConfig.phone}
                  </p>
                  <p>
                    <strong>Fax:</strong> {siteConfig.fax}
                  </p>
                  <p>
                    <strong>E-Mail:</strong> <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:underline">{siteConfig.email}</a>
                  </p>
                  <p>
                    <strong>Website:</strong> {siteConfig.url}
                  </p>
                </div>
              </div>

              {/* Managing Director */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Geschäftsführer (Managing Director)
                </h3>
                <div className="space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    <strong>Name:</strong> {siteConfig.managingDirector}
                  </p>
                  <p>
                    <strong>E-Mail:</strong> <a href={`mailto:${siteConfig.managingDirectorEmail}`} className="text-foreground hover:underline">{siteConfig.managingDirectorEmail}</a>
                  </p>
                </div>
              </div>

              {/* Company Details */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Unternehmensangaben (Company Details)
                </h3>
                <div className="space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    <strong>Unternehmensform:</strong> Gesellschaft mit beschränkter Haftung (GmbH)
                  </p>
                  <p>
                    <strong>Gründungsjahr:</strong> 2021
                  </p>
                  <p>
                    <strong>Geschäftstätigkeiten:</strong> Produktion und Vertrieb von Steinpapier und nachhaltigen Papierprodukten
                  </p>
                  <p>
                    <strong>Betriebsstätte (Facility):</strong><br/>
                    {siteConfig.facility.street}<br/>
                    {siteConfig.facility.city}<br/>
                    {siteConfig.facility.country}<br/>
                    ({siteConfig.facility.note})
                  </p>
                </div>
              </div>

              {/* Responsible for Editorial Content */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV (Responsible for Content)
                </h3>
                <div className="bg-secondary/20 p-6 rounded-lg space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p className="font-semibold text-foreground">Carthage GmbH</p>
                  <p>{siteConfig.headquarters.street}</p>
                  <p>{siteConfig.headquarters.city}</p>
                  <p>{siteConfig.headquarters.country}</p>
                  <p className="mt-4">
                    <strong>Kontakt:</strong> {siteConfig.email}
                  </p>
                </div>
              </div>

              {/* Data Protection Officer */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Datenschutzbeauftragter (Data Protection Officer)
                </h3>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Für datenschutzbezogene Anfragen kontaktieren Sie bitte:{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mt-2">
                  Weitere Informationen zum Datenschutz finden Sie in unserer{" "}
                  <a href="/stone-paper/privacy" className="text-foreground hover:underline">
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </div>

              {/* Disclaimer / Haftungsausschluss */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Haftungsausschluss (Disclaimer)
                </h3>
                <div className="space-y-4 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    <strong>1. Haftung für Inhalte:</strong><br/>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben hiervon unberührt.
                  </p>
                  <p>
                    <strong>2. Haftung für Links:</strong><br/>
                    Unsere Website enthält Links zu externen Websites. Wir haben keinen Einfluss auf den Inhalt verlinkter Seiten. Für den Inhalt der verlinkten Seiten ist ausschließlich deren Betreiber verantwortlich. Zum Zeitpunkt der Linksetzung waren keine Rechtsverstöße erkennbar. Sollten wir von Rechtsverstößen erfahren, werden wir die betreffenden Links umgehend entfernen.
                  </p>
                  <p>
                    <strong>3. Urheberrechte:</strong><br/>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Schöpfers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                </div>
              </div>

              {/* Right to Amendment */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Änderungsvorbehalt (Right to Amendment)
                </h3>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Wir behalten uns das Recht vor, diese Website und deren Inhalte jederzeit und ohne Vorankündigung zu ändern, zu ergänzen oder zu löschen. Dies gilt insbesondere für Preis-, Produkt- und Verfügbarkeitsinformationen.
                </p>
              </div>

              {/* Alternative Dispute Resolution */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Alternative Streitbeilegung (Alternative Dispute Resolution)
                </h3>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, auf der Verbraucher Online-Streitigkeiten beilegen können:
                </p>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="text-base leading-[1.8] text-muted-foreground font-light mt-4">
                  Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              {/* Attribution & Credits */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Bildnachweise (Image Attribution)
                </h3>
                <p className="text-base leading-[1.8] text-muted-foreground font-light">
                  Alle Produktfotografien, Videos und Designelemente sind Eigentum von Carthage GmbH oder stammen von autorisierten Lizenzpartnern. Eine Verwendung ohne Genehmigung ist nicht gestattet.
                </p>
              </div>

              {/* Compliance */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Rechtliche Compliance (Legal Compliance)
                </h3>
                <div className="space-y-2 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    Diese Website und alle bereitgestellten Inhalte entsprechen den Anforderungen des deutschen Rechts, insbesondere:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Telemediengesetz (TMG)</li>
                    <li>Datenschutz-Grundverordnung (DSGVO)</li>
                    <li>Bundesdatenschutzgesetz (BDSG)</li>
                    <li>Gesetz gegen den unlauteren Wettbewerb (UWG)</li>
                    <li>E-Commerce-Richtlinie</li>
                    <li>Bürgerliches Gesetzbuch (BGB)</li>
                  </ul>
                </div>
              </div>

              {/* Social Media & Marketing */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Social Media (Social Media Presence)
                </h3>
                <div className="space-y-3 text-base leading-[1.8] text-muted-foreground font-light">
                  <p>
                    Carthage ist präsent auf folgenden Social-Media-Plattformen:
                  </p>
                  <div className="flex flex-col gap-2">
                    {siteConfig.social.map((social) => (
                      <div key={social.label}>
                        <strong>{social.label}</strong>: {social.href}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">
                    Für die Inhalte dieser Plattformen gelten die jeweiligen Richtlinien der Betreiber. Wir sind für Inhalte, die von Nutzern gepostet werden, nicht verantwortlich.
                  </p>
                </div>
              </div>

              {/* Final Statement */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Stand:</strong> April 2026
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Dieses Impressum wird regelmäßig aktualisiert und entspricht den aktuellen gesetzlichen Anforderungen der Bundesrepublik Deutschland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
