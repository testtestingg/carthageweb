"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { localizeProduct } from "@/lib/types"

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, setCartOpen, removeItem, updateQuantity } = useCart()
  const { locale, t } = useLanguage()

  // Lock body scroll while open, close on Escape
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [isOpen, setCartOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1100]" role="dialog" aria-modal="true" aria-label={t.cart.yourCart}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out]">
        <div className="flex items-center justify-between p-5 border-b border-[#eee]">
          <h2 className="font-display text-lg font-semibold">
            {t.cart.yourCart} ({totalItems})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-14 h-14 text-[#ddd] mb-4" />
              <p className="text-[#888] text-base mb-2">{t.cart.empty}</p>
              <p className="text-[#aaa] text-sm mb-6">{t.cart.emptyDrawerSubtitle}</p>
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="bg-[#111] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#222] transition-colors"
              >
                {t.cart.browseProducts}
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => {
                const info = localizeProduct(item.product, locale)
                return (
                  <div key={item.product.id} className="flex gap-3 pb-5 border-b border-[#f0f0f0]">
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={() => setCartOpen(false)}
                      className="w-16 h-16 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0 relative"
                    >
                      <Image src={item.product.image} alt={info.name} fill sizes="64px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{info.name}</h4>
                      <p className="text-xs text-[#888] mb-2">{info.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-[#f5f5f5] rounded-full px-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            aria-label={t.product.decreaseQty}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            aria-label={t.product.increaseQty}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-display font-bold text-sm">
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
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-[#eee] space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{t.cart.subtotal}</span>
              <span className="font-display font-bold text-lg">{formatPrice(totalPrice, locale)}</span>
            </div>
            <p className="text-xs text-[#888]">{t.cart.shippingNote}</p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-[#111] text-white py-3 rounded-full font-semibold text-sm text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]"
            >
              {t.cart.checkout}
            </Link>
            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="block w-full text-center text-sm font-medium text-[#666] hover:text-black transition-colors py-1.5"
            >
              {t.cart.viewFullCart}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
