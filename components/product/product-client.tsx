"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Plus, Minus, Check } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { ProductCard, ProductBadge } from "@/components/site/product-card"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { localizeCategory, localizeProduct, type Category, type Product } from "@/lib/types"

export function ProductClient({
  product,
  category,
  relatedProducts,
}: {
  product: Product
  category: Category | null
  relatedProducts: Product[]
}) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { locale, t } = useLanguage()

  const info = localizeProduct(product, locale)
  const categoryName = category ? localizeCategory(category, locale).name : null

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888] mb-8 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            {t.shop.breadcrumb}
          </Link>
          {categoryName && (
            <>
              <span>/</span>
              <Link href={`/shop?category=${product.categoryId}`} className="hover:text-black transition-colors">
                {categoryName}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-black">{info.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="w-full aspect-[3/4] max-h-[560px] rounded-[28px] overflow-hidden bg-[#f5f5f5] relative shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
              {product.badge && <ProductBadge badge={product.badge} />}
              <Image
                src={product.image}
                alt={info.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {categoryName && (
              <Link
                href={`/shop?category=${product.categoryId}`}
                className="inline-flex items-center px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] w-fit hover:border-black transition-colors"
              >
                {categoryName}
              </Link>
            )}

            <h1 className="font-display text-3xl md:text-[42px] leading-tight font-semibold tracking-[-0.03em] mb-2">
              {info.name}
            </h1>
            <p className="text-base text-[#888] mb-5">{info.subtitle}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold">{formatPrice(product.price, locale)}</span>
              <span className="text-sm text-[#888]">{t.product.inclTax}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-[#555] mb-6 max-w-[500px]">{info.description}</p>

            {info.features.length > 0 && (
              <div className="mb-8 space-y-2.5">
                {info.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#10b981]" />
                    </div>
                    <span className="text-sm text-[#555]">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-full px-3 py-1.5 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
                  aria-label={t.product.decreaseQty}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display font-semibold text-base w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
                  aria-label={t.product.increaseQty}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 sm:flex-initial px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all duration-300 inline-flex items-center justify-center gap-2.5 ${
                  !product.inStock
                    ? "bg-[#f5f5f5] text-[#aaa] cursor-not-allowed"
                    : added
                      ? "bg-[#10b981] text-white"
                      : "bg-[#111] text-white hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> {t.product.addedToCart}
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />{" "}
                    {product.inStock ? t.product.addToCart : t.product.outOfStock}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h3 className="font-display text-[28px] font-semibold mb-8">{t.product.youMayAlsoLike}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  )
}
