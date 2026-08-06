export function CupcakeLine({ className = '', style = {} }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} style={style}>
      <path d="M14 82 h72 l-7 22 a5 5 0 0 1 -5 4 h-48 a5 5 0 0 1 -5 -4 z" />
      <path d="M18 68 q32 -20 64 0" />
      <path d="M24 66 a26 18 0 1 1 52 0" />
      <path d="M50 34 v-8" />
      <circle cx="50" cy="21" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MacaronLine({ className = '', style = {} }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} style={style}>
      <path d="M22 26 q38 -20 76 0 q0 8 -3 12 h-70 q-3 -4 -3 -12 z" />
      <path d="M19 38 h82 v6 h-82 z" />
      <path d="M19 44 h82 q3 4 3 12 q-38 20 -76 0 q0 -8 3 -12 z" />
      <path d="M40 18 q20 -6 40 0" opacity="0.5" />
    </svg>
  )
}
