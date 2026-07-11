import { NextResponse, type NextRequest } from "next/server"
import { promises as fs } from "node:fs"
import path from "node:path"
import { randomBytes } from "node:crypto"
import { requireAdmin, handleApiError } from "@/lib/server/admin-api"
import { getSupabase, isSupabaseConfigured, UPLOADS_BUCKET } from "@/lib/server/supabase"

export const dynamic = "force-dynamic"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

// Magic-byte signatures; never trust the client-provided MIME type alone
const SIGNATURES: { ext: string; mime: string; check: (buf: Buffer) => boolean }[] = [
  { ext: "jpg", mime: "image/jpeg", check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: "png",
    mime: "image/png",
    check: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    ext: "webp",
    mime: "image/webp",
    check: (b) => b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP",
  },
  {
    ext: "gif",
    mime: "image/gif",
    check: (b) => b.subarray(0, 4).toString("ascii") === "GIF8",
  },
]

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }
    if (file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File must be between 1 byte and 5 MB" }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const signature = SIGNATURES.find((s) => s.check(buffer))
    if (!signature) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPEG, PNG, WebP or GIF." },
        { status: 415 },
      )
    }

    const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${signature.ext}`

    // Supabase Storage when configured, local public/uploads otherwise
    if (isSupabaseConfigured()) {
      const storage = getSupabase().storage.from(UPLOADS_BUCKET)
      const { error } = await storage.upload(filename, buffer, {
        contentType: signature.mime,
        cacheControl: "31536000",
      })
      if (error) {
        return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 })
      }
      const { data } = storage.getPublicUrl(filename)
      return NextResponse.json({ url: data.publicUrl }, { status: 201 })
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
