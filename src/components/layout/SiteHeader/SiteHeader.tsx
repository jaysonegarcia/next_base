'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CodeXml } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CodeXml className="size-5" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-1"
        >
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-muted',
                  active
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
