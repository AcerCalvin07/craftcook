'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useCraftStore } from '@/store/craftStore'
import type { Recipe } from '@/types'

// ── Seed Ingredients — start small, add more later ──────
const SEED_INGREDIENTS = [
  'chicken', 'beef', 'pork',
  'egg', 'cheese', 'milk',
  'rice', 'flour', 'pasta',
  'garlic', 'onion', 'tomato',
]

export const useRecipeLoader = () => {
  const setCachedRecipes = useCraftStore(s => s.setCachedRecipes)
  const setLoading       = useCraftStore(s => s.setLoading)

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true)

      try {
        // Fetch meal IDs per ingredient
        const mealIdSet = new Set<string>()
        await Promise.all(
          SEED_INGREDIENTS.map(async (ing) => {
            const { data } = await axios.get(
              `/api/recipes/by-ingredient?i=${ing}`
            )
            data.meals?.forEach((m: { idMeal: string }) =>
              mealIdSet.add(m.idMeal)
            )
          })
        )

        // Fetch full details for each unique meal
        const ids = Array.from(mealIdSet).slice(0, 50) // cap for Phase 1
        const recipes: Recipe[] = []

        await Promise.all(
          ids.map(async (id) => {
            const { data } = await axios.get(`/api/recipes/${id}`)
            if (data.recipe) recipes.push(data.recipe)
          })
        )

        setCachedRecipes(recipes)
      } catch (err) {
        console.error('Failed to load recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [setCachedRecipes, setLoading])
}