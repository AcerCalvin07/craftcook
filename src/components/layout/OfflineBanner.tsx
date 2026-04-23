'use client'

import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus()
  if (isOnline) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[90]
                 bg-crimson text-parchment py-2 px-4
                 flex items-center justify-center gap-2 text-sm
                 font-heading shadow-md"
    >
      <WifiOff className="w-4 h-4" />
      You are offline — showing cached recipes
    </div>
  )
}