import { NextResponse, type NextRequest } from "next/server"
import { getProducts } from "@/lib/server/store"
import { searchProducts } from "@/lib/search"
import { localizeProduct, LOCALES, type Locale } from "@/lib/types"

export const dynamic = "force-dynamic"

const MAX_RESULTS = 8

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? ""
  const localeParam = request.nextUrl.searchParams.get("locale")
  const locale: Locale = (LOCALES as readonly string[]).includes(localeParam ?? "")
    ? (localeParam as Locale)
    : "en"

  if (query.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }

  const products = await getProducts()
  const results = searchProducts(products, query)
    .slice(0, MAX_RESULTS)
    .map((product) => {
      const info = localizeProduct(product, locale)
      return {
        id: product.id,
        name: info.name,
        subtitle: info.subtitle,
        price: product.price,
        priceOnRequest: product.priceOnRequest ?? false,
        image: product.image,
      }
    })

  return NextResponse.json({ results })
}
