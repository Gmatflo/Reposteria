import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { CupcakeLine, MacaronLine } from './Illustrations.jsx'

const EASE = [0.16, 1, 0.3, 1]

const VIDEO_SOURCES = ['https://assets.mixkit.co/videos/50018/50018-1080.mp4']

const POSTER =
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1600&auto=format&fit=crop'

const words = ['Fresco', 'Artesanal', 'Hecho con amor', 'Sin conservantes', 'Horneado a diario', 'Ingredientes reales', '100% delicioso']

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)
  const marquee = [...words, ...words]

  return (
    <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden bg-espresso">
      {!videoFailed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          {VIDEO_SOURCES.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      ) : (
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${POSTER})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/35 to-espresso/90" />
      <div className="absolute inset-0 bg-espresso/15" />

      <CupcakeLine
        className="absolute left-[7%] top-[26%] hidden h-16 w-14 animate-float text-caramel/50 lg:block"
        style={{ animationDelay: '0.6s' }}
      />
      <MacaronLine
        className="absolute right-[8%] top-[30%] hidden h-14 w-20 animate-float text-caramel/40 lg:block"
        style={{ animationDelay: '1.8s' }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-8 flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/5 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-ivory/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-caramel" />
          Delicias de Azúcar · Postres artesanales
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          className="font-display text-6xl leading-[0.95] tracking-tight text-ivory drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Dulzura que
          <br />
          <em className="italic text-caramel">se siente.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-8 max-w-md text-base leading-relaxed text-ivory/85"
        >
          Tortas, macarons y delicias horneadas cada mañana. Ingredientes reales, cero conservantes y
          mucho amor en cada bocado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#menu"
            className="rounded-full bg-caramel px-9 py-4 text-xs uppercase tracking-[0.18em] text-espresso shadow-[0_0_35px_rgba(192,138,78,0.4)] transition-all duration-300 hover:bg-ivory"
          >
            Ver el menú
          </a>
          <a
            href="#pedidos"
            className="rounded-full border border-ivory/30 px-9 py-4 text-xs uppercase tracking-[0.18em] text-ivory backdrop-blur transition-colors duration-300 hover:border-caramel hover:text-caramel"
          >
            Hacer un pedido
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 flex items-center gap-8 text-ivory/60"
        >
          {[
            ['+100', 'delicias'],
            ['100%', 'artesanal'],
            ['+6 años', 'de experiencia'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-3xl text-ivory">{n}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em]">{l}</p>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#nosotros"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ivory/60 transition-colors hover:text-caramel"
        >
          <ArrowDown size={13} className="animate-bounce" /> Descubrir
        </motion.a>
      </div>

      <div className="relative z-10 overflow-hidden border-t border-ivory/10 py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {marquee.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-sm tracking-[0.35em] uppercase text-ivory/70"
            >
              {w} <span className="text-caramel">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
