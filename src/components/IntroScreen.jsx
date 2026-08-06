import { motion } from 'framer-motion'
import Logo from './Logo.jsx'

const EASE = [0.16, 1, 0.3, 1]

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-40 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-espresso text-ivory"
      onClick={onStart}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(192,138,78,0.16) 0%, transparent 62%)',
        }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Logo size={132} className="text-caramel drop-shadow-[0_0_30px_rgba(192,138,78,0.35)]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
        className="mt-9 text-center font-display text-4xl tracking-wide sm:text-5xl md:text-6xl"
      >
        Delicias de Azúcar
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        className="mt-4 text-center text-[11px] uppercase tracking-[0.4em] text-ivory/45 sm:text-xs"
      >
        Postres artesanales · hechos con amor
      </motion.p>

      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onStart()
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="group mt-14 flex items-center gap-3 rounded-full border border-caramel/50 px-9 py-4 text-xs uppercase tracking-[0.25em] text-caramel transition-all duration-300 hover:border-caramel hover:bg-caramel hover:text-espresso hover:shadow-[0_0_45px_rgba(192,138,78,0.4)]"
      >
        <span className="inline-block text-sm transition-transform duration-300 group-hover:translate-x-1">
          ▶
        </span>
        start preview
      </motion.button>
    </motion.div>
  )
}
