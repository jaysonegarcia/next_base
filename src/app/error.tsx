'use client'

import { Button } from '@/components/ui/Button/Button'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Unable to load this page</h1>
      <p role="alert">Please try again.</p>
      <Button onClick={reset} className="h-11 px-5">
        Try again
      </Button>
    </section>
  )
}
