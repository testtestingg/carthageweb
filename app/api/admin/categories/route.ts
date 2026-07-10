import { NextResponse, type NextRequest } from "next/server"
import { createCategory } from "@/lib/server/store"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { categoryInputSchema } from "@/lib/server/validation"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = categoryInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 422 },
      )
    }
    const category = await createCategory(parsed.data)
    return NextResponse.json({ category }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
