import type { Metadata } from "next"
import { requireAdminPage } from "@/lib/server/admin-page"
import { AdminShell } from "@/components/admin/admin-shell"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const username = await requireAdminPage()
  return <AdminShell username={username}>{children}</AdminShell>
}
