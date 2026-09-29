import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { BottomNav } from "./BottomNav"
import { useNavStore } from "@/lib/store"
import { isTelegramEnvironment, getTelegramWebApp } from "@/lib/telegram"

export function AppShell() {
  const { isNavVisible } = useNavStore()

  useEffect(() => {
    if (isTelegramEnvironment()) {
      const tg = getTelegramWebApp()
      if(tg.ready) tg.ready()
      if(tg.expand) tg.expand()
    }
  }, [])

  return (
    <div className="flex h-screen flex-col font-poppins bg-[#F8FAFC] dark:bg-[#08101F] overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      {isNavVisible && <BottomNav />}
    </div>
  )
}
