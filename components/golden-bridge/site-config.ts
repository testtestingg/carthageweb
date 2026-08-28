/**
 * Centralized site configuration.
 * All shared content, images, and navigation links live here so we reuse
 * the same high-quality images across every page.
 */

export const siteConfig = {
  name: "Carthage",
  shortName: "Carthage",
  tagline: "Reliable Industrial Packaging Solutions",
  description:
    "German manufacturer of high-performance stone paper bags and PP woven bags. Durable, moisture-resistant packaging solutions engineered for agriculture, construction, chemicals, and food industries.",
  url: "https://carthage.de",
  email: "info@carthage.de",
  phone: "+49 30 34781221",
  fax: "+49 30 34781222",
  logo: "/logo-carthage.png",
  managingDirector: "Farhang Yarbakht",
  managingDirectorEmail: "info@carthage.de",
  headquarters: {
    street: "Lietzenburger Stra\u00dfe 9a",
    city: "10789 Berlin",
    country: "Germany",
  },
  facility: {
    street: "Nissanstra\u00dfe 8 / Am Damm 3",
    city: "15926 Luckau",
    country: "Germany",
    note: "70 km from Berlin",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/carthage.tattoo" },
    { label: "Facebook", href: "https://www.facebook.com/carthage.tattoo" },
  ],
} as const

/**
 * Shared high-quality imagery.
 * Local images from the public folder for genspark project.
 */
export const images = {
  // Final product look: stone paper rolls, sheets, notebook
  product: "/golden-bridge/image1.png",
  // Manufacturing environment: German factory interior
  factory: "/golden-bridge/image8.png",
  // Sustainability: limestone and leaf
  sustainability: "/golden-bridge/image3.png",
  // Additional images for variety
  image2: "/golden-bridge/image2.png",
  image4: "/golden-bridge/image4.png",
  image5: "/golden-bridge/image5.png",
  image6: "/golden-bridge/image6.png",
  image7: "/golden-bridge/image7.png",
  image9: "/golden-bridge/image9.png",
  image10: "/golden-bridge/image10.png",
  image11: "/golden-bridge/image11.png",
} as const

/**
 * Page-specific images for consistent visual hierarchy
 */
export const pageImages = {
  process: {
    hero: "/golden-bridge/image10.png",
    step1: "/golden-bridge/image4.png",
    step2: "/golden-bridge/image5.png",
    step3: "/golden-bridge/image6.png",
  },
  about: {
    hero: "/golden-bridge/image4.png",
    section1: "/golden-bridge/image5.png",
    section2: "/golden-bridge/image6.png",
  },
  product: {
    hero: "/golden-bridge/image9.png",
    section1: "/golden-bridge/image5.png",
    section2: "/golden-bridge/image7.png",
  },
  sustainability: {
    hero: "/golden-bridge/image3.png",
    section1: "/golden-bridge/image6.png",
    section2: "/golden-bridge/image7.png",
  },
  contact: {
    hero: "/golden-bridge/image5.png",
  },
} as const

export const navLinks = [
  { label: "Home", href: "/stone-paper" },
  { label: "About", href: "/stone-paper/about" },
  { label: "Products", href: "/stone-paper/product" },
  { label: "Process", href: "/stone-paper/process" },
  { label: "Sustainability", href: "/stone-paper/sustainability" },
  { label: "Contact", href: "/stone-paper/contact" },
] as const

export const productLinks = [
  { label: "Stone Paper Bags", href: "/stone-paper/products/bags" },
  { label: "PP Woven Bags", href: "/stone-paper/products/pp-woven-bags" },
  { label: "Stone Paper Notebooks", href: "/stone-paper/products/notebooks" },
] as const
