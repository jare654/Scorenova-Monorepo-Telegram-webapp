import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { isTelegramEnvironment, getTelegramWebApp } from "@/lib/telegram"

interface AppBarProps {
  title: string
  showBack?: boolean
  rightActions?: React.ReactNode
}

export function AppBar({ title, showBack, rightActions }: AppBarProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (isTelegramEnvironment()) {
      const tg = getTelegramWebApp()
      if (showBack) {
        if(tg?.BackButton) {
          tg?.BackButton.show()
          tg?.BackButton.onClick(() => navigate(-1))
        }
      } else {
        if(tg?.BackButton) tg?.BackButton.hide()
      }
      return () => {
        if(showBack && tg?.BackButton) tg?.BackButton.offClick(() => navigate(-1))
      }
    }
  }, [showBack, navigate])

  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between bg-[#F8FAFC]/80 px-4 backdrop-blur-md dark:bg-[#08101F]/80">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 dark:text-slate-100">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-[#0D367A] dark:text-white">{title}</h1>
      </div>
      <div>{rightActions}</div>
    </div>
  )
}
