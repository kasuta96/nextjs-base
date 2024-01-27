import { Button } from "@/components/ui/button"
import { Loader2, SaveIcon } from "lucide-react"
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
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <SaveIcon className="mr-2 h-4 w-4" />
      )}
      {t("common.Save")}
    </Button>
  )
}
