import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function About() {
  return (
    <section id="nosotros" className="bg-cream px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          <div className="img-blend relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop"
              alt="Postres artesanales de Delicias de Azúcar"
              loading="lazy"
              className="img-tint h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute -bottom-6 right-4 rounded-2xl bg-espresso px-7 py-5 text-ivory shadow-xl sm:right-6"
          >
            <p className="font-display text-4xl text-caramel">+6 años</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/70">
              endulzando historias
            </p>
          </motion.div>
        </motion.div>

        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-caramel"
          >
            Nosotros
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-display text-4xl leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
          >
            Hecho a mano,
            <br />
            con tiempo y <em className="italic text-caramel">paciencia.</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 leading-relaxed text-mocha"
          >
            En Delicias de Azúcar creemos que un postre no se apura. Cada receta se amasa, reposa y
            hornea con dedicación, usando manteca real, chocolate puro y frutas de estación. Sin
            conservantes, sin colorantes: solo azúcar, técnica y cariño.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-cocoa/10 pt-8"
          >
            <div>
              <p className="font-display text-3xl text-espresso">100%</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-mocha">artesanal</p>
            </div>
            <div>
              <p className="font-display text-3xl text-espresso">0</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-mocha">conservantes</p>
            </div>
            <div>
              <p className="font-display text-3xl text-espresso">24h</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-mocha">frescura</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
