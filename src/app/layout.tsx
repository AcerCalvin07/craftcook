'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initAuth = useAuthStore((s) => s.initAuth)

  // Start listening to Firebase auth state on app load
  useEffect(() => {
    const unsubscribe = initAuth()
    return () => unsubscribe()
  }, [initAuth])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}