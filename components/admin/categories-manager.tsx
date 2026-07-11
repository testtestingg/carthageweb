"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Loader2, AlertCircle, Check, X } from "lucide-react"
import { CategoryIcon, CATEGORY_ICON_KEYS } from "@/components/site/category-icon"
import { LOCALES, LOCALE_LABELS, type Category, type Locale } from "@/lib/types"

interface CategoryDraft {
  id: string
  icon: string
  translations: Record<Locale, { name: string; description: string }>
}

const emptyDraft = (): CategoryDraft => ({
  id: "",
  icon: "package",
  translations: {
    en: { name: "", description: "" },
    fr: { name: "", description: "" },
    de: { name: "", description: "" },
  },
})

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export function CategoriesManager({
  categories,
  productCounts,
}: {
  categories: Category[]
  productCounts: Record<string, number>
}) {
  const router = useRouter()
  const [editing, setEditing] = useState<CategoryDraft | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [activeTab, setActiveTab] = useState<Locale>("en")
  const [saving, setSaving] = useState(false)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startNew = () => {
    setEditing(emptyDraft())
    setIsNew(true)
    setActiveTab("en")
    setError(null)
  }

  const startEdit = (category: Category) => {
    setEditing({
      id: category.id,
      icon: category.icon,
      translations: {
        en: { ...category.translations.en },
        fr: { ...category.translations.fr },
        de: { ...category.translations.de },
      },
    })
    setIsNew(false)
    setActiveTab("en")
    setError(null)
  }

  const setField = (locale: Locale, field: "name" | "description", value: string) => {
    if (!editing) return
    setEditing({
      ...editing,
      id: isNew && locale === "en" && field === "name" && !editing.id ? editing.id : editing.id,
      translations: {
        ...editing.translations,
        [locale]: { ...editing.translations[locale], [field]: value },
      },
    })
  }

  const handleEnglishName = (value: string) => {
    if (!editing) return
    setEditing({
      ...editing,
      id: isNew ? slugify(value) : editing.id,
      translations: {
        ...editing.translations,
        en: { ...editing.translations.en, name: value },
      },
    })
  }

  const handleSave = async () => {
    if (!editing) return
    setError(null)
    if (!editing.translations.en.name.trim()) return setError("English name is required")
    if (!editing.id.trim()) return setError("Category ID is required")

    setSaving(true)
    try {
      const res = await fetch(
        isNew ? "/api/admin/categories" : `/api/admin/categories/${encodeURIComponent(editing.id)}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        },
      )
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error ?? "Save failed")
      setEditing(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setError(null)
    try {
      const res = await fetch(`/api/admin/categories/${encodeURIComponent(id)}`, { method: "DELETE" })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error ?? "Delete failed")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.12)] transition-all"

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-[#888]">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"}
          </p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222] w-fit"
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {error && !editing && (
        <div className="flex items-center gap-2 bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-4 text-sm text-[#991b1b]" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Editor */}
      {editing && (
        <div className="bg-white rounded-[18px] border border-[#eee] p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">{isNew ? "New Category" : `Edit: ${editing.id}`}</h2>
            <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-[#f5f5f5]" aria-label="Close editor">
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-4 text-sm text-[#991b1b]" role="alert">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="category-id" className="block text-xs font-medium text-[#666] mb-1.5">
                Category ID (slug)
              </label>
              <input
                id="category-id"
                type="text"
                value={editing.id}
                disabled={!isNew}
                onChange={(e) => setEditing({ ...editing, id: slugify(e.target.value) })}
                className={`${inputClass} disabled:bg-[#f5f5f5] disabled:text-[#999]`}
              />
            </div>
            <div>
              <span className="block text-xs font-medium text-[#666] mb-1.5">Icon</span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_ICON_KEYS.map((iconKey) => (
                  <button
                    key={iconKey}
                    type="button"
                    onClick={() => setEditing({ ...editing, icon: iconKey })}
                    title={iconKey}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      editing.icon === iconKey
                        ? "bg-[#111] text-white"
                        : "bg-[#f5f5f5] text-[#666] hover:bg-[#eee]"
                    }`}
                  >
                    <CategoryIcon icon={iconKey} className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-1.5 mb-4">
            {LOCALES.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => setActiveTab(locale)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === locale ? "bg-[#111] text-white" : "bg-[#f5f5f5] text-[#666] hover:bg-[#eee]"
                }`}
              >
                {LOCALE_LABELS[locale]}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor={`cat-name-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                Name {activeTab === "en" && <span className="text-[#c9a96e]">*</span>}
              </label>
              <input
                id={`cat-name-${activeTab}`}
                type="text"
                value={editing.translations[activeTab].name}
                onChange={(e) =>
                  activeTab === "en" ? handleEnglishName(e.target.value) : setField(activeTab, "name", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`cat-desc-${activeTab}`} className="block text-xs font-medium text-[#666] mb-1.5">
                Description
              </label>
              <input
                id={`cat-desc-${activeTab}`}
                type="text"
                value={editing.translations[activeTab].description}
                onChange={(e) => setField(activeTab, "description", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#111] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222] disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Category"}
          </button>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-[18px] border border-[#eee] divide-y divide-[#f7f7f7]">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff0f5] to-[#ffe4ec] flex items-center justify-center flex-shrink-0">
              <CategoryIcon icon={category.icon} className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{category.translations.en.name}</p>
              <p className="text-xs text-[#999] truncate">
                {category.id} &middot; {productCounts[category.id] ?? 0} product
                {(productCounts[category.id] ?? 0) === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {confirmingId === category.id ? (
                <>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
                  >
                    {deletingId === category.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmingId(null)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-[#666] hover:bg-[#f5f5f5] transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(category)}
                    className="p-2 rounded-full text-[#666] hover:bg-[#f5f5f5] hover:text-black transition-colors"
                    aria-label={`Edit ${category.translations.en.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmingId(category.id)}
                    className="p-2 rounded-full text-[#666] hover:bg-[#fef2f2] hover:text-red-600 transition-colors"
                    aria-label={`Delete ${category.translations.en.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#999] mt-3">
        Categories that still contain products cannot be deleted - reassign their products first.
      </p>
    </div>
  )
}
