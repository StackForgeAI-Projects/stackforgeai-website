import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "bg-surface/60 border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-primary/50 focus:border-primary/50 mt-2 min-h-[120px] w-full resize-y rounded-xl border px-4 py-3 transition focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
