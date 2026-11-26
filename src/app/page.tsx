import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { makeQueryClient } from '@/lib/query-client'
import { getHomeContent, getNews } from '@/lib/server/content'
import { HomePage } from '@/views/home'
import { siteConfig } from '@/config/site'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent()
  return {
    title: { absolute: `Home | ${siteConfig.name}` },
    description: content.description,
  }
}

export default async function Page() {
  const client = makeQueryClient()
  await Promise.all([
    client.fetchQuery({ queryKey: ['home-content'], queryFn: getHomeContent }),
    client.fetchQuery({ queryKey: ['news'], queryFn: getNews }),
  ])
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <HomePage />
    </HydrationBoundary>
  )
}
