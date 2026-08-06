import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter.js'

const EASE = [0.16, 1, 0.3, 1]

export default function LoadingScreen() {
  const typed = useTypewriter('Welcome', 150)

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-espresso text-ivory"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(192,138,78,0.14) 0%, transparent 62%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-12 px-6">
        <div className="loader">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="loader-square" />
          ))}
        </div>
        <div className="font-display text-6xl leading-none tracking-wide sm:text-7xl md:text-8xl">
          {typed}
          <span className="caret" />
        </div>
        <p className="text-xs uppercase tracking-[0.5em] text-ivory/40">Delicias de Azúcar</p>
      </div>
    </motion.div>
  )
}
