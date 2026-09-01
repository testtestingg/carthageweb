import { promises as fs } from "node:fs"
import path from "node:path"
import {
  scrypt,
  randomBytes,
  timingSafeEqual,
  createHmac,
  type ScryptOptions,
} from "node:crypto"
import { cookies } from "next/headers"
import { getSupabase, isSupabaseConfigured } from "./supabase"

function scryptAsync(password: string, salt: Buffer, keylen: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keylen, options, (err, derivedKey) => {
      if (err) reject(err)
      else resolve(derivedKey)
    })
  })
}

/**
 * Serverless hosts mount the bundle read-only, so any write under data/
 * fails with EROFS/EACCES. Persistence there is a convenience, not a
 * requirement: losing it costs durability, not the ability to sign in, so a
 * failed write is logged and swallowed rather than thrown.
 */
async function persistBestEffort(what: string, write: () => Promise<void>): Promise<void> {
  try {
    await write()
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    console.warn(
      `[auth] could not persist ${what} (${code ?? "unknown error"}). ` +
        "Running from memory; set AUTH_SECRET and configure Supabase for a durable admin account.",
    )
  }
}

const DATA_DIR = path.join(process.cwd(), "data")
const ADMIN_FILE = path.join(DATA_DIR, "admin-user.json")
const SECRET_FILE = path.join(DATA_DIR, ".auth-secret")

export class AdminStoreUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AdminStoreUnavailableError"
  }
}

export const SESSION_COOKIE = "carthage_admin_session"
const SESSION_TTL_MS = 8 * 60 * 60 * 1000 // 8 hours

const SCRYPT_KEYLEN = 64
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 }

// Default bootstrap credentials, overridable via env. Documented in README;
// the admin should change the password from /admin/settings after first login.
const DEFAULT_USERNAME = "admin"
const DEFAULT_PASSWORD = "carthage-admin-2026"

interface AdminUser {
  username: string
  passwordHash: string
  updatedAt: string
}

