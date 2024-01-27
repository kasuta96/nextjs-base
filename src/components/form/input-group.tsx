"use client"

import { FieldError, UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { enUS, ja, vi } from "date-fns/locale"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarDropdown } from "@/components/ui/calendar-dropdown"

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
        <Label className={formLabelClass}>{label}</Label>
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

type BaseInputType = {
  name: string
  label: string
  form?: UseFormReturn<any, undefined>
  isEdit: boolean
}

type TextInputType = BaseInputType & {
  type: "text" | "textarea"
  value?: string
}
type DateSelectType = BaseInputType & {
  type: "select"
  children: React.ReactNode
  value?: string
}
type DateInputType = BaseInputType & {
  type: "date"
  locale?: string
  value?: Date
}
type DateTimeType = BaseInputType & {
  type: "datetime"
  locale?: string
  value?: Date
}
const formFieldClass = "flex flex-col space-y-1.5"
const formItemClass = "relative flex items-center space-x-3 space-y-0"
const formLabelClass =
  "flex-none text-right text-gray text-sm font-medium w-[100px] max-[400px]:w-[60px]"

export const InputFormField = ({
  type,
  form,
  name,
  label,
  isEdit,
  value,
}: TextInputType) => {
  return isEdit ? (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <div className={formFieldClass}>
          <FormItem className={formItemClass}>
            <div className={formLabelClass}>{label}</div>
            {type == "text" ? (
              <Input {...field} />
            ) : type == "textarea" ? (
              <Textarea {...field} />
            ) : (
              <></>
            )}
          </FormItem>
          <FormMessage className="text-end" />
        </div>
      )}
    />
  ) : (
    <div className={formItemClass}>
      <div className={formLabelClass}>{label}</div>
      {type == "text" ? (
        <span className="pl-2">{value}</span>
      ) : type == "textarea" ? (
        <span className="max-h-20 flex-1 overflow-auto whitespace-pre-line pl-2">
          {value}
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}

export const SelectFormField = ({
  type,
  form,
  name,
  label,
  value,
  isEdit,
  children,
}: DateSelectType) => {
  return isEdit ? (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <div className={formFieldClass}>
          <FormItem className={formItemClass}>
            <div className={formLabelClass}>{label}</div>
            {isEdit ? (
              <Select
                onValueChange={(e) => field.onChange(e)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{children}</SelectContent>
              </Select>
            ) : (
              <span className="pl-2">{value}</span>
            )}
          </FormItem>
          <FormMessage className="text-end" />
        </div>
      )}
    />
  ) : (
    <div className={formItemClass}>
      <div className={formLabelClass}>{label}</div>
      <span className="pl-2">{value}</span>
    </div>
  )
}

export const DateFormField = ({
  type,
  form,
  name,
  label,
  isEdit,
  locale,
  value,
}: DateInputType) => {
  return isEdit ? (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <div className={formFieldClass}>
          <FormItem className={formItemClass}>
            <div className={formLabelClass}>{label}</div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value && format(field.value, "yyyy-MM-dd")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarDropdown
                    mode="single"
                    selected={field.value}
                    defaultMonth={field.value}
                    onSelect={(d) =>
                      field.onChange(d && new Date(format(d, "yyyy-MM-dd")))
                    }
                    locale={locale == "ja" ? ja : locale == "vi" ? vi : enUS}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
          <FormMessage className="text-end" />
        </div>
      )}
    />
  ) : (
    <div className={formItemClass}>
      <div className={formLabelClass}>{label}</div>
      <span className="pl-2">{value && format(value, "yyyy-MM-dd")}</span>
    </div>
  )
}

export const DateTimeFormField = ({ type, label, value }: DateTimeType) => {
  return (
    <div className={formItemClass}>
      <div className={formLabelClass}>{label}</div>
      <div className="pl-2">
        {value && format(value, "yyyy-MM-dd HH:mm:ss")}
      </div>
    </div>
  )
}
