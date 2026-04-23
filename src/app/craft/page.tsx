'use client'

import { useState } from 'react'
import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import { useCraftStore } from '@/store/craftStore'
import { IngredientGrid } from '@/components/craft/IngredientGrid'
import { RecipeResultsList } from '@/components/craft/RecipeResultsList'
import { RecipePreview } from '@/components/recipe/RecipePreview'
import type { RankedRecipe } from '@/types'

type Tab = 'ingredients' | 'recipes'

export default function CraftPage() {
  useRecipeLoader()
  const [preview, setPreview] = useState<RankedRecipe | null>(null)
  const [tab, setTab]         = useState<Tab>('ingredients')

  const selectedCount = useCraftStore(s => s.selectedIngredients.length)
  const recipeCount   = useCraftStore(s => s.rankedResults.length)

  return (
    <>
      <div className="fixed inset-x-0 top-0 bottom-16 flex flex-col">
        <header className="shrink-0 px-4 pt-3 pb-2 border-b border-ink/10">
          <h1 className="text-xl sm:text-2xl font-heading font-bold">
            🔨 Crafting Table
          </h1>
          <p className="text-ink/70 text-xs hidden sm:block">
            Tap ingredients you have — recipes will reveal themselves.
          </p>
        </header>

        {/* ── Mobile tab switcher ─────────────────────────── */}
        <div className="shrink-0 md:hidden flex border-b border-ink/10">
          <button
            onClick={() => setTab('ingredients')}
            className={`flex-1 py-2.5 text-sm font-heading transition-colors ${
              tab === 'ingredients'
                ? 'bg-gold/20 text-ink border-b-2 border-gold'
                : 'text-ink/60'
            }`}
          >
            🧺 Ingredients ({selectedCount})
          </button>
          <button
            onClick={() => setTab('recipes')}
            className={`flex-1 py-2.5 text-sm font-heading transition-colors ${
              tab === 'recipes'
                ? 'bg-gold/20 text-ink border-b-2 border-gold'
                : 'text-ink/60'
            }`}
          >
            📜 Recipes ({recipeCount})
          </button>
        </div>

        {/* ── Two-pane area ───────────────────────────────── */}
        <div className="flex-1 min-h-0 md:grid md:grid-cols-2 md:divide-x divide-ink/10">
          <div
            className={`min-h-0 h-full overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 scrollbar-thin ${
              tab === 'ingredients' ? 'block' : 'hidden'
            } md:block`}
          >
            <IngredientGrid />
          </div>
          <div
            className={`min-h-0 h-full overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 scrollbar-thin ${
              tab === 'recipes' ? 'block' : 'hidden'
            } md:block`}
          >
            <RecipeResultsList onRecipeClick={setPreview} />
          </div>
        </div>
      </div>

      <RecipePreview ranked={preview} onClose={() => setPreview(null)} />
    </>
  )
}
