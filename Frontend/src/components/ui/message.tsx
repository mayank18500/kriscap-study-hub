import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const messageVariants = cva(
  "flex items-start gap-3 sm:gap-4 max-w-[95%] sm:max-w-[85%]",
  {
    variants: {
      align: {
        start: "self-start flex-row",
        end: "self-end flex-row-reverse",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
)

export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(messageVariants({ align, className }))}
      {...props}
    />
  )
)
Message.displayName = "Message"

const MessageAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("shrink-0", className)}
    {...props}
  />
))
MessageAvatar.displayName = "MessageAvatar"

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 relative", className)}
    {...props}
  />
))
MessageContent.displayName = "MessageContent"

export { Message, MessageAvatar, MessageContent }
