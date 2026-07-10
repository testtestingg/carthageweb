import { getCategories, getProducts } from "@/lib/server/store"
import { CategoriesManager } from "@/components/admin/categories-manager"

export const dynamic = "force-dynamic"

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  const productCounts = Object.fromEntries(
    categories.map((c) => [c.id, products.filter((p) => p.categoryId === c.id).length]),
  )
  return <CategoriesManager categories={categories} productCounts={productCounts} />
}
