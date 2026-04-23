'use client'

import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import { IngredientGrid } from '@/components/craft/IngredientGrid'
import { RecipeResultsList } from '@/components/craft/RecipeResultsList'
import { useRouter } from 'next/navigation'
import type { RankedRecipe } from '@/types'

export default function CraftPage() {
  useRecipeLoader()
  const router = useRouter()

  const handleRecipeClick = (r: RankedRecipe) => {
    router.push(`/recipes/${r.recipe.id}`)
  }

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 flex flex-col">
      <header className="px-4 py-3 border-b-2 border-ink/10 bg-parchment-dark/50">
        <h1 className="text-2xl font-heading font-bold">🔨 Crafting Table</h1>
        <p className="text-ink/70 text-xs">
          Tap ingredients you have — recipes will reveal themselves.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink/10">
        <div className="min-h-0 overflow-y-auto scrollbar-thin px-4 py-4">
          <IngredientGrid />
        </div>
        <div className="min-h-0 overflow-y-auto scrollbar-thin px-4 py-4">
          <RecipeResultsList onRecipeClick={handleRecipeClick} />
        </div>
      </div>
    </div>
  )
}