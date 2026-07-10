import type { MetadataRoute } from "next"
import { getProducts } from "@/lib/server/store"

export const dynamic = "force-dynamic"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carthagecare.de"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    ...products.map((product) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
