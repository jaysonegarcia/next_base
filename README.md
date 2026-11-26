# Next Starter

A reusable Next.js App Router boilerplate adapted from react_base: Home, About,
Contact demo, News with year filtering, dynamic article pages, and native 404s.
Geist, teal theme tokens, Tailwind CSS v4, shadcn/Radix, and TanStack Query v5.

## Start

Use Node 22.22+ (22.x) or 24+, and Yarn Classic 1.22.22:

```bash
nvm install
nvm use
corepack enable
yarn install --frozen-lockfile
yarn dev
```

Open http://localhost:3000. No credentials or environment variables required.
Rename the package in package.json when using this starter for a new project.
Keep yarn.lock committed; add dependencies with `yarn add`.

| Command          | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `yarn dev`       | Development server                           |
| `yarn build`     | Production build                             |
| `yarn start`     | Serve the production build                   |
| `yarn lint`      | ESLint, including Next.js rules              |
| `yarn typecheck` | Generate route types and check TypeScript    |
| `yarn format`    | Format source and sort Tailwind classes      |
| `yarn run check` | Lint, formatting check, typecheck, and build |

Use **yarn run check** explicitly: `yarn check` is Yarn Classic's dependency check,
not this project's verification script. No unit-test framework is installed.
ESLint 9 is used for compatibility with the React/import/accessibility plugins
currently included by eslint-config-next; upgrade these together.

## Structure

```text
public/data/                Home and news JSON, also publicly downloadable
src/app/                    File-based routes, layouts, metadata and boundaries
  page.tsx                  Home, server prefetch + query hydration
  news/page.tsx             News list with ?year=2026 filter
  news/[slug]/page.tsx      Server-rendered article and metadata
  api/                      Read-only JSON Route Handlers
  globals.css               Tailwind v4 theme tokens and global styles
src/views/                  Page content components
src/components/             PascalCase folders, shadcn UI, layouts, provider
src/hooks/                  Client TanStack Query wrappers
src/lib/server/content.ts   Server-only JSON adapter; swap for your backend here
src/lib/                    Runtime validators, browser fetchers, query client
src/assets/                 Local font/license and image example
src/config/site.ts          Site identity, navigation, contact email
```

Use named exports except Next.js special route files, which need default exports.
Use `@/` imports. Reusable components have matching folders and filenames, e.g.
`src/components/ui/Button/Button.tsx`. Keep related primitives in one file.

## Next.js built-ins

- **next/image** is a component, not a hook. About demonstrates a statically
  imported local photo with intrinsic dimensions, blur placeholder, responsive
  sizes, and automatic image optimization. Replace src/assets/workspace.jpg.
- **next/font/local** serves the bundled Geist variable font without a Google
  request at build or runtime. The font license is included beside the file.
- **next/link** provides navigation and prefetching. **next/navigation** supplies
  usePathname/useSearchParams for active navigation and shareable year filters.
- **Metadata API** supplies page titles/descriptions; articles use
  generateMetadata. PageHeading only renders visible content.
- **Server Components** load initial data; loading.tsx, error.tsx and
  not-found.tsx cover route states. Article pages call notFound() for missing slugs.

Add a route by creating `src/app/projects/page.tsx`; no React Router registration
is needed. Add navigation links in src/config/site.ts. Server params and
searchParams are asynchronous in modern Next.js: await them.

## Data and TanStack Query

The demo keeps content in public/data/home.json and news.json. News uses
`{ "articles": [...] }`, with unique URL-safe slugs, title, excerpt, category,
publishedAt (a real YYYY-MM-DD date), and body (plain-text paragraph array).
Articles are sorted newest-first. Home shows the latest three; unknown year
filters show All. Dates are formatted in UTC.

```text
JSON → validated server loader → Server Component → hydrated Query cache → UI
                             → /api/* → browser query refresh → validation → UI
```

Server Components call src/lib/server/content.ts directly. They do not make
HTTP calls to their own API. The browser uses native fetch in src/lib through
thin useQuery hooks. TanStack Query manages caching, status, retries and request
cancellation; it does not replace fetch or runtime validation.

Query defaults are a 60-second stale time and one automatic retry. Home and the
News list share ['news']; Home copy uses ['home-content']. The optional
useNewsArticle(slug) hook uses ['news', slug] and /api/news/[slug]; the current
article page is a Server Component for metadata and native not-found behavior.
Server caches are request-local; only the browser QueryClient is reused.
Inactive queries use the library's default five-minute garbage collection.

GET endpoints: `/api/home`, `/api/news`, `/api/news/:slug` (404 if missing).
To use a real backend, replace the server loaders with validated fetches or
database calls. Choose cache/revalidation behavior explicitly. Browser refreshes
and server rendering then continue to share the same source adapter. Do not put
server credentials in client components or NEXT_PUBLIC variables.

After a future mutation, invalidate the relevant query keys, for example
`queryClient.invalidateQueries({ queryKey: ['news'] })`. If server-rendered data
is cached too, invalidate its Next.js cache and refresh the route as appropriate;
invalidating a browser query alone does not invalidate Next.js caches.

JSON is imported by the server adapter, so editing deployed sample content
requires a rebuild/redeploy. public/ content is public and must contain no secrets.

## Styling and components

Tailwind v4 uses src/app/globals.css, not tailwind.config.js. Change :root theme
values and @theme mappings there. Dark tokens exist, but no theme switcher is
installed. shadcn components.json enables RSC and points at globals.css.
Run `yarn shadcn add dialog` for another component; move generated flat filenames
into the existing PascalCase folder convention and update imports.

The contact form validates locally and previews submission. It sends and stores
nothing. Add an actual integration before claiming message delivery.

## Deploy and verify

For Vercel, select the Next.js framework preset, install with
`yarn install --frozen-lockfile`, and build with `yarn build`. Keep the default
Next.js output settings. There is no Vite dist directory or SPA fallback rewrite.
For a Node server: `yarn build` then `yarn start`. Static export is not configured;
Route Handlers and image optimization need the Next.js server.

Run `yarn run check`, then check Home highlights, year links, direct article URLs,
missing articles, API responses, contact validation and mobile layout. To exercise
browser retry states, force an API refresh after the cache becomes stale while
blocking /api/news, then unblock and retry. Next.js server-load failures use the
route error boundary separately from browser query errors.

## AI tools and credits

AGENTS.md is the source of project instructions; CLAUDE.md imports it. Shared
OpenCode design skills and reviewer configuration live in .opencode; Serena is
configured for TypeScript in .serena/project.yml. Generated caches stay ignored.

The local workspace photo is from Unsplash:
https://images.unsplash.com/photo-1497366754035-f200968a6e72
([Unsplash license](https://unsplash.com/license)). Replace the sample photo when
customizing your project. Geist is distributed under the included SIL OFL license.
