import { notFound } from "next/navigation"
import { getCategories, getProductById } from "@/lib/server/store"
import { ProductForm } from "@/components/admin/product-form"

export const dynamic = "force-dynamic"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([getProductById(id), getCategories()])
  if (!product) notFound()

  return <ProductForm categories={categories} product={product} />
}
