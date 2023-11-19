"use client"

import { LogOut, Settings, User } from "lucide-react"
import {
  ROUTE_LOGOUT,
  ROUTE_PROFILE,
  ROUTE_PROFILE_SETTING,
} from "@/lib/constants/route"

type Item = {
  name: string
  path: string
  description?: string
  icon?: JSX.Element
}

export const userDropdownData: Item[][] = [
  [
    {
      name: "Profile",
      path: ROUTE_PROFILE,
      icon: <User className="mr-2 h-5 w-5" />,
    },
    {
      name: "Setting",
      path: ROUTE_PROFILE_SETTING,
      icon: <Settings className="mr-2 h-5 w-5" />,
    },
  ],
  [
    {
      name: "Logout",
      path: ROUTE_LOGOUT,
      icon: <LogOut className="mr-2 h-5 w-5" />,
    },
  ],
]
