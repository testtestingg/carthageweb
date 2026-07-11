"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Mail, Phone, Clock, ArrowRight, Loader2 } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useLanguage } from "@/context/language-context"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>

const initialForm: ContactForm = { name: "", email: "", subject: "", message: "" }

export default function ContactPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const topics = [
    { value: "products", label: t.contact.topicProducts },
    { value: "wholesale", label: t.contact.topicWholesale },
    { value: "academy", label: t.contact.topicAcademy },
    { value: "partnership", label: t.contact.topicPartnership },
    { value: "other", label: t.contact.topicOther },
  ]

  const validate = (): ContactErrors => {
    const next: ContactErrors = {}
    if (!form.name.trim()) next.name = t.contact.nameRequired
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.emailRequired
    if (!form.subject) next.subject = t.contact.subjectRequired
    if (form.message.trim().length < 10) next.message = t.contact.messageRequired
    return next
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setForm(initialForm)
    } catch {
      setStatus("error")
    }
  }

  const inputClass = (field: keyof ContactForm) =>
    `w-full px-4 py-3 rounded-2xl border bg-white text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-[#e5e5e5] focus:border-[#c9a96e] focus:ring-[rgba(201,169,110,0.12)]"
    }`

  const infoCards = [
    {
      icon: MapPin,
      iconColor: "text-[#c9a96e]",
      iconBg: "bg-[#fef2f2]",
      title: t.contact.office,
      content: (
        <>
          Lietzenburger Stra&szlig;e 9a
          <br />
          10789 Berlin, Germany
        </>
      ),
    },
    {
      icon: Phone,
      iconColor: "text-[#10b981]",
      iconBg: "bg-[#f0fdf4]",
      title: t.contact.phone,
      content: (
        <a href="tel:+4930123456" className="hover:text-black transition-colors">
          +49 30 123 456
        </a>
      ),
    },
    {
      icon: Mail,
      iconColor: "text-[#3b82f6]",
      iconBg: "bg-[#eff6ff]",
      title: t.contact.email,
      content: (
        <a href="mailto:info@carthagecare.de" className="hover:text-black transition-colors">
          info@carthagecare.de
        </a>
      ),
    },
    {
      icon: Clock,
      iconColor: "text-[#eab308]",
      iconBg: "bg-[#fefce8]",
      title: t.contact.hours,
      content: <span className="whitespace-pre-line">{t.contact.hoursValue}</span>,
    },
  ]

  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1240px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{t.contact.breadcrumb}</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-3">
            {t.contact.title}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
              {t.contact.titleAccent}
            </span>
          </h1>
          <p className="text-[15px] md:text-base text-[#666] max-w-[600px] leading-relaxed">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              {infoCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-[20px] p-6 border border-[#eee] transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center mb-4`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{card.title}</h4>
                  <p className="text-sm text-[#666] leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-[#eee] h-[280px]">
              <iframe
                src="https://www.google.com/maps?q=Lietzenburger+Stra%C3%9Fe+9a,+10789+Berlin&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carthage Office Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#eee]">
              <h3 className="font-display text-2xl font-semibold mb-2">{t.contact.formTitle}</h3>
              <p className="text-sm text-[#888] mb-6">{t.contact.formSubtitle}</p>

              {status === "success" && (
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-2xl p-4 mb-6 text-sm text-[#166534]" role="status">
                  {t.contact.success}
                </div>
              )}
              {status === "error" && (
                <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-2xl p-4 mb-6 text-sm text-[#991b1b]" role="alert">
                  {t.contact.error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#444] mb-1.5">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass("name")}
                      placeholder={t.contact.namePlaceholder}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#444] mb-1.5">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      placeholder={t.contact.emailPlaceholder}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.contact.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${inputClass("subject")} appearance-none cursor-pointer`}
                  >
                    <option value="">{t.contact.selectTopic}</option>
                    {topics.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass("message")} resize-none`}
                    placeholder={t.contact.messagePlaceholder}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#111] text-white py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.send}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
