import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2, SaveIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export function SaveButton({
  loading,
  ...props
}: ButtonProps & {
  loading?: boolean
}) {
  const t = useTranslations()

  return (
    <Button type="submit" {...props}>
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <SaveIcon className="mr-2 h-4 w-4" />
      )}
      {t("common.Save")}
    </Button>
  )
}

export function LoadingButton({
  loading,
  children,
  ...props
}: ButtonProps & {
  loading?: boolean
  children?: React.ReactNode
}) {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
