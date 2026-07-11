import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { addEnrollment, getFormationById } from "@/lib/server/store"
import { sendEnrollmentEmails } from "@/lib/server/email"
import { isSameOrigin, requestIp } from "@/lib/server/auth"
import { handleApiError } from "@/lib/server/admin-api"
import { LOCALES, type Enrollment, type Locale } from "@/lib/types"

export const dynamic = "force-dynamic"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple per-IP throttle: max 5 enrollments per hour
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const recent = new Map<string, number[]>()

function isThrottled(ip: string): boolean {
  const now = Date.now()
  const list = (recent.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS)
  recent.set(ip, list)
  return list.length >= MAX_PER_WINDOW
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected" }, { status: 403 })
  }
  const ip = requestIp(request)
  if (isThrottled(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await request.json()

    const name = String(body.name ?? "").trim()
    const email = String(body.email ?? "").trim()
    const phone = String(body.phone ?? "").trim()
    const country = String(body.country ?? "").trim()
    const message = String(body.message ?? "").trim()
    const formationId = String(body.formationId ?? "").trim()
    const locale: Locale = LOCALES.includes(body.locale) ? body.locale : "en"

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: "Please enter your name" }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }
    if (message.length > 2000 || phone.length > 40 || country.length > 60) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 })
    }

    const formation = await getFormationById(formationId)
    if (!formation || !formation.published) {
      return NextResponse.json({ error: "Unknown course" }, { status: 400 })
    }
    const formationName =
      formation.translations.en?.name?.trim() ||
      formation.translations[locale]?.name?.trim() ||
      formationId

    const enrollment: Enrollment = {
      id: randomUUID(),
      formationId,
      formationName,
      name,
      email,
      phone,
      country,
      message,
      locale,
      status: "new",
      createdAt: new Date().toISOString(),
    }

    await addEnrollment(enrollment)
    recent.set(ip, [...(recent.get(ip) ?? []), Date.now()])

    // Emails are best-effort: the enrollment is already stored, so a mail
    // provider hiccup must not fail the application.
    const emails = await sendEnrollmentEmails(enrollment)

    return NextResponse.json({ ok: true, emails }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
