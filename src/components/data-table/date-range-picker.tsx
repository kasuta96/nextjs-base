"use client"

import * as React from "react"
import { Column } from "@tanstack/react-table"
import { CalendarSearchIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { enUS, ja, vi } from "date-fns/locale"

interface DateRangePickerProps<TData, TValue>
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  column?: Column<TData, TValue>
  title?: string
  dateRange?: DateRange

  /**
   * The number of days to display in the date range picker.
   * @default undefined
   * @type number
   * @example 7
   */
  dayCount?: number

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps["size"], "icon">

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string
  paramName: string
  locale?: string
}

export function DateRangePicker<TData, TValue>({
  column,
  title,
  dateRange,
  dayCount,
  placeholder = "Pick a date",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  className,
  paramName,
  locale,
  ...props
}: DateRangePickerProps<TData, TValue>) {
  const localeValue = locale ? { ja, vi, en: enUS }[locale] : undefined
  const rangeValue = new Set(column?.getFilterValue() as string)
  const rvStr = Array.from(rangeValue).pop() ?? ""

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    // Get from & to date from the Set
    const [fromParam, toParam] = rvStr ? rvStr.split("~", 2) : []

    let fromDay: Date | undefined
    let toDay: Date | undefined

    if (dateRange) {
      fromDay = dateRange.from
      toDay = dateRange.to
    } else if (dayCount) {
      toDay = new Date()
      fromDay = addDays(toDay, -dayCount)
    }

    return {
      from: fromParam ? new Date(fromParam) : fromDay,
      to: toParam ? new Date(toParam) : toDay,
    }
  })

  React.useEffect(() => {
    let paramValue = ""
    if (date?.from) {
      paramValue += date.from.toISOString()
    }
    if (date?.to) {
      date?.to.setHours(23, 59, 59, 999)
      paramValue += "~" + date?.to.toISOString()
    }
    column?.setFilterValue(paramValue || undefined)
  }, [date, column])

  React.useEffect(() => {
    if (!rvStr) {
      setDate(undefined)
    }
  }, [rvStr])

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(!date && "text-muted-foreground", triggerClassName)}
          >
            <CalendarSearchIcon className="mr-2 size-4" />
            {title}
            <Separator orientation="vertical" className="mx-2 h-4" />
            {rangeValue.size > 0 ? (
              `${date?.from ? format(date.from, "yyyy-MM-dd") + " ~" : ""}${date?.to ? ` ${format(date.to, "yyyy-MM-dd")}` : ""}`
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={localeValue}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
