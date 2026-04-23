'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { BottomNav } from '@/components/layout/BottomNav'
import { AuthModal } from '@/components/auth/AuthModal'
import { OfflineBanner } from '@/components/layout/OfflineBanner'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    const unsubscribe = initAuth()
    return () => unsubscribe()
  }, [initAuth])

  return (
    <html lang="en">
      <body>
        <OfflineBanner />
        <main className="max-w-2xl mx-auto px-4 py-6 pb-24 min-h-screen">
          {children}
        </main>
        <BottomNav />
        <AuthModal />
      </body>
    </html>
  )
}