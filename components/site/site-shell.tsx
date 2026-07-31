"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { SiteHeader } from "./header"
import { SiteFooter } from "./footer"
import { CartDrawer } from "./cart-drawer"
import { scrollToTarget } from "@/components/providers/smooth-scroll"
import { useLanguage } from "@/context/language-context"

export function SiteShell({ children, atmosphere = true }: { children: React.ReactNode; atmosphere?: boolean }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // overflow-x: clip rather than hidden — hidden would make this element a
    // scroll container and break `position: sticky` inside the page.
    <div className="relative min-h-screen bg-white text-[#111] [overflow-x:clip]">
      {atmosphere && (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(224,231,255)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="fixed bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(253,246,236)_0%,rgba(255,255,255,0)_70%)]" />
        </>
      )}

      <SiteHeader />
      <CartDrawer />

      {children}

      <SiteFooter />

      <button
        onClick={() => scrollToTarget(0)}
        className={`fixed bottom-8 right-8 z-[999] w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label={t.common.scrollTop}
      >
        <ArrowUp className="w-5 h-5 text-[#c9a96e]" />
      </button>
    </div>
  )
}
