"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Search, ShoppingBag, Menu, X, Globe, Loader2, ChevronDown, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/format"
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/types"

interface SearchResult {
  id: string
  name: string
  subtitle: string
  price: number
  image: string
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [shopMenuOpen, setShopMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const shopMenuRef = useRef<HTMLLIElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { totalItems, toggleCart } = useCart()
  const { locale, setLocale, t } = useLanguage()

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setLangMenuOpen(false)
    setShopMenuOpen(false)
    setQuery("")
    setResults(null)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  // Close language menu on outside click
  useEffect(() => {
    if (!langMenuOpen) return
    const onClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [langMenuOpen])

  // Close shop menu on outside click
  useEffect(() => {
    if (!shopMenuOpen) return
    const onClick = (e: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target as Node)) {
        setShopMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [shopMenuOpen])

  // Debounced live search
  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setResults(null)
      setSearching(false)
      return
    }
    setSearching(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&locale=${locale}`,
          { signal: controller.signal },
        )
        if (res.ok) {
          const data = await res.json()
          setResults(data.results)
        }
      } catch {
        // aborted or network error - keep previous results
      } finally {
        setSearching(false)
      }
    }, 250)
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [query, locale])

  const submitSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      const trimmed = query.trim()
      if (!trimmed) return
      setSearchOpen(false)
      router.push(`/shop?q=${encodeURIComponent(trimmed)}`)
    },
    [query, router],
  )

  const navLink = (href: string, label: string, mobile = false) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        onClick={() => setMobileMenuOpen(false)}
        className={`${mobile ? "text-base block py-2" : "text-sm"} font-medium transition-colors ${
          active ? "text-black" : "text-[#444] hover:text-black"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="fixed top-0 z-[1000] w-full h-16 md:h-[72px] flex justify-between items-center px-4 md:px-12 bg-[rgba(255,255,255,0.88)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.04)]">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden transition-transform hover:scale-110"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={t.nav.openMenu}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-7 list-none items-center">
          <li className="relative" ref={shopMenuRef}>
            <button
              onClick={() => setShopMenuOpen(!shopMenuOpen)}
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                pathname.startsWith("/shop") || pathname.startsWith("/stone-paper/shop")
                  ? "text-black"
                  : "text-[#444] hover:text-black"
              }`}
              aria-expanded={shopMenuOpen}
              aria-haspopup="menu"
            >
              {t.nav.shop}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${shopMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {shopMenuOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-4 w-[300px] bg-white rounded-2xl border border-[#eee] shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-2 origin-top animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
              >
                {/* caret */}
                <span className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-[#eee] rotate-45 rounded-tl-[3px]" />

                <Link
                  href="/shop"
                  role="menuitem"
                  onClick={() => setShopMenuOpen(false)}
                  className="group/item relative flex items-center gap-3.5 p-3 rounded-xl transition-colors hover:bg-[#faf7f1]"
                >
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#fdf6ec] to-[#f5e6c8] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-105 overflow-hidden relative">
                    <Image
                      src="/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG"
                      alt="PMU Pigment"
                      fill
                      sizes="44px"
                      className="object-cover opacity-80 group-hover/item:opacity-100 transition-opacity"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#111]">{t.nav.shopMenuCosmetics}</span>
                    <span className="block text-xs text-[#888] truncate">{t.nav.shopMenuCosmeticsDesc}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#c9a96e] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                </Link>

                <Link
                  href="/stone-paper/shop"
                  role="menuitem"
                  onClick={() => setShopMenuOpen(false)}
                  className="group/item relative flex items-center gap-3.5 p-3 rounded-xl transition-colors hover:bg-[#f6f5f1]"
                >
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f4f2ec] to-[#e6e2d6] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-105 overflow-hidden relative">
                    <Image
                      src="/stone-paper/paper-1.jpg"
                      alt="Stone Paper Notebook"
                      fill
                      sizes="44px"
                      className="object-cover opacity-80 group-hover/item:opacity-100 transition-opacity"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#111]">{t.nav.shopMenuStone}</span>
                    <span className="block text-xs text-[#888] truncate">{t.nav.shopMenuStoneDesc}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#a89263] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                </Link>
              </div>
            )}
          </li>
          <li>{navLink("/academy", t.nav.academy)}</li>
          <li>{navLink("/stone-paper", t.nav.stonePaper)}</li>
          <li>{navLink("/contact", t.nav.contact)}</li>
        </ul>
      </nav>

      {/* Logo */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0"
      >
        <Image
          src="/logo-carthage.png"
          alt="Carthage - Cosmetic & Pigmentation"
          width={64}
          height={64}
          className="h-[52px] w-auto md:h-[62px]"
          priority
        />
      </Link>

      <div className="flex gap-3 md:gap-4 items-center">
        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1 text-sm font-medium text-[#444] hover:text-black transition-colors uppercase"
            aria-label="Change language"
            aria-expanded={langMenuOpen}
          >
            <Globe className="w-[18px] h-[18px]" />
            <span className="hidden sm:inline">{locale}</span>
          </button>
          {langMenuOpen && (
            <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#eee] py-2 min-w-[140px] overflow-hidden z-[1001]">
              {LOCALES.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l)
                    setLangMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#f5f5f5] ${
                    l === locale ? "font-semibold text-black" : "text-[#666]"
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <button
          className="transition-transform hover:scale-110"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label={t.nav.search}
          aria-expanded={searchOpen}
        >
          {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>

        {/* Cart */}
        <button
          className="relative transition-transform hover:scale-110"
          onClick={toggleCart}
          aria-label={t.nav.openCart}
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#c9a96e] text-white text-[10px] min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#eee] shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
          <div className="max-w-[720px] mx-auto px-4 py-4">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full pl-11 pr-10 py-3 rounded-full border border-[#e5e5e5] bg-[#fafafa] text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.1)] transition-all"
                aria-label={t.search.placeholder}
              />
              {searching && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] animate-spin" />
              )}
            </form>

            {results !== null && (
              <div className="mt-3 max-h-[min(420px,60vh)] overflow-y-auto">
                {results.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm font-medium text-[#444] mb-1">
                      {t.search.noResults} &ldquo;{query.trim()}&rdquo;
                    </p>
                    <p className="text-xs text-[#888] mb-4">{t.search.tryAgain}</p>
                    <Link
                      href="/shop"
                      onClick={() => setSearchOpen(false)}
                      className="inline-block text-sm font-semibold text-[#c9a96e] hover:underline"
                    >
                      {t.search.browseAll}
                    </Link>
                  </div>
                ) : (
                  <>
                    <ul className="divide-y divide-[#f5f5f5]">
                      {results.map((r) => (
                        <li key={r.id}>
                          <Link
                            href={`/product/${r.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-[#fafafa] transition-colors"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0 relative">
                              <Image src={r.image} alt={r.name} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">{r.name}</p>
                              <p className="text-xs text-[#888] truncate">{r.subtitle}</p>
                            </div>
                            <span className="font-display font-bold text-sm">{formatPrice(r.price, locale)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => submitSearch()}
                      className="w-full mt-2 py-2.5 text-sm font-semibold text-[#c9a96e] hover:bg-[#faf6ee] rounded-xl transition-colors"
                    >
                      {t.search.viewAll}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && !searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(255,255,255,0.98)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.04)] md:hidden">
          <nav className="px-4 py-5">
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#999] pt-1">
                  {t.nav.shop}
                </span>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5"
                >
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#fdf6ec] to-[#f5e6c8] flex items-center justify-center shrink-0 overflow-hidden relative">
                    <Image src="/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG" alt="PMU" fill sizes="36px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-[#222]">{t.nav.shopMenuCosmetics}</span>
                    <span className="block text-xs text-[#888]">{t.nav.shopMenuCosmeticsDesc}</span>
                  </span>
                </Link>
                <Link
                  href="/stone-paper/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5"
                >
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f4f2ec] to-[#e6e2d6] flex items-center justify-center shrink-0 overflow-hidden relative">
                    <Image src="/stone-paper/paper-1.jpg" alt="Stone Paper" fill sizes="36px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-[#222]">{t.nav.shopMenuStone}</span>
                    <span className="block text-xs text-[#888]">{t.nav.shopMenuStoneDesc}</span>
                  </span>
                </Link>
              </li>
              <li className="pt-2 border-t border-[rgba(0,0,0,0.05)]">{navLink("/academy", t.nav.academy, true)}</li>
              <li>{navLink("/stone-paper", t.nav.stonePaper, true)}</li>
              <li>{navLink("/contact", t.nav.contact, true)}</li>
              <li className="pt-2 border-t border-[rgba(0,0,0,0.05)]">
                <Link
                  href="/cart"
                  className="text-base font-medium text-[#444] hover:text-black transition-colors flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t.nav.cart} ({totalItems})
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
