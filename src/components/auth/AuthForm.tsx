'use client'

import { useState } from 'react'
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from '@/lib/firebase/auth'

interface Props {
  onSuccess?: () => void
}

export const AuthForm = ({ onSuccess }: Props) => {
  const [mode, setMode]         = useState<'login' | 'signup'>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  // ── Submit Handler ────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password)
      } else {
        await signUpWithEmail(email, password)
      }
      onSuccess?.()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Authentication failed'
      setError(msg.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  // ── Google Sign In ────────────────────────────────────
  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      onSuccess?.()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google sign in failed'
      setError(msg.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink/70">
        {mode === 'login'
          ? 'Sign in to save recipes & write field notes.'
          : 'Create an account to begin your journey.'}
      </p>

      {/* ── Google Sign In ────────────────────────── */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full bg-parchment border-2 border-ink/30
                   rounded-lg py-2 font-heading hover:bg-parchment-dark
                   transition-colors disabled:opacity-50"
      >
        🌐 Continue with Google
      </button>

      <div className="flex items-center gap-2 text-xs text-ink/50">
        <div className="flex-1 border-t border-ink/20" />
        <span>OR</span>
        <div className="flex-1 border-t border-ink/20" />
      </div>

      {/* ── Email / Password Form ─────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full bg-parchment border-2 border-ink/20
                     rounded-lg py-2 px-3 font-body
                     focus:outline-none focus:border-gold"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={6}
          className="w-full bg-parchment border-2 border-ink/20
                     rounded-lg py-2 px-3 font-body
                     focus:outline-none focus:border-gold"
        />

        {error && (
          <p className="text-crimson text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="gold-button w-full disabled:opacity-50"
        >
          {loading
            ? 'Loading...'
            : mode === 'login' ? '⚔️ Sign In' : '🗺️ Sign Up'}
        </button>
      </form>

      {/* ── Mode Switch ───────────────────────────── */}
      <p className="text-sm text-center text-ink/70">
        {mode === 'login' ? "New explorer?" : 'Already have an account?'}
        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="ml-1 text-gold font-heading font-bold hover:underline"
        >
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  )
}