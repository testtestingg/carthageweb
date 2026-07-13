"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown, Check, Clock, BarChart3, GraduationCap, Loader2 } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { countryOptions } from "@/lib/countries"
import { localizeFormation, type Formation } from "@/lib/types"

// Unsplash placeholders (to be swapped for final assets later) for
// formations created in the admin without an image.
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
]

const HERO_IMAGE = "/image5.jpg"
const INSTRUCTOR_IMAGE = "https://www.rypmu.de/rahmaphoto.jpeg"

interface EnrollForm {
  formationId: string
  name: string
  email: string
  phone: string
  country: string
  message: string
}

type EnrollErrors = Partial<Record<"formationId" | "name" | "email", string>>

export function AcademyClient({ formations }: { formations: Formation[] }) {
  const { locale, t } = useLanguage()
  const a = t.academy
  const formRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<EnrollForm>({
    formationId: "",
    name: "",
    email: "",
    phone: "",
    country: "DE",
    message: "",
  })
  const [errors, setErrors] = useState<EnrollErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState("")

  const scrollToForm = (formationId?: string) => {
    if (formationId) setForm((f) => ({ ...f, formationId }))
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: EnrollErrors = {}
    if (!form.formationId) next.formationId = a.formCourseRequired
    if (form.name.trim().length < 2) next.name = a.formNameRequired
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = a.formEmailRequired
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    setApiError("")
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setApiError(data?.error || a.formError)
        return
      }
      setSubmitted(true)
    } catch {
      setApiError(a.formError)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ formationId: "", name: "", email: "", phone: "", country: "DE", message: "" })
    setSubmitted(false)
    setErrors({})
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.12)] transition-all"

  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-14 px-4 md:px-12 max-w-[1240px] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#888] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{a.breadcrumb}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-[46px] leading-[1.05] font-semibold tracking-[-0.03em] mb-5">
              {a.heroTitle1}{" "}
              <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
                {a.heroTitle2}
              </span>
            </h1>
            <p className="text-[15px] md:text-base text-[#555] leading-relaxed max-w-[480px] mb-8">
              {a.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={() => scrollToForm()}
                className="bg-[#111] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center justify-center gap-2"
              >
                {a.heroCtaEnroll}
                <ArrowDown className="w-4 h-4" />
              </button>
              <a
                href="#programs"
                className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white border border-[#e5e5e5] transition-all hover:border-black inline-flex items-center justify-center"
              >
                {a.heroCtaPrograms}
              </a>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#eee] pt-6">
              {a.heroFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="font-display text-xl font-semibold text-[#111]">{fact.value}</dd>
                  <dd className="text-[11px] text-[#888] leading-snug mt-0.5">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative h-[380px] md:h-[480px] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
              <Image
                src={HERO_IMAGE}
                alt="PMU artist working on a client's lips in a studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 md:left-[-24px] md:right-auto md:max-w-[280px] bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-4">
              <p className="text-[11px] uppercase tracking-wider text-[#888] font-semibold mb-1">
                {a.nextCohortLabel}
              </p>
              <p className="font-display text-lg font-semibold text-[#111]">{a.nextCohortValue}</p>
              <p className="text-xs text-[#666] mt-1">{a.nextCohortNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How enrollment works */}
      <section className="bg-[#faf8f4] border-y border-[#f0ebe0]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-12 py-14 md:py-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">{a.stepsEyebrow}</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-10 max-w-[520px]">
            {a.stepsTitle}
          </h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {a.steps.map((step, i) => (
              <li key={step.title} className="relative bg-white rounded-2xl border border-[#eee] p-6">
                <span className="font-display text-sm font-bold text-white bg-[#111] w-8 h-8 rounded-full flex items-center justify-center mb-4">
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="max-w-[1240px] mx-auto px-4 md:px-12 py-14 md:py-16 scroll-mt-24">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">{a.programsEyebrow}</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em]">
            {a.programsTitle}
          </h2>
          <p className="text-sm text-[#666] max-w-[420px]">{a.programsSubtitle}</p>
        </div>

        {formations.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-14 h-14 text-[#ddd] mx-auto mb-4" aria-hidden="true" />
            <p className="text-lg font-medium text-[#444] mb-2">{a.noFormations}</p>
            <p className="text-sm text-[#888]">{a.noFormationsSubtitle}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation, i) => {
              const info = localizeFormation(formation, locale)
              const image = formation.image || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]
              return (
                <article
                  key={formation.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#eee] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={image}
                      alt={info.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formation.duration && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#555] bg-[#f7f5f0] px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {formation.duration}
                        </span>
                      )}
                      {formation.category && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#555] bg-[#f7f5f0] px-2.5 py-1 rounded-full">
                          <BarChart3 className="w-3 h-3" aria-hidden="true" />
                          {formation.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2 leading-snug">{info.name}</h3>
                    <p className="text-sm text-[#666] leading-relaxed mb-3">{info.description}</p>
                    {info.details && (
                      <p className="text-xs text-[#999] leading-relaxed mb-4">{info.details}</p>
                    )}

                    <div className="mt-auto pt-4 border-t border-[#f3f0ea] flex items-center justify-between gap-3">
                      {formation.price ? (
                        <div className="min-w-0">
                          <p className="font-display font-bold text-lg leading-none">
                            {formatPrice(formation.price, locale)}
                          </p>
                          <p className="text-[11px] text-[#999] mt-1">{a.priceIncludes}</p>
                        </div>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={() => scrollToForm(formation.id)}
                        className="shrink-0 inline-flex items-center gap-1.5 bg-[#111] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:bg-[#2a2a2a]"
                      >
                        {a.enroll}
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* What's included */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-12 py-14 md:py-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">{a.includedEyebrow}</p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-10 max-w-[520px]">
          {a.includedTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {a.included.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fdf6ec] to-[#f5e6c8] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-[#a89263]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-[15px] mb-1">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-[#faf8f4] border-y border-[#f0ebe0]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-12 py-14 md:py-16 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <Image
              src={INSTRUCTOR_IMAGE}
              alt="Rahma Yarbakht, lead instructor of the Carthage GmbH Academy"
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">
              {a.instructorEyebrow}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-5">
              {a.instructorName}
            </h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-4 max-w-[560px]">{a.instructorP1}</p>
            <p className="text-[15px] text-[#555] leading-relaxed max-w-[560px]">{a.instructorP2}</p>
          </div>
        </div>
      </section>

      {/* Enrollment form / confirmation */}
      <section ref={formRef} id="enroll" className="max-w-[760px] mx-auto px-4 md:px-12 py-14 md:py-20 scroll-mt-24">
        {submitted ? (
          <div className="bg-white rounded-[28px] border border-[#eee] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#10b981] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">{a.confirmTitle}</h2>
            <p className="text-[15px] text-[#666] mb-8">{a.confirmBody}</p>
            <ol className="text-left max-w-[440px] mx-auto space-y-4 mb-10">
              {a.confirmSteps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="font-display text-xs font-bold text-white bg-[#111] w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#555] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={resetForm}
              className="text-sm font-semibold text-[#c9a96e] hover:underline"
            >
              {a.confirmAnother}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[28px] border border-[#eee] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-8 md:p-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#a89263] mb-3">{a.formEyebrow}</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-2">
              {a.formTitle}
            </h2>
            <p className="text-sm text-[#666] mb-8">{a.formSubtitle}</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="enroll-course" className="block text-sm font-medium text-[#444] mb-1.5">
                  {a.formCourse} *
                </label>
                <select
                  id="enroll-course"
                  value={form.formationId}
                  onChange={(e) => setForm({ ...form, formationId: e.target.value })}
                  className={inputClass}
                >
                  <option value="" disabled>
                    {a.formCoursePlaceholder}
                  </option>
                  {formations.map((f) => (
                    <option key={f.id} value={f.id}>
                      {localizeFormation(f, locale).name}
                    </option>
                  ))}
                </select>
                {errors.formationId && <p className="text-xs text-red-500 mt-1">{errors.formationId}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="enroll-name" className="block text-sm font-medium text-[#444] mb-1.5">
                    {a.formName} *
                  </label>
                  <input
                    id="enroll-name"
                    type="text"
                    autoComplete="name"
                    placeholder={a.formNamePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="enroll-email" className="block text-sm font-medium text-[#444] mb-1.5">
                    {a.formEmail} *
                  </label>
                  <input
                    id="enroll-email"
                    type="email"
                    autoComplete="email"
                    placeholder={a.formEmailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="enroll-phone" className="block text-sm font-medium text-[#444] mb-1.5">
                    {a.formPhone}
                  </label>
                  <input
                    id="enroll-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="enroll-country" className="block text-sm font-medium text-[#444] mb-1.5">
                    {a.formCountry}
                  </label>
                  <select
                    id="enroll-country"
                    autoComplete="country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className={inputClass}
                  >
                    {countryOptions(locale).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="enroll-message" className="block text-sm font-medium text-[#444] mb-1.5">
                  {a.formMessage}
                </label>
                <textarea
                  id="enroll-message"
                  rows={4}
                  placeholder={a.formMessagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {apiError && <p className="text-sm text-red-500">{apiError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#111] text-white py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] disabled:opacity-60 disabled:hover:translate-y-0 inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    {a.formSubmitting}
                  </>
                ) : (
                  <>
                    {a.formSubmit}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </section>
    </SiteShell>
  )
}
