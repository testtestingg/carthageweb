"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Check, Mail } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { localizeProduct, type Product } from "@/lib/types"

export function ProductBadge({ badge }: { badge: NonNullable<Product["badge"]> }) {
  const { t } = useLanguage()
  return (
    <span className="absolute top-3 left-3 z-10 bg-[#111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
      {t.badge[badge]}
    </span>
  )
}

export function ProductCard({ product, showAddToCart = false, priority = false }: { product: Product; showAddToCart?: boolean; priority?: boolean }) {
  const { addItem } = useCart()
  const { locale, t } = useLanguage()
  const [added, setAdded] = useState(false)
  const info = localizeProduct(product, locale)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // h-full + flex-col + mt-auto keep every card in a grid row the same
  // height, with the price row and add-to-cart button always aligned at
  // the bottom regardless of how long the product name or subtitle is.
  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl p-3.5 border border-[#ececec] transition-all duration-300 hover:-translate-y-1 hover:border-[#e2e2e2] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1 min-h-0">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f5f5]">
          {product.badge && <ProductBadge badge={product.badge} />}
          {!product.inStock && (
            <span className="absolute top-3 right-3 z-10 bg-white/90 text-[#666] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t.shop.outOfStock}
            </span>
          )}
          <Image
            src={product.image}
            alt={info.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-baseline gap-3 pt-3.5 mt-auto">
          <div className="min-w-0">
            <span className="font-semibold text-sm block truncate leading-snug" title={info.name}>
              {info.name}
            </span>
            <span className="text-xs text-[#888] block truncate leading-snug min-h-4">
              {info.subtitle || " "}
            </span>
          </div>
          <span
            className={`font-display whitespace-nowrap ${
              product.priceOnRequest
                ? "text-[11px] font-semibold uppercase tracking-wider text-[#888]"
                : "font-bold text-sm"
            }`}
          >
            {product.priceOnRequest ? t.shop.priceOnRequest : formatPrice(product.price, locale)}
          </span>
        </div>
      </Link>

      {showAddToCart && product.priceOnRequest && (
        <Link
          href={`/contact?subject=quote&product=${encodeURIComponent(product.id)}`}
          className="w-full mt-3.5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#111] text-white hover:bg-[#2a2a2a]"
        >
          <Mail className="w-4 h-4" />
          {t.shop.requestQuote}
        </Link>
      )}

      {showAddToCart && !product.priceOnRequest && (
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`w-full mt-3.5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            !product.inStock
              ? "bg-[#f5f5f5] text-[#aaa] cursor-not-allowed"
              : added
                ? "bg-[#10b981] text-white"
                : "bg-[#111] text-white hover:bg-[#2a2a2a]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              {t.product.addedToCart}
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              {product.inStock ? t.shop.addToCart : t.shop.outOfStock}
            </>
          )}
        </button>
      )}
    </div>
  )
}
