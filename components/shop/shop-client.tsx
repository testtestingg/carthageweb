"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { SearchX, X, SlidersHorizontal, ChevronDown } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { ProductCard } from "@/components/site/product-card"
import { CategoryIcon } from "@/components/site/category-icon"
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
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Only offer category filters that actually contain products
  const filterCategories = useMemo(
    () => categories.filter((c) => products.some((p) => p.categoryId === c.id)),
    [categories, products],
  )

  const countByCategory = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of products) counts.set(p.categoryId, (counts.get(p.categoryId) ?? 0) + 1)
    return counts
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = query.trim() ? searchProducts(products, query) : [...products]
    if (categoryId) result = result.filter((p) => p.categoryId === categoryId)
    const min = Number(priceMin)
    const max = Number(priceMax)
    if (priceMin !== "" && !Number.isNaN(min)) result = result.filter((p) => p.price >= min)
    if (priceMax !== "" && !Number.isNaN(max)) result = result.filter((p) => p.price <= max)
    if (inStockOnly) result = result.filter((p) => p.inStock)
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
  }, [products, query, categoryId, sort, priceMin, priceMax, inStockOnly, locale])

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

  const activeFilterCount =
    (categoryId ? 1 : 0) + (priceMin !== "" ? 1 : 0) + (priceMax !== "" ? 1 : 0) + (inStockOnly ? 1 : 0)

  const clearFilters = () => {
    setCategoryId("")
    setPriceMin("")
    setPriceMax("")
    setInStockOnly(false)
    updateUrl(query, "")
  }

  const countLabel = filteredProducts.length === 1 ? t.shop.productFound : t.shop.productsFound

  const priceInputClass =
    "w-full px-3 py-2 rounded-lg border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] transition-all"

  const filtersPanel = (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#999] mb-3">
          {t.shop.categories}
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => selectCategory("")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                categoryId === "" ? "bg-[#111] text-white font-semibold" : "text-[#555] hover:bg-[#f7f5f0]"
              }`}
            >
              <span>{t.shop.all}</span>
              <span className={`text-xs ${categoryId === "" ? "text-white/70" : "text-[#aaa]"}`}>
                {products.length}
              </span>
            </button>
          </li>
          {filterCategories.map((category) => {
            const active = categoryId === category.id
            return (
              <li key={category.id}>
                <button
                  onClick={() => selectCategory(active ? "" : category.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active ? "bg-[#111] text-white font-semibold" : "text-[#555] hover:bg-[#f7f5f0]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <CategoryIcon
                      icon={category.icon}
                      className={`w-4 h-4 shrink-0 ${active ? "text-[#e8c97a]" : "text-[#c9a96e]"}`}
                    />
                    <span className="truncate text-left">{localizeCategory(category, locale).name}</span>
                  </span>
                  <span className={`text-xs shrink-0 ${active ? "text-white/70" : "text-[#aaa]"}`}>
                    {countByCategory.get(category.id) ?? 0}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#999] mb-3">
          {t.shop.price} (€)
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder={t.shop.priceMin}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className={priceInputClass}
            aria-label={`${t.shop.price} ${t.shop.priceMin}`}
          />
          <span className="text-[#ccc]">–</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder={t.shop.priceMax}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className={priceInputClass}
            aria-label={`${t.shop.price} ${t.shop.priceMax}`}
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#999] mb-3">
          {t.shop.availability}
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#555]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-[#ccc] accent-[#c9a96e]"
          />
          {t.shop.inStockOnly}
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c9a96e] hover:underline"
        >
          <X className="w-3.5 h-3.5" />
          {t.shop.clearFilters}
        </button>
      )}
    </div>
  )

  return (
    <SiteShell>
      <div className="pt-24 pb-8 px-4 md:px-12 max-w-[1240px] mx-auto min-h-[70vh]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{t.shop.breadcrumb}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-3">
            {t.shop.title}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#c9a96e] to-[#e8c97a] bg-clip-text text-transparent">
              {t.shop.titleAccent}
            </span>
          </h1>
          <p className="text-[15px] md:text-base text-[#666] max-w-[600px]">{t.shop.subtitle}</p>
        </div>

        {/* Active search banner */}
        {query.trim() && (
          <div className="flex items-center gap-3 mb-6">
            <p className="text-sm text-[#666]">
              {t.shop.resultsFor} <span className="font-semibold text-black">&ldquo;{query.trim()}&rdquo;</span>{" "}
              <span className="text-[#999]">
                ({filteredProducts.length} {countLabel})
              </span>
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#c9a96e] hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              {t.shop.clearSearch}
            </button>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block" aria-label={t.shop.filters}>
            <div className="sticky top-24">{filtersPanel}</div>
          </aside>

          <div>
            {/* Toolbar: mobile filter toggle + count + sort */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e5e5e5] bg-white text-sm font-medium hover:border-black transition-colors"
                aria-expanded={mobileFiltersOpen}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t.shop.filters}
                {activeFilterCount > 0 && (
                  <span className="bg-[#c9a96e] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
                />
              </button>

              <p className="hidden lg:block text-sm text-[#888]">
                {filteredProducts.length} {countLabel}
              </p>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-[#888] whitespace-nowrap hidden sm:block">
                  {t.shop.sortBy}
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="px-4 py-2 rounded-full border border-[#e5e5e5] bg-white text-sm font-medium focus:outline-none focus:border-[#c9a96e] transition-all cursor-pointer"
                >
                  <option value="featured">{t.shop.sortFeatured}</option>
                  <option value="price-asc">{t.shop.sortPriceAsc}</option>
                  <option value="price-desc">{t.shop.sortPriceDesc}</option>
                  <option value="name-asc">{t.shop.sortNameAsc}</option>
                </select>
              </div>
            </div>

            {/* Mobile filters panel */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-white border border-[#eee] rounded-2xl p-5 mb-6">{filtersPanel}</div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <SearchX className="w-14 h-14 text-[#ddd] mx-auto mb-5" aria-hidden="true" />
                <h2 className="font-display text-2xl font-semibold mb-2">{t.shop.emptyTitle}</h2>
                <p className="text-[#888] mb-8">{t.shop.emptySubtitle}</p>
                <button
                  onClick={() => {
                    setQuery("")
                    clearFilters()
                    updateUrl("", "")
                  }}
                  className="bg-[#111] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:bg-[#222]"
                >
                  {t.search.browseAll}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showAddToCart />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
