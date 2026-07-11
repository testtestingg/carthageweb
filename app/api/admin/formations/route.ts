import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { getFormations, createFormation } from "@/lib/server/store"
import type { Formation } from "@/lib/types"
import { randomUUID } from "node:crypto"

export async function GET(request: Request) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const formations = await getFormations()
    return NextResponse.json(formations)
  } catch (e) {
    return handleApiError(e)
  }
}

export async function POST(request: Request) {
  const err = await requireAdmin(request)
  if (err) return err

  try {
    const body = await request.json()
    const now = new Date().toISOString()

    const formation: Formation = {
      id: body.id || randomUUID(),
      image: body.image || "",
      category: body.category || "",
      duration: body.duration || "",
      price: body.price ?? undefined,
      published: body.published ?? true,
      createdAt: now,
      updatedAt: now,
      translations: body.translations || {
        en: { name: "", description: "", details: "" },
        fr: { name: "", description: "", details: "" },
        de: { name: "", description: "", details: "" },
      },
    }

    const created = await createFormation(formation)
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return handleApiError(e)
  }
}
