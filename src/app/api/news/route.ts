import { getNews } from '@/lib/server/content'

export async function GET() {
  return Response.json({ articles: await getNews() })
}
