import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { getEnrollments } from "@/lib/server/store"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const err = await requireAdmin(request)
  if (err) return err
  try {
    const enrollments = await getEnrollments()
    return NextResponse.json(enrollments)
  } catch (e) {
    return handleApiError(e)
  }
}
