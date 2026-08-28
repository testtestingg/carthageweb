"use client"

import { useState, useRef } from "react"
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface FormState {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  subject: "General inquiry",
  message: "",
}

const subjects = [
  "General inquiry",
  "Request product samples",
  "Bulk order quotation",
  "Technical specifications",
  "Custom packaging requirements",
  "Partnership & supply contract",
  "Facility visit",
  "Press & media",
  "Other",
]

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function ContactForm() {
  const [data, setData] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    // Clear error when user types
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field)
  }

  function validateField(field: string): boolean {
    const newErrors: FormErrors = { ...errors }
    let valid = true

    switch (field) {
      case "name":
        if (!data.name.trim()) {
          newErrors.name = "Please enter your name."
          valid = false
        } else {
          delete newErrors.name
        }
        break
      case "email":
        if (!data.email.trim()) {
          newErrors.email = "Please enter your email address."
          valid = false
        } else if (!isValidEmail(data.email.trim())) {
          newErrors.email = "Please enter a valid email address."
          valid = false
        } else {
          delete newErrors.email
        }
        break
      case "message":
        if (!data.message.trim()) {
          newErrors.message = "Please enter your message."
          valid = false
        } else if (data.message.trim().length < 10) {
          newErrors.message = "Please provide at least 10 characters."
          valid = false
        } else {
          delete newErrors.message
        }
        break
    }

    setErrors(newErrors)
    return valid
  }

  function validateAll(): boolean {
    const fields = ["name", "email", "message"]
    let allValid = true
    const newTouched: Record<string, boolean> = {}

    fields.forEach((field) => {
      newTouched[field] = true
      if (!validateField(field)) {
        allValid = false
      }
    })

    setTouched((prev) => ({ ...prev, ...newTouched }))
    return allValid
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    if (!validateAll()) {
      toast.error("Please fill in all required fields correctly.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          company: data.company.trim(),
          phone: data.phone.trim(),
          subject: data.subject,
          message: data.message.trim(),
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.")
      }

      setSubmitted(true)
      setData(initialState)
      setErrors({})
      setTouched({})
      toast.success(
        json.delivered
          ? "Message sent successfully. Our team will respond shortly."
          : "Message received. We will be in touch soon."
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not send the message. Please try again."
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="border border-border p-10 md:p-14 bg-background">
        <div className="flex items-start gap-4 mb-6">
          <CheckCircle2 className="h-6 w-6 text-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
              Message Received
            </p>
            <h3 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground text-balance">
              Thank you. We&apos;ll be in touch shortly.
            </h3>
          </div>
        </div>
        <p className="mt-5 max-w-md text-sm leading-[1.75] text-muted-foreground">
          A member of our team will respond from our Berlin office, usually within one business day.
          Your enquiry has been sent to info@carthage.de.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="group mt-10 inline-flex items-center gap-3 text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-500"
        >
          <span className="border-b border-border pb-0.5 group-hover:border-foreground transition-colors duration-500">
            Send another message
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    )
  }

  const fieldCls =
    "w-full bg-transparent border-b border-border focus:border-foreground outline-none px-0 py-3 text-base font-light text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300"
  const fieldErrorCls =
    "w-full bg-transparent border-b border-red-400 focus:border-red-500 outline-none px-0 py-3 text-base font-light text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300"
  const labelCls = "text-[11px] tracking-[0.2em] uppercase text-muted-foreground"

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelCls}>
          Name *
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={touched.name && errors.name ? fieldErrorCls : fieldCls}
          placeholder="Your full name"
        />
        {touched.name && errors.name && (
          <div className="flex items-center gap-1.5 mt-1">
            <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
            <p className="text-xs text-red-500">{errors.name}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelCls}>
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={touched.email && errors.email ? fieldErrorCls : fieldCls}
          placeholder="you@company.com"
        />
        {touched.email && errors.email && (
          <div className="flex items-center gap-1.5 mt-1">
            <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
            <p className="text-xs text-red-500">{errors.email}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className={labelCls}>
          Company
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          value={data.company}
          onChange={(e) => update("company", e.target.value)}
          className={fieldCls}
          placeholder="Optional"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelCls}>
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={fieldCls}
          placeholder="Optional"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="subject" className={labelCls}>
          Subject
        </label>
        <select
          id="subject"
          value={data.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={`${fieldCls} cursor-pointer appearance-none`}
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="message" className={labelCls}>
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={`${touched.message && errors.message ? fieldErrorCls : fieldCls} resize-none`}
          placeholder="Tell us about your packaging requirements, product application, load specifications, or required volumes..."
        />
        {touched.message && errors.message && (
          <div className="flex items-center gap-1.5 mt-1">
            <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
            <p className="text-xs text-red-500">{errors.message}</p>
          </div>
        )}
        <p className="text-[10px] text-muted-foreground/50 mt-1">
          {data.message.length}/5000 characters
        </p>
      </div>

      <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6">
        <p className="text-[11px] leading-relaxed text-muted-foreground/70 max-w-md">
          By submitting this form you agree that we may contact you about your
          enquiry. We never share your details with third parties. Your message
          will be sent to info@carthagecare.de.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-between gap-6 border border-foreground hover:bg-foreground hover:text-background px-6 py-4 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed min-w-[220px]"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase">
            {loading ? "Sending..." : "Send Message"}
          </span>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          )}
        </button>
      </div>
    </form>
  )
}
