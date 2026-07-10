import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { LanguageProvider } from "@/context/language-context"
import { LOCALE_COOKIE } from "@/lib/i18n"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

export const metadata: Metadata = {
  title: {
    default: "Carthage - Premium Cosmetic & Pigmentation | Made in Germany",
    template: "%s | Carthage",
  },
  description:
    "Professional-grade PMU products, custom formulations, and certified education. ISO & GMP certified quality from Germany for permanent makeup artists worldwide.",
  keywords: "PMU, permanent makeup, cosmetic, pigmentation, needles, Carthage, made in Germany",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const initialLocale = cookieStore.get(LOCALE_COOKIE)?.value

  return (
    <html lang={initialLocale === "fr" || initialLocale === "de" ? initialLocale : "en"}>
      <body className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <LanguageProvider initialLocale={initialLocale}>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
