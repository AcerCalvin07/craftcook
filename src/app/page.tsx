'use client'

import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import { useCraftStore } from '@/store/craftStore'

export default function HomePage() {
  useRecipeLoader()   // loads recipes on page mount

  const {
    cachedRecipes,
    selectedIngredients,
    rankedResults,
    isLoading,
    toggleIngredient,
    clearIngredients,
  } = useCraftStore()

  return (
    <main style={{ padding: 24 }}>
      <h1>⚔️ CraftCook — Core Test</h1>

      {isLoading && <p>Loading recipes...</p>}

      <p>Recipes cached: <b>{cachedRecipes.length}</b></p>

      <h2>Select ingredients:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['chicken', 'garlic', 'onion', 'egg', 'rice', 'cheese'].map(ing => (
          <button
            key={ing}
            onClick={() => toggleIngredient(ing)}
            style={{
              padding: '8px 16px',
              background: selectedIngredients.includes(ing)
                ? 'gold'
                : '#eee',
              border: '1px solid #333',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {ing}
          </button>
        ))}
      </div>

      <button
        onClick={clearIngredients}
        style={{ marginTop: 12, padding: '6px 12px' }}
      >
        Clear All
      </button>

      <h2>Ranked Recipes ({rankedResults.length}):</h2>
      <ul>
        {rankedResults.slice(0, 10).map(r => (
          <li key={r.recipe.id}>
            <b>{r.recipe.name}</b> — {r.tier.toUpperCase()} ·{' '}
            {r.matchedCount}/{r.totalCount} matched
            {r.missing.length > 0 && (
              <span> · Missing: {r.missing.slice(0, 3).join(', ')}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}