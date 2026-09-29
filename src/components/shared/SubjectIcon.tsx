const SUBJECT_ICONS: Record<string, string> = {
  Math: "📐",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
  English: "📚",
  History: "🏛️",
  Geography: "🌍",
}

export function SubjectIcon({ name, className }: { name: string, className?: string }) {
  const icon = SUBJECT_ICONS[name] || "📖"
  return <span className={className}>{icon}</span>
}
