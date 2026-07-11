import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { getFormationById, updateFormation, deleteFormation } from "@/lib/server/store"
import type { Formation } from "@/lib/types"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const { id } = await params
    const formation = await getFormationById(id)
    if (!formation) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(formation)
  } catch (e) {
    return handleApiError(e)
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const { id } = await params
    const body = await request.json()

    const update: Formation = {
      id,
      image: body.image || "",
      category: body.category || "",
      duration: body.duration || "",
      price: body.price ?? undefined,
      published: body.published ?? true,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      translations: body.translations || {
        en: { name: "", description: "", details: "" },
        fr: { name: "", description: "", details: "" },
        de: { name: "", description: "", details: "" },
      },
    }

    const updated = await updateFormation(id, update)
    return NextResponse.json(updated)
  } catch (e) {
    return handleApiError(e)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const { id } = await params
    await deleteFormation(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return handleApiError(e)
  }
}
