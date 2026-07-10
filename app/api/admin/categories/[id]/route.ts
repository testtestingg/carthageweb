import { NextResponse, type NextRequest } from "next/server"
import { getCategoryById, updateCategory, deleteCategory } from "@/lib/server/store"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { categoryInputSchema } from "@/lib/server/validation"

export const dynamic = "force-dynamic"

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const existing = await getCategoryById(id)
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const body = await request.json()
    const parsed = categoryInputSchema.safeParse({ ...body, id })
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 422 },
      )
    }

    const category = await updateCategory(id, parsed.data)
    return NextResponse.json({ category })
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    await deleteCategory(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return handleApiError(err)
  }
}
