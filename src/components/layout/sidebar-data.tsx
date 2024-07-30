"use client"

import {
  ROUTE_DASHBOARD,
  ROUTE_ROLE,
  ROUTE_TEAM,
  ROUTE_USER,
} from "@/lib/constants/route"
import { Handshake, LayoutDashboard, UserCog, Users } from "lucide-react"
import { SessionUser } from "~/types/next-auth"

export type Item = {
  name: string
  path: string
  description?: string
  icon?: any
}

export function SidebarData(user: SessionUser) {
  // Management area
  // Public
  let management: Item[] = [ITEM_DASHBOARD]
  // Private
  if (user.allPermission.read.includes("user") || user.systemRole === "ADMIN") {
    management = [...management, ITEM_USER, ITEM_TEAM]
  }

  // Setting area
  // Public
  let setting: Item[] = []
  // Private
  if (user.allPermission.read.includes("role") || user.systemRole === "ADMIN") {
    setting = [...setting, ITEM_ROLE]
  }

  let sidebar: { name: string; items: Item[] }[] = [
    {
      name: "Management Page",
      items: management,
    },
    {
      name: "Setting",
      items: setting,
    },
  ]
  return sidebar
}

// List sidebar items

const ITEM_DASHBOARD = {
  name: "Dashboard",
  path: ROUTE_DASHBOARD,
  icon: <LayoutDashboard />,
}
const ITEM_USER = { name: "Users", path: ROUTE_USER, icon: <Users /> }
const ITEM_TEAM = { name: "Teams", path: ROUTE_TEAM, icon: <Handshake /> }
const ITEM_ROLE = { name: "Roles", path: ROUTE_ROLE, icon: <UserCog /> }
