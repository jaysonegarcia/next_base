import type { Metadata } from 'next'
import { AboutPage } from '@/views/about'

export const metadata: Metadata = {
  title: 'About',
  description: 'A Next.js foundation with useful defaults.',
}
export default function Page() {
  return <AboutPage />
}
