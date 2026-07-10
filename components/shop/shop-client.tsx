"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { SearchX, X } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { ProductCard } from "@/components/site/product-card"
import { useLanguage } from "@/context/language-context"
import { searchProducts } from "@/lib/search"
import { localizeCategory, localizeProduct, type Category, type Product } from "@/lib/types"

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc"

export function ShopClient({
  products,
  categories,
  initialQuery,
  initialCategory,
}: {
  products: Product[]
  categories: Category[]
  initialQuery: string
  initialCategory: string
}) {
  const { locale, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery)
  const [categoryId, setCategoryId] = useState(initialCategory)
  const [sort, setSort] = useState<SortOption>("featured")

  // Only offer category filters that actually contain products
  const filterCategories = useMemo(
    () => categories.filter((c) => products.some((p) => p.categoryId === c.id)),
    [categories, products],
  )

  const filteredProducts = useMemo(() => {
    let result = query.trim() ? searchProducts(products, query) : [...products]
    if (categoryId) {
      result = result.filter((p) => p.categoryId === categoryId)
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) =>
          localizeProduct(a, locale).name.localeCompare(localizeProduct(b, locale).name, locale),
        )
        break
      case "featured":
        if (!query.trim()) {
          result.sort((a, b) => Number(b.featured) - Number(a.featured))
        }
        break
    }
    return result
  }, [products, query, categoryId, sort, locale])

  const updateUrl = (nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams()
    if (nextQuery.trim()) params.set("q", nextQuery.trim())
    if (nextCategory) params.set("category", nextCategory)
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  const selectCategory = (id: string) => {
    setCategoryId(id)
    updateUrl(query, id)
  }

  const clearSearch = () => {
    setQuery("")
    updateUrl("", categoryId)
  }

  const countLabel =
    filteredProducts.length === 1 ? t.shop.productFound : t.shop.productsFound

  return (
    <SiteShell>
      <div className="pt-24 pb-8 px-4 md:px-12 max-w-[1400px] mx-auto min-h-[70vh]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888] mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{t.shop.breadcrumb}</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-4">
            {t.shop.title}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
              {t.shop.titleAccent}
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#666] max-w-[600px] mx-auto">{t.shop.subtitle}</p>
        </div>

        {/* Active search banner */}
        {query.trim() && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <p className="text-sm text-[#666]">
              {t.shop.resultsFor} <span className="font-semibold text-black">&ldquo;{query.trim()}&rdquo;</span>{" "}
              <span className="text-[#999]">
                ({filteredProducts.length} {countLabel})
              </span>
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#ff4d8c] hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              {t.shop.clearSearch}
            </button>
          </div>
        )}

        {/* Filters row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
            <button
              onClick={() => selectCategory("")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                categoryId === ""
                  ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  : "bg-white border border-[#e5e5e5] text-[#666] hover:border-black hover:text-black"
              }`}
            >
              {t.shop.all}
            </button>
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => selectCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  categoryId === category.id
                    ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "bg-white border border-[#e5e5e5] text-[#666] hover:border-black hover:text-black"
                }`}
              >
                {localizeCategory(category, locale).name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label htmlFor="sort" className="text-sm text-[#888] whitespace-nowrap">
              {t.shop.sortBy}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-4 py-2 rounded-full border border-[#e5e5e5] bg-white text-sm font-medium focus:outline-none focus:border-[#ff4d8c] transition-all cursor-pointer"
            >
              <option value="featured">{t.shop.sortFeatured}</option>
              <option value="price-asc">{t.shop.sortPriceAsc}</option>
              <option value="price-desc">{t.shop.sortPriceDesc}</option>
              <option value="name-asc">{t.shop.sortNameAsc}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <SearchX className="w-14 h-14 text-[#ddd] mx-auto mb-5" />
            <h2 className="font-display text-2xl font-semibold mb-2">{t.shop.emptyTitle}</h2>
            <p className="text-[#888] mb-8">{t.shop.emptySubtitle}</p>
            <button
              onClick={() => {
                setQuery("")
                setCategoryId("")
                updateUrl("", "")
              }}
              className="bg-[#111] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:bg-[#222]"
            >
              {t.search.browseAll}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  )
}
