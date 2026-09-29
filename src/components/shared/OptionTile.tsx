import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { MathText } from "./MathText"

interface OptionTileProps {
  label: string
  text: string
  isSelected?: boolean
  isCorrect?: boolean | null
  disabled?: boolean
  onSelect: () => void
}

export function OptionTile({ label, text, isSelected, isCorrect, disabled, onSelect }: OptionTileProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-4 rounded-[16px] border p-4 text-left transition-all",
        !isSelected && isCorrect === null && "border-slate-200 bg-white hover:border-[#0D367A] dark:border-slate-700 dark:bg-slate-800",
        isSelected && isCorrect === null && "border-[#0D367A] bg-[#0D367A]/5",
        isCorrect === true && "border-[#3CCF91] bg-[#3CCF91]/10",
        isCorrect === false && isSelected && "border-[#D32F2F] bg-[#D32F2F]/10"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          isCorrect === true ? "bg-[#3CCF91] text-white" :
          isCorrect === false && isSelected ? "bg-[#D32F2F] text-white" :
          isSelected ? "bg-[#0D367A] text-white" :
          "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
        )}
      >
        {isCorrect === true ? <Check size={16} /> : isCorrect === false && isSelected ? <X size={16} /> : label}
      </div>
      <div className="flex-1">
        <MathText text={text} />
      </div>
    </button>
  )
}
