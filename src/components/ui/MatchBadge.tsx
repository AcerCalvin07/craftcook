import type { MatchTier } from '@/types'

const TIER_CONFIG: Record<
  MatchTier,
  { label: string; icon: string; className: string }
> = {
  perfect: {
    label: 'PERFECT',
    icon: '⚔️',
    className: 'bg-tier-perfect text-ink',
  },
  almost: {
    label: 'ALMOST',
    icon: '🗺️',
    className: 'bg-tier-almost text-parchment',
  },
  partial: {
    label: 'PARTIAL',
    icon: '🧭',
    className: 'bg-tier-partial text-parchment',
  },
  distant: {
    label: 'DISTANT',
    icon: '🌫️',
    className: 'bg-tier-distant text-parchment',
  },
}

export const MatchBadge = ({ tier }: { tier: MatchTier }) => {
  const config = TIER_CONFIG[tier]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded
                  text-xs font-heading font-bold ${config.className}`}
    >
      {config.icon} {config.label}
    </span>
  )
}