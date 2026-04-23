'use client'

import { useAuthStore } from '@/store/authStore'

export default function HomePage() {
  const { user, loading } = useAuthStore()

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <h1>⚔️ CraftCook — Base Camp</h1>
      <p>
        {user
          ? `Welcome back, ${user.email}!`
          : 'You are browsing as a guest.'}
      </p>
    </main>
  )
}