"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{t.about.breadcrumb}</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-[#ffe0eb] rounded-full text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_4px_12px_rgba(255,77,140,0.08)]">
            <span className="w-2 h-2 bg-[#ff4d8c] rounded-full mr-2" />
            {t.about.badge}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-6">
            {t.about.title}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
              {t.about.titleAccent}
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#666] max-w-[700px] mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {t.about.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[20px] p-6 text-center border border-[#eee] transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="font-display text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-sm text-[#888]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Sections */}
        <div className="space-y-16">
          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                {t.about.missionTitle}{" "}
                <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
                  {t.about.missionAccent}
                </span>
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed mb-6">{t.about.missionP1}</p>
              <p className="text-[15px] text-[#555] leading-relaxed">{t.about.missionP2}</p>
            </div>
            <div className="relative h-[380px] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
              <Image
                src="/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG"
                alt="Carthage Products"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Founder */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[380px] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] order-2 md:order-1">
              <Image
                src="/IMG_6444.JPG"
                alt="Carthage V6 Pink Professional Needle"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                {t.about.founderTitle}{" "}
                <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
                  {t.about.founderAccent}
                </span>
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed mb-6">{t.about.founderP1}</p>
              <p className="text-[15px] text-[#555] leading-relaxed mb-6">{t.about.founderP2}</p>
              <Link
                href="https://www.rypmu.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ff4d8c] font-semibold hover:gap-3 transition-all"
              >
                {t.about.visitAcademy} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-10">
              {t.about.valuesTitle}{" "}
              <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
                {t.about.valuesAccent}
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.about.values.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-white rounded-[20px] p-7 border border-[#eee] transition-all duration-300 hover:translate-y-[-6px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff4d8c] to-[#ff8f70] flex items-center justify-center mb-5">
                    <span className="text-white font-bold text-sm">0{i + 1}</span>
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-3">{item.title}</h4>
                  <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
