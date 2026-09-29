import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D367A] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[#D32F2F] focus-visible:ring-[#D32F2F]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-[#D32F2F]">{error}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
