import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client.
 *
 * The whole backend switches to Supabase as soon as the two env vars are set:
 *   NEXT_PUBLIC_SUPABASE_URL      - project URL from Supabase dashboard
 *   SUPABASE_SERVICE_ROLE_KEY     - service_role secret (Settings > API)
 * Without them the store falls back to the local JSON files in data/,
 * so the project keeps working in dev with zero setup.
 *
 * Never import this module from a "use client" component - the service
 * role key bypasses row level security and must stay on the server.
 */

let cached: SupabaseClient | null = null

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && supabaseKey())
}

function supabaseKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export function getSupabase(): SupabaseClient {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = supabaseKey()
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    )
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

/** Storage bucket for admin image uploads (created by supabase/schema.sql). */
export const UPLOADS_BUCKET = "product-images"
