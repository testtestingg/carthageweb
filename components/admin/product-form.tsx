"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Upload, AlertCircle, Check } from "lucide-react"
import { LOCALES, LOCALE_LABELS, type Category, type Locale, type Product } from "@/lib/types"

interface TranslationDraft {
  name: string
  subtitle: string
  description: string
  features: string // one per line in the textarea
}

type TranslationsDraft = Record<Locale, TranslationDraft>

const emptyTranslation: TranslationDraft = { name: "", subtitle: "", description: "", features: "" }

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter()
  const isEdit = Boolean(product)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [id, setId] = useState(product?.id ?? "")
  const [idTouched, setIdTouched] = useState(isEdit)
  const [price, setPrice] = useState(product ? String(product.price) : "")
  const [priceOnRequest, setPriceOnRequest] = useState(product?.priceOnRequest ?? false)
  const [image, setImage] = useState(product?.image ?? "")
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? "")
  const [badge, setBadge] = useState<string>(product?.badge ?? "")
  const [keywords, setKeywords] = useState(product?.keywords.join(", ") ?? "")
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [activeTab, setActiveTab] = useState<Locale>("en")
  const [translations, setTranslations] = useState<TranslationsDraft>(() => {
    const draft = {} as TranslationsDraft
    for (const locale of LOCALES) {
      const t = product?.translations[locale]
      draft[locale] = t
        ? { name: t.name, subtitle: t.subtitle, description: t.description, features: t.features.join("\n") }
        : { ...emptyTranslation }
    }
    return draft
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setTranslationField = (locale: Locale, field: keyof TranslationDraft, value: string) => {
    setTranslations((prev) => ({ ...prev, [locale]: { ...prev[locale], [field]: value } }))
  }

  const handleEnglishName = (value: string) => {
    setTranslationField("en", "name", value)
    if (!idTouched) setId(slugify(value))
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error ?? "Upload failed")
      setImage(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const priceNumber = Number(price)
    if (!translations.en.name.trim()) return setError("English product name is required")
    if (!id.trim()) return setError("Product ID is required")
    // A quote-only product still needs a stored figure for when the flag is
    // lifted, but the admin does not have to supply one up front.
    if (!priceOnRequest && (!Number.isFinite(priceNumber) || priceNumber <= 0))
      return setError("Enter a valid price, or tick \u201cPrice on request\u201d")
    if (!image) return setError("Upload or select a product image")
    if (!categoryId) return setError("Select a category")

    const payload = {
      id: id.trim(),
      price: Number.isFinite(priceNumber) && priceNumber > 0 ? priceNumber : 0.01,
      priceOnRequest,
      image,
      categoryId,
      badge: badge || undefined,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      inStock,
      featured,
      translations: Object.fromEntries(
        LOCALES.map((locale) => [
          locale,
          {
            name: translations[locale].name.trim(),
            subtitle: translations[locale].subtitle.trim(),
            description: translations[locale].description.trim(),
            features: translations[locale].features
              .split("\n")
              .map((f) => f.trim())
              .filter(Boolean),
          },
        ]),
      ),
    }

    setSaving(true)
    try {
      const res = await fetch(
        isEdit ? `/api/admin/products/${encodeURIComponent(product!.id)}` : "/api/admin/products",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      )
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error ?? "Save failed")
      setSaved(true)
      setTimeout(() => {
        router.push("/admin")
        router.refresh()
      }, 600)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
      setSaving(false)
    }
  }

  const translationComplete = (locale: Locale) =>
    translations[locale].name.trim() && translations[locale].description.trim()

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.12)] transition-all"

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-black transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEdit ? `Edit: ${product!.translations.en.name}` : "New Product"}
      </h1>

      {error && (
        <div className="flex items-center gap-2 bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-5 text-sm text-[#991b1b]" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: image + flags */}
          <div className="space-y-6">
            <section className="bg-white rounded-[18px] border border-[#eee] p-5">
              <h2 className="font-semibold text-sm mb-4">Product Image</h2>
              <div
                className="w-full aspect-square rounded-xl bg-[#f5f5f5] border-2 border-dashed border-[#e5e5e5] overflow-hidden relative cursor-pointer hover:border-[#c9a96e] transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file) handleUpload(file)
                }}
              >
                {image ? (
                  <Image src={image} alt="Product image" fill sizes="400px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#999] text-sm gap-2 p-4 text-center">
                    <Upload className="w-6 h-6" />
                    Click or drop an image
                    <span className="text-xs text-[#bbb]">JPEG, PNG, WebP or GIF, max 5 MB</span>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#c9a96e]" />
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(file)
                  e.target.value = ""
                }}
              />
              {image && <p className="text-xs text-[#999] mt-2 truncate">{image}</p>}
            </section>

            <section className="bg-white rounded-[18px] border border-[#eee] p-5 space-y-4">
              <h2 className="font-semibold text-sm">Visibility</h2>
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <span className="text-sm text-[#555]">In stock</span>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#c9a96e]"
                />
              </label>
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <span className="text-sm text-[#555]">Featured on homepage</span>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#c9a96e]"
                />
              </label>
            </section>
          </div>

          {/* Right columns: details + translations */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[18px] border border-[#eee] p-5">
              <h2 className="font-semibold text-sm mb-4">Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product-id" className="block text-xs font-medium text-[#666] mb-1.5">
                    Product ID (URL slug)
                  </label>
                  <input
                    id="product-id"
                    type="text"
                    value={id}
                    disabled={isEdit}
                    onChange={(e) => {
                      setIdTouched(true)
                      setId(slugify(e.target.value))
                    }}
                    className={`${inputClass} disabled:bg-[#f5f5f5] disabled:text-[#999]`}
                    placeholder="my-product-name"
                  />
                </div>
                <div>
                  <label htmlFor="product-price" className="block text-xs font-medium text-[#666] mb-1.5">
                    Price (EUR)
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={priceOnRequest}
                    className={`${inputClass} ${priceOnRequest ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="49.00"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={priceOnRequest}
                      onChange={(e) => setPriceOnRequest(e.target.checked)}
                      className="w-4 h-4 accent-[#c9a96e]"
                    />
                    <span className="text-xs text-[#666]">
                      Price on request &mdash; hides the price and shows a quote link instead
                    </span>
                  </label>
                </div>
                <div>
                  <label htmlFor="product-category" className="block text-xs font-medium text-[#666] mb-1.5">
                    Category
                  </label>
                  <select
                    id="product-category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.translations.en.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="product-badge" className="block text-xs font-medium text-[#666] mb-1.5">
                    Badge
                  </label>
                  <select
                    id="product-badge"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">None</option>
                    <option value="bestseller">Best Seller</option>
                    <option value="limited">Limited</option>
                    <option value="new">New</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="product-keywords" className="block text-xs font-medium text-[#666] mb-1.5">
                    Search keywords (comma-separated)
                  </label>
                  <input
                    id="product-keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className={inputClass}
                    placeholder="pigment, lips, pmu"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[18px] border border-[#eee] p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-semibold text-sm">Translations</h2>
                <div className="flex gap-1.5">
                  {LOCALES.map((locale) => (
                    <button
                      key={locale}
                      type="button"
                      onClick={() => setActiveTab(locale)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                        activeTab === locale
                          ? "bg-[#111] text-white"
                          : "bg-[#f5f5f5] text-[#666] hover:bg-[#eee]"
                      }`}
                    >
                      {LOCALE_LABELS[locale]}
                      {translationComplete(locale) && <Check className="w-3 h-3 text-[#10b981]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor={`name-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                    Name {activeTab === "en" && <span className="text-[#c9a96e]">*</span>}
                  </label>
                  <input
                    id={`name-${activeTab}`}
                    type="text"
                    value={translations[activeTab].name}
                    onChange={(e) =>
                      activeTab === "en"
                        ? handleEnglishName(e.target.value)
                        : setTranslationField(activeTab, "name", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor={`subtitle-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                    Subtitle
                  </label>
                  <input
                    id={`subtitle-${activeTab}`}
                    type="text"
                    value={translations[activeTab].subtitle}
                    onChange={(e) => setTranslationField(activeTab, "subtitle", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor={`description-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                    Description
                  </label>
                  <textarea
                    id={`description-${activeTab}`}
                    rows={4}
                    value={translations[activeTab].description}
                    onChange={(e) => setTranslationField(activeTab, "description", e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div>
                  <label htmlFor={`features-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                    Features (one per line)
                  </label>
                  <textarea
                    id={`features-${activeTab}`}
                    rows={4}
                    value={translations[activeTab].features}
                    onChange={(e) => setTranslationField(activeTab, "features", e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                {activeTab !== "en" && (
                  <p className="text-xs text-[#999]">
                    Leave empty to fall back to the English content on the storefront.
                  </p>
                )}
              </div>
            </section>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving || uploading}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-60 ${
                  saved ? "bg-[#10b981] text-white" : "bg-[#111] text-white hover:bg-[#222]"
                }`}
              >
                {saving && !saved && <Loader2 className="w-4 h-4 animate-spin" />}
                {saved && <Check className="w-4 h-4" />}
                {saved ? "Saved" : saving ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
              </button>
              <Link href="/admin" className="text-sm font-medium text-[#888] hover:text-black transition-colors">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
