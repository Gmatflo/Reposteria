import { useEffect, useState } from 'react'

export function useTypewriter(text, speed = 140) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(id)
  }, [count, speed, text])

  return text.slice(0, count)
}
