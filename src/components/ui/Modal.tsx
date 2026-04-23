'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  isOpen:   boolean
  onClose:  () => void
  title?:   string
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else        document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center
                 bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="adventure-card w-full max-w-md p-6 animate-in fade-in
                   slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink/60 hover:text-ink p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}