import { NextResponse, type NextRequest } from "next/server"
import { createProduct, getCategoryById } from "@/lib/server/store"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { productInputSchema } from "@/lib/server/validation"
import type { Product } from "@/lib/types"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = productInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 422 },
      )
    }

    if (!(await getCategoryById(parsed.data.categoryId))) {
      return NextResponse.json({ error: "Unknown category" }, { status: 422 })
    }

    const now = new Date().toISOString()
    const product: Product = {
      ...parsed.data,
      currency: "EUR",
      createdAt: now,
      updatedAt: now,
    }
    await createProduct(product)
    return NextResponse.json({ product }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
