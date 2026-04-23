'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { MatchBadge } from '@/components/ui/MatchBadge'
import { useCraftStore } from '@/store/craftStore'
import type { RankedRecipe } from '@/types'

interface Props {
  ranked:  RankedRecipe | null
  onClose: () => void
}

export const RecipePreview = ({ ranked, onClose }: Props) => {
  const selected = useCraftStore(s => s.selectedIngredients)

  if (!ranked) return null
  const { recipe, tier, matchedCount, totalCount } = ranked

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center
                 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-parchment w-full max-w-2xl rounded-t-2xl
                   max-h-[85vh] overflow-y-auto
                   animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Hero Image ──────────────────────────── */}
        <div className="relative h-56 w-full">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            className="object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 text-parchment
                       rounded-full p-2 hover:bg-black/80"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-3 left-3">
            <MatchBadge tier={tier} />
          </div>
        </div>

        {/* ── Content ─────────────────────────────── */}
        <div className="p-5 space-y-4">
          <header>
            <h2 className="font-heading text-2xl font-bold">
              {recipe.name}
            </h2>
            <p className="text-sm text-ink/60">
              🌍 {recipe.area} · 📦 {recipe.category}
            </p>
            <p className="text-xs text-ink/70 mt-2">
              {matchedCount}/{totalCount} ingredients matched
            </p>
          </header>

          {/* ── Ingredient Checklist ──────────────── */}
          <section>
            <h3 className="font-heading font-bold mb-2">📦 Ingredients</h3>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {recipe.ingredients.map((ing, i) => {
                const has = selected.includes(ing.toLowerCase())
                return (
                  <li
                    key={i}
                    className={`flex items-center gap-1 ${
                      has ? 'text-forest' : 'text-ink/50'
                    }`}
                  >
                    <span>{has ? '✅' : '❌'}</span>
                    <span className="capitalize truncate">{ing}</span>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* ── CTA ───────────────────────────────── */}
          <Link
            href={`/recipes/${recipe.id}`}
            onClick={onClose}
            className="gold-button w-full inline-block text-center"
          >
            ⚔️ View Full Quest →
          </Link>
        </div>
      </div>
    </div>
  )
}