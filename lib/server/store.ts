import { promises as fs } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import type { Category, ContactMessage, Enrollment, EnrollmentStatus, Formation, Product } from "@/lib/types"
import { getSupabase, isSupabaseConfigured } from "./supabase"
import { seedCategories, seedProducts } from "./seed"

export class StoreError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// ============================================================
// Storage backends
// The public API below is backend-agnostic: when Supabase env vars
// are present (see lib/server/supabase.ts) everything reads/writes
// Postgres; otherwise the flat JSON files in data/ are used so the
// project runs locally with zero setup.
// ============================================================

// ---------- JSON backend ----------

const DATA_DIR = path.join(process.cwd(), "data")

const FILES = {
  products: path.join(DATA_DIR, "products.json"),
  categories: path.join(DATA_DIR, "categories.json"),
  messages: path.join(DATA_DIR, "messages.json"),
  formations: path.join(DATA_DIR, "formations.json"),
  enrollments: path.join(DATA_DIR, "enrollments.json"),
} as const

async function readJsonFile<T>(file: string, seed: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8")
    return JSON.parse(raw) as T
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      await writeJsonFile(file, seed)
      return seed
    }
    throw err
  }
}

// Write to a temp file then rename so a crash mid-write can't corrupt the store.
async function writeJsonFile<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const tmp = `${file}.${randomUUID()}.tmp`
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8")
  await fs.rename(tmp, file)
}

// ---------- Supabase row mapping ----------

/* eslint-disable @typescript-eslint/no-explicit-any */

function productFromRow(row: any): Product {
  return {
    id: row.id,
    price: Number(row.price),
    currency: row.currency,
    image: row.image,
    categoryId: row.category_id,
    badge: row.badge ?? undefined,
    keywords: row.keywords ?? [],
    inStock: row.in_stock,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    translations: row.translations,
  }
}

function productToRow(p: Product) {
  return {
    id: p.id,
    price: p.price,
    currency: p.currency,
    image: p.image,
    category_id: p.categoryId,
    badge: p.badge ?? null,
    keywords: p.keywords,
    in_stock: p.inStock,
    featured: p.featured,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
    translations: p.translations,
  }
}

function categoryFromRow(row: any): Category {
  return { id: row.id, icon: row.icon, translations: row.translations }
}

function formationFromRow(row: any): Formation {
  return {
    id: row.id,
    image: row.image,
    category: row.category,
    duration: row.duration,
    price: row.price === null ? undefined : Number(row.price),
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    translations: row.translations,
  }
}

function formationToRow(f: Formation) {
  return {
    id: f.id,
    image: f.image,
    category: f.category,
    duration: f.duration,
    price: f.price ?? null,
    published: f.published,
    created_at: f.createdAt,
    updated_at: f.updatedAt,
    translations: f.translations,
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */

function sbError(error: { message: string; code?: string }, notFound = false): StoreError {
  if (notFound) return new StoreError("Not found", 404)
  // 23505 = Postgres unique_violation, 23503 = foreign_key_violation
  if (error.code === "23505") return new StoreError("An item with this ID already exists", 409)
  if (error.code === "23503") return new StoreError("Referenced item does not exist or is still in use", 409)
  return new StoreError(error.message, 500)
}

// ---------- Products ----------

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("products")
      .select("*")
      .order("created_at", { ascending: true })
    if (error) throw sbError(error)
    return (data ?? []).map(productFromRow)
  }
  return readJsonFile<Product[]>(FILES.products, seedProducts)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("products").select("*").eq("id", id).maybeSingle()
    if (error) throw sbError(error)
    return data ? productFromRow(data) : undefined
  }
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function createProduct(product: Product): Promise<Product> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase().from("products").insert(productToRow(product))
    if (error) throw sbError(error)
    return product
  }
  const products = await getProducts()
  if (products.some((p) => p.id === product.id)) {
    throw new StoreError("A product with this ID already exists", 409)
  }
  products.push(product)
  await writeJsonFile(FILES.products, products)
  return product
}

export async function updateProduct(id: string, update: Product): Promise<Product> {
  const next = { ...update, id, updatedAt: new Date().toISOString() }
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("products")
      .update(productToRow(next))
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw sbError(error)
    if (!data) throw new StoreError("Product not found", 404)
    return productFromRow(data)
  }
  const products = await getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) throw new StoreError("Product not found", 404)
  products[index] = next
  await writeJsonFile(FILES.products, products)
  return products[index]
}

export async function deleteProduct(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("products").delete().eq("id", id).select("id")
    if (error) throw sbError(error)
    if (!data?.length) throw new StoreError("Product not found", 404)
    return
  }
  const products = await getProducts()
  const next = products.filter((p) => p.id !== id)
  if (next.length === products.length) throw new StoreError("Product not found", 404)
  await writeJsonFile(FILES.products, next)
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("categories")
      .select("*")
      .order("position", { ascending: true })
    if (error) throw sbError(error)
    return (data ?? []).map(categoryFromRow)
  }
  return readJsonFile<Category[]>(FILES.categories, seedCategories)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find((c) => c.id === id)
}

export async function createCategory(category: Category): Promise<Category> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()
      .from("categories")
      .insert({ id: category.id, icon: category.icon, translations: category.translations })
    if (error) throw sbError(error)
    return category
  }
  const categories = await getCategories()
  if (categories.some((c) => c.id === category.id)) {
    throw new StoreError("A category with this ID already exists", 409)
  }
  categories.push(category)
  await writeJsonFile(FILES.categories, categories)
  return category
}

