import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { updateEnrollmentStatus, deleteEnrollment } from "@/lib/server/store"

export const dynamic = "force-dynamic"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const { id } = await params
    const body = await request.json()
    const status = body.status === "contacted" ? "contacted" : "new"
    const updated = await updateEnrollmentStatus(id, status)
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
    await deleteEnrollment(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return handleApiError(e)
  }
}
