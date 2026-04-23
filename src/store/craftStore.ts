import { create } from 'zustand'
import type { Recipe, RankedRecipe } from '@/types'
import { rankRecipes } from '@/lib/recipeMatcher'

interface CraftState {
  // ── Data ──────────────────────────────────────────────
  selectedIngredients: string[]
  cachedRecipes:       Recipe[]
  rankedResults:       RankedRecipe[]
  isLoading:           boolean

  // ── Actions ───────────────────────────────────────────
  toggleIngredient:  (ingredient: string) => void
  clearIngredients:  () => void
  setCachedRecipes:  (recipes: Recipe[]) => void
  setLoading:        (loading: boolean) => void
  recompute:         () => void
}

export const useCraftStore = create<CraftState>((set, get) => ({
  selectedIngredients: [],
  cachedRecipes:       [],
  rankedResults:       [],
  isLoading:           false,

  // Toggle an ingredient + re-rank recipes live
  toggleIngredient: (ingredient) => {
    const { selectedIngredients, cachedRecipes } = get()
    const normalized = ingredient.toLowerCase().trim()

    const updated = selectedIngredients.includes(normalized)
      ? selectedIngredients.filter(i => i !== normalized)
      : [...selectedIngredients, normalized]

    set({
      selectedIngredients: updated,
      rankedResults:       rankRecipes(updated, cachedRecipes),
    })
  },

  // Reset all selections
  clearIngredients: () =>
    set({ selectedIngredients: [], rankedResults: [] }),

  // Store the fetched recipe pool (called once on app load)
  setCachedRecipes: (recipes) => {
    const { selectedIngredients } = get()
    set({
      cachedRecipes: recipes,
      rankedResults: rankRecipes(selectedIngredients, recipes),
    })
  },

  setLoading: (loading) => set({ isLoading: loading }),

  // Manual re-rank (rarely needed — used for refresh scenarios)
  recompute: () => {
    const { selectedIngredients, cachedRecipes } = get()
    set({ rankedResults: rankRecipes(selectedIngredients, cachedRecipes) })
  },
}))