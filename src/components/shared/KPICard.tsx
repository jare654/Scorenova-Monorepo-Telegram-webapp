import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  color?: string
}

export function KPICard({ title, value, subtitle, icon, trend, color = "#0D367A" }: KPICardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h4 className="mt-2 text-2xl font-bold" style={{ color }}>{value}</h4>
        </div>
        <div className="rounded-xl p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {icon}
        </div>
      </div>
      {subtitle && (
        <div className="mt-4 flex items-center gap-1 text-xs text-slate-500">
          {trend === "up" && <TrendingUp size={14} className="text-[#3CCF91]" />}
          {trend === "down" && <TrendingDown size={14} className="text-[#D32F2F]" />}
          {trend === "neutral" && <Minus size={14} className="text-slate-400" />}
          <span>{subtitle}</span>
        </div>
      )}
    </Card>
  )
}
