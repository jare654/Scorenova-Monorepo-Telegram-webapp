import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0D367A] text-white hover:bg-[#0D367A]/80",
        premium: "border-transparent bg-[#FFD000] text-[#0D367A] hover:bg-[#FFD000]/80",
        success: "border-transparent bg-[#3CCF91] text-white hover:bg-[#3CCF91]/80",
        error: "border-transparent bg-[#D32F2F] text-white hover:bg-[#D32F2F]/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
