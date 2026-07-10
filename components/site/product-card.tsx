"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Check } from "lucide-react"
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

export function ProductCard({ product, showAddToCart = false }: { product: Product; showAddToCart?: boolean }) {
  const { addItem } = useCart()
  const { locale, t } = useLanguage()
  const [added, setAdded] = useState(false)
  const info = localizeProduct(product, locale)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-[18px] p-4 transition-all duration-300 border border-transparent hover:translate-y-[-6px] hover:border-[#eee] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full h-44 md:h-48 rounded-xl overflow-hidden mb-4 bg-[#f5f5f5] relative">
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <span className="font-semibold text-sm block mb-0.5 truncate">{info.name}</span>
            <span className="text-xs text-[#888] block truncate">{info.subtitle}</span>
          </div>
          <span className="font-display font-bold text-sm whitespace-nowrap">
            {formatPrice(product.price, locale)}
          </span>
        </div>
      </Link>

      {showAddToCart && (
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`w-full mt-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            !product.inStock
              ? "bg-[#f5f5f5] text-[#aaa] cursor-not-allowed"
              : added
                ? "bg-[#10b981] text-white"
                : "bg-[#111] text-white hover:bg-[#222] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
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
