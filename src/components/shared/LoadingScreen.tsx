import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#08101F]">
      <div className="text-[#0D367A] dark:text-white mb-4 text-2xl font-bold">Scorenova</div>
      <Loader2 className="h-8 w-8 animate-spin text-[#FFD000]" />
    </div>
  )
}
