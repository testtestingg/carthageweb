"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] text-white pt-14 pb-8 px-4 md:px-12 overflow-hidden">
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] bg-[radial-gradient(circle,rgb(201,169,110)_0%,rgba(255,255,255,0)_70%)]" />

      <div className="relative max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <Image src="/logo-carthage.png" alt="Carthage" width={160} height={160} className="h-28 md:h-36 w-auto" />
            </div>
            <p className="text-sm text-[#999] leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/carthage.tattoo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:bg-[rgba(201,169,110,0.2)] hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/carthage.tattoo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:bg-[rgba(201,169,110,0.2)] hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5">{t.footer.shop}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/shop" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.footer.allProducts}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pigments" className="text-sm text-[#999] hover:text-white transition-colors">
                  PMU Pigments
                </Link>
              </li>
              <li>
                <Link href="/shop?category=needles" className="text-sm text-[#999] hover:text-white transition-colors">
                  Cartridge Needles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=skincare" className="text-sm text-[#999] hover:text-white transition-colors">
                  Skincare &amp; Cosmetics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=stonepaper" className="text-sm text-[#999] hover:text-white transition-colors">
                  Stone Paper
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5">{t.footer.company}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.footer.aboutCarthage}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/carthage-care" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.nav.cosmeticsPmu}
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.footer.academy}
                </Link>
              </li>
              <li>
                <Link href="/stone-paper" className="text-sm text-[#999] hover:text-white transition-colors">
                  {t.nav.stonePaper}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5">{t.footer.contact}</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-[#999]">Lietzenburger Str. 9a</li>
              <li className="text-sm text-[#999]">10789 Berlin, Germany</li>
              <li>
                <a href="tel:+4930123456" className="text-sm text-[#999] hover:text-white transition-colors">
                  +49 30 123 456
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@carthage.de"
                  className="text-sm text-[#999] hover:text-white transition-colors"
                >
                  info@carthage.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#666] text-center md:text-left">
            &copy; {new Date().getFullYear()} Carthage GmbH Cosmetic &amp; Pigmentation. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#666] hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-xs text-[#666] hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/impressum" className="text-xs text-[#666] hover:text-white transition-colors">
              {t.footer.imprint}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
