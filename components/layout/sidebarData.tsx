'use client'

import { LayoutDashboard, Users } from 'lucide-react'

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
        icon: <LayoutDashboard />,
      },
      {
        name: 'Users',
        slug: 'dashboard/user',
        icon: <Users />,
      },
    ],
  },
]
