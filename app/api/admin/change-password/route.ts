import { NextResponse, type NextRequest } from "next/server"
import { getAdminUser, verifyPassword, updateAdminPassword } from "@/lib/server/auth"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { changePasswordSchema } from "@/lib/server/validation"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = changePasswordSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 422 },
      )
    }

    const admin = await getAdminUser()
    const currentOk = await verifyPassword(parsed.data.currentPassword, admin.passwordHash)
    if (!currentOk) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 403 })
    }

    await updateAdminPassword(parsed.data.newPassword)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return handleApiError(err)
  }
}
