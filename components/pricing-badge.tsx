import { getPricingTagDetails } from "@/lib/data-utils"

interface PricingBadgeProps {
  pricing?: string
  className?: string
}

export function PricingBadge({ pricing, className = "" }: PricingBadgeProps) {
  const pricingTag = getPricingTagDetails(pricing)

  if (!pricingTag) return null

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${pricingTag.className} ${className}`}>
      {pricingTag.label}
    </span>
  )
}
