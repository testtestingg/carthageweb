"use client"

import Link from "next/link"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <SiteShell>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center py-24">
          <p className="font-display text-[80px] font-bold leading-none mb-4 bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
            404
          </p>
          <h1 className="font-display text-3xl font-semibold mb-4">{t.product.notFoundTitle}</h1>
          <p className="text-[#888] mb-8">{t.product.notFoundSubtitle}</p>
          <Link
            href="/shop"
            className="bg-[#111] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222] inline-block"
          >
            {t.product.browseProducts}
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}
