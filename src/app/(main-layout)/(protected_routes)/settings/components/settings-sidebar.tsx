'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/shared'

interface SettingsProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SettingSidebarNav({ className, items }: SettingsProps) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'flex min-[1100px]:flex-col min-[1100px]:space-x-0 min-[1100px]:space-y-1',
        className,
      )}
    >
      {items.map((item) => (
        <Link href={item.href} key={item.title}>
          <Button
            key={item.href}
            variant='ghost'
            className={cn(
              pathname.includes(item.href)
                ? 'bg-blue-50 hover:bg-blue-50'
                : 'bg-transparent hover:bg-muted',
              'justify-start min-[1100px]:w-full',
            )}
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
