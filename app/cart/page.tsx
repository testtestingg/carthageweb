"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { localizeProduct } from "@/lib/types"

const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 5.99

export default function CartPage() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const { locale, t } = useLanguage()

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = totalPrice + shipping

  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1240px] mx-auto min-h-[70vh]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888] mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            {t.product.home}
          </Link>
          <span>/</span>
          <span className="text-black">{t.cart.title}</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-10">{t.cart.title}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-[#ddd] mx-auto mb-6" />
            <h2 className="font-display text-2xl font-semibold mb-3">{t.cart.empty}</h2>
            <p className="text-[#888] mb-8">{t.cart.emptySubtitle}</p>
            <Link
              href="/shop"
              className="bg-[#111] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2.5"
            >
              {t.cart.continueShopping}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const info = localizeProduct(item.product, locale)
                return (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-[18px] p-4 md:p-5 border border-[#eee] flex gap-4 items-center"
                  >
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0 relative"
                    >
                      <Image src={item.product.image} alt={info.name} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`} className="hover:underline">
                        <h3 className="font-semibold text-sm md:text-base truncate">{info.name}</h3>
                      </Link>
                      <p className="text-xs md:text-sm text-[#888] mb-3">{info.subtitle}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 bg-[#f5f5f5] rounded-full px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            aria-label={t.product.decreaseQty}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            aria-label={t.product.increaseQty}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-sm md:text-base">
                            {formatPrice(item.product.price * item.quantity, locale)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#ccc] hover:text-red-500 transition-colors"
                            aria-label={t.cart.removeItem}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <button
                onClick={clearCart}
                className="text-sm text-[#888] hover:text-red-500 transition-colors font-medium"
              >
                {t.cart.clearCart}
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[18px] p-6 border border-[#eee] sticky top-24">
                <h2 className="font-display text-lg font-semibold mb-5">{t.cart.orderSummary}</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666]">{t.cart.subtotal}</span>
                    <span className="font-medium">{formatPrice(totalPrice, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666]">{t.cart.shipping}</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-[#10b981]">{t.cart.shippingFree}</span>
                      ) : (
                        formatPrice(shipping, locale)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && <p className="text-xs text-[#999]">{t.cart.freeShippingNote}</p>}
                  <div className="border-t border-[#eee] pt-3 flex justify-between">
                    <span className="font-semibold">{t.cart.total}</span>
                    <span className="font-display font-bold text-lg">{formatPrice(total, locale)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-[#111] text-white py-3.5 rounded-full font-semibold text-sm text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]"
                >
                  {t.cart.checkout}
                </Link>
                <Link
                  href="/shop"
                  className="block w-full text-center text-sm font-medium text-[#666] hover:text-black transition-colors py-3"
                >
                  {t.cart.continueShopping}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  )
}
