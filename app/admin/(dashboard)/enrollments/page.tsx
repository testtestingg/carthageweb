"use client"

import { useState, useEffect, useCallback } from "react"
import { Trash2, Mail, Phone, Globe, CheckCircle2, RotateCcw } from "lucide-react"
import type { Enrollment } from "@/lib/types"
import { countryName } from "@/lib/countries"

export default function EnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEnrollments = useCallback(async () => {
    const res = await fetch("/api/admin/enrollments")
    if (res.ok) setEnrollments(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  const setStatus = async (id: string, status: "new" | "contacted") => {
    const res = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) fetchEnrollments()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enrollment?")) return
    await fetch(`/api/admin/enrollments/${id}`, { method: "DELETE" })
    fetchEnrollments()
  }

  if (loading) return <div className="p-8 text-[#888]">Loading...</div>

  const newCount = enrollments.filter((e) => e.status === "new").length

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Enrollments</h1>
        <p className="text-sm text-[#888] mt-1">
          {enrollments.length} academy application{enrollments.length === 1 ? "" : "s"}
          {newCount > 0 && (
            <span className="ml-2 inline-flex items-center bg-[#c9a96e] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {newCount} new
            </span>
          )}
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-16 text-[#888]">
          <p className="text-lg font-medium mb-2">No enrollments yet</p>
          <p className="text-sm">Applications from the academy page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enrollments.map((e) => (
            <div
              key={e.id}
              className={`bg-white rounded-xl border p-4 md:p-5 ${
                e.status === "new" ? "border-[#e8d9bd]" : "border-[#eee]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{e.name}</h3>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        e.status === "new"
                          ? "bg-[#fdf6ec] text-[#a4813d]"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {e.status === "new" ? "New" : "Contacted"}
                    </span>
                    <span className="text-[11px] text-[#aaa] uppercase">{e.locale}</span>
                  </div>
                  <p className="text-xs font-medium text-[#555] mt-1">{e.formationName}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-[#777]">
                    <a
                      href={`mailto:${e.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> {e.email}
                    </a>
                    {e.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> {e.phone}
                      </span>
                    )}
                    {e.country && (
                      <span className="inline-flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> {countryName(e.country, "en")}
                      </span>
                    )}
                  </div>
                  {e.message && (
                    <p className="text-xs text-[#888] leading-relaxed mt-2 border-t border-[#f5f5f5] pt-2 max-w-[640px]">
                      {e.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[11px] text-[#aaa] mr-2">
                    {new Date(e.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {e.status === "new" ? (
                    <button
                      onClick={() => setStatus(e.id, "contacted")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark contacted
                    </button>
                  ) : (
                    <button
                      onClick={() => setStatus(e.id, "new")}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#777] hover:bg-[#f5f5f5] px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Mark new
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Delete enrollment"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
