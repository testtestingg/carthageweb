"use client"

import { useState } from "react"
import { Loader2, Check, AlertCircle, KeyRound } from "lucide-react"

export function SettingsForm({ username }: { username: string }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 10) return setError("New password must be at least 10 characters")
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword))
      return setError("New password must contain letters and numbers")
    if (newPassword !== confirmPassword) return setError("Passwords do not match")

    setStatus("saving")
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error ?? "Update failed")
      setStatus("success")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
      setStatus("idle")
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[rgba(201,169,110,0.12)] transition-all"

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-semibold mb-1">Settings</h1>
      <p className="text-sm text-[#888] mb-6">
        Signed in as <span className="font-medium text-[#444]">{username}</span>
      </p>

      <div className="bg-white rounded-[18px] border border-[#eee] p-6">
        <div className="flex items-center gap-2 mb-5">
          <KeyRound className="w-4 h-4 text-[#c9a96e]" />
          <h2 className="font-semibold text-sm">Change Password</h2>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#86efac] rounded-xl p-3 mb-4 text-sm text-[#166534]" role="status">
            <Check className="w-4 h-4" />
            Password updated successfully.
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-3 mb-4 text-sm text-[#991b1b]" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-xs font-medium text-[#666] mb-1.5">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-xs font-medium text-[#666] mb-1.5">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={inputClass}
            />
            <p className="text-xs text-[#999] mt-1">At least 10 characters, with letters and numbers.</p>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-xs font-medium text-[#666] mb-1.5">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={status === "saving"}
            className="inline-flex items-center gap-2 bg-[#111] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-[#222] disabled:opacity-60"
          >
            {status === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === "saving" ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}
