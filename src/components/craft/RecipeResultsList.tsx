'use client'

import { useCraftStore } from '@/store/craftStore'
import { RecipeCard } from './RecipeCard'
import type { RankedRecipe } from '@/types'

interface Props {
  onRecipeClick?: (ranked: RankedRecipe) => void
}

export const RecipeResultsList = ({ onRecipeClick }: Props) => {
  const ranked    = useCraftStore(s => s.rankedResults)
  const selected  = useCraftStore(s => s.selectedIngredients)
  const isLoading = useCraftStore(s => s.isLoading)

  if (isLoading) {
    return (
      <div className="text-center py-12 text-ink/60">
        <div className="animate-pulse font-heading">
          🗺️ Loading the realm's recipes...
        </div>
      </div>
    )
  }

  if (selected.length === 0) {
    return (
      <div className="adventure-card p-8 text-center">
        <p className="font-heading text-lg text-ink/70">
          ⚔️ Select ingredients to discover recipes
        </p>
        <p className="text-sm text-ink/50 mt-2">
          Your crafting table awaits.
        </p>
      </div>
    )
  }

  if (ranked.length === 0) {
    return (
      <div className="adventure-card p-8 text-center">
        <p className="font-heading text-lg text-ink/70">
          🌫️ No recipes discovered yet
        </p>
        <p className="text-sm text-ink/50 mt-2">
          Try adding more common ingredients.
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl font-bold">
        📜 Discovered Recipes ({ranked.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ranked.map(r => (
          <RecipeCard
            key={r.recipe.id}
            ranked={r}
            onClick={onRecipeClick}
          />
        ))}
      </div>
    </section>
  )
}