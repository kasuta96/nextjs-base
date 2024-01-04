"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PermissionsForm from "./permissions-form"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function RoleCreate({ write }: { write: boolean }) {
  const t = useTranslations("common")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("Create new")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Create new")}</DialogTitle>
          </DialogHeader>
          <PermissionsForm setOpen={setOpen} write={write} />
        </DialogContent>
      </Dialog>
    </>
  )
}
