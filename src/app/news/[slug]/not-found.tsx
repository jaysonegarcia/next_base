import Link from 'next/link'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'

export default function NotFound() {
  return (
    <div className="space-y-8">
      <PageHeading
        title="Article not found"
        description="We couldn’t find this article. It may have moved, or the address may be wrong."
      />
      <Button asChild className="h-11 px-5">
        <Link href="/news">Back to news</Link>
      </Button>
    </div>
  )
}
