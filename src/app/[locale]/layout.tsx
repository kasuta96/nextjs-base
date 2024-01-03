import "@/app/globals.css"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/menu/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { env } from "~/env.mjs"

export const metadata: Metadata = {
  title: {
    default: `${env.NEXT_PUBLIC_APP_NAME}`,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: "",
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    console.log(error)
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
