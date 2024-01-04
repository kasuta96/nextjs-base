import { SkeletonAccordion } from "@/components/skeleton/accordion"
import { Button } from "@/components/ui/button"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Button className="animate-pulse">Loading...</Button>
      <SkeletonAccordion />
    </div>
  )
}
