import type { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/server/store"
import { ShopClient } from "@/components/shop/shop-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Discover the complete range of Carthage GmbH professional permanent makeup solutions: pigments, cartridge needles and skincare.",
}

const STONE_CATEGORY = "stonepaper"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const [products, categories, params] = await Promise.all([getProducts(), getCategories(), searchParams])

  // Exclude stone paper products from the PMU & Cosmetics shop
  const pmuProducts = products.filter((p) => p.categoryId !== STONE_CATEGORY)
  const pmuCategories = categories.filter((c) => c.id !== STONE_CATEGORY)

  return (
    <ShopClient
      products={pmuProducts}
      categories={pmuCategories}
      initialQuery={typeof params.q === "string" ? params.q : ""}
      initialCategory={typeof params.category === "string" ? params.category : ""}
    />
  )
}
