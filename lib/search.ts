import { LOCALES, type Product } from "./types"

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

// Score a product against the query across every locale's content plus
// keywords, so "Nadel", "aiguille" and "needle" all find the same product.
function scoreProduct(product: Product, query: string): number {
  const q = normalize(query)
  let score = 0

  for (const locale of LOCALES) {
    const t = product.translations[locale]
    if (!t) continue
    const name = normalize(t.name)
    if (name === q) score = Math.max(score, 100)
    else if (name.startsWith(q)) score = Math.max(score, 80)
    else if (name.includes(q)) score = Math.max(score, 60)
    if (normalize(t.subtitle).includes(q)) score = Math.max(score, 40)
    if (normalize(t.description).includes(q)) score = Math.max(score, 20)
  }

  for (const keyword of product.keywords) {
    const k = normalize(keyword)
    if (k === q) score = Math.max(score, 70)
    else if (k.startsWith(q) || q.includes(k)) score = Math.max(score, 50)
  }

  return score
}

export function searchProducts(products: Product[], query: string): Product[] {
  const trimmed = query.trim()
  if (!trimmed) return []
  return products
    .map((product) => ({ product, score: scoreProduct(product, trimmed) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product)
}
