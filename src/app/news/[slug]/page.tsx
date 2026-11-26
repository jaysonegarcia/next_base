import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { getNewsArticle } from '@/lib/server/content'
import { formatNewsDate } from '@/lib/news'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticle(slug)
  if (!article) notFound()
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticle(slug)
  if (!article) notFound()
  return (
    <article className="max-w-2xl space-y-8">
      <PageHeading title={article.title} description={article.excerpt}>
        <div className="flex flex-wrap gap-3 text-sm">
          <time
            dateTime={article.publishedAt}
            className="text-muted-foreground"
          >
            {formatNewsDate(article.publishedAt)}
          </time>
          <span className="font-medium text-primary">{article.category}</span>
        </div>
      </PageHeading>
      <div className="space-y-6 border-t pt-8 text-[1.0625rem] leading-8 text-pretty">
        {article.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <Link
        href="/news"
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        All news
      </Link>
    </article>
  )
}
