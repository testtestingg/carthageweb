import { NextResponse, type NextRequest } from "next/server"

const SESSION_COOKIE = "carthage_admin_session"

/**
 * First line of defense only: fast redirect for clearly unauthenticated
 * /admin requests and noindex headers. Cryptographic session verification
 * happens server-side in the admin pages (requireAdminPage) and in every
 * /api/admin route (requireAdmin) - do not rely on this proxy alone.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLoginPage = pathname === "/admin/login"
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value)

  if (!isLoginPage && !hasSessionCookie) {
    const loginUrl = new URL("/admin/login", request.url)
    return withNoIndex(NextResponse.redirect(loginUrl))
  }

  return withNoIndex(NextResponse.next())
}

function withNoIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow")
  return response
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
}
