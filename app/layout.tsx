import './globals.css'
import { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Next.js App',
    template: '%s | Next.js App',
  },
  description: 'description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
