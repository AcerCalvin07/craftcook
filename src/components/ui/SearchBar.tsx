'use client'

import { Search, X } from 'lucide-react'

interface Props {
  value:       string
  onChange:    (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder }: Props) => (
  <div className="relative w-full">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2
                 w-4 h-4 text-ink/50"
    />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? 'Search...'}
      className="w-full bg-parchment-dark border-2 border-ink/20
                 rounded-lg py-2 pl-10 pr-10 font-body text-ink
                 focus:outline-none focus:border-gold transition-colors"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-ink/50 hover:text-ink"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
)