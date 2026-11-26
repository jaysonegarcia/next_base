import type { Metadata } from 'next'
import { ContactPage } from '@/views/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Try the demo contact form. No messages are sent or stored.',
}
export default function Page() {
  return <ContactPage />
}
