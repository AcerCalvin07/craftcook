'use client'

import { useState } from 'react'
import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import { IngredientGrid } from '@/components/craft/IngredientGrid'
import { RecipeResultsList } from '@/components/craft/RecipeResultsList'
import { RecipePreview } from '@/components/recipe/RecipePreview'
import type { RankedRecipe } from '@/types'

export default function CraftPage() {
  useRecipeLoader()
  const [preview, setPreview] = useState<RankedRecipe | null>(null)

  return (
    <>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold">🔨 Crafting Table</h1>
          <p className="text-ink/70 text-sm">
            Tap ingredients you have — recipes will reveal themselves.
          </p>
        </header>

        <IngredientGrid />
        <RecipeResultsList onRecipeClick={setPreview} />
      </div>

      <RecipePreview ranked={preview} onClose={() => setPreview(null)} />
    </>
  )
}
