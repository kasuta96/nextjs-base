'use client'

import { ChartBarIcon } from '@heroicons/react/24/outline'

export type Item = {
  name: string
  slug: string
  description?: string
  icon?: any
}

export const sidebar: { name: string; items: Item[] }[] = [
  {
    name: 'Dashboard',
    items: [
      {
        name: 'Dashboard',
        slug: 'dashboard',
        icon: <ChartBarIcon />,
      },
    ],
  },
]
