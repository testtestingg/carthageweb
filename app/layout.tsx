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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carthage.de"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Carthage GmbH - Cosmetics, PMU & Stone Paper | Made in Germany",
    template: "%s | Carthage",
  },
  description:
    "German industry & production group: professional cosmetics & PMU products, sustainable stone paper by Carthage, and a certified PMU academy in Berlin.",
  keywords:
    "PMU, permanent makeup, cosmetic, pigmentation, needles, stone paper, Carthage, made in Germany",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Carthage GmbH",
    url: SITE_URL,
    title: "Carthage GmbH - Cosmetics, PMU & Stone Paper | Made in Germany",
    description:
      "German industry & production group: cosmetics & PMU, stone paper by Carthage, and a certified academy in Berlin.",
    images: [{ url: "/logo-carthage.png", width: 512, height: 512, alt: "Carthage GmbH logo" }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Organization + WebSite structured data for search engines
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Carthage GmbH Cosmetic & Pigmentation",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-carthage.png`,
      email: "info@carthage.de",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lietzenburger Str. 9a",
        postalCode: "10789",
        addressLocality: "Berlin",
        addressCountry: "DE",
      },
      sameAs: [
        "https://www.instagram.com/carthage.tattoo",
        "https://www.facebook.com/carthage.tattoo",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Carthage GmbH",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "fr", "de"],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider initialLocale={initialLocale}>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
