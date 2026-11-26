import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { QueryProvider } from '@/components/providers/QueryProvider/QueryProvider'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { siteConfig } from '@/config/site'
import './globals.css'

const geist = localFont({
  src: '../assets/geist-latin.woff2',
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <QueryProvider>
          <div className="flex min-h-svh flex-col">
            <a
              href="#main-content"
              className="sr-only z-50 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 outline-none sm:px-8 sm:py-20"
            >
              {children}
            </main>
            <SiteFooter />
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
