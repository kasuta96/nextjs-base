'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('error')

  return (
    <>
      <div className="space-y-2 p-4 text-center">
        <h2 className="text-destructive">{t('Something went wrong!')}</h2>
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
      <div></div>
    </>
  )
}
