import type { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/server/store"
import { ShopClient } from "@/components/shop/shop-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Stone Paper Shop - Tree-Free Notebooks, Bags & Packaging",
  description:
    "Shop Golden Bridge stone paper products: waterproof tree-free notebooks, sheets, bags and industrial packaging. Produced in Germany by Carthage Gmbh.",
  alternates: { canonical: "/stone-paper/shop" },
}

const STONE_CATEGORY = "stonepaper"

export default async function StonePaperShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const [products, categories, params] = await Promise.all([getProducts(), getCategories(), searchParams])

  const stoneProducts = products.filter((p) => p.categoryId === STONE_CATEGORY)
  const stoneCategories = categories.filter((c) => c.id === STONE_CATEGORY)

  return (
    <ShopClient
      variant="stonepaper"
      products={stoneProducts}
      categories={stoneCategories}
      initialQuery={typeof params.q === "string" ? params.q : ""}
      initialCategory=""
    />
  )
}
