import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

export default function SaveButton({
  loading,
  disabled,
  ...props
}: {
  loading?: boolean
  disabled?: boolean
}) {
  const t = useTranslations()

  return (
    <Button type="submit" disabled={disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {t("common.Save")}
    </Button>
  )
}
