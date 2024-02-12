"use client"

import { Loader2, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Close } from "@radix-ui/react-dialog"
import { RoleData } from "./role-accordion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function RoleDelete({ role }: { role: RoleData }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const submitDelete = async () => {
    setIsDeleting(true)

    const response = await fetch(`/api/role/${role.id}`, {
      method: "DELETE",
    })

    setIsDeleting(false)

    if (!response?.ok) {
      return toast.error(t("notify.error"))
    }

    setOpen(false)
    toast.success(t("notify.deleteSuccess"))
    router.refresh()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Trash className="mr-2 h-4 w-4" /> {t("common.Delete")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{role?.name}</DialogTitle>
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
    </>
  )
}
