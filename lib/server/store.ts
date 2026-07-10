import { promises as fs } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import type { Category, ContactMessage, Product } from "@/lib/types"
import { seedCategories, seedProducts } from "./seed"

const DATA_DIR = path.join(process.cwd(), "data")

const FILES = {
  products: path.join(DATA_DIR, "products.json"),
  categories: path.join(DATA_DIR, "categories.json"),
  messages: path.join(DATA_DIR, "messages.json"),
} as const

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

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
  await ensureDataDir()
  const tmp = `${file}.${randomUUID()}.tmp`
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8")
  await fs.rename(tmp, file)
}

// ---------- Products ----------

export async function getProducts(): Promise<Product[]> {
  return readJsonFile<Product[]>(FILES.products, seedProducts)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeJsonFile(FILES.products, products)
}

export async function createProduct(product: Product): Promise<Product> {
  const products = await getProducts()
  if (products.some((p) => p.id === product.id)) {
    throw new StoreError("A product with this ID already exists", 409)
  }
  products.push(product)
  await saveProducts(products)
  return product
}

export async function updateProduct(id: string, update: Product): Promise<Product> {
  const products = await getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) throw new StoreError("Product not found", 404)
  products[index] = { ...update, id, updatedAt: new Date().toISOString() }
  await saveProducts(products)
  return products[index]
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts()
  const next = products.filter((p) => p.id !== id)
  if (next.length === products.length) throw new StoreError("Product not found", 404)
  await saveProducts(next)
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  return readJsonFile<Category[]>(FILES.categories, seedCategories)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find((c) => c.id === id)
}

export async function saveCategories(categories: Category[]): Promise<void> {
  await writeJsonFile(FILES.categories, categories)
}

export async function createCategory(category: Category): Promise<Category> {
  const categories = await getCategories()
  if (categories.some((c) => c.id === category.id)) {
    throw new StoreError("A category with this ID already exists", 409)
  }
  categories.push(category)
  await saveCategories(categories)
  return category
}

export async function updateCategory(id: string, update: Category): Promise<Category> {
  const categories = await getCategories()
  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) throw new StoreError("Category not found", 404)
  categories[index] = { ...update, id }
  await saveCategories(categories)
  return categories[index]
}

export async function deleteCategory(id: string): Promise<void> {
  const products = await getProducts()
  if (products.some((p) => p.categoryId === id)) {
    throw new StoreError("Cannot delete a category that still has products", 409)
  }
  const categories = await getCategories()
  const next = categories.filter((c) => c.id !== id)
  if (next.length === categories.length) throw new StoreError("Category not found", 404)
  await saveCategories(next)
}

// ---------- Contact messages ----------

export async function addContactMessage(message: ContactMessage): Promise<void> {
  const messages = await readJsonFile<ContactMessage[]>(FILES.messages, [])
  messages.push(message)
  await writeJsonFile(FILES.messages, messages)
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return readJsonFile<ContactMessage[]>(FILES.messages, [])
}

export class StoreError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
