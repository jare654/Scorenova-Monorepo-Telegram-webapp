import { usePremiumStore } from "@/lib/store"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { isPremium } = usePremiumStore()

  if (isPremium) return <>{children}</>

  return (
    <div className="relative overflow-hidden rounded-[20px]">
      <div className="pointer-events-none blur-sm opacity-50 select-none">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 p-6 text-center backdrop-blur-sm dark:bg-slate-900/60">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD000]/20 text-[#FFD000]">
          <Lock size={32} />
        </div>
        <h3 className="mb-2 text-xl font-bold text-[#0D367A] dark:text-white">Premium Content</h3>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Upgrade to Scorenova Premium to access this content and much more.
        </p>
        <Button className="w-full bg-[#FFD000] text-[#0D367A] hover:bg-[#FFD000]/90">
          Upgrade Now
        </Button>
      </div>
    </div>
  )
}
