import { SystemRole } from "@prisma/client"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ShowTranslate } from "./show-text"
import { User } from "@/lib/validations/user"

export default function RoleWithTooltip({
  userRoles,
  systemRole,
}: {
  userRoles: User["userRoles"]
  systemRole?: SystemRole
}) {
  return (
    <>
      {systemRole === "ADMIN" ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{systemRole}</span>
          </TooltipTrigger>
          <TooltipContent className="space-y-4 p-4">
            <span>{ShowTranslate("common", "Admin permissions")}</span>
          </TooltipContent>
        </Tooltip>
      ) : userRoles.length ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-1">
              <div className="max-w-[100px] truncate">
                {userRoles[0]?.role.name}
              </div>
              {userRoles.length > 1 && (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  +{userRoles.length - 1}
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="space-y-4 p-4">
            {userRoles.map((role) => (
              <div key={role.role.name}>
                <div className="font-semibold">{role.role.name}</div>
                <div className="max-w-64 truncate text-muted-foreground">
                  {role.role.remarks}
                </div>
              </div>
            ))}
          </TooltipContent>
        </Tooltip>
      ) : (
        "-"
      )}
    </>
  )
}
