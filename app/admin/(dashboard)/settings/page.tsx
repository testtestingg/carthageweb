import { requireAdminPage } from "@/lib/server/admin-page"
import { SettingsForm } from "@/components/admin/settings-form"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const username = await requireAdminPage()
  return <SettingsForm username={username} />
}
