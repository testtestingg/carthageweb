import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/server/auth"
import { AdminLoginForm } from "@/components/admin/login-form"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const user = await getSessionUser()
  if (user) redirect("/admin")

  return <AdminLoginForm />
}
