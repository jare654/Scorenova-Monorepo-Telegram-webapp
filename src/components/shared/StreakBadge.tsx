export function StreakBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#FD761A]/10 px-3 py-1 font-semibold text-[#FD761A]">
      <span className="text-lg">🔥</span>
      <span>{count}</span>
    </div>
  )
}
