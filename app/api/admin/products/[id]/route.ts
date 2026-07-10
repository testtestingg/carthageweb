import { NextResponse, type NextRequest } from "next/server"
import { getProductById, updateProduct, deleteProduct, getCategoryById } from "@/lib/server/store"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { productInputSchema } from "@/lib/server/validation"

export const dynamic = "force-dynamic"

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const existing = await getProductById(id)
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const body = await request.json()
    const parsed = productInputSchema.safeParse({ ...body, id })
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 422 },
      )
    }

    if (!(await getCategoryById(parsed.data.categoryId))) {
      return NextResponse.json({ error: "Unknown category" }, { status: 422 })
    }

    const product = await updateProduct(id, {
      ...existing,
      ...parsed.data,
      currency: "EUR",
    })
    return NextResponse.json({ product })
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    await deleteProduct(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return handleApiError(err)
  }
}
