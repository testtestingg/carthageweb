import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-golden-bridge" })

export const metadata: Metadata = {
  title: {
    default: "Carthage Stone Paper, Stone Paper & Industrial Packaging",
    template: "%s | Carthage Stone Paper",
  },
  description:
    "Stone paper, notebooks and industrial packaging by Carthage Stone Paper, a Carthage Group company in Germany.",
  alternates: { canonical: "/stone-paper" },
  openGraph: {
    title: "Carthage Stone Paper, Stone Paper & Industrial Packaging",
    description: "Mineral-based paper and packaging for demanding commercial and industrial applications.",
    url: "/stone-paper",
    images: [{ url: "/golden-bridge/image1.png", alt: "Carthage stone paper products" }],
  },
}

export default function StonePaperLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} gb-site`}>{children}</div>
}
