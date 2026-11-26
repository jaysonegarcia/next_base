import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { makeQueryClient } from '@/lib/query-client'
import { getNews } from '@/lib/server/content'
import { NewsPage } from '@/views/news'

export const metadata: Metadata = {
  title: 'News',
  description: 'Notes, updates, and releases from the starter.',
}

export default async function Page() {
  // Render the URL-based year filter on the server, including on a direct visit.
  await connection()
  const client = makeQueryClient()
  await client.fetchQuery({ queryKey: ['news'], queryFn: getNews })
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Suspense fallback={<p role="status">Loading news…</p>}>
        <NewsPage />
      </Suspense>
    </HydrationBoundary>
  )
}
