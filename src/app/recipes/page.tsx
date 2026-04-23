'use client'

import { useRecipeLoader } from '@/hooks/useRecipeLoader'
import { useCraftStore } from '@/store/craftStore'
import { SearchBar } from '@/components/ui/SearchBar'
import { useState, useMemo } from 'react'
import { RecipeImage } from '@/components/ui/RecipeImage'
import Link from 'next/link'

export default function RecipesPage() {
  useRecipeLoader()
  const recipes = useCraftStore(s => s.cachedRecipes)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase().trim()
    if (!normalized) return recipes
    return recipes.filter(r => r.name.toLowerCase().includes(normalized))
  }, [recipes, search])

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 flex flex-col">
      <header className="px-4 py-3 border-b-2 border-ink/10 bg-parchment-dark/50 space-y-3">
        <div>
          <h1 className="text-2xl font-heading font-bold">📖 Recipe Atlas</h1>
          <p className="text-ink/70 text-xs">Browse all discovered recipes.</p>
        </div>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search recipes..."
        />
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-4 py-4">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map(r => (
            <Link
              key={r.id}
              href={`/recipes/${r.id}`}
              className="adventure-card overflow-hidden block"
            >
              <div className="relative h-32">
                <RecipeImage
                  src={r.imageUrl}
                  alt={r.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
              </div>
              <div className="p-2">
                <h3 className="font-heading font-bold text-sm truncate">{r.name}</h3>
                <p className="text-xs text-ink/60">{r.area} · {r.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}