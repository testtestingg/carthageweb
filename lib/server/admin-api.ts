import { NextResponse } from "next/server"
import { getSessionUser, isSameOrigin } from "./auth"
import { StoreError } from "./store"

/**
 * Guard for admin API routes: verifies the signed session cookie and,
 * for anything that mutates, rejects cross-origin requests.
 * Returns an error response, or null when the request may proceed.
 */
export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  if (request.method !== "GET" && !isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected" }, { status: 403 })
  }
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}

export function handleApiError(err: unknown): NextResponse {
  if (err instanceof StoreError) {
    return NextResponse.json({ error: err.message }, { status: err.status })
  }
  console.error("Admin API error:", err)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}
