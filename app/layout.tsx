import './globals.css'
import { Metadata } from 'next'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
