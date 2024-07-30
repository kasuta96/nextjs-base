import "@/app/globals.css"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/menu/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { env } from "~/env.mjs"
import NextTopLoader from "nextjs-toploader"
import { SiteHeader } from "@/components/layout/site-header"
import { getCurrentUser } from "@/lib/session"
import { SiteFooter } from "@/components/layout/site-footer"
import { TooltipProvider } from "@/components/ui/tooltip"

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
    console.error(error)
    notFound()
  }
  const user = await getCurrentUser()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextTopLoader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider delayDuration={300}>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader user={user} />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster
          richColors
          closeButton
          expand={false}
          position="bottom-right"
        />
      </body>
    </html>
  )
}
