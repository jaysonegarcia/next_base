import { useQuery } from '@tanstack/react-query'
import { fetchNews, fetchNewsArticle } from '@/lib/news'

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: ({ signal }) => fetchNews(signal),
  })
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: ({ signal }) => fetchNewsArticle(slug, signal),
  })
}
