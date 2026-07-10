"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Search, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/format"
import type { Category, Product } from "@/lib/types"

export function ProductsTable({ products, categories }: { products: Product[]; categories: Category[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState("")
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const categoryName = (id: string) =>
    categories.find((c) => c.id === id)?.translations.en.name ?? id

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.translations.en.name.toLowerCase().includes(q) ||
        p.id.includes(q) ||
        categoryName(p.categoryId).toLowerCase().includes(q),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filter, categories])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setError(null)
    try {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? "Delete failed")
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Products</h1>
          <p className="text-sm text-[#888]">
            {products.length} product{products.length === 1 ? "" : "s"} in the catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222] w-fit"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-4 text-sm text-[#991b1b]" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter products..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#ff4d8c] transition-all"
        />
      </div>

      <div className="bg-white rounded-[18px] border border-[#eee] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0f0f0] text-left text-xs uppercase tracking-wider text-[#999]">
                <th className="px-5 py-3.5 font-medium">Product</th>
                <th className="px-5 py-3.5 font-medium">Category</th>
                <th className="px-5 py-3.5 font-medium">Price</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-[#999]">
                    No products match your filter.
                  </td>
                </tr>
              )}
              {visible.map((product) => (
                <tr key={product.id} className="border-b border-[#f7f7f7] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#f5f5f5] relative flex-shrink-0">
                        <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{product.translations.en.name}</p>
                        <p className="text-xs text-[#999] truncate">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#666] whitespace-nowrap">{categoryName(product.categoryId)}</td>
                  <td className="px-5 py-3 font-display font-semibold whitespace-nowrap">
                    {formatPrice(product.price, "en")}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.inStock ? "bg-[#f0fdf4] text-[#166534]" : "bg-[#fef2f2] text-[#991b1b]"
                        }`}
                      >
                        {product.inStock ? "In stock" : "Out of stock"}
                      </span>
                      {product.featured && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fff5f9] text-[#ff4d8c]">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {confirmingId === product.id ? (
                        <>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
                          >
                            {deletingId === product.id ? (
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
                          <Link
                            href={`/admin/products/${encodeURIComponent(product.id)}/edit`}
                            className="p-2 rounded-full text-[#666] hover:bg-[#f5f5f5] hover:text-black transition-colors"
                            aria-label={`Edit ${product.translations.en.name}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setConfirmingId(product.id)}
                            className="p-2 rounded-full text-[#666] hover:bg-[#fef2f2] hover:text-red-600 transition-colors"
                            aria-label={`Delete ${product.translations.en.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
