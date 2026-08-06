export default function Logo({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Logo Delicias de Azúcar">
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <path
        d="M32 32 m0-18 a18 18 0 1 1 0 36 a13 13 0 1 1 0-26 a8 8 0 1 1 0 16 a3.5 3.5 0 1 1 0-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="15" r="2.6" fill="currentColor" />
    </svg>
  )
}
