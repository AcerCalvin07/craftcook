'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { ArrowLeft, Bookmark, Share2, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAuthModal } from '@/store/authModalStore'
import { useCraftStore } from '@/store/craftStore'
import { CollapsibleStep } from '@/components/recipe/CollapsibleStep'
import {
  saveRecipe,
  unsaveRecipe,
  isRecipeSaved,
} from '@/lib/firebase/firestore'
import type { Recipe } from '@/types'

export default function RecipeDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const router   = useRouter()
  const user     = useAuthStore(s => s.user)
  const openAuth = useAuthModal(s => s.openAuth)
  const selected = useCraftStore(s => s.selectedIngredients)

  const [recipe, setRecipe]   = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved]     = useState(false)

  // ── Fetch Recipe ──────────────────────────────────────
  useEffect(() => {
    axios
      .get(`/api/recipes/${id}`)
      .then((res) => setRecipe(res.data.recipe))
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false))
  }, [id])

  // ── Check if already saved ───────────────────────────
  useEffect(() => {
    if (user && recipe) {
      isRecipeSaved(user.uid, recipe.id).then(setSaved)
    }
  }, [user, recipe])

  // ── Difficulty (derived from step count) ─────────────
  const getDifficulty = (n: number) =>
    n <= 3 ? 'Easy' : n <= 6 ? 'Medium' : 'Hard'

  const getCookTime = (n: number) => `${Math.max(15, n * 8)} min`

  // ── Save/Unsave Toggle ───────────────────────────────
  const handleSave = async () => {
    if (!user) return openAuth()
    if (!recipe) return

    if (saved) {
      await unsaveRecipe(user.uid, recipe.id)
      setSaved(false)
    } else {
      await saveRecipe(user.uid, recipe)
      setSaved(true)
    }
  }

  // ── Share ────────────────────────────────────────────
  const handleShare = async () => {
    if (!user) return openAuth()
    if (!recipe) return

    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: recipe.name, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20 font-heading text-ink/60">
        📜 Unrolling the scroll...
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <p className="font-heading">Recipe not found.</p>
        <button onClick={() => router.back()} className="gold-button mt-4">
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ── Header Bar ──────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-ink/70 hover:text-ink"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-heading">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="p-2 rounded-full hover:bg-parchment-dark"
            aria-label="Save"
          >
            <Bookmark
              className={`w-5 h-5 ${
                saved ? 'fill-gold text-gold' : 'text-ink/70'
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-parchment-dark"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5 text-ink/70" />
          </button>
        </div>
      </div>

      {/* ── Hero Image ───────────────────────────── */}
      <div className="relative h-56 w-full rounded-lg overflow-hidden">
        <Image
          src={recipe.imageUrl}
          alt={recipe.name}
          fill
          className="object-cover"
        />
      </div>

      {/* ── Title ────────────────────────────────── */}
      <header>
        <h1 className="font-heading text-3xl font-bold">
          ⚔️ {recipe.name}
        </h1>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-ink/70">
          <span>🌍 {recipe.area}</span>
          <span>📦 {recipe.category}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {getCookTime(recipe.steps.length)}
          </span>
          <span>⚡ {getDifficulty(recipe.steps.length)}</span>
        </div>
      </header>

      {/* ── Required Materials ───────────────────── */}
      <section className="adventure-card p-4">
        <h2 className="font-heading font-bold text-lg mb-3">
          📦 Required Materials
        </h2>
        <ul className="space-y-1 text-sm">
          {recipe.ingredients.map((ing, i) => {
            const has = selected.includes(ing.toLowerCase())
            return (
              <li
                key={i}
                className={`flex items-center justify-between py-1
                            border-b border-ink/10 last:border-0 ${
                  has ? 'text-forest' : 'text-ink/70'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{has ? '✅' : '❌'}</span>
                  <span className="capitalize">{ing}</span>
                </span>
                <span className="text-ink/60 text-xs">
                  {recipe.measurements[i]}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ── Crafting Instructions ────────────────── */}
      <section className="space-y-2">
        <h2 className="font-heading font-bold text-lg">
          📜 Crafting Instructions
        </h2>
        {recipe.steps.map((step, i) => (
          <CollapsibleStep key={i} number={i + 1} content={step} />
        ))}
      </section>

      {/* ── Actions ──────────────────────────────── */}
      <div className="flex gap-3">
        <button onClick={handleSave} className="gold-button flex-1">
          {saved ? '🔖 Saved to Journal' : '🔖 Save to Journal'}
        </button>
        <button onClick={handleShare} className="gold-button flex-1">
          📤 Share
        </button>
      </div>
    </div>
  )
}