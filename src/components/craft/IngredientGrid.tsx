'use client'

import { useMemo, useState } from 'react'
import { INGREDIENTS, CATEGORIES } from '@/lib/ingredients'
import { useCraftStore } from '@/store/craftStore'
import { SearchBar } from '@/components/ui/SearchBar'
import type { IngredientCategory } from '@/types'

type Filter = IngredientCategory | 'All'

export const IngredientGrid = () => {
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<Filter>('All')

  const selected         = useCraftStore(s => s.selectedIngredients)
  const toggleIngredient = useCraftStore(s => s.toggleIngredient)
  const clearIngredients = useCraftStore(s => s.clearIngredients)

  // ── Filtered & searched ingredients ───────────────────
  const visibleIngredients = useMemo(() => {
    const normalized = search.toLowerCase().trim()
    return INGREDIENTS.filter(ing => {
      const matchesCategory = filter === 'All' || ing.category === filter
      const matchesSearch   =
        !normalized || ing.name.toLowerCase().includes(normalized)
      return matchesCategory && matchesSearch
    })
  }, [search, filter])

  return (
    <section className="space-y-4">
      {/* ── Search ──────────────────────────────────── */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search ingredients..."
      />

      {/* ── Category Tabs ───────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full
                        text-sm font-heading whitespace-nowrap
                        border-2 transition-all ${
              filter === key
                ? 'bg-gold text-ink border-ink shadow-md'
                : 'bg-parchment-dark text-ink/70 border-ink/20'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* ── Selection Counter ───────────────────────── */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-heading text-ink">
          ✨ {selected.length} selected
        </span>
        {selected.length > 0 && (
          <button
            onClick={clearIngredients}
            className="text-sm text-crimson hover:underline font-heading"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ── Ingredient Grid ─────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {visibleIngredients.map(ing => {
          const isSelected = selected.includes(ing.id.toLowerCase())
          return (
            <button
              key={ing.id}
              onClick={() => toggleIngredient(ing.id)}
              className={`adventure-card p-3 text-center text-sm
                          font-body transition-all active:scale-95 ${
                isSelected
                  ? 'ring-2 ring-gold bg-gold/20 shadow-lg'
                  : 'hover:border-gold/50'
              }`}
            >
              <div className="font-semibold truncate">{ing.name}</div>
              <div className="text-xs text-ink/50 mt-0.5">{ing.category}</div>
            </button>
          )
        })}

        {visibleIngredients.length === 0 && (
          <p className="col-span-full text-center text-ink/50 py-8">
            No ingredients found for "{search}"
          </p>
        )}
      </div>
    </section>
  )
}