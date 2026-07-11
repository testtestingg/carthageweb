import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - German PMU Manufacturing & Education",
  description:
    "Carthage produces professional PMU products, cosmetic formulations and stone paper in Germany. ISO & GMP certified manufacturing, custom formulations and a certified academy.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
