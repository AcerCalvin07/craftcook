'use client'

import { useAuthStore } from '@/store/authStore'
import { useAuthModal } from '@/store/authModalStore'
import { useEffect, useState } from 'react'
import { getSavedRecipes } from '@/lib/firebase/firestore'
import Link from 'next/link'
import Image from 'next/image'

interface SavedRecipe {
  id:         string
  recipeName: string
  imageUrl:   string
  category:   string
  area:       string
  notes:      string
}

export default function NotesPage() {
  const user     = useAuthStore(s => s.user)
  const openAuth = useAuthModal(s => s.openAuth)

  const [saved, setSaved] = useState<SavedRecipe[]>([])
  const [loading, setLoading] = useState(!!user)

  useEffect(() => {
    if (!user) return
    getSavedRecipes(user.uid)
      .then((data) => setSaved(data as SavedRecipe[]))
      .finally(() => setLoading(false))
  }, [user])

  // ── Guest View ──────────────────────────────────────
  if (!user) {
    return (
      <div className="space-y-4">
        <header>
          <h1 className="text-3xl font-heading font-bold">
            📝 Explorers Journal
          </h1>
        </header>
        <div className="adventure-card p-8 text-center">
          <p className="font-heading text-lg">🔒 Your journal is empty</p>
          <p className="text-sm text-ink/60 mt-2 mb-4">
            Login to save recipes and write field notes.
          </p>
          <button onClick={openAuth} className="gold-button">
            ⚔️ Sign In / Sign Up
          </button>
        </div>
      </div>
    )
  }

  // ── Logged In View ──────────────────────────────────
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-heading font-bold">
          📝 Explorers Journal
        </h1>
        <p className="text-ink/70 text-sm">
          {saved.length} saved {saved.length === 1 ? 'quest' : 'quests'}.
        </p>
      </header>

      {loading ? (
        <p className="text-center text-ink/60">Loading journal...</p>
      ) : saved.length === 0 ? (
        <div className="adventure-card p-8 text-center">
          <p className="text-ink/70">No saved recipes yet. Start crafting!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {saved.map((r) => (
            <Link
              key={r.id}
              href={`/recipes/${r.id}`}
              className="adventure-card overflow-hidden block"
            >
              <div className="relative h-32">
                <Image
                  src={r.imageUrl}
                  alt={r.recipeName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-heading font-bold text-sm truncate">
                  {r.recipeName}
                </h3>
                <p className="text-xs text-ink/60">
                  {r.area} · {r.category}
                </p>
                {r.notes && (
                  <p className="text-xs text-gold mt-1 italic truncate">
                    📝 {r.notes}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}