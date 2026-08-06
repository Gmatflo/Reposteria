import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const testimonials = [
  {
    name: 'Valentina R.',
    role: 'Cumpleaños de 30',
    quote: 'La mesa dulce fue un éxito total. Los macarons desaparecieron en minutos y el diseño era divino.',
  },
  {
    name: 'Martín y Carla',
    role: 'Casamiento',
    quote: 'La torta de tres pisos fue lo más fotografiado de la fiesta. Sabor y estética de otro nivel.',
  },
  {
    name: 'Lucía G.',
    role: 'Clienta habitual',
    quote: 'Pido todas las semanas por WhatsApp. El servicio es increíble y el brownie, una adicción.',
  },
  {
    name: 'Ezequiel P.',
    role: 'Regalo de empresa',
    quote: 'Hicieron 40 boxes personalizados para nuestros clientes. Puntuales, prolijos y riquísimos.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-espresso px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs uppercase tracking-[0.35em] text-caramel"
          >
            Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-4 font-display text-4xl text-ivory sm:text-5xl lg:text-6xl"
          >
            Lo que dicen <em className="italic text-caramel">de nosotros.</em>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="flex flex-col rounded-3xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur transition-colors hover:border-caramel/40"
            >
              <div className="flex gap-1 text-caramel">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/85">“{t.quote}”</p>
              <div className="mt-5 border-t border-ivory/10 pt-4">
                <p className="font-display text-lg text-ivory">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-ivory/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
