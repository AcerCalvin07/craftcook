// ── Ingredient ───────────────────────────────────────────
export interface Ingredient {
  id:       string
  name:     string
  category: IngredientCategory
  imageUrl?: string
}

export type IngredientCategory =
  | 'Meat'
  | 'Seafood'
  | 'Vegetable'
  | 'Dairy'
  | 'Spice'
  | 'Grain'
  | 'Sauce'
  | 'Other'

// ── Recipe ───────────────────────────────────────────────
export interface Recipe {
  id:           string
  name:         string
  imageUrl:     string
  category:     string
  area:         string
  ingredients:  string[]   // ["egg", "flour", "milk"]
  measurements: string[]   // ["2 pcs", "1 cup", "1/2 cup"]
  steps:        string[]   // parsed from strInstructions
}

// ── Ranked Recipe (crafting result) ─────────────────────
export type MatchTier = 'perfect' | 'almost' | 'partial' | 'distant'

export interface RankedRecipe {
  recipe:       Recipe
  matchedCount: number
  totalCount:   number
  matchScore:   number     // 0.0 → 1.0
  missing:      string[]   // ingredient names user doesn't have
  tier:         MatchTier
}

// ── Saved Recipe (Firestore) ─────────────────────────────
export interface SavedRecipe {
  recipeId:   string
  recipeName: string
  imageUrl:   string
  category:   string
  area:       string
  notes:      string
  savedAt:    Date
}