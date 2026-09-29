import { motion } from "framer-motion"
import { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}
