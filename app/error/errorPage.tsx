'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  code,
  title,
  content,
}: {
  code: string
  title?: string
  content?: string
}) {
  return (
    <section className="max-w-screen-sm px-4 py-8 text-center lg:px-6 lg:py-16">
      <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-destructive lg:text-9xl">
        {code}
      </h1>
      <div className="text-left">
        <p className="mb-4 text-xl tracking-tight text-primary md:text-2xl">
          {title}
        </p>
        <p className="mb-4 text-lg font-light">{content}</p>
      </div>
      <a href="/">
        <Button>Back to Homepage</Button>
      </a>
    </section>
  )
}
