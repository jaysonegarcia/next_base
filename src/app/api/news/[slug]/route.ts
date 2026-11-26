import { getNewsArticle } from '@/lib/server/content'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const article = await getNewsArticle(slug)
  return article
    ? Response.json(article)
    : Response.json({ message: 'Article not found' }, { status: 404 })
}
