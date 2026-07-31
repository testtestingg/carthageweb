import Link from "next/link"
import Image from "next/image"
import { navLinks, productLinks, siteConfig } from "@/components/golden-bridge/site-config"

export function Footer() {
  return (
    <footer className="px-6 py-16 md:px-12 lg:px-20 border-t border-border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
        <div className="md:col-span-4">
          <Link
            href="/"
            aria-label="Carthage, group homepage"
            className="flex items-center"
          >
            <Image
              src={siteConfig.logo}
              alt="Carthage"
              width={260}
              height={260}
              className="h-52 md:h-60 w-auto"
            />
          </Link>
          <p className="text-sm leading-[1.75] text-muted-foreground mt-5 max-w-sm">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-1.5 text-[11px] tracking-[0.1em] text-muted-foreground/70">
            <span>{siteConfig.headquarters.street}</span>
            <span>
              {siteConfig.headquarters.city} &middot; {siteConfig.headquarters.country}
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-5">
            Navigation
          </p>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-5">
            Products
          </p>
          <div className="flex flex-col gap-3">
            {productLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-11">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-5">
            Connect
          </p>
          <div className="flex flex-col gap-3">
            {siteConfig.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-border gap-4">
        <p className="text-[11px] tracking-[0.1em] text-muted-foreground/50">
          &copy; {new Date().getFullYear()} Carthage GmbH
        </p>
        <div className="flex gap-6 text-[11px] tracking-[0.1em] text-muted-foreground/50">
          <Link href="/stone-paper/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/stone-paper/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/stone-paper/impressum" className="hover:text-foreground transition-colors">
            Impressum
          </Link>
        </div>
        <p className="text-[11px] tracking-[0.1em] text-muted-foreground/50">
          Berlin &amp; Luckau, Germany
        </p>
      </div>
    </footer>
  )
}
