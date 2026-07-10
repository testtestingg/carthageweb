import type { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/server/store"
import { ShopClient } from "@/components/shop/shop-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Discover the complete range of Carthage professional permanent makeup solutions: pigments, cartridge needles and skincare.",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const [products, categories, params] = await Promise.all([getProducts(), getCategories(), searchParams])

  return (
    <ShopClient
      products={products}
      categories={categories}
      initialQuery={typeof params.q === "string" ? params.q : ""}
      initialCategory={typeof params.category === "string" ? params.category : ""}
    />
  )
}
