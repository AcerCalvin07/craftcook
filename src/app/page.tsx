'use client'

import Link from 'next/link'
import { RecipeImage } from '@/components/ui/RecipeImage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { useCraftStore } from '@/store/craftStore'
import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import type { Recipe } from '@/types'

export default function HomePage() {
  useRecipeLoader()

  const user     = useAuthStore(s => s.user)
  const selected = useCraftStore(s => s.selectedIngredients)
  const results  = useCraftStore(s => s.rankedResults)

  const [daily, setDaily] = useState<Recipe | null>(null)

  useEffect(() => {
    axios.get('/api/recipes/random').then(r => setDaily(r.data.recipe))
  }, [])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-bold">🏕️ Base Camp</h1>
        <p className="text-ink/70 font-body">
          {user
            ? `Welcome back, traveler ${user.email?.split('@')[0]}!`
            : 'Welcome, brave explorer!'}
        </p>
      </header>

      {/* ── Recipe of the Day ────────────────────── */}
      {daily && (
        <section className="adventure-card overflow-hidden">
          <div className="relative h-48 w-full">
            <RecipeImage
              src={daily.imageUrl}
              alt={daily.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 text-parchment">
              <div className="text-xs font-heading">🗺️ QUEST OF THE DAY</div>
              <div className="text-xl font-heading font-bold">{daily.name}</div>
              <div className="text-xs opacity-80">
                {daily.area} · {daily.category}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Crafting Status ──────────────────────── */}
      <section className="adventure-card p-4">
        <h2 className="font-heading font-bold mb-2">⚔️ Ready to Craft?</h2>
        <p className="text-sm text-ink/70">
          You have <b>{selected.length}</b> ingredients selected.{' '}
          <b>{results.length}</b> recipes discovered.
        </p>
        <Link
          href="/craft"
          className="gold-button inline-block mt-3"
        >
          Go to Crafting Table →
        </Link>
      </section>
    </div>
  )
}