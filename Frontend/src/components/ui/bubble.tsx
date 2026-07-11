import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bubbleVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "",
        muted: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(bubbleVariants({ variant, className }))}
      {...props}
    />
  )
)
Bubble.displayName = "Bubble"

const BubbleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 relative", className)}
    {...props}
  />
))
BubbleContent.displayName = "BubbleContent"

export { Bubble, BubbleContent }
