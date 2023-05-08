'use client'

import { ROUTE_DASHBOARD, ROUTE_USER } from '@/lib/constants/route'
import { LayoutDashboard, Users } from 'lucide-react'

export type Item = {
  name: string
  path: string
  description?: string
  icon?: any
}

export const sidebar: { name: string; items: Item[] }[] = [
  {
    name: 'Management Page',
    items: [
      {
        name: 'Dashboard',
        path: ROUTE_DASHBOARD,
        icon: <LayoutDashboard />,
      },
      {
        name: 'Users',
        path: ROUTE_USER,
        icon: <Users />,
      },
    ],
  },
]
