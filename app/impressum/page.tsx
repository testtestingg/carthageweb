"use client"

import Link from "next/link"
import { SiteShell } from "@/components/site/site-shell"

export default function ImpressumPage() {
  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[900px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Impressum</span>
        </div>

        <div className="prose prose-neutral max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-2">Impressum</h1>
          <p className="text-sm text-[#888] mb-10">Angaben gem&auml;&szlig; &sect; 5 TMG (Telemediengesetz).</p>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">Carthage GmbH</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#fafafa] rounded-xl p-5 border border-[#eee]">
                <h3 className="font-semibold text-sm text-[#888] uppercase tracking-wider mb-3">Hauptsitz (City West Office)</h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Lietzenburger Stra&szlig;e 9a<br />
                  10789 Berlin<br />
                  Deutschland
                </p>
              </div>
              <div className="bg-[#fafafa] rounded-xl p-5 border border-[#eee]">
                <h3 className="font-semibold text-sm text-[#888] uppercase tracking-wider mb-3">Produktion / Manufacturing</h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Nissanstr. 8 / Am Damm 3<br />
                  15926 Luckau<br />
                  Deutschland
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">Kontakt</h2>
            <div className="bg-[#fafafa] rounded-xl p-5 border border-[#eee]">
              <p className="text-[15px] text-[#555] leading-relaxed">
                Telefon: +49 163 6530300<br />
                Telefax: +49 30 34781222<br />
                E-Mail: <a href="mailto:info@carthagecare.de" className="text-[#c9a96e] hover:underline">info@carthagecare.de</a><br />
                Website: <a href="https://www.carthagecare.de" target="_blank" rel="noopener noreferrer" className="text-[#c9a96e] hover:underline">www.carthagecare.de</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">Vertretung & Registereintrag</h2>
            <div className="text-[15px] text-[#555] leading-relaxed space-y-3">
              <p>
                <strong>Vertreten durch die Gesch&auml;ftsf&uuml;hrerin:</strong><br />
                Rahma Maamri Yarbakht
              </p>
              <p>
                <strong>Prokurist:</strong><br />
                Farhang Yarbakht
              </p>
              <p>
                <strong>Registergericht:</strong> Amtsgericht Charlottenburg (Berlin)<br />
                <strong>Registernummer:</strong> HRB 281739 B
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
              <strong>DE459921875</strong>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">Streitschlichtung</h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4">
              Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#c9a96e] hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="text-[15px] text-[#555] leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}
