import { useNavigate, useLocation } from "react-router-dom"
import { Home, BookOpen, Camera, FileText, User } from "lucide-react"
import { useNavStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setActiveTab } = useNavStore()

  const tabs = [
    { id: "home", icon: Home, path: "/" },
    { id: "practice", icon: BookOpen, path: "/practice" },
    { id: "scan", icon: Camera, path: "/scan", center: true },
    { id: "mock", icon: FileText, path: "/mock" },
    { id: "profile", icon: User, path: "/profile" },
  ]

  const handleNav = (tab: any) => {
    setActiveTab(tab.id)
    navigate(tab.path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-[#0D1629] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-[24px] z-50 flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path
        if (tab.center) {
          return (
            <button
              key={tab.id}
              onClick={() => handleNav(tab)}
              className="relative -top-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD000] text-[#0D367A] shadow-lg shadow-[#FFD000]/40 transition-transform active:scale-95"
            >
              <tab.icon size={28} />
            </button>
          )
        }
        return (
          <button
            key={tab.id}
            onClick={() => handleNav(tab)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-16 h-16 transition-colors",
              isActive ? "text-[#FFD000]" : "text-slate-400 dark:text-slate-500"
            )}
          >
            <tab.icon size={24} />
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000]" />}
          </button>
        )
      })}
    </div>
  )
}
