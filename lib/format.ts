import type { Locale } from "./types"

const INTL_LOCALES: Record<Locale, string> = {
  en: "en-IE",
  fr: "fr-FR",
  de: "de-DE",
}

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale], {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
