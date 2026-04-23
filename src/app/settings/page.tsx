'use client'

import { useAuthStore } from '@/store/authStore'
import { logOut } from '@/lib/firebase/auth'

export default function SettingsPage() {
  const user = useAuthStore(s => s.user)

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-heading font-bold">⚙️ Settings</h1>
      </header>

      <section className="adventure-card p-4 space-y-2">
        <h2 className="font-heading font-bold">👤 Account</h2>
        {user ? (
          <>
            <p className="text-sm text-ink/70">{user.email}</p>
            <button onClick={logOut} className="gold-button">Sign Out</button>
          </>
        ) : (
          <p className="text-sm text-ink/70">Browsing as guest</p>
        )}
      </section>

      <section className="adventure-card p-4">
        <h2 className="font-heading font-bold mb-2">ℹ️ About</h2>
        <p className="text-xs text-ink/60">CraftCook v1.0.0</p>
        <p className="text-xs text-ink/60">Powered by TheMealDB</p>
      </section>
    </div>
  )
}