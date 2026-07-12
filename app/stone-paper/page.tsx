import type { Metadata } from "next"
import { StonePaperClient } from "@/components/stone-paper/stone-paper-client"

export const metadata: Metadata = {
  title: "Stone Paper — Golden Bridge",
  description:
    "Golden Bridge, the stone paper division of Carthage GmbH. High-performance stone paper bags, PP woven bags and tree-free notebooks, engineered in Germany. Waterproof, tear-resistant, sustainable.",
}

export default function StonePaperPage() {
  return <StonePaperClient />
}
