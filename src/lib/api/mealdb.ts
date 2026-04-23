import axios from 'axios'
import type { Recipe } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_MEALDB_BASE_URL!

const api = axios.create({ baseURL: BASE_URL })

// ── Raw API Response Types ───────────────────────────────
interface MealDBResponse {
  meals: MealDBRaw[] | null
}

interface MealDBRaw {
  idMeal:          string
  strMeal:         string
  strMealThumb:    string
  strCategory:     string
  strArea:         string
  strInstructions: string
  [key: string]: string | null  // strIngredient1..20, strMeasure1..20
}

// ── Parser: Raw API → Clean Recipe Model ────────────────
const parseRecipe = (raw: MealDBRaw): Recipe => {
  const ingredients: string[]  = []
  const measurements: string[] = []

  for (let i = 1; i <= 20; i++) {
    const ing = raw[`strIngredient${i}`]?.trim()
    const mes = raw[`strMeasure${i}`]?.trim()

    if (ing && ing !== '') {
      ingredients.push(ing.toLowerCase())
      measurements.push(mes || '')
    }
  }

  // Split instructions into step array
  const steps = raw.strInstructions
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0)

  return {
    id:           raw.idMeal,
    name:         raw.strMeal,
    imageUrl:     raw.strMealThumb,
    category:     raw.strCategory,
    area:         raw.strArea,
    ingredients,
    measurements,
    steps,
  }
}

// ── API Functions ────────────────────────────────────────

// Search recipes by name
export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  const { data } = await api.get<MealDBResponse>(`/search.php?s=${name}`)
  return data.meals?.map(parseRecipe) ?? []
}

// Lookup full recipe details by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const { data } = await api.get<MealDBResponse>(`/lookup.php?i=${id}`)
  return data.meals?.[0] ? parseRecipe(data.meals[0]) : null
}

// Filter recipes by single ingredient — returns minimal data
export const filterByIngredient = async (ingredient: string) => {
  const safe = ingredient.replace(/ /g, '_')
  const { data } = await api.get<MealDBResponse>(`/filter.php?i=${safe}`)
  return data.meals ?? []   // { idMeal, strMeal, strMealThumb }
}

// Get a random recipe
export const getRandomRecipe = async (): Promise<Recipe | null> => {
  const { data } = await api.get<MealDBResponse>('/random.php')
  return data.meals?.[0] ? parseRecipe(data.meals[0]) : null
}

// List all available ingredients
export const getAllIngredients = async () => {
  const { data } = await api.get<{ meals: { strIngredient: string }[] }>(
    '/list.php?i=list'
  )
  return data.meals?.map(m => m.strIngredient.toLowerCase()) ?? []
}

// List all categories
export const getAllCategories = async () => {
  const { data } = await api.get<{ meals: { strCategory: string }[] }>(
    '/list.php?c=list'
  )
  return data.meals?.map(m => m.strCategory) ?? []
}