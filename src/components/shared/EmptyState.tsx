import { Button } from "@/components/ui/button"

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Icon size={48} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
