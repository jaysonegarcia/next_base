export type NewsArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  body: string[]
}

export type NewsResponse = {
  articles: NewsArticle[]
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isIsoDate(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    isoDatePattern.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
  )
}

export function isNewsArticle(value: unknown): value is NewsArticle {
  return (
    isRecord(value) &&
    typeof value.slug === 'string' &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) &&
    typeof value.title === 'string' &&
    typeof value.excerpt === 'string' &&
    typeof value.category === 'string' &&
    isIsoDate(value.publishedAt) &&
    Array.isArray(value.body) &&
    value.body.every((paragraph: unknown) => typeof paragraph === 'string')
  )
}

// TypeScript cannot validate network responses at runtime. Check the JSON shape
// before rendering it so an invalid response shows the error UI instead of crashing.
export function isNewsResponse(value: unknown): value is NewsResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.articles) &&
    value.articles.every(isNewsArticle) &&
    new Set(value.articles.map((article) => article.slug)).size ===
      value.articles.length
  )
}

export async function fetchNews(signal: AbortSignal): Promise<NewsArticle[]> {
  // Client queries use Route Handlers; server pages call the data source directly.
  const response = await fetch('/api/news', {
    signal,
  })

  // fetch() only rejects network failures, not HTTP errors such as 404 or 500.
  if (!response.ok) {
    throw new Error(`News request failed (HTTP ${response.status}).`)
  }

  const data: unknown = await response.json()
  if (!isNewsResponse(data)) {
    throw new Error('News content has an unexpected format.')
  }

  return [...data.articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
}

export async function fetchNewsArticle(
  slug: string,
  signal: AbortSignal,
): Promise<NewsArticle | null> {
  const response = await fetch(`/api/news/${encodeURIComponent(slug)}`, {
    signal,
  })
  if (response.status === 404) return null
  if (!response.ok)
    throw new Error(`Article request failed (HTTP ${response.status}).`)
  const data: unknown = await response.json()
  if (!isNewsArticle(data)) throw new Error('Article has an unexpected format.')
  return data
}

export function getNewsYears(articles: NewsArticle[]): number[] {
  const years = articles.map((article) =>
    Number(article.publishedAt.slice(0, 4)),
  )

  return [...new Set(years)].sort((a, b) => b - a)
}

export function filterNewsByYear(
  articles: NewsArticle[],
  year: number | null,
): NewsArticle[] {
  if (year === null) return articles

  return articles.filter(
    (article) => Number(article.publishedAt.slice(0, 4)) === year,
  )
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

// Dates are stored as YYYY-MM-DD, so parse and format them as UTC to avoid
// shifting the day in timezones behind UTC.
export function formatNewsDate(publishedAt: string): string {
  return dateFormatter.format(new Date(`${publishedAt}T00:00:00Z`))
}
