import Link from 'next/link'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'

export default function NotFound() {
  return (
    <div className="space-y-8">
      <PageHeading
        title="Page not found"
        description="This page doesn’t exist. Check the address or return home."
      />
      <Button asChild className="h-11 px-5">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
