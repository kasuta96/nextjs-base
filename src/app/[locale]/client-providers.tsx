'use client'

import { ThemeProvider } from 'next-themes'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}
