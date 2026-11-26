import 'server-only'
import { cache } from 'react'
import home from '../../../public/data/home.json'
import news from '../../../public/data/news.json'
import { isHomeContent } from '@/lib/home-content'
import { isNewsResponse } from '@/lib/news'

// Replace these loaders with backend fetches or database calls. Do not fetch
// this application's own Route Handlers from Server Components.
export const getHomeContent = cache(async () => {
  if (!isHomeContent(home)) throw new Error('Invalid home content.')
  return home
})

export const getNews = cache(async () => {
  if (!isNewsResponse(news)) throw new Error('Invalid news content.')
  return [...news.articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
})

export const getNewsArticle = cache(async (slug: string) => {
  const articles = await getNews()
  return articles.find((article) => article.slug === slug) ?? null
})
