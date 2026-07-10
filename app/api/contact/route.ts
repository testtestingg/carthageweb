import { NextResponse, type NextRequest } from "next/server"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { addContactMessage } from "@/lib/server/store"

export const dynamic = "force-dynamic"

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.enum(["products", "wholesale", "academy", "partnership", "other"]),
  message: z.string().trim().min(10).max(5000),
})

// Basic in-memory throttle: max 5 submissions per IP per 10 minutes
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const submissions = new Map<string, number[]>()

function isThrottled(ip: string): boolean {
  const now = Date.now()
  const recent = (submissions.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS)
  submissions.set(ip, recent)
  if (recent.length >= MAX_PER_WINDOW) return true
  recent.push(now)
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isThrottled(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 })
  }

  await addContactMessage({
    id: randomUUID(),
    ...parsed.data,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
