'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectIconTrigger,
} from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { useMounted } from '@/lib/hook/use-mounted'
import { useTranslations } from 'next-intl'

const ThemeSwitch = () => {
  const mounted = useMounted()
  const { setTheme, resolvedTheme, theme = '' } = useTheme()
  const t = useTranslations('common')

  if (!mounted) {
    return null
  }

  const IconToUse = mounted && resolvedTheme === 'dark' ? Moon : Sun

  return (
    <Select
      defaultValue={resolvedTheme}
      onValueChange={(option: string) => setTheme(option)}
    >
      <SelectIconTrigger className="py-2">
        <IconToUse />
      </SelectIconTrigger>
      <SelectContent>
        <SelectItem value="light">{t('Light')}</SelectItem>
        <SelectItem value="dark">{t('Dark')}</SelectItem>
        <SelectItem value="system">{t('System')}</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ThemeSwitch
