"use client"

import Link from "next/link"
import { SiteShell } from "@/components/site/site-shell"

export default function TermsPage() {
  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[900px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">AGB</span>
        </div>

        <div className="prose prose-neutral max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-2">Allgemeine Gesch&auml;ftsbedingungen (AGB)</h1>
          <p className="text-sm text-[#888] mb-10">Zuletzt aktualisiert: M&auml;rz 2026</p>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">1. Geltungsbereich</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Diese Allgemeinen Gesch&auml;ftsbedingungen (AGB) gelten f&uuml;r alle Vertr&auml;ge, die &uuml;ber unseren Online-Shop zwischen der Carthage GmbH, Lietzenburger Stra&szlig;e 9a, 10789 Berlin (nachfolgend &bdquo;Verk&auml;ufer&ldquo; oder &bdquo;wir&ldquo;) und Ihnen als Kunden geschlossen werden. Die AGB gelten unabh&auml;ngig davon, ob Sie Verbraucher, Unternehmer oder Kaufmann sind.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">2. Vertragspartner und Vertragsschluss</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Der Kaufvertrag kommt zustande mit der Carthage GmbH. Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Durch Anklicken des Buttons &bdquo;Zahlungspflichtig bestellen&ldquo; (oder eines &auml;quivalenten Checkout-Buttons) geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Wir best&auml;tigen den Eingang der Bestellung unmittelbar per E-Mail. Ein bindender Vertrag kommt erst zustande, wenn wir Ihre Bestellung durch eine Auftragsbest&auml;tigung annehmen oder die Ware an Sie versenden.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">3. Preise und Versandkosten</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Alle auf der Website angegebenen Preise enthalten die gesetzliche Mehrwertsteuer, sofern im B2B-Bereich nicht ausdr&uuml;cklich anders angegeben.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Zus&auml;tzlich zu den angegebenen Preisen berechnen wir f&uuml;r die Lieferung Versandkosten. Die genauen Versandkosten werden Ihnen auf den Versandinformationsseiten und im Bestellvorgang deutlich mitgeteilt.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">4. Zahlung und Lieferung</h2>
            <ul className="space-y-3 text-[15px] text-[#555] leading-relaxed list-none pl-0">
              <li>Wir akzeptieren grunds&auml;tzlich Vorkasse, Kreditkarte sowie ausgewiesene Drittanbieter (z. B. PayPal, Klarna).</li>
              <li>Die Lieferzeit betr&auml;gt innerhalb Deutschlands in der Regel 3-5 Werktage, sofern auf der Produktseite nicht anders angegeben. Internationale Lieferzeiten k&ouml;nnen abweichen.</li>
              <li>Sollten nicht alle bestellten Produkte vorr&auml;tig sein, sind wir zu Teillieferungen auf unsere Kosten berechtigt, soweit dies f&uuml;r Sie zumutbar ist.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">5. Widerrufsrecht f&uuml;r Verbraucher</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Verbrauchern steht grunds&auml;tzlich ein gesetzliches Widerrufsrecht von 14 Tagen zu.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              <strong>Widerrufsbelehrung:</strong> Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gr&uuml;nden diesen Vertrag zu widerrufen. Die Widerrufsfrist betr&auml;gt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Bef&ouml;rderer ist, die letzte Ware in Besitz genommen haben bzw. hat.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed">
              <strong>Ausschluss des Widerrufsrechts:</strong> Das Widerrufsrecht besteht nicht bei Vertr&auml;gen zur Lieferung versiegelter Waren, die aus Gr&uuml;nden des Gesundheitsschutzes oder der Hygiene nicht zur R&uuml;ckgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde (z.B. PMU-Farben, Nadeln).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">6. Besondere Bedingungen f&uuml;r PMU-Produkte (Gewerbliche Nutzung)</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Bestimmte von der Carthage GmbH vertriebene Produkte (z. B. Permanent-Make-up-Pigmente, professionelle Maschinen) sind ausschlie&szlig;lich f&uuml;r den professionellen Gebrauch durch geschulte und zertifizierte Anwender bestimmt. Durch den Kauf dieser Artikel best&auml;tigt der K&auml;ufer, dass er &uuml;ber die erforderlichen Lizenzen, Schulungen und Qualifikationen verf&uuml;gt, die in seinem Land/seiner Region f&uuml;r die sichere Verwendung dieser Produkte gesetzlich vorgeschrieben sind. Die Carthage Care GmbH haftet nicht f&uuml;r unsachgem&auml;&szlig;e Anwendung, allergische Reaktionen infolge fehlender Patch-Tests oder &auml;sthetische Ergebnisse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">7. Eigentumsvorbehalt</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Die gelieferte Ware bleibt bis zur vollst&auml;ndigen Bezahlung des Kaufpreises unser Eigentum.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">8. Gew&auml;hrleistung und Haftung</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Es gilt das gesetzliche M&auml;ngelhaftungsrecht. F&uuml;r Unternehmer betr&auml;gt die Verj&auml;hrungsfrist f&uuml;r M&auml;ngelansprüche ein Jahr ab Gefahr&uuml;bergang.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Wir haften unbeschr&auml;nkt f&uuml;r Vorsatz und grobe Fahrl&auml;ssigkeit sowie nach Ma&szlig;gabe des Produkthaftungsgesetzes. F&uuml;r leichte Fahrl&auml;ssigkeit haften wir &ndash; au&szlig;er im Falle der Verletzung des Lebens, des K&ouml;rpers oder der Gesundheit &ndash; nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), deren Erf&uuml;llung die ordnungsgem&auml;&szlig;e Durchf&uuml;hrung des Vertrags &uuml;berhaupt erst erm&ouml;glicht.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">9. Anwendbares Recht & Gerichtsstand</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Ist der Kunde Kaufmann, eine juristische Person des &ouml;ffentlichen Rechts oder ein &ouml;ffentlich-rechtliches Sonderverm&ouml;gen, ist der ausschlie&szlig;liche Gerichtsstand f&uuml;r alle Streitigkeiten aus diesem Vertrag Berlin, Deutschland.
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}
