"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, X, Save, Upload } from "lucide-react"
import type { Formation } from "@/lib/types"

const emptyTranslation = { name: "", description: "", details: "" }

function emptyFormation(): Partial<Formation> {
  return {
    image: "",
    category: "",
    duration: "",
    price: undefined,
    published: true,
    translations: {
      en: { ...emptyTranslation },
      fr: { ...emptyTranslation },
      de: { ...emptyTranslation },
    },
  }
}

export default function FormationsAdminPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Formation> | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchFormations = async () => {
    const res = await fetch("/api/admin/formations")
    if (res.ok) setFormations(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchFormations() }, [])

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/formations/${editingId}` : "/api/admin/formations"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      await fetchFormations()
      setEditing(null)
      setEditingId(null)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this formation?")) return
    await fetch(`/api/admin/formations/${id}`, { method: "DELETE" })
    fetchFormations()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
    if (res.ok) {
      const data = await res.json()
      setEditing({ ...editing, image: data.url })
    }
    setUploading(false)
  }

  if (loading) return <div className="p-8 text-[#888]">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Formations</h1>
          <p className="text-sm text-[#888] mt-1">Manage PMU academy formations</p>
        </div>
        <button
          onClick={() => { setEditing(emptyFormation()); setEditingId(null) }}
          className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#222] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Formation
        </button>
      </div>

      {/* Formation list */}
      {formations.length === 0 && !editing && (
        <div className="text-center py-16 text-[#888]">
          <p className="text-lg font-medium mb-2">No formations yet</p>
          <p className="text-sm">Click "Add Formation" to create your first training program.</p>
        </div>
      )}

      <div className="space-y-3">
        {formations.map((f) => (
          <div key={f.id} className="flex items-center gap-4 bg-white rounded-xl border border-[#eee] p-4">
            {f.image && (
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f5f5] relative flex-shrink-0">
                <Image src={f.image} alt={f.translations.en.name} fill sizes="56px" className="object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{f.translations.en.name || "Untitled"}</h3>
              <p className="text-xs text-[#888] truncate">{f.category} {f.duration && `• ${f.duration}`}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${f.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {f.published ? "Published" : "Draft"}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => { setEditing(f); setEditingId(f.id) }}
                className="p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
                aria-label="Edit"
              >
                <Pencil className="w-4 h-4 text-[#666]" />
              </button>
              <button
                onClick={() => handleDelete(f.id)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => { setEditing(null); setEditingId(null) }} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold">{editingId ? "Edit Formation" : "New Formation"}</h2>
              <button onClick={() => { setEditing(null); setEditingId(null) }} className="p-2 hover:bg-[#f5f5f5] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image upload */}
              <div>
                <label className="text-sm font-medium text-[#444] mb-2 block">Image</label>
                <div className="flex items-center gap-4">
                  {editing.image && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f5f5] relative flex-shrink-0">
                      <Image src={editing.image} alt="Formation" fill sizes="80px" className="object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm font-medium hover:bg-[#f5f5f5] transition-colors">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#444] mb-2 block">Category</label>
                  <input
                    type="text"
                    value={editing.category || ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    placeholder="e.g., Lips, Brows"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#444] mb-2 block">Duration</label>
                  <input
                    type="text"
                    value={editing.duration || ""}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                    placeholder="e.g., 3 days"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                  />
                </div>
              </div>

              {/* Price & Published */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#444] mb-2 block">Price (EUR, optional)</label>
                  <input
                    type="number"
                    value={editing.price ?? ""}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="e.g., 1500"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.published ?? true}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                      className="w-4 h-4 rounded border-[#ccc] accent-[#c9a96e]"
                    />
                    <span className="text-sm font-medium text-[#444]">Published</span>
                  </label>
                </div>
              </div>

              {/* Translations */}
              {(["en", "fr", "de"] as const).map((lang) => (
                <div key={lang} className="border border-[#eee] rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-[#999] mb-3">{lang === "en" ? "English" : lang === "fr" ? "Français" : "Deutsch"}</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editing.translations?.[lang]?.name || ""}
                      onChange={(e) => setEditing({
                        ...editing,
                        translations: { ...editing.translations!, [lang]: { ...editing.translations![lang], name: e.target.value } },
                      })}
                      placeholder="Formation name"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                    />
                    <textarea
                      value={editing.translations?.[lang]?.description || ""}
                      onChange={(e) => setEditing({
                        ...editing,
                        translations: { ...editing.translations!, [lang]: { ...editing.translations![lang], description: e.target.value } },
                      })}
                      placeholder="Description"
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                    />
                    <input
                      type="text"
                      value={editing.translations?.[lang]?.details || ""}
                      onChange={(e) => setEditing({
                        ...editing,
                        translations: { ...editing.translations!, [lang]: { ...editing.translations![lang], details: e.target.value } },
                      })}
                      placeholder="Additional details"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                    />
                  </div>
                </div>
              ))}

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#111] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#222] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : editingId ? "Update Formation" : "Create Formation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
