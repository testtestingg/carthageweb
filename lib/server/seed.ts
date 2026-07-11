import type { Category, Product } from "@/lib/types"
import productsJson from "@/data/products.json"
import categoriesJson from "@/data/categories.json"

/**
 * First-run seed for the JSON store. Sourced directly from the committed
 * data files so the seed can never drift from the live catalog.
 * (supabase/schema.sql carries the same catalog for the Postgres backend.)
 */
export const seedProducts = productsJson as unknown as Product[]
export const seedCategories = categoriesJson as unknown as Category[]
