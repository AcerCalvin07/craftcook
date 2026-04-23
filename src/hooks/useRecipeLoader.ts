'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useCraftStore } from '@/store/craftStore'
import { FILIPINO_RECIPES } from '@/lib/recipes/filipino'
import type { Recipe } from '@/types'

// ── Common foreign dishes Filipinos often cook at home ──
// Searched by name — TheMealDB's /search returns full details,
// so no second hydrate pass is needed for these.
const FOREIGN_DISH_NAMES = [
  'Spaghetti Bolognese',
  'Beef Stroganoff',
  'Chicken Curry',
  'Beef Stew',
  'Fried Chicken',
  'Pancakes',
  'Omelette',
  'French Toast',
  'Beef Burger',
  'Chicken Teriyaki',
  'Sweet and Sour Pork',
  'Beef Stir Fry',
  'Fried Rice',
  'Mac and Cheese',
]

const normalize = (s: string) => s.toLowerCase().trim()

export const useRecipeLoader = () => {
  const setCachedRecipes = useCraftStore(s => s.setCachedRecipes)
  const setLoading       = useCraftStore(s => s.setLoading)

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true)

      try {
        const [filipinoApi, foreign] = await Promise.all([
          loadFilipinoFromApi(),
          loadForeignByName(),
        ])

        // Merge: local Filipino dataset first, then API Filipino, then foreign.
        // Dedupe by normalized name so TheMealDB's "Filipino Adobo" won't
        // double up with our "Chicken Adobo".
        const merged: Recipe[] = []
        const seen = new Set<string>()

        for (const r of [...FILIPINO_RECIPES, ...filipinoApi, ...foreign]) {
          const key = normalize(r.name)
          if (seen.has(key)) continue
          seen.add(key)
          merged.push(r)
        }

        setCachedRecipes(merged)
      } catch (err) {
        console.error('Failed to load recipes:', err)
        // Fall back to local dataset so the UI still works offline / API down.
        setCachedRecipes(FILIPINO_RECIPES)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [setCachedRecipes, setLoading])
}

// ── Helpers ─────────────────────────────────────────────

const loadFilipinoFromApi = async (): Promise<Recipe[]> => {
  try {
    const { data } = await axios.get('/api/recipes/by-area?a=Filipino')
    const ids: string[] = (data.meals ?? []).map((m: { idMeal: string }) => m.idMeal)

    const results = await Promise.allSettled(
      ids.map(id => axios.get(`/api/recipes/${id}`))
    )
    return results.flatMap(r =>
      r.status === 'fulfilled' && r.value.data.recipe ? [r.value.data.recipe] : []
    )
  } catch (err) {
    console.warn('Filipino area fetch failed:', (err as Error).message)
    return []
  }
}

const loadForeignByName = async (): Promise<Recipe[]> => {
  const results = await Promise.allSettled(
    FOREIGN_DISH_NAMES.map(name =>
      axios.get(`/api/recipes/search?q=${encodeURIComponent(name)}`)
    )
  )
  // /search returns { recipes: Recipe[] } — take the first match per query.
  return results.flatMap(r => {
    if (r.status !== 'fulfilled') return []
    const recipes: Recipe[] = r.value.data.recipes ?? []
    return recipes.length > 0 ? [recipes[0]] : []
  })
}
