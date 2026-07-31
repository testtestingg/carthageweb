"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { navLinks, productLinks, siteConfig } from "@/components/golden-bridge/site-config"

interface NavigationProps {
  transparentOverHero?: boolean
}

export function Navigation({ transparentOverHero = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      setHidden(currentY > lastScrollY && currentY > 400)
      setLastScrollY(currentY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsOpen(false)
    setProductsOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const useLightText = transparentOverHero && !scrolled
  const forceScrolledState = !transparentOverHero
  const effectiveScrolled = forceScrolledState ? true : scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        transparentOverHero
          ? scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-2">
        {/* The Carthage mark always returns to the group homepage; Stone
            Paper's own landing page stays reachable via the "Home" nav link. */}
        <Link
          href="/"
          aria-label="Carthage, group homepage"
          className={`flex items-center transition-all duration-500 ${
            useLightText ? "text-background" : "text-foreground"
          }`}
        >
          <Image
            src={siteConfig.logo}
            alt="Carthage"
            width={220}
            height={220}
            priority
            className={`w-auto transition-all duration-500 ${
              effectiveScrolled ? "h-16" : "h-32 md:h-40"
            }`}
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className={`text-[11px] tracking-[0.15em] uppercase transition-colors ${useLightText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
            Carthage Group
          </Link>
          {navLinks.map((link) => {
            const isActive =
              link.href === "/stone-paper"
                ? pathname === "/stone-paper"
                : pathname.startsWith(link.href)

            // Products link gets a dropdown
            if (link.label === "Products") {
              return (
                <div key={link.label} className="relative" ref={productsRef}>
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className={`relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-500 flex items-center gap-1 ${
                      useLightText
                        ? isActive
                          ? "text-background"
                          : "text-background/60 hover:text-background"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px transition-all duration-500 ${
                        isActive ? "w-full" : "w-0"
                      } ${useLightText ? "bg-background" : "bg-foreground"}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-3 w-56 bg-background border border-border shadow-lg transition-all duration-300 ${
                      productsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-2">
                      <Link
                        href="/stone-paper/product"
                        className="block px-5 py-3 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
                      >
                        All Products
                      </Link>
                      <div className="h-px bg-border mx-4" />
                      {productLinks.map((pLink) => (
                        <Link
                          key={pLink.label}
                          href={pLink.href}
                          className="block px-5 py-3 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
                        >
                          {pLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-500 ${
                  useLightText
                    ? isActive
                      ? "text-background"
                      : "text-background/60 hover:text-background"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-1.5 left-0 h-px transition-all duration-500 ${
                    isActive ? "w-full" : "w-0"
                  } ${useLightText ? "bg-background" : "bg-foreground"}`}
                />
              </Link>
            )
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden transition-colors duration-500 ${
            useLightText && !isOpen
              ? "text-background"
              : "text-foreground"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        } bg-background`}
      >
        <div className="flex flex-col px-6 py-10 gap-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Carthage Group
          </Link>
          {navLinks.map((link, i) => {
            const isActive =
              link.href === "/stone-paper"
                ? pathname === "/stone-paper"
                : pathname.startsWith(link.href)

            if (link.label === "Products") {
              return (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className={`text-2xl font-light tracking-tight transition-colors duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    Products
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-[300px] mt-3" : "max-h-0"}`}>
                    <div className="flex flex-col gap-3 pl-4 border-l border-border">
                      <Link
                        href="/stone-paper/product"
                        onClick={() => setIsOpen(false)}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        All Products
                      </Link>
                      {productLinks.map((pLink) => (
                        <Link
                          key={pLink.label}
                          href={pLink.href}
                          onClick={() => setIsOpen(false)}
                          className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          {pLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-light tracking-tight transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
