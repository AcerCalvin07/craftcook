'use client'

import { Clock } from 'lucide-react'
import { MatchBadge } from '@/components/ui/MatchBadge'
import { RecipeImage } from '@/components/ui/RecipeImage'
import type { RankedRecipe } from '@/types'

interface Props {
  ranked:   RankedRecipe
  onClick?: (recipe: RankedRecipe) => void
}

// Estimate difficulty from step count
const getDifficulty = (stepCount: number) => {
  if (stepCount <= 3) return 'Easy'
  if (stepCount <= 6) return 'Medium'
  return 'Hard'
}

export const RecipeCard = ({ ranked, onClick }: Props) => {
  const { recipe, tier, matchedCount, totalCount, missing } = ranked

  return (
    <button
      onClick={() => onClick?.(ranked)}
      className="adventure-card w-full text-left overflow-hidden
                 hover:ring-2 hover:ring-gold/50 transition-all"
    >
      <div className="relative h-40 w-full">
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-2 right-2">
          <MatchBadge tier={tier} />
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-heading font-bold text-lg text-ink">
          {recipe.name}
        </h3>

        <div className="flex items-center gap-3 text-xs text-ink/60">
          <span>🌍 {recipe.area}</span>
          <span>📦 {recipe.category}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getDifficulty(recipe.steps.length)}
          </span>
        </div>

        <div className="text-xs text-ink/70">
          ✅ {matchedCount}/{totalCount} ingredients matched
        </div>

        {missing.length > 0 && (
          <div className="text-xs text-crimson">
            ❌ Missing: {missing.slice(0, 3).join(', ')}
            {missing.length > 3 && ` +${missing.length - 3} more`}
          </div>
        )}
      </div>
    </button>
  )
}