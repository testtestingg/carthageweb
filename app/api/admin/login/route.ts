import { NextResponse, type NextRequest } from "next/server"
import { timingSafeEqual } from "node:crypto"
import {
  getAdminUser,
  verifyPassword,
  createSessionToken,
  isLoginThrottled,
  recordFailedLogin,
  clearLoginAttempts,
  isSameOrigin,
  requestIp,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/server/auth"
import { loginSchema } from "@/lib/server/validation"

export const dynamic = "force-dynamic"

function safeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8")
  const bufB = Buffer.from(b, "utf8")
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected" }, { status: 403 })
  }

  const ip = requestIp(request)
  if (isLoginThrottled(ip)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again in 15 minutes." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const admin = await getAdminUser()
  const usernameOk = safeStringEqual(parsed.data.username, admin.username)
  const passwordOk = await verifyPassword(parsed.data.password, admin.passwordHash)

  if (!usernameOk || !passwordOk) {
    recordFailedLogin(ip)
    // Deliberately vague: don't reveal which field was wrong
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  clearLoginAttempts(ip)
  const token = await createSessionToken(admin.username)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS)
  return response
}
