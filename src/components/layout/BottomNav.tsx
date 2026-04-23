'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Hammer, BookOpen, Home, StickyNote, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/craft',    label: 'Craft',    Icon: Hammer },
  { href: '/recipes',  label: 'Recipes',  Icon: BookOpen },
  { href: '/',         label: 'Home',     Icon: Home },
  { href: '/notes',    label: 'Notes',    Icon: StickyNote },
  { href: '/settings', label: 'Settings', Icon: Settings },
]

export const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-parchment-dark border-t-2 border-ink/20
                 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
    >
      <ul className="flex justify-around items-center h-16 max-w-2xl mx-auto">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    active ? 'text-gold' : 'text-ink/60'
                  }`}
                />
                <span
                  className={`text-xs font-heading ${
                    active ? 'text-gold font-bold' : 'text-ink/60'
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <span className="w-1 h-1 bg-gold rounded-full" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}