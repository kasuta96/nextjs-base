'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const t = useTranslations('error')

  return (
    <div className="mx-auto flex flex-col items-center justify-center text-center">
      <div className="space-y-2 p-4">
        <h2 className="text-destructive">{t('Something went wrong!')}</h2>
        <p className="text-xs text-muted">{error.message}</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {t('Try again')}
        </Button>
      </div>
    </div>
  )
}
