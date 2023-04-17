'use client'

import { ChartBarIcon, UsersIcon } from '@heroicons/react/24/outline'

export type Item = {
  name: string
  slug: string
  description?: string
  icon?: any
}

export const sidebar: { name: string; items: Item[] }[] = [
  {
    name: 'Management',
    items: [
      {
        name: 'Dashboard',
        slug: 'dashboard',
        icon: <ChartBarIcon />,
      },
      {
        name: 'Users',
        slug: 'user',
        icon: <UsersIcon />,
      },
    ],
  },
]
