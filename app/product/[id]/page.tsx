import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductById, getProducts, getCategoryById } from "@/lib/server/store"
import { ProductClient } from "@/components/product/product-client"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return { title: "Product Not Found" }
  const info = product.translations.en
  return {
    title: info.name,
    description: info.description,
    openGraph: {
      title: info.name,
      description: info.description,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  const [allProducts, category] = await Promise.all([getProducts(), getCategoryById(product.categoryId)])

  // Same-category products first, then the rest
  const related = [
    ...allProducts.filter((p) => p.id !== product.id && p.categoryId === product.categoryId),
    ...allProducts.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId),
  ].slice(0, 4)

  return <ProductClient product={product} category={category ?? null} relatedProducts={related} />
}
