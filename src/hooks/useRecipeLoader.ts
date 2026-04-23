'use client'

import { useEffect } from 'react'
import axios, { type AxiosResponse } from 'axios'
import { useCraftStore } from '@/store/craftStore'
import { saveToCache, loadFromCache } from '@/lib/recipeCache'
import type { Recipe } from '@/types'

const SEED_INGREDIENTS = [
  'chicken', 'beef', 'pork',
  'egg', 'cheese', 'milk',
  'rice', 'flour', 'pasta',
  'garlic', 'onion', 'tomato',
]

export const useRecipeLoader = () => {
  const setCachedRecipes = useCraftStore(s => s.setCachedRecipes)
  const setLoading       = useCraftStore(s => s.setLoading)
  const existing         = useCraftStore(s => s.cachedRecipes)

  useEffect(() => {
    // Skip if already loaded this session
    if (existing.length > 0) return

    const loadRecipes = async () => {
      // ── 1. Try local cache first (instant load) ─────
      const cached = loadFromCache()
      if (cached && cached.length > 0) {
        setCachedRecipes(cached)
      } else {
        setLoading(true)
      }

      // ── 2. If online, refresh in background ─────────
      if (!navigator.onLine) {
        setLoading(false)
        return
      }

      try {
        const mealIdSet = new Set<string>()
        const results = await Promise.allSettled(
          SEED_INGREDIENTS.map((ing) =>
            axios.get(`/api/recipes/by-ingredient?i=${ing}`)
          )
        )
        results.forEach((r) => {
          if (r.status === 'fulfilled') {
            r.value.data.meals?.forEach((m: { idMeal: string }) =>
              mealIdSet.add(m.idMeal)
            )
          }
        })

        const ids     = Array.from(mealIdSet).slice(0, 50)
        const lookups = await Promise.allSettled(
          ids.map((id) => axios.get(`/api/recipes/${id}`))
        )
        const recipes: Recipe[] = lookups
          .filter(
            (r): r is PromiseFulfilledResult<AxiosResponse<{ recipe?: Recipe }>> =>
              r.status === 'fulfilled' && !!r.value.data.recipe
          )
          .map((r) => r.value.data.recipe as Recipe)

        if (recipes.length > 0) {
          setCachedRecipes(recipes)
          saveToCache(recipes)
        }
      } catch (err) {
        console.error('Failed to load recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [setCachedRecipes, setLoading, existing.length])
}