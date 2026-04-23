import type { Recipe, RankedRecipe, MatchTier } from '@/types'

// ── Determine match tier from score ─────────────────────
const getTier = (score: number): MatchTier => {
  if (score >= 1.0)  return 'perfect'
  if (score >= 0.75) return 'almost'
  if (score >= 0.50) return 'partial'
  return 'distant'
}

// ── Core Ranking Algorithm ──────────────────────────────
// Input:  user's selected ingredients + all cached recipes
// Output: ranked & sorted list of matching recipes
export const rankRecipes = (
  selected: string[],
  allRecipes: Recipe[]
): RankedRecipe[] => {
  if (selected.length === 0) return []

  const normalized = selected.map(s => s.toLowerCase().trim())

  const ranked: RankedRecipe[] = allRecipes
    .map(recipe => {
      const matched = recipe.ingredients.filter(ing =>
        normalized.includes(ing.toLowerCase())
      )
      const missing = recipe.ingredients.filter(
        ing => !normalized.includes(ing.toLowerCase())
      )
      const score = matched.length / recipe.ingredients.length

      return {
        recipe,
        matchedCount: matched.length,
        totalCount:   recipe.ingredients.length,
        matchScore:   score,
        missing,
        tier:         getTier(score),
      }
    })
    .filter(r => r.matchedCount > 0)      // only show if at least 1 match

  // Sort: highest match score first, then by matched count (tiebreaker)
  ranked.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore
    return b.matchedCount - a.matchedCount
  })

  return ranked
}