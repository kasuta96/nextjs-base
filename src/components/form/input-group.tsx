import { FieldError } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const InputGroup = ({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: FieldError | undefined
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <div className="flex items-center space-x-3">
        <Label className="w-[100px] flex-none text-right text-gray max-[400px]:w-[60px]">
          {label}
        </Label>
        {children}
      </div>
      {error && (
        <div className="px-1 text-end text-xs text-destructive">
          {error.message}
        </div>
      )}
    </div>
  )
}
