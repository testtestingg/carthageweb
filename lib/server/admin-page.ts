import { redirect } from "next/navigation"
import { getSessionUser } from "./auth"

/**
 * Authoritative guard for admin pages. Verifies the signed session cookie
 * server-side and redirects to the login page when invalid or expired.
 */
export async function requireAdminPage(): Promise<string> {
  const user = await getSessionUser()
  if (!user) redirect("/admin/login")
  return user
}
