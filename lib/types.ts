export const LOCALES = ["en", "fr", "de"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "en"

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
}

export type ProductBadge = "bestseller" | "limited" | "new"

export interface ProductTranslation {
  name: string
  subtitle: string
  description: string
  features: string[]
}

export interface Product {
  id: string
  price: number
  currency: "EUR"
  image: string
  categoryId: string
  badge?: ProductBadge
  keywords: string[]
  inStock: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  translations: Record<Locale, ProductTranslation>
}

export interface CategoryTranslation {
  name: string
  description: string
}

export interface Category {
  id: string
  icon: string
  translations: Record<Locale, CategoryTranslation>
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export function localizeProduct(product: Product, locale: Locale): ProductTranslation {
  const t = product.translations[locale]
  if (t && t.name.trim()) return t
  return product.translations[DEFAULT_LOCALE]
}

export function localizeCategory(category: Category, locale: Locale): CategoryTranslation {
  const t = category.translations[locale]
  if (t && t.name.trim()) return t
  return category.translations[DEFAULT_LOCALE]
}
