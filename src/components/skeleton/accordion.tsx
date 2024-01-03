import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const SkeletonAccordion = () => {
  return (
    <Accordion type="multiple" className="grid gap-4">
      <SkeletonAccordionItem />
      <SkeletonAccordionItem />
      <SkeletonAccordionItem />
      <SkeletonAccordionItem />
      <SkeletonAccordionItem />
    </Accordion>
  )
}

const SkeletonAccordionItem = () => {
  return (
    <AccordionItem
      value=""
      className="h-fit rounded-lg border px-4 hover:shadow-lg"
    >
      <AccordionTrigger>
        <Skeleton className="h-6 w-20" />
      </AccordionTrigger>
    </AccordionItem>
  )
}
