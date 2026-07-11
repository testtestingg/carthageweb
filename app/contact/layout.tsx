import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Wholesale, Manufacturing & Academy Inquiries",
  description:
    "Get in touch with Carthage in Berlin for product inquiries, wholesale and B2B partnerships, contract manufacturing or academy enrollment. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