// ---------- Password hashing ----------

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const derived = (await scryptAsync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS)) as Buffer
  return `scrypt$${SCRYPT_OPTIONS.N}$${SCRYPT_OPTIONS.r}$${SCRYPT_OPTIONS.p}$${salt.toString("base64")}$${derived.toString("base64")}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [scheme, n, r, p, saltB64, hashB64] = stored.split("$")
    if (scheme !== "scrypt") return false
    const salt = Buffer.from(saltB64, "base64")
    const expected = Buffer.from(hashB64, "base64")
    const derived = (await scryptAsync(password, salt, expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    })) as Buffer
    return timingSafeEqual(derived, expected)
  } catch {
    return false
  }
}

// ---------- Admin user ----------
// Stored in the Supabase admin_users table when Supabase is configured,
// otherwise in data/admin-user.json. Either way the row is bootstrapped
// on first access from ADMIN_USERNAME / ADMIN_PASSWORD (or the defaults).

async function bootstrapAdminUser(): Promise<AdminUser> {
  const username = process.env.ADMIN_USERNAME?.trim() || DEFAULT_USERNAME
  const password = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD
  return {
    username,
    passwordHash: await hashPassword(password),
    updatedAt: new Date().toISOString(),
  }
}

export async function getAdminUser(): Promise<AdminUser> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()
    const { data, error } = await sb.from("admin_users").select("*").limit(1).maybeSingle()
    if (error) {
      // Almost always means supabase/schema.sql has not been run. Surface it
      // as its own failure rather than falling back to the documented default
      // credentials, which would let anyone in whenever the database blips.
      console.error("[auth] admin_users read failed:", error.message)
      throw new AdminStoreUnavailableError(
        "Admin storage is unavailable. Run supabase/schema.sql on the project, then try again.",
      )
    }
    if (data) {
      return { username: data.username, passwordHash: data.password_hash, updatedAt: data.updated_at }
    }
    const user = await bootstrapAdminUser()
    const { error: insertError } = await sb.from("admin_users").insert({
      username: user.username,
      password_hash: user.passwordHash,
      updated_at: user.updatedAt,
    })
    if (insertError) {
      console.error("[auth] admin_users bootstrap failed:", insertError.message)
      throw new AdminStoreUnavailableError(
        "Admin storage is unavailable. Run supabase/schema.sql on the project, then try again.",
      )
    }
    return user
  }

  try {
    const raw = await fs.readFile(ADMIN_FILE, "utf8")
    return JSON.parse(raw) as AdminUser
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code
    if (code !== "ENOENT" && code !== "EACCES") throw err
    const user = await bootstrapAdminUser()
    await persistBestEffort("the admin account", async () => {
      await fs.mkdir(DATA_DIR, { recursive: true })
      await fs.writeFile(ADMIN_FILE, JSON.stringify(user, null, 2), { mode: 0o600 })
    })
    return user
  }
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  const user = await getAdminUser()
  const updated: AdminUser = {
    ...user,
    passwordHash: await hashPassword(newPassword),
    updatedAt: new Date().toISOString(),
  }
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()
      .from("admin_users")
      .update({ password_hash: updated.passwordHash, updated_at: updated.updatedAt })
      .eq("username", user.username)
    if (error) throw new Error(`Failed to update admin password: ${error.message}`)
    return
  }
  await fs.writeFile(ADMIN_FILE, JSON.stringify(updated, null, 2), { mode: 0o600 })
}

// ---------- Session secret ----------

let cachedSecret: Buffer | null = null

async function getSessionSecret(): Promise<Buffer> {
  if (cachedSecret) return cachedSecret
  const fromEnv = process.env.AUTH_SECRET
  if (fromEnv && fromEnv.length >= 32) {
    cachedSecret = Buffer.from(fromEnv, "utf8")
    return cachedSecret
  }
  // On serverless hosts the data/ directory doesn't persist between cold
  // starts, so when Supabase is configured derive a stable secret from the
  // service key instead of a throwaway file. Setting AUTH_SECRET explicitly
  // is still the recommended production setup.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey) {
    cachedSecret = createHmac("sha256", serviceKey).update("carthage-session-secret").digest()
    return cachedSecret
  }
  try {
    const raw = await fs.readFile(SECRET_FILE, "utf8")
    cachedSecret = Buffer.from(raw.trim(), "base64")
    return cachedSecret
  } catch {
    // No file yet, or nowhere to read one from.
  }

  const secret = randomBytes(48)
  await persistBestEffort("the session secret", async () => {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(SECRET_FILE, secret.toString("base64"), { mode: 0o600 })
  })

  // A random per-instance secret would invalidate every session on each cold
  // start, so derive a stable one from the bootstrap password when there is
  // nowhere to persist to. AUTH_SECRET remains the supported production path.
  const bootstrapPassword = process.env.ADMIN_PASSWORD
  cachedSecret = bootstrapPassword
    ? createHmac("sha256", bootstrapPassword).update("carthage-session-secret").digest()
    : secret
  return cachedSecret
}

// ---------- Session tokens ----------

function base64url(input: Buffer): string {
  return input.toString("base64url")
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = await getSessionSecret()
  const payload = base64url(
    Buffer.from(JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS }), "utf8"),
  )
  const signature = createHmac("sha256", secret).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export async function verifySessionToken(token: string | undefined): Promise<string | null> {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length !== 2) return null
  const [payload, signature] = parts
  const secret = await getSessionSecret()
  const expected = createHmac("sha256", secret).update(payload).digest()
  const provided = Buffer.from(signature, "base64url")
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (typeof data.u !== "string" || typeof data.exp !== "number") return null
    if (Date.now() > data.exp) return null
    return data.u
  } catch {
    return null
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
} as const

/** Returns the authenticated admin username, or null. */
export async function getSessionUser(): Promise<string | null> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

// ---------- Login rate limiting ----------

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map<string, number[]>()

export function isLoginThrottled(ip: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS)
  attempts.set(ip, recent)
  return recent.length >= MAX_ATTEMPTS
}

export function recordFailedLogin(ip: string): void {
  const list = attempts.get(ip) ?? []
  list.push(Date.now())
  attempts.set(ip, list)
}

export function clearLoginAttempts(ip: string): void {
  attempts.delete(ip)
}

// ---------- Request helpers ----------

/** Reject cross-origin mutations even if a cookie somehow got attached. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true // non-browser clients / same-origin GET-initiated fetches
  const host = request.headers.get("host")
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function requestIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
}
