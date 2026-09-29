import { useEffect, useRef } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

export function MathText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        if (text.startsWith("$") && text.endsWith("$")) {
          katex.render(text.replace(/\$/g, ""), containerRef.current, {
            throwOnError: false,
            displayMode: text.startsWith("$$"),
          })
        } else {
          containerRef.current.textContent = text
        }
      } catch (e) {
        containerRef.current.textContent = text
      }
    }
  }, [text])

  return <div ref={containerRef} className="math-text" />
}
