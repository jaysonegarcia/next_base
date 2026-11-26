import Link from 'next/link'
import Image from 'next/image'
import workspace from '@/assets/workspace.jpg'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'

const steps = [
  {
    title: 'Add your identity',
    body: 'Change the name, navigation, and email in src/config/site.ts. Update metadata in src/app/layout.tsx and the favicon for your brand.',
  },
  {
    title: 'Build your first screen',
    body: 'Create src/app/projects/page.tsx. Next.js creates the route from the folder; the shared layout comes along automatically.',
  },
  {
    title: 'Make the design your own',
    body: 'Edit the theme tokens in src/app/globals.css, then add components with the shadcn CLI whenever you need them.',
  },
  {
    title: 'Check it and deploy',
    body: 'Run yarn run check, push your project to Git, and import it into Vercel. The README walks through the details.',
  },
]

export function AboutPage() {
  return (
    <div className="space-y-14">
      <PageHeading
        title="A foundation, not a framework to learn."
        description="This is your About page template. Use it to share your story, introduce your team, or explain what you’re building. For now, here’s how to get started."
      />
      <figure className="space-y-3">
        <Image
          src={workspace}
          alt="A bright shared workspace with desks, chairs, and indoor plants"
          sizes="(max-width: 1152px) 100vw, 1088px"
          placeholder="blur"
          className="aspect-[16/7] w-full rounded-xl object-cover"
        />
        <figcaption className="text-sm text-muted-foreground">
          A local image, sized and optimized with next/image. Photo from
          Unsplash.
        </figcaption>
      </figure>
      <section
        className="grid gap-10 border-t pt-10 md:grid-cols-[1fr_2fr]"
        aria-labelledby="next-heading"
      >
        <div>
          <h2
            id="next-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Make your first changes
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Small files. Clear names. Everything is yours to edit.
          </p>
        </div>
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-primary"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Button asChild variant="outline" className="h-11 px-5">
        <Link href="/contact">View the contact template</Link>
      </Button>
    </div>
  )
}
