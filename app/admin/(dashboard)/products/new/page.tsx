import { getCategories } from "@/lib/server/store"
import { ProductForm } from "@/components/admin/product-form"

export const dynamic = "force-dynamic"

export default async function NewProductPage() {
  const categories = await getCategories()
  return <ProductForm categories={categories} />
}