export async function updateCategory(id: string, update: Category): Promise<Category> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("categories")
      .update({ icon: update.icon, translations: update.translations })
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw sbError(error)
    if (!data) throw new StoreError("Category not found", 404)
    return categoryFromRow(data)
  }
  const categories = await getCategories()
  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) throw new StoreError("Category not found", 404)
  categories[index] = { ...update, id }
  await writeJsonFile(FILES.categories, categories)
  return categories[index]
}

export async function deleteCategory(id: string): Promise<void> {
  const products = await getProducts()
  if (products.some((p) => p.categoryId === id)) {
    throw new StoreError("Cannot delete a category that still has products", 409)
  }
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("categories").delete().eq("id", id).select("id")
    if (error) throw sbError(error)
    if (!data?.length) throw new StoreError("Category not found", 404)
    return
  }
  const categories = await getCategories()
  const next = categories.filter((c) => c.id !== id)
  if (next.length === categories.length) throw new StoreError("Category not found", 404)
  await writeJsonFile(FILES.categories, next)
}

// ---------- Contact messages ----------

export async function addContactMessage(message: ContactMessage): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase().from("contact_messages").insert({
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      created_at: message.createdAt,
    })
    if (error) throw sbError(error)
    return
  }
  const messages = await readJsonFile<ContactMessage[]>(FILES.messages, [])
  messages.push(message)
  await writeJsonFile(FILES.messages, messages)
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) throw sbError(error)
    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
    }))
  }
  return readJsonFile<ContactMessage[]>(FILES.messages, [])
}

// ---------- Formations ----------

export async function getFormations(): Promise<Formation[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("formations")
      .select("*")
      .order("created_at", { ascending: true })
    if (error) throw sbError(error)
    return (data ?? []).map(formationFromRow)
  }
  return readJsonFile<Formation[]>(FILES.formations, [])
}

export async function getFormationById(id: string): Promise<Formation | undefined> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("formations").select("*").eq("id", id).maybeSingle()
    if (error) throw sbError(error)
    return data ? formationFromRow(data) : undefined
  }
  const formations = await getFormations()
  return formations.find((f) => f.id === id)
}

export async function createFormation(formation: Formation): Promise<Formation> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase().from("formations").insert(formationToRow(formation))
    if (error) throw sbError(error)
    return formation
  }
  const formations = await getFormations()
  if (formations.some((f) => f.id === formation.id)) {
    throw new StoreError("A formation with this ID already exists", 409)
  }
  formations.push(formation)
  await writeJsonFile(FILES.formations, formations)
  return formation
}

export async function updateFormation(id: string, update: Formation): Promise<Formation> {
  const next = { ...update, id, updatedAt: new Date().toISOString() }
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("formations")
      .update(formationToRow(next))
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw sbError(error)
    if (!data) throw new StoreError("Formation not found", 404)
    return formationFromRow(data)
  }
  const formations = await getFormations()
  const index = formations.findIndex((f) => f.id === id)
  if (index === -1) throw new StoreError("Formation not found", 404)
  formations[index] = next
  await writeJsonFile(FILES.formations, formations)
  return formations[index]
}

export async function deleteFormation(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("formations").delete().eq("id", id).select("id")
    if (error) throw sbError(error)
    if (!data?.length) throw new StoreError("Formation not found", 404)
    return
  }
  const formations = await getFormations()
  const next = formations.filter((f) => f.id !== id)
  if (next.length === formations.length) throw new StoreError("Formation not found", 404)
  await writeJsonFile(FILES.formations, next)
}

// ---------- Enrollments ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
function enrollmentFromRow(row: any): Enrollment {
  return {
    id: row.id,
    formationId: row.formation_id,
    formationName: row.formation_name,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    country: row.country ?? "",
    message: row.message ?? "",
    locale: row.locale ?? "en",
    status: row.status,
    createdAt: row.created_at,
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getEnrollments(): Promise<Enrollment[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) throw sbError(error)
    return (data ?? []).map(enrollmentFromRow)
  }
  const list = await readJsonFile<Enrollment[]>(FILES.enrollments, [])
  return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function addEnrollment(enrollment: Enrollment): Promise<Enrollment> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase().from("enrollments").insert({
      id: enrollment.id,
      formation_id: enrollment.formationId,
      formation_name: enrollment.formationName,
      name: enrollment.name,
      email: enrollment.email,
      phone: enrollment.phone,
      country: enrollment.country,
      message: enrollment.message,
      locale: enrollment.locale,
      status: enrollment.status,
      created_at: enrollment.createdAt,
    })
    if (error) throw sbError(error)
    return enrollment
  }
  const list = await readJsonFile<Enrollment[]>(FILES.enrollments, [])
  list.push(enrollment)
  await writeJsonFile(FILES.enrollments, list)
  return enrollment
}

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus): Promise<Enrollment> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()
      .from("enrollments")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw sbError(error)
    if (!data) throw new StoreError("Enrollment not found", 404)
    return enrollmentFromRow(data)
  }
  const list = await readJsonFile<Enrollment[]>(FILES.enrollments, [])
  const index = list.findIndex((e) => e.id === id)
  if (index === -1) throw new StoreError("Enrollment not found", 404)
  list[index] = { ...list[index], status }
  await writeJsonFile(FILES.enrollments, list)
  return list[index]
}

export async function deleteEnrollment(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase().from("enrollments").delete().eq("id", id).select("id")
    if (error) throw sbError(error)
    if (!data?.length) throw new StoreError("Enrollment not found", 404)
    return
  }
  const list = await readJsonFile<Enrollment[]>(FILES.enrollments, [])
  const next = list.filter((e) => e.id !== id)
  if (next.length === list.length) throw new StoreError("Enrollment not found", 404)
  await writeJsonFile(FILES.enrollments, next)
}
