import { NextResponse, type NextRequest } from "next/server"
import { isSameOrigin, SESSION_COOKIE } from "@/lib/server/auth"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected" }, { status: 403 })
  }
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 })
  return response
}
