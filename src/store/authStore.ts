import { create } from 'zustand'
import type { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/firebase/auth'

interface AuthState {
  user:        User | null
  loading:     boolean
  initialized: boolean
  setUser:     (user: User | null) => void
  initAuth:    () => () => void   // returns unsubscribe fn
}

export const useAuthStore = create<AuthState>((set) => ({
  user:        null,
  loading:     true,
  initialized: false,

  setUser: (user) => set({ user }),

  // Call once at app root — listens to Firebase auth state
  initAuth: () => {
    const unsubscribe = onAuthChange((user) => {
      set({ user, loading: false, initialized: true })
    })
    return unsubscribe
  },
}))