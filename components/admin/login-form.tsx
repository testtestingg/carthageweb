"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Loader2 } from "lucide-react"

export function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push("/admin")
        router.refresh()
        return
      }
      const data = await res.json().catch(() => null)
      setError(data?.error ?? "Login failed")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(224,231,255)_0%,rgba(255,255,255,0)_70%)]" />
      <div className="fixed bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(255,228,230)_0%,rgba(255,255,255,0)_70%)]" />

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display font-bold text-3xl tracking-[-0.03em]">
            carthage<span className="text-[#ff4d8c]">.</span>
          </span>
          <p className="text-sm text-[#888] mt-2">Admin Panel</p>
        </div>

        <div className="bg-white rounded-[20px] p-8 border border-[#eee] shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
          {error && (
            <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-5 text-sm text-[#991b1b]" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#444] mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#ff4d8c] focus:ring-2 focus:ring-[rgba(255,77,140,0.1)] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#444] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#ff4d8c] focus:ring-2 focus:ring-[rgba(255,77,140,0.1)] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111] text-white py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[#222] disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
