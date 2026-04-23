'use client'

import { useState } from 'react'
import { Edit2, Save, X } from 'lucide-react'
import { updateRecipeNotes } from '@/lib/firebase/firestore'

interface Props {
  userId:       string
  recipeId:     string
  initialNotes: string
}

export const NotesEditor = ({ userId, recipeId, initialNotes }: Props) => {
  const [editing, setEditing]     = useState(false)
  const [notes, setNotes]         = useState(initialNotes)
  const [draft, setDraft]         = useState(initialNotes)
  const [saving, setSaving]       = useState(false)
  const [prevInitial, setPrevInitial] = useState(initialNotes)

  if (initialNotes !== prevInitial) {
    setPrevInitial(initialNotes)
    setNotes(initialNotes)
    setDraft(initialNotes)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateRecipeNotes(userId, recipeId, draft)
      setNotes(draft)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setDraft(notes)
    setEditing(false)
  }

  return (
    <section className="adventure-card p-4">
      <header className="flex items-center justify-between mb-2">
        <h3 className="font-heading font-bold text-lg">📝 Field Notes</h3>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-ink/60 hover:text-gold p-1"
            aria-label="Edit notes"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </header>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your field notes..."
            rows={4}
            className="w-full bg-parchment border-2 border-ink/20
                       rounded-lg p-3 font-body text-sm
                       focus:outline-none focus:border-gold resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="gold-button flex items-center gap-1 text-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-sm
                         text-ink/70 hover:text-ink px-3 py-1.5"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : notes ? (
        <p className="text-sm text-ink/80 italic whitespace-pre-wrap">
          &ldquo;{notes}&rdquo;
        </p>
      ) : (
        <p className="text-sm text-ink/40 italic">
          No field notes yet. Tap the edit icon to add some.
        </p>
      )}
    </section>
  )
}