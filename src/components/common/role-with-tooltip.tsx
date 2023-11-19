import { Role } from "@prisma/client"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "../ui/badge"

export default function RoleWithTooltip({ roles }: { roles: Role[] }) {
  return (
    <>
      {roles.length ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-1">
                <div className="max-w-[100px] truncate">{roles[0].name}</div>
                {roles.length > 1 && (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    +{roles.length - 1}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="space-y-4 p-4">
              {roles.map((role) => (
                <div key={role.id}>
                  <div className="font-semibold">{role.name}</div>
                  <div className="text-muted-foreground">{role.remarks}</div>
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        "-"
      )}
    </>
  )
}
