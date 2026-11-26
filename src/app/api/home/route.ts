import { getHomeContent } from '@/lib/server/content'

export async function GET() {
  return Response.json(await getHomeContent())
}
