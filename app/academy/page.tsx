import type { Metadata } from "next"
import { getFormations } from "@/lib/server/store"
import { AcademyClient } from "@/components/academy/academy-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "PMU Academy - Certified Permanent Makeup Training in Berlin",
  description:
    "Train in permanent makeup at the Carthage GmbH Academy in Berlin: small cohorts of six, live models, certification and six months of mentoring. Brows, lips, microblading - taught where the pigments are made.",
  alternates: { canonical: "/academy" },
}

export default async function AcademyPage() {
  const allFormations = await getFormations()
  const formations = allFormations.filter((f) => f.published)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carthage.de"
  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: formations.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: f.translations.en?.name,
        description: f.translations.en?.description,
        url: `${siteUrl}/academy`,
        provider: {
          "@type": "Organization",
          name: "Carthage GmbH Academy",
          sameAs: siteUrl,
        },
        ...(f.price
          ? {
              offers: {
                "@type": "Offer",
                price: f.price,
                priceCurrency: "EUR",
                category: "Paid",
              },
            }
          : {}),
      },
    })),
  }

  return (
    <>
      {formations.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
        />
      )}
      <AcademyClient formations={formations} />
    </>
  )
}
