'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface Props {
  number:  number
  content: string
}

export const CollapsibleStep = ({ number, content }: Props) => {
  const [open, setOpen] = useState(false)

  // Derive short title from first sentence of content
  const title = content.split(/[.!?]/)[0].slice(0, 50)

  return (
    <div className="adventure-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 p-3
                   text-left hover:bg-parchment transition-colors"
      >
        <ChevronRight
          className={`w-4 h-4 transition-transform ${
            open ? 'rotate-90' : ''
          }`}
        />
        <span className="font-heading font-bold text-gold">
          Step {number}:
        </span>
        <span className="text-sm text-ink/80 truncate">{title}...</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-ink/90 leading-relaxed border-t border-ink/10">
          {content}
        </div>
      )}
    </div>
  )
}