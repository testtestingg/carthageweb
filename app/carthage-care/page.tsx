import type { Metadata } from "next"
import { CarthageCareClient } from "@/components/home/carthage-care-client"

export const metadata: Metadata = {
  title: "Cosmetics & PMU",
  description: "Professional PMU pigments, precision cartridge needles, cosmetic care and education by Carthage in Germany.",
  alternates: { canonical: "/carthage-care" },
}

export default function CarthageCarePage() {
  return <CarthageCareClient />
}
