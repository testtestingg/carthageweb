"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Package, FolderTree, GraduationCap, UserPlus, Settings, LogOut, ExternalLink, Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { href: "/admin", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/formations", label: "Formations", icon: GraduationCap },
  { href: "/admin/enrollments", label: "Enrollments", icon: UserPlus },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminShell({ username, children }: { username: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/products") : pathname.startsWith(href)

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileNavOpen(false)}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            isActive(item.href) ? "bg-[#111] text-white" : "text-[#555] hover:bg-[#f5f5f5] hover:text-black"
          }`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#eee] px-4 h-14 flex items-center justify-between">
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle admin menu">
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-display font-bold text-lg">
          carthage<span className="text-[#c9a96e]">.</span> <span className="font-normal text-sm text-[#888]">admin</span>
        </span>
        <button onClick={handleLogout} aria-label="Log out">
          <LogOut className="w-5 h-5 text-[#888]" />
        </button>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden sticky top-14 z-40 bg-white border-b border-[#eee] p-4">{nav}</div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 min-h-screen bg-white border-r border-[#eee] flex-col p-5 sticky top-0 max-h-screen">
          <Link href="/admin" className="font-display font-bold text-xl tracking-[-0.03em] mb-1 px-2">
            carthage<span className="text-[#c9a96e]">.</span>
          </Link>
          <p className="text-xs text-[#999] mb-8 px-2">Admin Panel</p>

          {nav}

          <div className="mt-auto space-y-1 pt-6 border-t border-[#f0f0f0]">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#555] hover:bg-[#f5f5f5] hover:text-black transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#555] hover:bg-[#fef2f2] hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
            <p className="px-4 pt-2 text-xs text-[#bbb] truncate">Signed in as {username}</p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 max-w-[1100px]">{children}</main>
      </div>
    </div>
  )
}
