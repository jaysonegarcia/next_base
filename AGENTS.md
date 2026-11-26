# Next Starter instructions

## Stack and commands

- Next.js App Router, React, TypeScript, Tailwind v4, shadcn/ui with Radix, TanStack Query v5.
- Use Node 22.22+ on 22.x or 24+ and Yarn Classic 1.22.22 (packageManager is pinned).
- Install with `yarn install --frozen-lockfile`. Commit yarn.lock. Do not create package-lock.json.
- `yarn dev`, `yarn build`, `yarn start` (production).
- After edits run `yarn format` and `yarn run check` (lint, formatting, Next route type generation, TypeScript, production build).
- Use `yarn run check`, not `yarn check` (a different built-in Yarn Classic command).
- No unit-test framework is installed; verify affected browser/API flows and accurately name checks performed.

## Conventions

- Route files live in src/app. Next.js special files require default exports; other components use named exports.
- Reusable components use PascalCase folders and matching filenames. Use @/ imports, two spaces, single quotes, no semicolons.
- Server Components by default; use client boundaries for hooks, event handlers, and Radix primitives.
- Await params/searchParams in server routes. Use next/link, next/image, next/font, and the metadata API.
- Theme tokens live in src/app/globals.css; Tailwind v4 has no JS config. shadcn settings live in components.json with rsc enabled.
- Move shadcn CLI flat files to the PascalCase folder convention and fix imports.
- Keep visible focus states, skip navigation, accessible labels, mobile layout, and reduced-motion rules.

## Data and cache

- public/data/home.json and news.json are demo content. Everything in public is public; never store secrets there.
- src/lib/server/content.ts is the server-only source adapter. Server routes call it directly, not their own API over HTTP.
- Browser hooks use TanStack Query and /api/home, /api/news, /api/news/[slug]. Keep runtime validation aligned with types.
- Home and News prefetch on the server into request-local QueryClients and hydrate the browser cache. Never share a server QueryClient between requests.
- Query defaults: staleTime 60 seconds, retry 1. Keys: ['home-content'], ['news'], ['news', slug]. Pass AbortSignal to fetch.
- Article pages use Server Components, generateMetadata, and notFound(). Client article query hook is available for future interactive views.
- Year filter uses ?year=YYYY, descending years from data; unknown years show All. Dates are UTC.
- Backend integration: replace the server loaders, preserve validation, choose fetch caching explicitly. Update both Next.js and TanStack Query caches after future writes.
- Contact is a local validation demo; it never sends or stores messages.
- Local UI state stays local. Add Redux Toolkit only when shared client-state requirements justify it.

## UI design and AI tools

- Before UI work load both frontend-design and ui-ux-pro-max. Local copies live in .opencode/skills; if unavailable read SKILL.md there and report missing files.
- Run UI/UX searches with `python3 .opencode/skills/ui-ux-pro-max/scripts/search.py` and `--stack nextjs`.
- Preserve the existing Geist/teal style when adapting examples.
- CLAUDE.md imports this file; keep shared AI instructions, .opencode, and .serena/project.yml trackable. Ignore generated caches and machine-local overrides.
- Do not copy Vite SPA rewrite rules into Next.js deployments. Vercel detects the framework; self-host with yarn build and yarn start.
