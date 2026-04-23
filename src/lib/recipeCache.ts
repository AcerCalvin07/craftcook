import type { Recipe } from '@/types'

const CACHE_KEY     = 'craftcook:recipes'
const TIMESTAMP_KEY = 'craftcook:recipes:timestamp'
const MAX_AGE_MS    = 24 * 60 * 60 * 1000   // 24 hours

export const saveToCache = (recipes: Recipe[]) => {
  try {
    localStorage.setItem(CACHE_KEY,     JSON.stringify(recipes))
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString())
  } catch (e) {
    console.warn('Failed to cache recipes', e)
  }
}

export const loadFromCache = (): Recipe[] | null => {
  try {
    const data = localStorage.getItem(CACHE_KEY)
    const ts   = localStorage.getItem(TIMESTAMP_KEY)
    if (!data || !ts) return null

    const age = Date.now() - Number(ts)
    if (age > MAX_AGE_MS) return null

    return JSON.parse(data) as Recipe[]
  } catch {
    return null
  }
}

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(TIMESTAMP_KEY)
}