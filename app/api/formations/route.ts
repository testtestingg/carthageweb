import { NextResponse } from "next/server"
import { getFormations } from "@/lib/server/store"

export const dynamic = "force-dynamic"

export async function GET() {
  const formations = await getFormations()
  // Only return published formations for public access
  const published = formations.filter((f) => f.published)
  return NextResponse.json(published)
}
