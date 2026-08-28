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
  /**
   * Quote-only product: the storefront hides `price` and asks the visitor to
   * get in touch instead. `price` is still stored so a figure can be restored
   * by unticking the flag rather than re-entering it.
   */
  priceOnRequest?: boolean
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

export interface FormationTranslation {
  name: string
  description: string
  details: string
}

export interface Formation {
  id: string
  image: string
  category: string
  duration: string
  price?: number
  published: boolean
  createdAt: string
  updatedAt: string
  translations: Record<Locale, FormationTranslation>
}

export type EnrollmentStatus = "new" | "contacted"

export interface Enrollment {
  id: string
  formationId: string
  formationName: string
  name: string
  email: string
  phone: string
  country: string
  message: string
  locale: Locale
  status: EnrollmentStatus
  createdAt: string
}

export function localizeFormation(formation: Formation, locale: Locale): FormationTranslation {
  const t = formation.translations[locale]
  if (t && t.name.trim()) return t
  return formation.translations[DEFAULT_LOCALE]
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
