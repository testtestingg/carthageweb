"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Check, ArrowLeft } from "lucide-react"
import { SiteShell } from "@/components/site/site-shell"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { localizeProduct } from "@/lib/types"
import { countryOptions } from "@/lib/countries"

const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 5.99
const VAT_RATE = 0.19

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "DE",
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { locale, t } = useLanguage()
  const [orderTotal, setOrderTotal] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  // Prices are displayed VAT-inclusive; show the contained VAT portion
  const tax = (totalPrice * VAT_RATE) / (1 + VAT_RATE)
  const total = totalPrice + shipping

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!formData.firstName.trim()) next.firstName = t.checkout.requiredField
    if (!formData.lastName.trim()) next.lastName = t.checkout.requiredField
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) next.email = t.checkout.invalidEmail
    if (!formData.address.trim()) next.address = t.checkout.requiredField
    if (!formData.city.trim()) next.city = t.checkout.requiredField
    if (!/^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/.test(formData.postalCode.trim()))
      next.postalCode = t.checkout.invalidPostalCode
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    // Snapshot the total before clearing the cart so the confirmation shows the real amount
    setOrderTotal(total)
    clearCart()
    window.scrollTo({ top: 0 })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-2xl border bg-white text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-[#e5e5e5] focus:border-[#c9a96e] focus:ring-[rgba(201,169,110,0.12)]"
    }`

  if (orderTotal !== null) {
    return (
      <SiteShell>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-lg py-24">
            <div className="w-20 h-20 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-3">
              {t.checkout.orderConfirmed}
            </h1>
            <p className="text-lg text-[#666] mb-3">{t.checkout.orderThanks}</p>
            <p className="text-sm text-[#888] mb-10">
              {t.checkout.orderTotalWas} <span className="font-semibold">{formatPrice(orderTotal, locale)}</span>
            </p>
            <Link
              href="/shop"
              className="bg-[#111] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2.5"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        </div>
      </SiteShell>
    )
  }

  if (items.length === 0) {
    return (
      <SiteShell>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-[#ddd] mx-auto mb-6" />
            <h1 className="font-display text-3xl font-semibold mb-4">{t.checkout.emptyTitle}</h1>
            <p className="text-[#888] mb-8">{t.checkout.emptySubtitle}</p>
            <Link
              href="/shop"
              className="bg-[#111] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222]"
            >
              {t.cart.browseProducts}
            </Link>
          </div>
        </div>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1200px] mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.checkout.backToCart}
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-10">
          {t.checkout.title}
        </h1>

        <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white rounded-[18px] p-6 border border-[#eee]">
              <h2 className="font-display text-lg font-semibold mb-5">{t.checkout.contactInfo}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.firstName}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass("firstName")}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.lastName}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass("lastName")}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass("phone")}
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[18px] p-6 border border-[#eee]">
              <h2 className="font-display text-lg font-semibold mb-5">{t.checkout.shippingAddress}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.address}
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass("address")}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.postalCode}
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={inputClass("postalCode")}
                  />
                  {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.city}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClass("city")}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-[#444] mb-1.5">
                    {t.checkout.country}
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass("country")}
                  >
                    {countryOptions(locale).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[18px] p-6 border border-[#eee] sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-5">{t.cart.orderSummary}</h2>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => {
                  const info = localizeProduct(item.product, locale)
                  return (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0 relative">
                        <Image src={item.product.image} alt={info.name} fill sizes="56px" className="object-cover" />
                        <span className="absolute top-0 right-0 bg-[#111] text-white text-[10px] w-5 h-5 rounded-bl-lg flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{info.name}</p>
                        <p className="text-xs text-[#888]">{info.subtitle}</p>
                      </div>
                      <span className="font-display font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity, locale)}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-2.5 border-t border-[#eee] pt-4 mb-6">
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
                <div className="flex justify-between text-xs text-[#999]">
                  <span>{t.cart.tax}</span>
                  <span>{formatPrice(tax, locale)}</span>
                </div>
                <div className="flex justify-between border-t border-[#eee] pt-3">
                  <span className="font-semibold">{t.cart.total}</span>
                  <span className="font-display font-bold text-xl">{formatPrice(total, locale)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111] text-white py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]"
              >
                {t.checkout.placeOrder}
              </button>
            </div>
          </div>
        </form>
      </div>
    </SiteShell>
  )
}
