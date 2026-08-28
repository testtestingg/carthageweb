import type { MetadataRoute } from "next"
import { getProducts } from "@/lib/server/store"

export const dynamic = "force-dynamic"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carthage.de"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/carthage-care`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/stone-paper`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/stone-paper/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/stone-paper/product`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/stone-paper/process`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/sustainability`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/certifications`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/products/bags`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/products/notebooks`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/products/pp-woven-bags`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/stone-paper/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/academy`, changeFrequency: "monthly", priority: 0.6 },
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
