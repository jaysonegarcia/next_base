import { useQuery } from '@tanstack/react-query'
import { fetchHomeContent } from '@/lib/home-content'

export function useHomeContent() {
  return useQuery({
    queryKey: ['home-content'],
    queryFn: ({ signal }) => fetchHomeContent(signal),
  })
}
