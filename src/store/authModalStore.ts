import { create } from 'zustand'

interface AuthModalState {
  isOpen:    boolean
  openAuth:  () => void
  closeAuth: () => void
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen:    false,
  openAuth:  () => set({ isOpen: true }),
  closeAuth: () => set({ isOpen: false }),
}))