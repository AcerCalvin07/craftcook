'use client'

import { useAuthStore } from '@/store/authStore'

export default function NotesPage() {
  const user = useAuthStore(s => s.user)

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-heading font-bold">📝 Explorers Journal</h1>
      </header>

      {!user ? (
        <div className="adventure-card p-8 text-center">
          <p className="font-heading text-lg">🔒 Your journal is empty</p>
          <p className="text-sm text-ink/60 mt-2">
            Login to save recipes and write field notes.
          </p>
        </div>
      ) : (
        <div className="adventure-card p-8 text-center">
          <p className="text-ink/70">No saved recipes yet. Start crafting!</p>
        </div>
      )}
    </div>
  )
}