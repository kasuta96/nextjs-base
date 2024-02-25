"use client"

// import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import {
  ListCollapse,
  Loader2,
  MoreHorizontal,
  Option,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/lib/validations/user"
import Link from "@/components/common/link"
import { ROUTE_USER } from "@/lib/constants/route"
import { userStatus } from "@/lib/constants/option"
import { ShowTranslate } from "@/components/common/show-text"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Close } from "@radix-ui/react-dialog"
import { useState } from "react"

export function UserRowActions({
  user,
  write,
}: {
  user: User
  write?: boolean
}) {
  const t = useTranslations()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const onChangeUserStatus = async (val: string) => {
    if (user.status == val) return

    toast.promise(
      new Promise(async (resolve, reject) => {
        const res = await fetch(`/api/user/${user.id}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: val,
          }),
        })

        if (res.ok) {
          resolve(val)
          router.refresh()
        } else {
          reject()
        }
      }),
      {
        loading: t("notify.updatingSomething", { target: t("user.status") }),
        success: t("notify.updateSuccess"),
        error: t("notify.error"),
      }
    )
  }

  const submitDelete = async () => {
    setIsDeleting(true)
    const res = await fetch(`/api/user/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
    setIsDeleting(false)
    if (!res?.ok) {
      return toast.error(t("notify.error"))
    }
    setOpen(false)
    toast.success(t("notify.deleteSuccess"))
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <Link href={`${ROUTE_USER}/${user.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              <ListCollapse className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              {t("common.Detail")}
            </DropdownMenuItem>
          </Link>
          {write && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("common.Actions")}</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Option className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
                  {t("user.status")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={user.status}
                    onValueChange={(val: string) => onChangeUserStatus(val)}
                  >
                    {userStatus.map((s) => (
                      <DropdownMenuRadioItem
                        key={s.value}
                        value={s.value}
                        className="cursor-pointer"
                      >
                        {ShowTranslate("user", s.label)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
                  {t("common.Delete")}
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">{t("notify.deleteConfirm")}</div>
          <div className="flex items-center justify-end space-x-2">
            <Close asChild>
              <Button variant="outline">{t("common.Close")}</Button>
            </Close>
            <Button variant="destructive" onClick={submitDelete}>
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}{" "}
              {t("common.Delete")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
