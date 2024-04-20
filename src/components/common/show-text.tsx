import { GenderType } from "@/lib/validations/user"
import { useTranslations } from "next-intl"

export function ShowGender(gender: GenderType) {
  const t = useTranslations("user")
  return t(gender || "Unknown") || gender
}

export function ShowLang(lang: string) {
  const t = useTranslations("common")
  return t(`lang-${lang}`) || lang
}

export function ShowDateFromString(date: Date) {
  const dateStr = date?.toISOString().slice(0, 10)
  return dateStr
}

export function ShowDatetimeFromString(date: Date) {
  const dateStr = date?.toISOString().slice(0, 20)
  return dateStr
}

export function ShowTranslate(ns: string, text: string) {
  const t = useTranslations(ns)

  return t(text) || text
}
