"use client"

import Link from "next/link"
import { SiteShell } from "@/components/site/site-shell"

export default function PrivacyPage() {
  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[900px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Datenschutz</span>
        </div>

        <div className="prose prose-neutral max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-2">Datenschutzerkl&auml;rung</h1>
          <p className="text-sm text-[#888] mb-10">Gem&auml;&szlig; Datenschutz-Grundverordnung (DSGVO). Zuletzt aktualisiert: M&auml;rz 2026.</p>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-semibold text-base mb-2">Allgemeine Hinweise</h3>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen. Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">2. Datenerfassung auf unserer Website</h2>
            <h3 className="font-semibold text-base mb-2">Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?</h3>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt &bdquo;Hinweis zur verantwortlichen Stelle&ldquo; entnehmen.
            </p>
            <h3 className="font-semibold text-base mb-2">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer Bestellung hinterlassen. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">3. Hinweis zur verantwortlichen Stelle</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="text-[15px] text-[#555] leading-relaxed mb-4 bg-[#fafafa] rounded-xl p-5 border border-[#eee]">
              <p className="font-semibold mb-1">Carthage GmbH</p>
              <p>Lietzenburger Stra&szlig;e 9a</p>
              <p>10789 Berlin, Deutschland</p>
              <p className="mt-2">Telefon: +49 163 6530300</p>
              <p>E-Mail: info@carthage.de</p>
            </div>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">4. Ihre Rechte bez&uuml;glich Ihrer Daten</h2>
            <ul className="space-y-3 text-[15px] text-[#555] leading-relaxed list-none pl-0">
              <li><strong>Auskunftsrecht:</strong> Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.</li>
              <li><strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Berichtigung unrichtiger oder unvollst&auml;ndiger Daten zu verlangen.</li>
              <li><strong>Recht auf L&ouml;schung (&bdquo;Recht auf Vergessenwerden&ldquo;):</strong> Sie k&ouml;nnen die L&ouml;schung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Recht auf Einschr&auml;nkung der Verarbeitung:</strong> Sie k&ouml;nnen unter bestimmten Voraussetzungen die Einschr&auml;nkung der Verarbeitung verlangen.</li>
              <li><strong>Recht auf Daten&uuml;bertragbarkeit:</strong> Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format aush&auml;ndigen zu lassen.</li>
              <li><strong>Widerrufs- und Widerspruchsrecht:</strong> Sie k&ouml;nnen eine erteilte Einwilligung jederzeit widerrufen und der Verarbeitung Ihrer Daten jederzeit widersprechen.</li>
            </ul>
            <p className="text-[15px] text-[#555] leading-relaxed mt-4">
              Um diese Rechte auszu&uuml;ben, kontaktieren Sie uns bitte unter info@carthagecare.de.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">5. SSL- bzw. TLS-Verschl&uuml;sselung</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">6. Cookies und Server-Log-Dateien</h2>
            <h3 className="font-semibold text-base mb-2">Cookies</h3>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Unsere Internetseiten verwenden teilweise sogenannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Die meisten der von uns verwendeten Cookies sind so genannte &bdquo;Session-Cookies&ldquo;, die nach Ende Ihres Besuchs automatisch gel&ouml;scht werden.
            </p>
            <h3 className="font-semibold text-base mb-2">Server-Log-Dateien</h3>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns &uuml;bermittelt (Browsertyp/-version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse). Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage hierf&uuml;r ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}
