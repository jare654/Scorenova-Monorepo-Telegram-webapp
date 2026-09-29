import React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] p-4 text-center dark:bg-[#08101F]">
          <div className="mb-6 rounded-full bg-[#D32F2F]/10 p-6 text-[#D32F2F]">
            <AlertCircle size={48} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
          <p className="mb-8 text-slate-500 dark:text-slate-400">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      )
    }

    return this.props.children
  }
}
